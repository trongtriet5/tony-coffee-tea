"use client";
import React, { useState, useEffect } from "react";
import { getTables, createTable, updateTable, deleteTable, getTableOccupancy, occupyTable, releaseTable, getOrder } from "@/lib/api";
import type { Table, Order } from "@/types";
import { HiPlus, HiCheck, HiOutlineDesktopComputer, HiBan, HiTrash, HiOutlineShoppingCart } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function TablesManagementPage() {
  const [tables, setTables] = useState<Table[]>([]);
  const [occupancyStats, setOccupancyStats] = useState<any>(null);

  const [selectedTable, setSelectedTable] = useState<Table | null>(null);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [orderLoading, setOrderLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const [showAddForm, setShowAddForm] = useState(false);
  const [tableName, setTableName] = useState('');
  const [tableCount, setTableCount] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const [tablesData, occupancy] = await Promise.all([
        getTables(),
        getTableOccupancy(),
      ]);
      setTables(tablesData);
      setOccupancyStats(occupancy);

      // Refresh selected table if it exists
      if (selectedTable) {
        const updated = tablesData.find(t => t.id === selectedTable.id);
        if (updated) {
          handleSelectTable(updated); // Re-fetch order if needed
        } else {
          setSelectedTable(null);
          setSelectedOrder(null);
        }
      }
    } catch (e) { console.error(e); }
    finally { setFetchLoading(false); }
  };

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleSelectTable = async (table: Table) => {
    setSelectedTable(table);
    setShowAddForm(false);

    if (table.current_order?.id) {
      setOrderLoading(true);
      try {
        const orderData = await getOrder(table.current_order.id);
        setSelectedOrder(orderData);
      } catch (e) {
        console.error("Failed to load order:", e);
        setSelectedOrder(null);
      } finally {
        setOrderLoading(false);
      }
    } else {
      setSelectedOrder(null);
    }
  };

  const handleAddTable = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (tableCount) {
        const count = parseInt(tableCount);
        for (let i = 1; i <= count; i++) {
          await createTable({ name: `Bàn ${i}` });
        }
        notify(`Đã tạo ${count} bàn mới!`);
      } else if (tableName) {
        await createTable({ name: tableName });
        notify(`Đã tạo bàn ${tableName}!`);
      }
      setTableName('');
      setTableCount('');
      setShowAddForm(false);
      fetchData();
    } catch (err) {
      alert("Lỗi khi thêm bàn");
    } finally { setLoading(false); }
  };

  const handleDeleteTable = async (id: string) => {
    if (!confirm('Bạn chắc chắn muốn xóa bàn này?')) return;
    setLoading(true);
    try {
      await deleteTable(id);
      notify("Đã xóa bàn");
      if (selectedTable?.id === id) {
        setSelectedTable(null);
        setSelectedOrder(null);
      }
      fetchData();
    } catch (err) {
      alert('Không thể xóa bàn (có thể do đang có hóa đơn)');
    } finally { setLoading(false); }
  };

  const handleOccupy = async (id: string) => {
    try {
      setLoading(true);
      await occupyTable(id);
      notify("Đã mở bàn");
      await fetchData();
    } catch (err) {
      alert('Lỗi mở bàn');
    } finally { setLoading(false); }
  };

  const handleRelease = async (id: string) => {
    // If releasing table with an order, realistically we'd redirect to checkout
    // But for now just call release API
    try {
      setLoading(true);
      await releaseTable(id);
      notify("Đã kết thúc sử dụng bàn");
      await fetchData();
    } catch (err) {
      alert('Lỗi kết thúc bàn');
    } finally { setLoading(false); }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none", transition: "0.2s", background: "var(--bg-primary)" };
  const labelStyle = { fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8, display: "block", letterSpacing: "0.5px" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px 40px 40px 120px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Quản lý bàn</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Theo dõi trạng thái và chi tiết hóa đơn</p>
          </div>
          <button onClick={() => { setShowAddForm(true); setSelectedTable(null); }} style={{ padding: "12px 24px", background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", transition: "0.2s" }} className="hover-btn">
            <HiPlus size={18} /> THÊM BÀN
          </button>
        </div>

        {/* NOTIFICATION */}
        <div style={{
          height: successMsg ? 50 : 0, opacity: successMsg ? 1 : 0, overflow: "hidden",
          transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)", marginBottom: successMsg ? 24 : 0,
          background: "var(--success)", color: "white", borderRadius: 16, display: "flex",
          alignItems: "center", padding: "0 20px", fontWeight: 800, fontSize: 13, gap: 10
        }}>
          <HiCheck size={18} /> {successMsg}
        </div>

        {/* STATS */}
        {occupancyStats && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 32 }}>
            <div style={{ background: "white", borderRadius: 20, padding: 24, border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8 }}>TỔNG BÀN</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: "var(--text-primary)" }}>{occupancyStats.total_tables}</p>
            </div>
            <div style={{ background: "white", borderRadius: 20, padding: 24, border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "var(--danger)", marginBottom: 8 }}>BÀN ĐANG SỬ DỤNG</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: "var(--danger)" }}>{occupancyStats.occupied_tables}</p>
            </div>
            <div style={{ background: "white", borderRadius: 20, padding: 24, border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "var(--success)", marginBottom: 8 }}>BÀN TRỐNG</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: "var(--success)" }}>{occupancyStats.available_tables}</p>
            </div>
            <div style={{ background: "white", borderRadius: 20, padding: 24, border: "1px solid var(--border)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
              <p style={{ fontSize: 12, fontWeight: 900, color: "var(--accent)", marginBottom: 8 }}>TỶ LỆ LẤP ĐẦY</p>
              <p style={{ fontSize: 24, fontWeight: 900, color: "var(--accent)" }}>{occupancyStats.occupancy_rate}</p>
            </div>
          </div>
        )}

        {/* MAIN SPLIT */}
        <div style={{ display: "grid", gridTemplateColumns: "7fr 4fr", gap: 32 }}>

          {/* LEFT: GRID OF TABLES */}
          <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)", minHeight: "60vh" }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, display: "flex", alignItems: "center", gap: 8 }}>
              SƠ ĐỒ BÀN {fetchLoading && <AiOutlineLoading3Quarters className="spin" size={16} color="var(--accent)" />}
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 16 }}>
              {tables.map(table => {
                const isSelected = selectedTable?.id === table.id;
                const isAvail = table.status === 'AVAILABLE';
                return (
                  <div key={table.id} onClick={() => handleSelectTable(table)} className="table-card" style={{
                    padding: 16, borderRadius: 16, cursor: "pointer", transition: "0.2s",
                    background: isSelected ? (isAvail ? "#e6f4ea" : "#fce8e8") : "var(--bg-primary)",
                    border: `2px solid ${isSelected ? (isAvail ? "var(--success)" : "var(--danger)") : "transparent"}`,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                      <HiOutlineDesktopComputer size={24} color={isAvail ? "var(--success)" : "var(--danger)"} />
                      {table.current_order && (
                        <div style={{ width: 8, height: 8, background: "var(--danger)", borderRadius: "50%" }} />
                      )}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>{table.name}</p>
                    <p style={{ fontSize: 11, fontWeight: 800, color: isAvail ? "var(--success)" : "var(--danger)" }}>
                      {isAvail ? "Bàn trống" : "Đang dùng"}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT: DETAILS PANEL */}
          <div style={{ position: "sticky", top: 40, alignSelf: "start" }}>
            {showAddForm ? (
              <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  THÊM BÀN MỚI
                  <button onClick={() => setShowAddForm(false)} style={{ background: "transparent", color: "var(--text-muted)", fontSize: 11, border: "none", fontWeight: 800, cursor: "pointer" }}>HỦY</button>
                </h3>
                <form onSubmit={handleAddTable} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                  <div>
                    <label style={labelStyle}>TÊN BÀN CỤ THỂ</label>
                    <input
                      placeholder="vd: Bàn A1" style={inputStyle} value={tableName}
                      onChange={e => { setTableName(e.target.value); if (e.target.value) setTableCount(''); }}
                    />
                  </div>
                  <div style={{ textAlign: "center", fontSize: 12, fontWeight: 700, color: "var(--text-muted)" }}>HOẶC TẠO NHIỀU BÀN CÙNG LÚC</div>
                  <div>
                    <label style={labelStyle}>SỐ LƯỢNG BÀN CẦN TẠO</label>
                    <input
                      type="number" min="1" max="100" placeholder="vd: 10" style={inputStyle} value={tableCount}
                      onChange={e => { setTableCount(e.target.value); if (e.target.value) setTableName(''); }}
                    />
                    <p style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 8, fontWeight: 700 }}>Sẽ tự động tạo: Bàn 1, Bàn 2...</p>
                  </div>
                  <button disabled={loading || (!tableName && !tableCount)} type="submit" style={{ width: "100%", padding: 16, background: "var(--accent)", color: "white", border: "none", borderRadius: 14, fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", transition: "0.2s", marginTop: 12 }} className="hover-btn">
                    {loading ? <AiOutlineLoading3Quarters size={18} className="spin" /> : <><HiPlus size={18} /> THÊM NGAY</>}
                  </button>
                </form>
              </div>
            ) : selectedTable ? (
              <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)", display: "flex", flexDirection: "column", gap: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <h3 style={{ fontSize: 24, fontWeight: 900 }}>{selectedTable.name}</h3>
                    <p style={{ fontSize: 12, fontWeight: 800, color: selectedTable.status === "AVAILABLE" ? "var(--success)" : "var(--danger)", marginTop: 4 }}>
                      {selectedTable.status === "AVAILABLE" ? "Đang trống" : "Đang được sử dụng"}
                    </p>
                  </div>
                  <button onClick={() => handleDeleteTable(selectedTable.id)} style={{ padding: 8, background: "var(--bg-primary)", color: "var(--danger)", borderRadius: 10, border: "none", cursor: "pointer", display: "flex", alignItems: "center" }} title="Xóa bàn này">
                    <HiTrash size={18} />
                  </button>
                </div>

                <div style={{ height: 1, background: "var(--border)" }} />

                {selectedTable.status === "OCCUPIED" ? (
                  <div>
                    {orderLoading ? (
                      <div style={{ display: "flex", justifyContent: "center", padding: 40 }}><AiOutlineLoading3Quarters className="spin" size={24} color="var(--accent)" /></div>
                    ) : selectedOrder ? (
                      <div>
                        <div style={{ marginBottom: 16 }}>
                          <p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 4 }}>MÃ HÓA ĐƠN</p>
                          <p style={{ fontSize: 14, fontWeight: 900 }}>{selectedOrder.order_number}</p>
                        </div>

                        <div style={{ marginBottom: 24 }}>
                          <p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 12, display: "flex", alignItems: "center", gap: 6 }}><HiOutlineShoppingCart size={16} /> CHI TIẾT MÓN</p>
                          <div style={{ display: "flex", flexDirection: "column", gap: 12, maxHeight: "30vh", overflowY: "auto", paddingRight: 8 }} className="custom-scroll">
                            {selectedOrder.items?.map(item => (
                              <div key={item.id} style={{ background: "var(--bg-primary)", padding: 12, borderRadius: 12 }}>
                                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                                  <p style={{ fontSize: 13, fontWeight: 800 }}>{item.quantity} x {item.product?.name_vi || 'Món'}</p>
                                  <p style={{ fontSize: 13, fontWeight: 900, color: "var(--accent)" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(item.subtotal)}</p>
                                </div>
                                {item.toppings && item.toppings.length > 0 && (
                                  <div style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 700, paddingLeft: 8 }}>
                                    + Topping: {item.toppings.map((t: any) => t.topping?.name || t.name).filter(Boolean).join(', ')}
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, padding: "16px 0", borderTop: "1px dashed var(--border)" }}>
                          <p style={{ fontSize: 12, fontWeight: 900, color: "var(--text-muted)" }}>TỔNG THANH TOÁN</p>
                          <p style={{ fontSize: 20, fontWeight: 900, color: "var(--accent)" }}>{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(selectedOrder.final_amount)}</p>
                        </div>

                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={() => alert("Điều hướng tới trang thanh toán để in bill (Tương lai)")} style={{ flex: 1, padding: 12, background: "var(--bg-primary)", color: "var(--text-primary)", border: "1px solid var(--border)", borderRadius: 12, fontSize: 12, fontWeight: 800, cursor: "pointer", transition: "0.2s" }} className="hover-btn">
                            IN TẠM TÍNH
                          </button>
                          <button onClick={() => {
                            window.location.href = `/?tableId=${selectedTable.id}&orderId=${selectedOrder.id}`;
                          }} style={{ flex: 1, padding: 12, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 12, fontWeight: 800, cursor: "pointer" }} className="hover-btn">
                            GỌI THÊM
                          </button>
                          <button onClick={() => handleRelease(selectedTable.id)} disabled={loading} style={{ flex: 1, padding: 12, background: "var(--success)", color: "white", border: "none", borderRadius: 12, fontSize: 12, fontWeight: 800, cursor: "pointer", transition: "0.2s" }} className="hover-btn">
                            HỦY / RỜI ĐI
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700, textAlign: "center", padding: 20 }}>Bàn đang bận nhưng không có đơn hàng chưa thanh toán.</p>
                        <button onClick={() => handleRelease(selectedTable.id)} disabled={loading} style={{ width: "100%", padding: 14, background: "var(--danger)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: "pointer" }} className="hover-btn">
                          GIẢI PHÓNG BÀN (DỌN DẸP XONG)
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px 0", gap: 16 }}>
                    <div style={{ width: 64, height: 64, background: "var(--bg-primary)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <HiOutlineDesktopComputer size={32} color="var(--success)" />
                    </div>
                    <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700, textAlign: "center" }}>Bàn đang trống, có thể sắp xếp khách vào.</p>
                    <button onClick={() => handleOccupy(selectedTable.id)} disabled={loading} style={{ padding: "12px 32px", background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 800, cursor: "pointer", transition: "0.2s", marginTop: 8 }} className="hover-btn">
                      MỞ BÀN (KHÁCH VÀO)
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: "white", borderRadius: 24, border: "1px dashed var(--border)", padding: 40, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--text-muted)", height: "400px" }}>
                <HiOutlineDesktopComputer size={48} style={{ marginBottom: 16, opacity: 0.5 }} />
                <p style={{ fontSize: 14, fontWeight: 800 }}>Chưa chọn bàn nào</p>
                <p style={{ fontSize: 12, fontWeight: 700, marginTop: 8, opacity: 0.7 }}>Click vào một bàn bên trái để xem chi tiết hoặc hóa đơn đang dùng.</p>
              </div>
            )}
          </div>

        </div>

      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .hover-btn:hover { filter: brightness(1.1); transform: translateY(-2px); box-shadow: 0 10px 20px rgba(202, 162, 26, 0.2); }
        .hover-btn:active { transform: translateY(0); }
        .table-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.04); }
        input:focus { border-color: var(--accent) !important; box-shadow: 0 0 0 3px rgba(202, 162, 26, 0.1); }
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-track { background: transparent; }
        .custom-scroll::-webkit-scrollbar-thumb { background: #e5e7eb; border-radius: 10px; }
        .custom-scroll::-webkit-scrollbar-thumb:hover { background: #d1d5db; }
      `}</style>
    </div>
  );
}
