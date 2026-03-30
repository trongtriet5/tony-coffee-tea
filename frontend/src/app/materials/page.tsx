"use client";
import React, { useState, useEffect } from "react";
import { Material, MaterialTransaction } from "@/types";
import { getMaterials, createMaterial, addMaterialTransaction, getMaterialTransactions, getInventoryReport, updateMaterial, deleteMaterial } from "@/lib/api";
import { HiPlus, HiBeaker, HiExclamationCircle, HiCheck, HiPencilAlt, HiBadgeCheck, HiBan, HiTrash, HiDownload, HiSearch, HiPlusCircle } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MaterialsPage() {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [transactions, setTransactions] = useState<MaterialTransaction[]>([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materialForm, setMaterialForm] = useState({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });

  const [editingTransactionId, setEditingTransactionId] = useState<string | null>(null);
  const [transactionForm, setTransactionForm] = useState({ type: "IN" as const, quantity: "", note: "" });

  const [reportDateRange, setReportDateRange] = useState({ startDate: "", endDate: "" });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const data = await getMaterials();
      setMaterials(data);
    } catch (e) { console.error(e); }
    finally { setFetchLoading(false); }
  };

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const handleCreateOrUpdateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialForm.name || !materialForm.unit || !materialForm.cost_per_unit) return;
    setLoading(true);
    try {
      const payload = {
        name: materialForm.name,
        unit: materialForm.unit,
        cost_per_unit: parseFloat(materialForm.cost_per_unit),
        initial_stock: materialForm.initial_stock ? parseFloat(materialForm.initial_stock) : 0,
      };

      if (editingMaterialId) {
        await updateMaterial(editingMaterialId, payload);
        notify("Cập nhật nguyên liệu thành công!");
      } else {
        await createMaterial(payload);
        notify("Đã thêm nguyên liệu mới thành công!");
      }

      setMaterialForm({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });
      setEditingMaterialId(null);
      fetchData();
    } catch (error) {
      alert("Có lỗi xảy ra khi xử lý nguyên liệu");
    } finally { setLoading(false); }
  };

  const handleAddTransaction = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMaterialId || !transactionForm.quantity) return;
    setLoading(true);
    try {
      await addMaterialTransaction({
        material_id: selectedMaterialId,
        type: transactionForm.type,
        quantity: parseFloat(transactionForm.quantity),
        note: transactionForm.note,
      });
      notify("Ghi nhận giao dịch thành công!");
      setTransactionForm({ type: "IN", quantity: "", note: "" });
      loadTransactions(selectedMaterialId);
      fetchData();
    } catch (error) {
      alert("Có lỗi xảy ra khi ghi nhận giao dịch");
    } finally { setLoading(false); }
  };

  const startEditMaterial = (m: Material) => {
    setEditingMaterialId(m.id);
    setMaterialForm({ name: m.name, unit: m.unit, cost_per_unit: m.cost_per_unit.toString(), initial_stock: "" });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loadTransactions = async (materialId: string) => {
    try {
      const data = await getMaterialTransactions(materialId);
      setTransactions(data);
      setSelectedMaterialId(materialId);
    } catch (err) { console.error(err); }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa nguyên liệu này?")) return;
    try {
      setLoading(true);
      await deleteMaterial(id);
      notify("Xóa nguyên liệu thành công!");
      fetchData();
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa nguyên liệu");
    } finally { setLoading(false); }
  };

  const handleExportReport = async () => {
    try {
      const report = await getInventoryReport({
        startDate: reportDateRange.startDate,
        endDate: reportDateRange.endDate,
      });
      const csv = [
        ["Tên", "Đơn vị", "Giá/Đơn vị", "Nhập", "Xuất", "Sử dụng", "Điều chỉnh", "Tồn kho", "Giá trị"].join(","),
        ...report.materials.map((m: any) => [m.name, m.unit, m.cost_per_unit, m.in, m.out, m.used, m.adjust, m.current_stock, m.stock_value].join(",")),
        ["", "", "", "", "", "", "", "", ""],
        ["TỔNG CỘNG", "", "", "", "", "", "", report.summary.total_materials, report.summary.total_stock_value].join(","),
      ].join("\n");
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `inventory-${new Date().toISOString().split("T")[0]}.csv`;
      a.click();
      notify("Xuất báo cáo thành công!");
    } catch (err) { alert("Lỗi xuất báo cáo"); }
  };

  const cancelEdit = () => {
    setEditingMaterialId(null);
    setMaterialForm({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none", transition: "0.2s", background: "white" };
  const labelStyle = { fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8, display: "block", letterSpacing: "0.5px" };

  const [searchQuery, setSearchQuery] = useState("");
  const filteredMaterials = (materials || []).filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px 40px 40px 100px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Quản lý <span style={{ color: "var(--accent)" }}>Nguyên Liệu</span></h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>TTVH POS • Kiểm soát tồn kho và chi phí vận hành</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <div style={{ position: "relative" }}>
               <input 
                 type="text" 
                 placeholder="Tìm nguyên liệu..." 
                 value={searchQuery}
                 onChange={e => setSearchQuery(e.target.value)}
                 style={{ ...inputStyle, width: 240, paddingLeft: 40 }} 
               />
               <HiSearch size={18} style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }} />
            </div>
            <button onClick={handleExportReport} className="btn-primary" style={{ display: "flex", gap: 8, padding: "12px 20px" }}>
              <HiDownload size={18} /> BÁO CÁO CSV
            </button>
          </div>
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32, alignItems: "start" }}>

          {/* LEFT: FORM SECTION */}
          <div className="card" style={{ padding: 32, position: "sticky", top: 40 }}>
            <h3 style={{ fontSize: 16, fontWeight: 900, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              {editingMaterialId ? "📌 CẬP NHẬT" : "✨ THÊM MỚI"}
              {editingMaterialId && (
                <button onClick={cancelEdit} style={{ background: "var(--bg-primary)", color: "var(--text-muted)", fontSize: 11, border: "none", padding: "6px 12px", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>HỦY</button>
              )}
            </h3>

            <form onSubmit={handleCreateOrUpdateMaterial}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
                <div>
                  <label style={labelStyle}>TÊN NGUYÊN LIỆU</label>
                  <input required placeholder="VD: Sữa đặc Larosee" style={inputStyle} value={materialForm.name} onChange={e => setMaterialForm({...materialForm, name: e.target.value})} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>ĐƠN VỊ</label>
                    <input required placeholder="VD: kg, g, ml" style={inputStyle} value={materialForm.unit} onChange={e => setMaterialForm({...materialForm, unit: e.target.value})} />
                  </div>
                  <div>
                    <label style={labelStyle}>GIÁ ĐƠN VỊ</label>
                    <input required type="number" step="0.1" placeholder="VD: 55000" style={inputStyle} value={materialForm.cost_per_unit} onChange={e => setMaterialForm({...materialForm, cost_per_unit: e.target.value})} />
                  </div>
                </div>
                {!editingMaterialId && (
                  <div>
                    <label style={labelStyle}>TỒN ĐẦU KỲ</label>
                    <input type="number" step="0.1" placeholder="VD: 100" style={inputStyle} value={materialForm.initial_stock} onChange={e => setMaterialForm({...materialForm, initial_stock: e.target.value})} />
                  </div>
                )}
              </div>

              <button disabled={loading} type="submit" className="btn-primary" style={{ width: "100%", padding: 16, fontSize: 13, display: "flex", gap: 8, alignItems: "center", justifyContent: "center" }}>
                {loading ? <AiOutlineLoading3Quarters size={18} className="spin" /> : editingMaterialId ? <><HiBadgeCheck size={18}/> XÁC NHẬN SỬA</> : <><HiPlusCircle size={18}/> THÊM VÀO KHO</>}
              </button>
            </form>
          </div>

          {/* RIGHT: LIST SECTION */}
          <div className="card" style={{ padding: 0, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 600 }}>
            <div style={{ padding: "24px 32px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#fafafa" }}>
              <h3 style={{ fontSize: 16, fontWeight: 900 }}>Danh sách nguyên liệu ({filteredMaterials.length})</h3>
              <div style={{ display: "flex", gap: 16 }}>
                 <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, color: "var(--text-muted)" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--success)" }}></div> Bình thường
                 </div>
                 <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 800, color: "var(--text-muted)" }}>
                    <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--danger)" }}></div> Sắp hết hàng
                 </div>
              </div>
            </div>

            {fetchLoading ? (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><AiOutlineLoading3Quarters size={32} className="spin" color="var(--accent)" /></div>
            ) : (
              <div style={{ flex: 1, overflowY: "auto", padding: 16 }} className="custom-scroll">
                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 10 }}>
                  {filteredMaterials.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 40, color: "var(--text-muted)" }}>Không tìm thấy nguyên liệu nào...</div>
                  ) : filteredMaterials.map(m => {
                    const isLow = m.stock_current < 10; // Threshold for low stock
                    return (
                      <div key={m.id} onClick={() => loadTransactions(m.id)} style={{ padding: "16px 20px", borderRadius: 16, background: selectedMaterialId === m.id ? "var(--accent-light)" : "white", border: "1px solid", borderColor: selectedMaterialId === m.id ? "var(--accent)" : "var(--border-light)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "0.2s" }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 900 }}>{m.name}</span>
                            <span className="badge" style={{ background: "var(--bg-primary)", color: "var(--text-muted)", fontSize: 10 }}>{m.unit}</span>
                            {isLow && <span className="badge badge-danger" style={{ fontSize: 9 }}>SẮP HẾT</span>}
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, display: "flex", gap: 16 }}>
                            <span style={{ color: isLow ? "var(--danger)" : "inherit" }}>Tồn: {m.stock_current.toLocaleString()}</span>
                            <span>Giá: ₫{m.cost_per_unit.toLocaleString("vi-VN")}</span>
                            <span style={{ fontWeight: 900, color: "var(--text-primary)" }}>₫{m.stock_value.toLocaleString("vi-VN")}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 4 }}>
                          <button onClick={(e) => { e.stopPropagation(); startEditMaterial(m); }} style={{ width: 34, height: 34, borderRadius: 10, background: "white", border: "1px solid var(--border)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }} title="Sửa"><HiPencilAlt size={16}/></button>
                          <button onClick={(e) => { e.stopPropagation(); handleDeleteMaterial(m.id); }} style={{ width: 34, height: 34, borderRadius: 10, background: "white", border: "1px solid var(--border)", color: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center" }} title="Xóa"><HiTrash size={16}/></button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* TRANSACTION SECTION */}
        {selectedMaterialId && (
          <div className="card animate-fade-in" style={{ marginTop: 32, padding: 32, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, paddingBottom: 20, borderBottom: "1px solid var(--border-light)" }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 900 }}>Lịch Sử & Nhập Xuất Kho</h3>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>Nguyên liệu: <span style={{ color: "var(--accent)" }}>{materials.find(m => m.id === selectedMaterialId)?.name}</span></p>
              </div>
              <button disabled className="badge badge-accent" style={{ border: "none" }}>{materials.find(m => m.id === selectedMaterialId)?.unit.toUpperCase()}</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>
              <div style={{ background: "var(--bg-primary)", borderRadius: 20, padding: 24, border: "1px solid var(--border)" }}>
                <h4 style={{ fontSize: 14, fontWeight: 900, marginBottom: 20, color: "var(--text-primary)" }}>🔥 Ghi nhận giao dịch</h4>
                <form onSubmit={handleAddTransaction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>HÌNH THỨC</label>
                    <select style={{ ...inputStyle, background: "white" }} value={transactionForm.type} onChange={e => setTransactionForm({...transactionForm, type: e.target.value as any})}>
                      <option value="IN">Nhập vào (Hợp đồng/Mua lẻ)</option>
                      <option value="OUT">Xuất bỏ (Hao hụt/Hết hạn)</option>
                      <option value="ADJUST">Kiểm kê (Cân bằng kho)</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>SỐ LƯỢNG ({materials.find(m => m.id === selectedMaterialId)?.unit})</label>
                    <input required type="number" step="0.1" placeholder="Nhập số lượng..." style={{ ...inputStyle, background: "white" }} value={transactionForm.quantity} onChange={e => setTransactionForm({...transactionForm, quantity: e.target.value})} />
                  </div>
                  <div>
                    <label style={labelStyle}>GHI CHÚ CHI TIẾT</label>
                    <input placeholder="VD: Nhập thêm từ kho sỉ 30/03..." style={{ ...inputStyle, background: "white" }} value={transactionForm.note} onChange={e => setTransactionForm({...transactionForm, note: e.target.value})} />
                  </div>
                  <button disabled={loading} type="submit" className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 13, marginTop: 8 }}>
                    {loading ? <AiOutlineLoading3Quarters size={18} className="spin" /> : "XÁC NHẬN GIAO DỊCH"}
                  </button>
                </form>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                   <h4 style={{ fontSize: 14, fontWeight: 900 }}>Gần đây</h4>
                   <span style={{ fontSize: 11, fontWeight: 800, color: "var(--text-muted)" }}>TỐI ĐA 10 GIAO DỊCH</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, maxHeight: 420, overflowY: "auto", paddingRight: 8 }} className="custom-scroll">
                  {transactions.length === 0 ? (
                    <div style={{ textAlign: "center", padding: 40, border: "2px dashed var(--border)", borderRadius: 16, color: "var(--text-muted)", fontSize: 12 }}>Chưa có lịch sử giao dịch.</div>
                  ) : transactions.slice().reverse().slice(0, 10).map(tx => (
                    <div key={tx.id} style={{ padding: "14px 18px", background: "white", borderRadius: 16, border: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 5px rgba(0,0,0,0.01)" }}>
                      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                        <div style={{ 
                          width: 40, height: 40, borderRadius: 12, 
                          background: tx.type === 'IN' ? "var(--success-light)" : tx.type === 'OUT' ? "var(--danger-light)" : "var(--warning-light)",
                          color: tx.type === 'IN' ? "var(--success)" : tx.type === 'OUT' ? "var(--danger)" : "var(--warning)",
                          display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: 10
                        }}>
                          {tx.type}
                        </div>
                        <div>
                          <div style={{ fontSize: 12, fontWeight: 800, color: "var(--text-primary)" }}>{tx.note || "Không có ghi chú"}</div>
                          <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 600 }}>{new Date(tx.created_at).toLocaleString("vi-VN")}</div>
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 15, fontWeight: 900, color: tx.type === 'IN' ? "var(--success)" : tx.type === 'OUT' ? "var(--danger)" : "var(--text-primary)" }}>
                          {tx.type === 'IN' ? '+' : tx.type === 'OUT' ? '-' : ''}{tx.quantity.toLocaleString()}
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-muted)" }}>{materials.find(m => m.id === selectedMaterialId)?.unit}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        .list-item:hover { border-color: var(--accent) !important; transform: translateX(4px); }
        .hover-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
