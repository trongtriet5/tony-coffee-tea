"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import { getProducts, getCategories, getToppings, validateVoucher, createOrder } from "@/lib/api";
import type { Product, Topping, CartItem, Voucher, PaymentMethod } from "@/types";
import {
  HiChevronLeft, HiPlus, HiMinus, HiTrash, HiTicket, HiShoppingCart,
  HiSearch, HiCheckCircle, HiX, HiPlusCircle
} from "react-icons/hi";
import { MdOutlineReceiptLong, MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiCoffeeTogo, BiDish } from "react-icons/bi";

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const CATEGORY_ICONS: Record<string, any> = {
  "Cà phê": BiCoffeeTogo, "Trà": BiCoffeeTogo, "Sinh tố": BiCoffeeTogo, "Nước ép": BiCoffeeTogo, "Đồ ăn": BiDish, "Topping": HiPlusCircle
};

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [cart, setCart] = useState<CartItem[]>([]);

  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Record<string, number>>({});

  const [voucherInput, setVoucherInput] = useState("");
  const [appliedVouchers, setAppliedVouchers] = useState<Voucher[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "BANK_TRANSFER">("CASH");

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    Promise.all([getProducts(), getCategories(), getToppings()]).then(([prods, cats, tops]) => {
      setProducts(prods);
      setCategories([...cats.map(c => c.category), "Topping"]);
      setToppings(tops);
    });
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "Topping") {
      return toppings.map(t => ({
        id: t.id, name_vi: t.name, name_en: "Topping", price: t.price, category: "Topping", available: t.available
      } as any)).filter(p => p.name_vi.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    return products.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch = p.name_vi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [products, toppings, selectedCategory, searchQuery]);

  const handleItemClick = (p: Product) => {
    if (p.category === "Đồ Ăn" || p.category === "Topping") {
      addToCart(p, []);
    } else {
      setActiveProduct(p);
      setSelectedToppings({});
    }
  };

  const updateToppingQty = (tId: string, delta: number) => {
    setSelectedToppings(prev => {
      const current = prev[tId] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [tId]: next };
    });
  };

  const confirmAddToCart = () => {
    if (activeProduct) {
      const topsArr: Topping[] = [];
      Object.entries(selectedToppings).forEach(([id, qty]) => {
        const t = toppings.find(x => x.id === id);
        if (t && qty > 0) {
          for (let i = 0; i < qty; i++) topsArr.push(t);
        }
      });
      addToCart(activeProduct, topsArr);
      setActiveProduct(null);
    }
  };

  const addToCart = (product: Product, selectedTops: Topping[]) => {
    setCart((prev) => {
      const topIds = selectedTops.map(t => t.id).sort().join(',');
      const existing = prev.find((i) =>
        i.product.id === product.id &&
        (i.selectedToppings || []).map(t => t.id).sort().join(',') === topIds
      );

      if (existing) {
        return prev.map((i) => (i === existing) ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { product, quantity: 1, selectedToppings: selectedTops }];
    });
  };

  const updateQty = (item: CartItem, delta: number) => {
    setCart((prev) => prev.map((i) => i === item ? { ...i, quantity: i.quantity + delta } : i).filter((i) => i.quantity > 0));
  };

  const calculateItemPrice = (item: CartItem) => {
    const base = item.product.price;
    const tops = (item.selectedToppings || []).reduce((s, t) => s + t.price, 0);
    return base + tops;
  };

  const totalAmount = cart.reduce((s, i) => s + calculateItemPrice(i) * i.quantity, 0);
  const totalDiscount = appliedVouchers.reduce((s, v) => s + v.amount, 0);
  const finalAmount = Math.max(0, totalAmount - totalDiscount);

  const applyVoucher = async () => {
    if (!voucherInput.trim()) return;
    try {
      const v = await validateVoucher(voucherInput.trim());
      if (appliedVouchers.find(x => x.voucher_code === v.voucher_code)) return;
      setAppliedVouchers(prev => [...prev, v]);
      setVoucherInput("");
    } catch (err) { alert("Mã voucher không hợp lệ"); }
  };

  const checkout = async () => {
    if (cart.length === 0) return;
    setIsCheckingOut(true);
    try {
      const payload = {
        items: cart.map(i => ({
          product_id: i.product.id,
          quantity: i.quantity,
          topping_ids: i.selectedToppings?.map(t => t.id)
        })),
        voucher_codes: appliedVouchers.map(v => v.voucher_code),
        payment_method: paymentMethod
      };
      const order = await createOrder(payload);
      setOrderSuccess(order);
      setCart([]); setAppliedVouchers([]); setIsCartOpen(false);
    } catch (err) { alert("Lỗi hệ thống khi thanh toán"); } finally { setIsCheckingOut(false); }
  };

  return (
    <div style={{ display: "flex", height: "100dvh", background: "var(--bg-primary)", overflow: "hidden", paddingLeft: isMobile ? 0 : 80 }}>

      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", padding: isMobile ? "0" : "32px 40px" }}>
        {/* Header */}
        <div style={{ padding: isMobile ? "16px 20px" : "0 0 32px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: isMobile ? 22 : 32, fontWeight: 900 }}>Menu <span style={{ color: "var(--accent)" }}>TTVH</span></h1>
          <div style={{ position: "relative", width: isMobile ? "160px" : "360px" }}>
            <HiSearch size={18} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input type="text" placeholder="Tìm kiếm..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} style={{ width: "100%", background: "white", border: "1px solid var(--border)", borderRadius: 14, padding: "12px 16px 12px 42px", fontSize: 13, fontWeight: 600, outline: "none" }} />
          </div>
        </div>

        {/* Categories Scroller */}
        <div style={{ display: "flex", gap: 10, padding: isMobile ? "12px 20px" : "0 0 28px", overflowX: "auto" }}>
          <button onClick={() => setSelectedCategory("all")} style={{ padding: "10px 22px", borderRadius: 12, border: selectedCategory === "all" ? "none" : "1px solid var(--border)", cursor: "pointer", whiteSpace: "nowrap", fontWeight: 800, fontSize: 13, background: selectedCategory === "all" ? "var(--gold-gradient)" : "white", color: selectedCategory === "all" ? "white" : "var(--text-secondary)" }}>🔥 HOT</button>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)} style={{ padding: "10px 22px", borderRadius: 12, border: selectedCategory === cat ? "none" : "1px solid var(--border)", cursor: "pointer", whiteSpace: "nowrap", fontWeight: 800, fontSize: 13, background: selectedCategory === cat ? "var(--gold-gradient)" : "white", color: selectedCategory === cat ? "white" : "var(--text-secondary)" }}>
              {cat.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div style={{ flex: 1, overflowY: "auto", padding: isMobile ? "16px" : "4px 8px 12px 4px", display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(200px, 1fr))", gap: 24, alignItems: "start" }}>
          {filteredProducts.map((p) => {
            const Icon = CATEGORY_ICONS[p.category] || BiCoffeeTogo;
            return (
              <div key={p.id} onClick={() => handleItemClick(p)} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 24, padding: "24px", cursor: "pointer", display: "flex", flexDirection: "column", height: "fit-content", minHeight: "220px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                  <Icon size={28} color="var(--accent)" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 800, marginBottom: 4 }}>{p.name_vi}</p>
                <div style={{ marginTop: "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 16, fontWeight: 900, color: "var(--accent)" }}>{formatVND(p.price)}</span>
                  <div style={{ width: 34, height: 34, borderRadius: 10, background: "var(--gold-gradient)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}><HiPlus size={20} /></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cart & Billing Panel */}
      {(isCartOpen || !isMobile) && (
        <div style={{ width: isMobile ? "100%" : "440px", height: isMobile ? "100dvh" : "100%", position: isMobile ? "fixed" : "relative", top: 0, right: 0, background: "white", zIndex: 200, display: "flex", flexDirection: "column", borderLeft: isMobile ? "none" : "1px solid var(--border)", boxShadow: isMobile ? "none" : "-10px 0 30px rgba(0,0,0,0.02)" }}>
          <div style={{ padding: "32px 28px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h2 style={{ fontSize: 22, fontWeight: 900 }}>Chi Tiết Đơn</h2>
            {isMobile && <button onClick={() => setIsCartOpen(false)} style={{ border: "none", background: "none" }}><HiChevronLeft size={28} /></button>}
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
            {cart.map((item, idx) => (
              <div key={idx} style={{ display: "flex", gap: 16, marginBottom: 16, borderBottom: "1px solid var(--border-light)", paddingBottom: 16, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: 800, fontSize: 15 }}>{item.product.name_vi}</p>
                  {(item.selectedToppings || []).length > 0 && (
                    <p style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>
                      + {Object.entries(item.selectedToppings?.reduce((acc: any, t) => { acc[t.name] = (acc[t.name] || 0) + 1; return acc; }, {}) || {}).map(([name, qty]) => `${name} x${qty}`).join(', ')}
                    </p>
                  )}
                  <p style={{ fontSize: 13, color: "var(--accent)", fontWeight: 800, marginTop: 4 }}>{formatVND(calculateItemPrice(item))} / món</p>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <button onClick={() => updateQty(item, -1)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><HiMinus size={16} /></button>
                  <span style={{ fontWeight: 900, minWidth: 20, textAlign: "center" }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item, 1)} style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "white", display: "flex", alignItems: "center", justifyContent: "center" }}><HiPlus size={16} /></button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ padding: "32px 28px", background: "var(--bg-primary)", borderTop: "1px solid var(--border)" }}>
            <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
              <input type="text" placeholder="Mã voucher..." value={voucherInput} onChange={(e) => setVoucherInput(e.target.value.toUpperCase())} style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 12, padding: 14, fontWeight: 800, outline: "none", fontSize: 14 }} />
              <button onClick={applyVoucher} style={{ background: "var(--text-primary)", color: "white", border: "none", borderRadius: 12, padding: "0 22px", fontWeight: 900 }}>DÙNG</button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 28 }}>
              <div style={{ display: "flex", justifyContent: "space-between", color: "var(--text-secondary)", fontWeight: 700, fontSize: 15 }}><span>Tạm tính</span><span>{formatVND(totalAmount)}</span></div>
              {appliedVouchers.map(v => (
                <div key={v.voucher_code} style={{ display: "flex", justifyContent: "space-between", color: "var(--success)", fontWeight: 800, fontSize: 15 }}><span><HiTicket size={16} style={{ display: "inline", marginRight: 6 }} /> {v.voucher_code}</span><span>-{formatVND(v.amount)}</span></div>
              ))}
              <div style={{ borderTop: "1px dashed var(--border)", marginTop: 12, paddingTop: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 900, fontSize: 18 }}>TỔNG CHỐT</span>
                <span style={{ fontWeight: 900, fontSize: 26, color: "var(--accent)" }}>{formatVND(finalAmount)}</span>
              </div>
            </div>

            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              <button 
                onClick={() => setPaymentMethod("CASH")} 
                style={{ flex: 1, padding: "12px", borderRadius: 12, fontWeight: 900, fontSize: 13, border: paymentMethod === "CASH" ? "2px solid var(--accent)" : "1px solid var(--border)", background: paymentMethod === "CASH" ? "var(--bg-primary)" : "white", color: paymentMethod === "CASH" ? "var(--accent)" : "var(--text-secondary)", cursor: "pointer", transition: "0.2s" }}
              >
                TIỀN MẶT
              </button>
              <button 
                onClick={() => setPaymentMethod("BANK_TRANSFER")} 
                style={{ flex: 1, padding: "12px", borderRadius: 12, fontWeight: 900, fontSize: 13, border: paymentMethod === "BANK_TRANSFER" ? "2px solid var(--accent)" : "1px solid var(--border)", background: paymentMethod === "BANK_TRANSFER" ? "var(--bg-primary)" : "white", color: paymentMethod === "BANK_TRANSFER" ? "var(--accent)" : "var(--text-secondary)", cursor: "pointer", transition: "0.2s" }}
              >
                CHUYỂN KHOẢN
              </button>
            </div>

            <button onClick={checkout} disabled={cart.length === 0 || isCheckingOut} className="btn-primary" style={{ width: "100%", padding: 20 }}>
              {isCheckingOut ? <AiOutlineLoading3Quarters size={22} className="spin" /> : "XÁC NHẬN & XUẤT BILL"}
            </button>
          </div>
        </div>
      )}

      {/* Topping Selection Modal - UPGRADED WITH STEPPER */}
      {activeProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, backdropFilter: "blur(6px)" }}>
          <div style={{ background: "white", padding: 32, borderRadius: 32, maxWidth: 460, width: "90%", boxShadow: "var(--shadow-lg)" }} className="animate-fade-in">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 900 }}>{activeProduct.name_vi}</h3>
                <p style={{ color: "var(--text-secondary)", fontWeight: 700 }}>Chọn thêm topping đi kèm</p>
              </div>
              <button onClick={() => setActiveProduct(null)} style={{ background: "var(--bg-primary)", border: "none", width: 40, height: 40, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}><HiX size={24} /></button>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
              {toppings.map(t => (
                <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderRadius: 16, border: (selectedToppings[t.id] || 0) > 0 ? "2px solid var(--accent)" : "1px solid var(--border)", background: (selectedToppings[t.id] || 0) > 0 ? "var(--accent-light)" : "white", transition: "0.2s" }}>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: 800 }}>{t.name}</p>
                    <p style={{ color: "var(--accent)", fontWeight: 900, fontSize: 13 }}>+{formatVND(t.price)}</p>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <button onClick={() => updateToppingQty(t.id, -1)} style={{ width: 30, height: 30, borderRadius: "50%", background: "white", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><HiMinus size={14} /></button>
                    <span style={{ fontWeight: 900, fontSize: 15 }}>{selectedToppings[t.id] || 0}</span>
                    <button onClick={() => updateToppingQty(t.id, 1)} style={{ width: 30, height: 30, borderRadius: "50%", background: "var(--gold-gradient)", color: "white", border: "none", display: "flex", alignItems: "center", justifyContent: "center" }}><HiPlus size={14} /></button>
                  </div>
                </div>
              ))}
            </div>

            <button onClick={confirmAddToCart} className="btn-primary" style={{ width: "100%", padding: 18, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
              <HiPlusCircle size={22} />
              THÊM VÀO GIỎ • {formatVND(activeProduct.price + toppings.reduce((s, t) => s + t.price * (selectedToppings[t.id] || 0), 0))}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {orderSuccess && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 400 }}>
          <div style={{ textAlign: "center", padding: "40px", background: "white", borderRadius: 32, border: "1px solid var(--border)", maxWidth: 460, width: "100%" }} className="animate-fade-in">
            {orderSuccess.payment_method === "BANK_TRANSFER" ? (
               <div style={{ marginBottom: 24 }}>
                 <h2 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16 }}>QUÉT MÃ THANH TOÁN</h2>
                 <div style={{ background: "white", padding: 16, borderRadius: 24, border: "2px solid var(--border)", display: "inline-block", marginBottom: 16 }}>
                   <img src={`https://img.vietqr.io/image/techcombank-19038133016013-print.jpg?amount=${orderSuccess.final_amount}&addInfo=Thanh toan don hang ${orderSuccess.order_number}&accountName=Nguyen Trong Triet`} alt="QR Code" style={{ width: 280, height: "auto", borderRadius: 12 }} />
                 </div>
                 <p style={{ fontSize: 18, fontWeight: 900, color: "var(--accent)", marginBottom: 4 }}>{formatVND(orderSuccess.final_amount)}</p>
                 <p style={{ fontSize: 13, color: "var(--text-muted)", fontWeight: 700 }}>{orderSuccess.order_number}</p>
                 <div style={{ fontSize: 12, fontWeight: 800, color: "var(--success)", background: "rgba(34,197,94,0.1)", padding: "10px 16px", borderRadius: 12, marginTop: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                    <HiCheckCircle size={18} /> Chờ khách quét mã để hoàn tất đơn
                 </div>
               </div>
            ) : (
               <>
                 <HiCheckCircle size={80} color="var(--success)" style={{ margin: "0 auto 24px" }} />
                 <h2 style={{ fontSize: 26, fontWeight: 900 }}>THANH TOÁN XONG</h2>
                 <p style={{ fontSize: 22, fontWeight: 900, color: "var(--accent)", margin: "20px 0 40px", fontFamily: "monospace" }}>{orderSuccess.order_number}</p>
               </>
            )}
            <button onClick={() => { setOrderSuccess(null); setPaymentMethod("CASH"); }} className="btn-primary" style={{ width: "100%", padding: 18 }}>ĐƠN HÀNG MỚI</button>
          </div>
        </div>
      )}

      <style jsx>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
