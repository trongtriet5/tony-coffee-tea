"use client";
import { useState, useEffect, useMemo } from "react";
import { getProducts, getToppings, createOrder, getVoucherStatus } from "@/lib/api";
import type { Product, Topping, CartItem } from "@/types";
import { 
  HiShoppingCart, HiSearch, HiX, HiPlus, HiMinus, 
  HiCollection, HiTicket, HiCurrencyDollar, HiCheckCircle, HiChevronRight
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const categories = ["Tất cả", "Cà Phê", "Trà", "Sinh Tố", "Nước Ép", "Đồ Ăn", "Topping"];

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function POSPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedToppings, setSelectedToppings] = useState<Record<string, number>>({});
  const [itemNote, setItemNote] = useState("");

  const [paymentMethod, setPaymentMethod] = useState<"CASH" | "E_WALLET" | "VOUCHER" | "MIXED">("CASH");
  const [voucherCode, setVoucherCode] = useState("");
  const [appliedVouchers, setAppliedVouchers] = useState<any[]>([]);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    fetchData();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = async () => {
    try {
      const [p, t] = await Promise.all([getProducts(), getToppings()]);
      setProducts(p); setToppings(t);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const filteredProducts = useMemo(() => {
    let list: (Product | (Topping & { isToppingItem: true }))[] = [...products];
    if (activeCategory === "Topping") {
        list = toppings.map(t => ({ ...t, isToppingItem: true, name_vi: t.name, name_en: "Topping", category: "Topping" })) as any;
    } else if (activeCategory !== "Tất cả") {
        list = products.filter(p => p.category === activeCategory);
    }
    return list.filter(x => x.name_vi.toLowerCase().includes(search.toLowerCase()));
  }, [products, toppings, activeCategory, search]);

  const addToCart = (product: Product | any) => {
    if (product.isToppingItem || product.category === "Đồ Ăn") {
        // Direct add for food or standalone topping
        const existing = cart.find(i => i.product.id === product.id && (!i.selectedToppings || i.selectedToppings.length === 0));
        if (existing) {
            setCart(cart.map(i => i === existing ? { ...i, quantity: i.quantity + 1 } : i));
        } else {
            setCart([...cart, { product: product as Product, quantity: 1, selectedToppings: [] }]);
        }
    } else {
        setSelectedProduct(product as Product);
        setSelectedToppings({});
        setItemNote("");
    }
  };

  const confirmAddItem = () => {
    if (!selectedProduct) return;
    const finalToppings: any[] = [];
    Object.entries(selectedToppings).forEach(([id, qty]) => {
        const top = toppings.find(t => t.id === id);
        if (top && qty > 0) {
            // We'll repeat the topping entry for the backend or handle quantity?
            // Actually, we'll store them as an array of items for current simplicity or handle custom logic
            for (let i = 0; i < qty; i++) {
                finalToppings.push(top);
            }
        }
    });

    setCart([...cart, { product: selectedProduct, quantity: 1, selectedToppings: finalToppings, note: itemNote }]);
    setSelectedProduct(null);
  };

  const updateCartQty = (idx: number, delta: number) => {
    const newCart = [...cart];
    newCart[idx].quantity += delta;
    if (newCart[idx].quantity <= 0) newCart.splice(idx, 1);
    setCart(newCart);
  };

  const getItemSubtotal = (item: CartItem) => {
    const toppingPrice = (item.selectedToppings || []).reduce((sum, t) => sum + t.price, 0);
    return (item.product.price + toppingPrice) * item.quantity;
  };

  const subtotal = cart.reduce((sum, i) => sum + getItemSubtotal(i), 0);
  const discount = appliedVouchers.reduce((sum, v) => sum + v.amount, 0);
  const finalTotal = Math.max(0, subtotal - discount);

  const handleApplyVoucher = async () => {
    if (!voucherCode) return;
    try {
      const v = await getVoucherStatus(voucherCode.trim());
      if (appliedVouchers.find(x => x.voucher_code === v.voucher_code)) return;
      setAppliedVouchers([...appliedVouchers, v]);
      setVoucherCode("");
    } catch (err) { alert("Mã không hợp lệ"); }
  };

  const handleCheckout = async () => {
    if (cart.length === 0) return;
    setCheckoutLoading(true);
    try {
      await createOrder({
        items: cart.map(i => ({
          product_id: i.product.id,
          quantity: i.quantity,
          topping_ids: i.selectedToppings?.map(t => t.id) || []
        })),
        payment_method: paymentMethod,
        voucher_codes: appliedVouchers.map(v => v.voucher_code)
      });
      alert("Thanh toán thành công!");
      setCart([]); setAppliedVouchers([]);
    } catch (err) { alert("Lỗi đặt hàng"); } finally { setCheckoutLoading(false); }
  };

  if (loading) return (
     <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)" }}>
        <AiOutlineLoading3Quarters size={32} className="spin" color="var(--accent)" />
     </div>
  );

  return (
    <div style={{ display: "flex", height: "100vh", background: "var(--bg-primary)", paddingLeft: isMobile ? 0 : 80, overflow: "hidden" }}>
      {/* PRODUCTS AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 32, overflow: "hidden" }}>
        <header style={{ display: "flex", gap: 24, marginBottom: 32, alignItems: "center" }}>
          <div style={{ position: "relative", flex: 1 }}>
            <HiSearch size={22} style={{ position: "absolute", left: 18, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            <input type="text" placeholder="Tìm kiếm món ăn, thức uống..." value={search} onChange={(e) => setSearch(e.target.value)} style={{ width: "100%", padding: "18px 24px 18px 56px", borderRadius: 20, border: "1px solid var(--border)", background: "white", fontSize: 13, fontWeight: 700 }} />
          </div>
          <p style={{ fontWeight: 800, fontSize: 13, color: "var(--text-muted)" }}>{format(new Date(), "EEEE, dd/MM/yyyy")}</p>
        </header>

        <nav style={{ display: "flex", gap: 12, marginBottom: 32, overflowX: "auto", paddingBottom: 10 }}>
          {categories.map(c => (
            <button key={c} onClick={() => setActiveCategory(c)} style={{ padding: "14px 28px", borderRadius: 16, background: activeCategory === c ? "var(--gold-gradient)" : "white", color: activeCategory === c ? "white" : "var(--text-primary)", border: activeCategory === c ? "none" : "1px solid var(--border)", fontWeight: 800, whiteSpace: "nowrap", transition: "0.2s" }}>{c}</button>
          ))}
        </nav>

        <div style={{ flex: 1, overflowY: "auto", display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 24, paddingBottom: 40 }}>
          {filteredProducts.map((p: any) => (
            <div key={p.id} onClick={() => addToCart(p)} style={{ background: "white", borderRadius: 24, padding: 20, cursor: "pointer", border: "1px solid var(--border)", transition: "0.2s" }} className="product-card">
              <div style={{ background: "var(--bg-primary)", borderRadius: 18, height: 160, marginBottom: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 900, color: "var(--text-muted)" }}>{p.category}</p>
              </div>
              <h3 style={{ fontSize: 15, fontWeight: 900, marginBottom: 6 }}>{p.name_vi}</h3>
              <p style={{ fontSize: 16, fontWeight: 900, color: "var(--accent)" }}>{formatVND(p.price)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CHECKOUT AREA */}
      <div style={{ width: 480, background: "white", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", padding: "40px 32px" }}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
            <h2 style={{ fontSize: 24, fontWeight: 900, display: "flex", alignItems: "center", gap: 12 }}><HiShoppingCart /> Giỏ hàng</h2>
            <span style={{ padding: "6px 14px", background: "var(--bg-primary)", borderRadius: 10, fontSize: 12, fontWeight: 900 }}>{cart.length} MÓN</span>
         </div>

         <div style={{ flex: 1, overflowY: "auto", display: "flex", flexDirection: "column", gap: 24, marginBottom: 32 }}>
            {cart.map((item, idx) => (
               <div key={idx} style={{ display: "flex", gap: 18 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 14, background: "var(--bg-primary)", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                     <p style={{ fontSize: 14, fontWeight: 900 }}>{item.product.name_vi}</p>
                     {item.selectedToppings && item.selectedToppings.length > 0 && (
                        <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>+ {item.selectedToppings.map(t => t.name).join(", ")}</p>
                     )}
                     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 10 }}>
                        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                           <button onClick={() => updateCartQty(idx, -1)} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><HiMinus /></button>
                           <span style={{ fontWeight: 900, fontSize: 14 }}>{item.quantity}</span>
                           <button onClick={() => updateCartQty(idx, 1)} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center" }}><HiPlus /></button>
                        </div>
                        <p style={{ fontWeight: 900, fontSize: 14 }}>{formatVND(getItemSubtotal(item))}</p>
                     </div>
                  </div>
               </div>
            ))}
         </div>

         <div style={{ background: "var(--bg-primary)", borderRadius: 24, padding: 24, display: "flex", flexDirection: "column", gap: 20 }}>
            <div>
               <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
                  <input type="text" placeholder="Nhập mã voucher..." value={voucherCode} onChange={(e) => setVoucherCode(e.target.value)} style={{ flex: 1, background: "white", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontWeight: 700 }} />
                  <button onClick={handleApplyVoucher} style={{ padding: "0 20px", background: "var(--text-primary)", color: "white", borderRadius: 12, fontWeight: 900 }}>ÁP DỤNG</button>
               </div>
               {appliedVouchers.map((v, i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, color: "var(--success)", background: "white", padding: "10px 14px", borderRadius: 10, border: "1px solid var(--border)", marginBottom: 8 }}>
                     <span>Voucher: {v.voucher_code}</span>
                     <span>-{formatVND(v.amount)}</span>
                  </div>
               ))}
            </div>

            <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 12 }}>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: "var(--text-secondary)" }}><span>Tạm tính</span><span>{formatVND(subtotal)}</span></div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, fontWeight: 700, color: "var(--danger)" }}><span>Giảm giá</span><span>-{formatVND(discount)}</span></div>
               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 900, color: "var(--accent)", marginTop: 8 }}><span>Tổng cộng</span><span>{formatVND(finalTotal)}</span></div>
            </div>

            <button onClick={handleCheckout} disabled={checkoutLoading} className="btn-primary" style={{ height: 64, display: "flex", alignItems: "center", justifyContent: "center", gap: 12, borderRadius: 18 }}>
               {checkoutLoading ? <AiOutlineLoading3Quarters size={24} className="spin" /> : <><HiCheckCircle size={24} /> XÁC NHẬN THANH TOÁN</>}
            </button>
         </div>
      </div>

      {/* TOPPING ADD-ON MODAL */}
      {selectedProduct && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div style={{ background: "white", borderRadius: 32, width: "100%", maxWidth: 500, overflow: "hidden" }}>
             <div style={{ padding: 32, borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h3 style={{ fontSize: 20, fontWeight: 900 }}>Thêm sản phẩm</h3>
                <button onClick={() => setSelectedProduct(null)} style={{ border: "none", background: "none" }}><HiX size={24} /></button>
             </div>
             <div style={{ padding: 32, maxHeight: "60vh", overflowY: "auto" }}>
                <div style={{ display: "flex", gap: 20, marginBottom: 32 }}>
                   <div style={{ width: 100, height: 100, background: "var(--bg-primary)", borderRadius: 20 }} />
                   <div><h4 style={{ fontSize: 18, fontWeight: 900 }}>{selectedProduct.name_vi}</h4><p style={{ color: "var(--accent)", fontWeight: 900, marginTop: 4 }}>{formatVND(selectedProduct.price)}</p></div>
                </div>

                <p style={{ fontSize: 13, fontWeight: 900, marginBottom: 16 }}>CHỌN TOPPING (TÙY CHỈNH SL)</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                   {toppings.map(t => (
                      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 18px", background: "var(--bg-primary)", borderRadius: 16 }}>
                         <div><p style={{ fontSize: 14, fontWeight: 800 }}>{t.name}</p><p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>+{formatVND(t.price)}</p></div>
                         <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                            <button onClick={() => setSelectedToppings(prev => ({ ...prev, [t.id]: Math.max(0, (prev[t.id] || 0) - 1) }))} style={{ width: 28, height: 28, background: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid var(--border)" }}><HiMinus /></button>
                            <span style={{ fontWeight: 900 }}>{selectedToppings[t.id] || 0}</span>
                            <button onClick={() => setSelectedToppings(prev => ({ ...prev, [t.id]: (prev[t.id] || 0) + 1 }))} style={{ width: 28, height: 28, background: "var(--accent)", color: "white", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", border: "none" }}><HiPlus /></button>
                         </div>
                      </div>
                   ))}
                </div>
                
                <div style={{ marginTop: 32 }}>
                   <p style={{ fontSize: 13, fontWeight: 900, marginBottom: 12 }}>GHI CHÚ (NẾU CÓ)</p>
                   <textarea value={itemNote} onChange={(e) => setItemNote(e.target.value)} placeholder="Ít đường, nhiều đá..." style={{ width: "100%", height: 80, padding: 16, borderRadius: 16, border: "1px solid var(--border)", background: "var(--bg-primary)", resize: "none", fontWeight: 700 }} />
                </div>
             </div>
             <div style={{ padding: 32, borderTop: "1px solid var(--border)" }}>
                <button onClick={confirmAddItem} className="btn-primary" style={{ width: "100%", padding: 18, borderRadius: 16, fontSize: 15, fontWeight: 900 }}>XÁC NHẬN THÊM</button>
             </div>
          </div>
        </div>
      )}

      <style jsx>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } } .product-card:hover { transform: translateY(-4px); border-color: var(--accent); }`}</style>
    </div>
  );
}
