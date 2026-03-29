"use client";
import { useState, useEffect } from "react";
import { getOrders } from "@/lib/api";
import type { Order, PaginatedResponse } from "@/types";
import { 
  HiClock, HiSearch, HiOutlineReceiptTax, HiDownload, 
  HiChevronRight, HiEye, HiX, HiCreditCard, HiTicket, HiTemplate
} from "react-icons/hi";
import { format } from "date-fns";
import { vi } from "date-fns/locale";

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    fetchData();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = async () => {
    try {
      const res = await getOrders({ limit: 20 });
      setOrders((res as any).data);
      setTotal((res as any).total);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px", paddingLeft: isMobile ? "24px" : "120px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
           <h1 style={{ fontSize: 32, fontWeight: 900 }}>Order History</h1>
           <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Theo dõi lịch sử giao dịch chuỗi TTVH POS GOLD</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
           <div style={{ position: "relative", width: 280 }}>
              <HiSearch size={20} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
              <input type="text" placeholder="Tìm mã đơn hàng..." style={{ width: "100%", padding: "14px 16px 14px 48px", borderRadius: 14, border: "1px solid var(--border)", background: "white", fontSize: 13, fontWeight: 600 }} />
           </div>
           <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 14, background: "white", border: "1px solid var(--border)", color: "var(--text-primary)", fontWeight: 800 }}>
              <HiDownload size={20} /> XUẤT EXCEL
           </button>
        </div>
      </div>

      <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", overflow: "hidden" }}>
         <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
               <tr style={{ textAlign: "left", background: "var(--bg-primary)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>MÃ ĐƠN HÀNG</th>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>THỜI GIAN</th>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>SẢN PHẨM</th>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>GIẢM GIÁ</th>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>THANH TOÁN</th>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>TRẠNG THÁI</th>
                  <th style={{ padding: "20px 24px", fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}></th>
               </tr>
            </thead>
            <tbody>
               {orders.map((order) => (
                  <tr key={order.id} style={{ borderBottom: "1px solid var(--border-light)", cursor: "pointer" }} onClick={() => setSelectedOrder(order)}>
                     <td style={{ padding: "20px 24px", fontWeight: 800, fontSize: 14 }}>{order.order_number}</td>
                     <td style={{ padding: "20px 24px", fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>{format(new Date(order.created_at), "HH:mm • dd/MM")}</td>
                     <td style={{ padding: "20px 24px", fontSize: 13, fontWeight: 700 }}>{order.items?.length || 0} món</td>
                     <td style={{ padding: "20px 24px", fontSize: 13, fontWeight: 700, color: "var(--danger)" }}>-{formatVND(order.discount_amount)}</td>
                     <td style={{ padding: "20px 24px", fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>{formatVND(order.final_amount)}</td>
                     <td style={{ padding: "20px 24px" }}>
                        <span className="badge badge-success" style={{ fontSize: 10 }}>HOÀN TẤT</span>
                     </td>
                     <td style={{ padding: "20px 24px", textAlign: "right", color: "var(--text-muted)" }}><HiEye size={20} /></td>
                  </tr>
               ))}
            </tbody>
         </table>
      </div>

      {/* ORDER DETAILS MODAL */}
      {selectedOrder && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", zIndex: 2000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
           <div style={{ background: "white", borderRadius: 32, width: "100%", maxWidth: 500, overflow: "hidden", display: "flex", flexDirection: "column" }} className="animate-fade-in">
              <div style={{ padding: "32px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                 <div>
                    <h3 style={{ fontSize: 18, fontWeight: 900 }}>Chi tiết đơn hàng</h3>
                    <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>{selectedOrder.order_number}</p>
                 </div>
                 <button onClick={() => setSelectedOrder(null)} style={{ width: 40, height: 40, borderRadius: "50%", border: "1px solid var(--border)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                    <HiX size={20} />
                 </button>
              </div>

              <div style={{ padding: 32, flex: 1, overflowY: "auto", maxHeight: "60vh" }}>
                 <div style={{ marginBottom: 32 }}>
                    <p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 16 }}>SẢN PHẨM ĐÃ CHỌN</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                       {selectedOrder.items.map((item, i) => (
                          <div key={i} style={{ display: "flex", justifyContent: "space-between" }}>
                             <div style={{ flex: 1 }}>
                                <div style={{ display: "flex", gap: 12 }}>
                                   <span style={{ fontWeight: 900, fontSize: 14, color: "var(--accent)" }}>{item.quantity}x</span>
                                   <div>
                                      <p style={{ fontWeight: 800, fontSize: 14 }}>{(item as any).product?.name_vi || "Món hỉ"}</p>
                                      {item.toppings && item.toppings.length > 0 && (
                                         <p style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>
                                            + {item.toppings.map(t => t.name).join(", ")}
                                         </p>
                                      )}
                                   </div>
                                </div>
                             </div>
                             <span style={{ fontWeight: 800, fontSize: 14 }}>{formatVND(item.subtotal)}</span>
                          </div>
                       ))}
                    </div>
                 </div>

                 <div style={{ background: "var(--bg-primary)", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>
                          <HiCreditCard size={18} /> Phương thức
                       </div>
                       <span style={{ fontWeight: 800, fontSize: 13 }}>{selectedOrder.payment_method}</span>
                    </div>

                    <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 14 }}>
                       <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                          <span style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Tạm tính</span>
                          <span style={{ fontWeight: 700, fontSize: 14 }}>{formatVND(selectedOrder.total_amount)}</span>
                       </div>
                       <div style={{ display: "flex", justifyContent: "space-between", color: "var(--danger)" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 700 }}>
                             <HiTicket size={18} /> Giảm giá
                          </div>
                          <span style={{ fontWeight: 800, fontSize: 14 }}>-{formatVND(selectedOrder.discount_amount)}</span>
                       </div>
                    </div>

                    <div style={{ borderTop: "2px solid var(--border)", paddingTop: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                       <span style={{ fontWeight: 900, fontSize: 15 }}>Tổng thanh toán</span>
                       <span style={{ fontWeight: 900, fontSize: 22, color: "var(--accent)" }}>{formatVND(selectedOrder.final_amount)}</span>
                    </div>
                 </div>
              </div>

              <div style={{ padding: 32, borderTop: "1px solid var(--border)" }}>
                 <button className="btn-primary" style={{ width: "100%", padding: 18, borderRadius: 16 }}>IN LẠI HÓA ĐƠN</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
