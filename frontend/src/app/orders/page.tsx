"use client";
import { useState, useEffect } from "react";
import { getOrders } from "@/lib/api";
import type { Order, PaginatedResponse } from "@/types";
import {
   HiClock, HiSearch, HiOutlineReceiptTax, HiDownload,
   HiChevronRight, HiEye, HiX, HiCreditCard, HiTicket, HiTemplate,
   HiChevronLeft
} from "react-icons/hi";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import * as XLSX from "xlsx";

const formatVND = (n: number) =>
   new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function OrdersPage() {
   const [orders, setOrders] = useState<Order[]>([]);
   const [loading, setLoading] = useState(true);
   const [total, setTotal] = useState(0);
   const [isMobile, setIsMobile] = useState(false);
   const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

   // Pagination & Search States
   const [search, setSearch] = useState("");
   const [page, setPage] = useState(1);
   const [limit, setLimit] = useState(20);
   const [totalPages, setTotalPages] = useState(0);

   useEffect(() => {
      const checkMobile = () => setIsMobile(window.innerWidth < 1024);
      checkMobile();
      window.addEventListener("resize", checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
   }, []);

   // UseEffect for dynamic search and pagination
   useEffect(() => {
      fetchData();
   }, [search, page, limit]);

   const fetchData = async () => {
      setLoading(true);
      try {
         const res = await getOrders({ page, limit, search });
         setOrders((res as any).data || []);
         setTotal((res as any).total || 0);
         setTotalPages((res as any).totalPages || 0);
      } catch (err) {
         console.error(err);
         setOrders([]);
      } finally {
         setLoading(false);
      }
   };

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1); // Reset to first page on new search
   };

   const handlePageChange = (newPage: number) => {
      if (newPage >= 1 && newPage <= totalPages) {
         setPage(newPage);
      }
   };

   const formatExactDBTime = (ds: string | Date, pat: string) => {
      const d = new Date(ds);
      return format(new Date(d.getTime() + d.getTimezoneOffset() * 60000), pat);
   };

   const handleExportExcel = async () => {
      try {
         const res = await getOrders({ page: 1, limit: 10000, search });
         const allOrders = (res as any).data || [];
         
         const headers = ["MÃ ĐƠN HÀNG", "THỜI GIAN", "TỔNG SỐ MÓN", "CHI TIẾT MÓN", "GIẢM GIÁ (VND)", "TỔNG THANH TOÁN (VND)", "TRẠNG THÁI"];
         
         const rows = allOrders.map((o: any) => {
            const itemsStr = (o.items || []).map((i: any) => `${i.quantity}x ${i.product?.name_vi || 'Món'}`).join('; ');
            return [
               o.order_number,
               formatExactDBTime(o.created_at, "HH:mm dd/MM/yyyy"),
               o.items?.reduce((s: number, i: any) => s + i.quantity, 0) || 0,
               itemsStr,
               o.discount_amount,
               o.final_amount,
               "HOÀN TẤT"
            ];
         });

         const worksheetData = [headers, ...rows];
         const ws = XLSX.utils.aoa_to_sheet(worksheetData);
         const wb = XLSX.utils.book_new();
         XLSX.utils.book_append_sheet(wb, ws, "Orders");
         XLSX.writeFile(wb, `LichSuDonHang_${format(new Date(), "ddMMyyyy")}.xlsx`);
      } catch (err) {
         console.error("Export error", err);
         alert("Có lỗi xảy ra khi xuất dữ liệu.");
      }
   };

   return (
      <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px", paddingLeft: isMobile ? "24px" : "120px" }}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
            <div>
               <h1 style={{ fontSize: 32, fontWeight: 900 }}>Order History</h1>
               <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Theo dõi lịch sử giao dịch chuỗi TTVH POS</p>
            </div>
            <div style={{ display: "flex", gap: 16 }}>
               <div style={{ position: "relative", width: 280 }}>
                  <HiSearch size={20} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
                  <input
                     type="text"
                     placeholder="Tìm mã đơn hàng..."
                     value={search}
                     onChange={handleSearchChange}
                     style={{ width: "100%", padding: "14px 16px 14px 48px", borderRadius: 14, border: "1px solid var(--border)", background: "white", fontSize: 13, fontWeight: 600 }}
                  />
               </div>
               <button onClick={handleExportExcel} style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 24px", borderRadius: 14, background: "white", border: "1px solid var(--border)", color: "var(--text-primary)", fontWeight: 800, cursor: "pointer" }}>
                  <HiDownload size={20} /> XUẤT EXCEL
               </button>
            </div>
         </div>

         <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* PAGINATION HEADER */}
            <div style={{ padding: "16px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "var(--bg-primary)" }}>
               <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>
                     Hiển thị <span style={{ color: "var(--text-primary)" }}>{orders.length}</span> trên <span style={{ color: "var(--text-primary)" }}>{total}</span> kết quả
                  </p>
                  <select
                     value={limit}
                     onChange={(e) => { setLimit(Number(e.target.value)); setPage(1); }}
                     style={{ padding: "6px 10px", borderRadius: 8, border: "1px solid var(--border)", fontSize: 12, fontWeight: 800, outline: "none", cursor: "pointer", background: "white" }}
                  >
                     <option value={10}>10 bản ghi</option>
                     <option value={20}>20 bản ghi</option>
                     <option value={50}>50 bản ghi</option>
                  </select>
               </div>

               <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button
                     onClick={() => handlePageChange(page - 1)}
                     disabled={page === 1}
                     style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: page === 1 ? "default" : "pointer", opacity: page === 1 ? 0.5 : 1 }}
                  >
                     <HiChevronLeft size={18} />
                  </button>

                  <div style={{ display: "flex", gap: 6 }}>
                     {[...Array(totalPages)].map((_, i) => {
                        const p = i + 1;
                        if (totalPages <= 7 || p === 1 || p === totalPages || Math.abs(p - page) <= 1) {
                           return (
                              <button
                                 key={p}
                                 onClick={() => setPage(p)}
                                 style={{ minWidth: 32, height: 32, padding: "0 6px", borderRadius: 8, border: "1px solid var(--border)", background: page === p ? "var(--gold-gradient)" : "white", color: page === p ? "white" : "var(--text-primary)", fontWeight: 800, fontSize: 12, cursor: "pointer" }}
                              >
                                 {p}
                              </button>
                           );
                        }
                        if (p === 2 || p === totalPages - 1) return <span key={p} style={{ color: "var(--text-muted)", fontSize: 12 }}>...</span>;
                        return null;
                     })}
                  </div>

                  <button
                     onClick={() => handlePageChange(page + 1)}
                     disabled={page === totalPages || totalPages === 0}
                     style={{ width: 32, height: 32, borderRadius: 8, border: "1px solid var(--border)", background: "white", display: "flex", alignItems: "center", justifyContent: "center", cursor: (page === totalPages || totalPages === 0) ? "default" : "pointer", opacity: (page === totalPages || totalPages === 0) ? 0.5 : 1 }}
                  >
                     <HiChevronRight size={18} />
                  </button>
               </div>
            </div>

            <div style={{ flex: 1, overflowX: "auto" }}>
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
                  <tbody style={{ position: "relative" }}>
                     {loading && (
                        <tr style={{ position: "absolute", inset: 0, background: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 10 }}>
                           <td colSpan={7} style={{ textAlign: "center", padding: 40 }}>
                              <div className="spin" style={{ width: 24, height: 24, border: "2px solid var(--accent)", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto" }} />
                           </td>
                        </tr>
                     )}
                     {orders.map((order) => (
                        <tr key={order.id} style={{ borderBottom: "1px solid var(--border-light)", cursor: "pointer" }} onClick={() => setSelectedOrder(order)}>
                           <td style={{ padding: "20px 24px", fontWeight: 800, fontSize: 14 }}>{order.order_number}</td>
                           <td style={{ padding: "20px 24px", fontSize: 13, color: "var(--text-secondary)", fontWeight: 600 }}>{formatExactDBTime(order.created_at, "HH:mm • dd/MM")}</td>
                           <td style={{ padding: "20px 24px", fontSize: 13, fontWeight: 700 }}>{order.items?.length || 0} món</td>
                           <td style={{ padding: "20px 24px", fontSize: 13, fontWeight: 700, color: "var(--danger)" }}>-{formatVND(order.discount_amount)}</td>
                           <td style={{ padding: "20px 24px", fontWeight: 800, fontSize: 15, color: "var(--text-primary)" }}>{formatVND(order.final_amount)}</td>
                           <td style={{ padding: "20px 24px" }}>
                              <span className="badge badge-success" style={{ fontSize: 10 }}>HOÀN TẤT</span>
                           </td>
                           <td style={{ padding: "20px 24px", textAlign: "right", color: "var(--text-muted)" }}><HiEye size={20} /></td>
                        </tr>
                     ))}
                     {!loading && orders.length === 0 && (
                        <tr>
                           <td colSpan={7} style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontWeight: 700 }}>Không tìm thấy đơn hàng nào</td>
                        </tr>
                     )}
                  </tbody>
               </table>
            </div>
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
