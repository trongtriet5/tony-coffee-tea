"use client";
import React, { useState, useEffect, useRef } from "react";
import { Material, MaterialTransaction } from "@/types";
import { 
  getMaterials, createMaterial, addMaterialTransaction, 
  getMaterialTransactions, getInventoryReport, updateMaterial, 
  deleteMaterial, importMaterials, getMaterialTemplateUrl, exportMaterialsExcel 
} from "@/lib/api";
import { HiPlus, HiBeaker, HiExclamationCircle, HiCheck, HiPencilAlt, HiBadgeCheck, HiBan, HiTrash, HiDownload, HiCollection, HiUpload, HiDocumentText } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useToast } from "@/components/ToastProvider";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function MaterialsPage() {
  const currentUser = useCurrentUser();
  const { success: toastSuccess, error: toastError, warning: toastWarning } = useToast();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [transactions, setTransactions] = useState<MaterialTransaction[]>([]);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [editingMaterialId, setEditingMaterialId] = useState<string | null>(null);
  const [materialForm, setMaterialForm] = useState({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });

  const [transactionForm, setTransactionForm] = useState({ type: "IN" as const, quantity: "", note: "" });

  const [reportDateRange, setReportDateRange] = useState({ startDate: "", endDate: "" });
  const [branches, setBranches] = useState<any[]>([]);
  const [selectedBranchId, setSelectedBranchId] = useState<string>("");

  useEffect(() => {
    if (currentUser) {
      if (currentUser.branch_id) setSelectedBranchId(currentUser.branch_id);
      fetchData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const [mats, brs] = await Promise.all([
        getMaterials(), 
        import('@/lib/api').then(m => m.getBranches())
      ]);
      setMaterials(mats);
      setBranches(brs);

      const userStr = localStorage.getItem("user");
      const user = userStr ? JSON.parse(userStr) : null;
      if (user && user.role !== 'ADMIN' && user.branch_id) {
        setSelectedBranchId(user.branch_id);
      } else if (brs.length > 0 && !selectedBranchId) {
        setSelectedBranchId(brs[0].id);
      }
    } catch (e) { console.error(e); }
    finally { setFetchLoading(false); }
  };


  const handleCreateOrUpdateMaterial = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!materialForm.name || !materialForm.unit || !materialForm.cost_per_unit) return;
    setLoading(true);
    try {
      const payload = {
        name: materialForm.name,
        branch_id: selectedBranchId,
        unit: materialForm.unit,
        cost_per_unit: parseFloat(materialForm.cost_per_unit),
        initial_stock: materialForm.initial_stock ? parseFloat(materialForm.initial_stock) : 0,
      };

      if (editingMaterialId) {
        await updateMaterial(editingMaterialId, payload);
        toastSuccess("Cập nhật nguyên liệu thành công!");
      } else {
        await createMaterial(payload);
        toastSuccess("Đã thêm nguyên liệu mới thành công!");
      }

      setMaterialForm({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });
      setEditingMaterialId(null);
      fetchData();
    } catch (error) {
      toastError("Có lỗi xảy ra khi xử lý nguyên liệu");
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
      toastSuccess("Ghi nhận giao dịch thành công!");
      setTransactionForm({ type: "IN", quantity: "", note: "" });
      loadTransactions(selectedMaterialId);
      fetchData();
    } catch (error) {
      toastError("Có lỗi xảy ra khi ghi nhận giao dịch");
    } finally { setLoading(false); }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const res = await importMaterials(file);
      toastSuccess(`Import thành công ${res.success}/${res.total} nguyên liệu!`);
      if (res.errors.length > 0) {
        toastWarning(`Có ${res.errors.length} lỗi mapping — kiểm tra lại file import.`);
      }
      fetchData();
    } catch (err) {
      toastError("Lỗi import file. Vui lòng kiểm tra định dạng template.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
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
      toastSuccess("Xóa nguyên liệu thành công!");
      fetchData();
    } catch (error) {
      toastError("Có lỗi xảy ra khi xóa nguyên liệu");
    } finally { setLoading(false); }
  };

  const cancelEdit = () => {
    setEditingMaterialId(null);
    setMaterialForm({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none", transition: "0.2s", background: "var(--bg-primary)" };
  const labelStyle = { fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8, display: "block", letterSpacing: "0.5px" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px 40px 40px 120px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Material Management</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Quản lý Nguyên Liệu & Tồn Kho (Thêm / Sửa / Giao dịch)</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {currentUser?.role?.toUpperCase() === 'ADMIN' && (
              <>
                <a href={getMaterialTemplateUrl()} target="_blank" style={{ textDecoration: "none", background: "white", color: "var(--accent)", padding: "12px 20px", borderRadius: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                  <HiDocumentText size={18} /> TEMPLATE
                </a>
                <button onClick={() => fileInputRef.current?.click()} style={{ background: "white", color: "var(--text-primary)", padding: "12px 20px", borderRadius: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border)", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
                  <HiUpload size={18} /> IMPORT
                  <input type="file" ref={fileInputRef} onChange={handleImport} style={{ display: "none" }} accept=".xlsx,.xls" />
                </button>
              </>
            )}
            <a href={exportMaterialsExcel(selectedBranchId)} target="_blank" style={{ textDecoration: "none", background: "var(--accent)", color: "white", padding: "12px 20px", borderRadius: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, border: "none", boxShadow: "var(--shadow-sm)" }}>
              <HiDownload size={18} /> EXPORT STOCK
            </a>
          </div>
        </div>

        {/* NOTIFICATION */}
        <div style={{ opacity: 0, height: 0, overflow: "hidden" }} />

        <div style={{ display: "grid", gridTemplateColumns: currentUser?.role?.toUpperCase() === 'ADMIN' ? "1fr 2fr" : "1fr", gap: 32 }}>

          {currentUser?.role?.toUpperCase() === 'ADMIN' && (
            <div>
              <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, position: "sticky", top: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
                <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {editingMaterialId ? "SỬA NGUYÊN LIỆU" : "THÊM NGUYÊN LIỆU MỚI"}
                  {editingMaterialId && (
                    <button onClick={cancelEdit} style={{ background: "var(--bg-primary)", color: "var(--text-muted)", fontSize: 11, border: "none", padding: "6px 12px", borderRadius: 8, fontWeight: 800, cursor: "pointer" }}>HỦY</button>
                  )}
                </h3>

                <form onSubmit={handleCreateOrUpdateMaterial}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 24 }}>
                    {!editingMaterialId && (
                      <div>
                        <label style={labelStyle}>CHI NHÁNH</label>
                        <select 
                          style={{ ...inputStyle, opacity: currentUser?.role?.toUpperCase() !== 'ADMIN' ? 0.6 : 1, cursor: currentUser?.role?.toUpperCase() !== 'ADMIN' ? 'not-allowed' : 'pointer' }} 
                          value={selectedBranchId} 
                          onChange={e => setSelectedBranchId(e.target.value)}
                          disabled={currentUser?.role?.toUpperCase() !== 'ADMIN'}
                        >
                          {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                        </select>
                      </div>
                    )}
                    <div>
                      <label style={labelStyle}>TÊN NGUYÊN LIỆU</label>
                      <input required placeholder="VD: Cà Phê Hạt Arabica" style={inputStyle} value={materialForm.name} onChange={e => setMaterialForm({...materialForm, name: e.target.value})} />
                    </div>
                    <div>
                      <label style={labelStyle}>ĐƠN VỊ TÍNH</label>
                      <input required placeholder="VD: kg, g, l, ml, cái" style={inputStyle} value={materialForm.unit} onChange={e => setMaterialForm({...materialForm, unit: e.target.value})} />
                    </div>
                    <div>
                      <label style={labelStyle}>GIÁ/ĐƠN VỊ (VNĐ)</label>
                      <input required type="number" step="0.01" placeholder="VD: 150000" style={inputStyle} value={materialForm.cost_per_unit} onChange={e => setMaterialForm({...materialForm, cost_per_unit: e.target.value})} />
                    </div>
                    <div>
                      <label style={labelStyle}>TỒN KHO KHỞI TẠO (tuỳ chọn)</label>
                      <input type="number" step="0.01" placeholder="VD: 10" style={inputStyle} value={materialForm.initial_stock} onChange={e => setMaterialForm({...materialForm, initial_stock: e.target.value})} />
                    </div>
                  </div>

                  <button disabled={loading} type="submit" style={{ width: "100%", padding: 16, background: "var(--accent)", color: "white", border: "none", borderRadius: 14, fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", transition: "0.2s" }} className="hover-btn">
                    {loading ? <AiOutlineLoading3Quarters size={18} className="spin" /> : editingMaterialId ? <><HiPencilAlt size={18}/> LƯU THAY ĐỔI</> : <><HiPlus size={18}/> THÊM NGUYÊN LIỆU</>}
                  </button>
                </form>
              </div>
            </div>
          )}
          {currentUser?.role?.toUpperCase() !== 'ADMIN' && (
            <div style={{ display: "none" }} />
          )}

          {/* RIGHT: LIST SECTION */}
          <div>
            <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: "24px 8px 32px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", height: "calc(100vh - 160px)", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 24, paddingRight: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900 }}>Danh sách nguyên liệu</h3>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Nhấn vào dòng để xem giao dịch hoặc chỉnh sửa.</p>
              </div>

              {fetchLoading ? (
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}><AiOutlineLoading3Quarters size={32} className="spin" color="var(--accent)" /></div>
              ) : (
                <div style={{ flex: 1, overflowY: "auto", paddingRight: 16 }} className="custom-scroll">
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {materials.map(m => (
                      <div key={m.id} onClick={() => loadTransactions(m.id)} style={{ padding: "16px 20px", borderRadius: 16, background: "var(--bg-primary)", border: selectedMaterialId === m.id ? "2px solid var(--accent)" : "2px solid transparent", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "0.2s" }} className="list-item">
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 900 }}>{m.name}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }}>({m.unit})</span>
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, display: "flex", gap: 16 }}>
                            <span style={{ color: m.stock_current <= 0 ? "var(--danger)" : "inherit", fontWeight: m.stock_current <= 0 ? 900 : 700 }}>Tồn: {m.stock_current} {m.unit}</span>
                            <span>Giá: ₫{m.cost_per_unit.toLocaleString("vi-VN")}</span>
                            <span style={{ fontWeight: 900 }}>Giá trị: ₫{m.stock_value.toLocaleString("vi-VN")}</span>
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 8 }}>
                          <button onClick={(e) => { e.stopPropagation(); window.location.href='/recipes' }} style={{ background: "transparent", border: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: 16 }} title="Cấu hình Công thức"><HiCollection size={18}/></button>
                          {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); startEditMaterial(m); }} style={{ background: "transparent", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 16 }} title="Sửa"><HiPencilAlt size={18}/></button>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteMaterial(m.id); }} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer", fontSize: 16 }} title="Xóa"><HiTrash size={18}/></button>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* STOCK TABLE BELOW */}
        <div style={{ marginTop: 32, background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24 }}>Bảng thống kê tồn kho chi tiết</h3>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ textAlign: "left", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
                  <th style={{ padding: "12px 16px", fontWeight: 900 }}>TÊN NGUYÊN LIỆU</th>
                  <th style={{ padding: "12px 16px", fontWeight: 900 }}>ĐƠN VỊ</th>
                  <th style={{ padding: "12px 16px", fontWeight: 900 }}>GIÁ VỐN</th>
                  <th style={{ padding: "12px 16px", fontWeight: 900 }}>TỒN HIỆN TẠI</th>
                  <th style={{ padding: "12px 16px", fontWeight: 900, textAlign: "right" }}>GIÁ TRỊ TỒN</th>
                </tr>
              </thead>
              <tbody>
                {materials.map(m => (
                  <tr key={m.id} style={{ borderBottom: "1px solid var(--bg-primary)" }}>
                    <td style={{ padding: "16px", fontWeight: 700 }}>{m.name}</td>
                    <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{m.unit}</td>
                    <td style={{ padding: "16px" }}>₫{m.cost_per_unit.toLocaleString("vi-VN")}</td>
                    <td style={{ padding: "16px", fontWeight:900, color: m.stock_current <= 0 ? "var(--danger)" : "var(--success)" }}>{m.stock_current}</td>
                    <td style={{ padding: "16px", textAlign: "right", fontWeight: 900, color: "var(--accent)" }}>₫{m.stock_value.toLocaleString("vi-VN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* TRANSACTION SECTION */}
        {selectedMaterialId && (
          <div style={{ marginTop: 32, background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24, paddingBottom: 16, borderBottom: "1px solid var(--border)" }}>
              <div>
                <h3 style={{ fontSize: 18, fontWeight: 900 }}>Lịch sử & Giao dịch</h3>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Nguyên liệu: {materials.find(m => m.id === selectedMaterialId)?.name}</p>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>
              <div style={{ background: "var(--bg-primary)", borderRadius: 16, padding: 20 }}>
                <h4 style={{ fontSize: 14, fontWeight: 900, marginBottom: 16 }}>Thêm Giao Dịch</h4>
                {currentUser?.role?.toUpperCase() === 'ADMIN' ? (
                  <form onSubmit={handleAddTransaction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div>
                      <label style={labelStyle}>LOẠI GIAO DỊCH</label>
                      <select style={inputStyle} value={transactionForm.type} onChange={e => setTransactionForm({...transactionForm, type: e.target.value as any})}>
                        <option value="IN">Nhập vào (IN)</option>
                        <option value="OUT">Xuất ra (OUT)</option>
                        <option value="ADJUST">Điều chỉnh (ADJUST)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>SỐ LƯỢNG</label>
                      <input required type="number" step="0.01" placeholder="VD: 5" style={inputStyle} value={transactionForm.quantity} onChange={e => setTransactionForm({...transactionForm, quantity: e.target.value})} />
                    </div>
                    <div>
                      <label style={labelStyle}>GHI CHÚ (tuỳ chọn)</label>
                      <input placeholder="VD: Nhập từ nhà cung cấp XYZ" style={inputStyle} value={transactionForm.note} onChange={e => setTransactionForm({...transactionForm, note: e.target.value})} />
                    </div>
                    <button disabled={loading} type="submit" style={{ width: "100%", padding: 12, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", transition: "0.2s" }} className="hover-btn">
                      {loading ? <AiOutlineLoading3Quarters size={16} className="spin" /> : <><HiPlus size={16}/> GHI NHẬN</>}
                    </button>
                  </form>
                ) : (
                  <div style={{ textAlign: "center", padding: 20 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: "var(--text-muted)" }}>Lịch sử giao dịch chỉ dành cho xem. Liên hệ Admin để điều chỉnh kho.</p>
                  </div>
                )}
              </div>

              <div>
                <h4 style={{ fontSize: 14, fontWeight: 900, marginBottom: 16 }}>Giao dịch gần đây</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, maxHeight: 400, overflowY: "auto" }} className="custom-scroll">
                  {transactions.slice().reverse().slice(0, 10).map(tx => (
                    <div key={tx.id} style={{ padding: 12, background: "var(--bg-primary)", borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div style={{ flex: 1 }}>
                        <span style={{ display: "inline-block", fontSize: 11, fontWeight: 900, padding: "4px 8px", borderRadius: 6, background: tx.type === 'IN' ? "#10b98130" : tx.type === 'OUT' ? "#ef444430" : tx.type === 'ADJUST' ? "#f5a62d30" : "#3b82f630", color: tx.type === 'IN' ? "#10b981" : tx.type === 'OUT' ? "#ef4444" : tx.type === 'ADJUST' ? "#f5a62d" : "#3b82f6" }}>{tx.type}</span>
                        <div style={{ fontSize: 12, color: "var(--text-secondary)", marginTop: 4 }}>
                          {tx.note ? tx.note : "Tự động từ đơn hàng"}
                        </div>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ fontSize: 14, fontWeight: 900 }}>{tx.type === 'IN' || tx.type === 'ADJUST' && tx.quantity > 0 ? '+' : '-'}{Math.abs(tx.quantity)}</div>
                        <div style={{ fontSize: 11, color: "var(--text-secondary)" }}>{new Date(tx.created_at).toLocaleDateString("vi-VN")}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
