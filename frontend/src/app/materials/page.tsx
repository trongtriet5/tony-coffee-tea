"use client";
import React, { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { Material, MaterialTransaction } from "@/types";
import {
  getMaterials, createMaterial, addMaterialTransaction,
  getMaterialTransactions, getInventoryReport, updateMaterial,
  deleteMaterial, importMaterials, getMaterialTemplateUrl, exportMaterialsExcel,
  getBranches, getAllTransactions
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
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.branch_id) setSelectedBranchId(currentUser.branch_id);
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const fetchData = async (branchId?: string) => {
    // Avoid redundant fetches if no branch is selected yet for non-admin
    const targetBranch = branchId || selectedBranchId;
    if (currentUser?.role !== 'ADMIN' && !targetBranch) return;

    setFetchLoading(true);
    try {
      const [mats, brs, txs] = await Promise.all([
        getMaterials(targetBranch),
        getBranches(),
        getAllTransactions(targetBranch)
      ]);
      setMaterials(mats);
      setBranches(brs);
      setTransactions(txs);

      // Initialize selectedBranchId if not set
      if (currentUser?.role === 'ADMIN' && brs.length > 0 && !targetBranch) {
        setSelectedBranchId(brs[0].id);
      }
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setFetchLoading(false);
    }
  };

  // Single effect to handle data synchronization
  useEffect(() => {
    if (currentUser) {
      if (currentUser.branch_id && !selectedBranchId) {
        setSelectedBranchId(currentUser.branch_id);
      } else {
        fetchData(selectedBranchId);
      }
    }
  }, [currentUser, selectedBranchId]);


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
      const res = await importMaterials(file, selectedBranchId);
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
      // Instead of just one material, we can filter our local transactions state 
      // or fetch specifically if we want high detail. 
      // But user wants global display ready, so let's set the selected highlight.
      setSelectedMaterialId(materialId === selectedMaterialId ? null : materialId);
    } catch (err) { console.error(err); }
  };

  const handleDeleteMaterial = async (id: string) => {
    const Swal = (window as any).Swal;
    if (!Swal) return;

    const result = await Swal.fire({
      title: 'Xác nhận xóa?',
      text: "Bạn chắc chắn muốn xóa nguyên liệu này?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: 'var(--accent)',
      cancelButtonColor: 'var(--text-muted)',
      confirmButtonText: 'Đồng ý',
      cancelButtonText: 'Hủy'
    });

    if (result.isConfirmed) {
      try {
        setLoading(true);
        await deleteMaterial(id);
        toastSuccess("Xóa nguyên liệu thành công!");
        fetchData();
      } catch (error) {
        toastError("Có lỗi xảy ra khi xóa nguyên liệu");
      } finally { setLoading(false); }
    }
  };

  const cancelEdit = () => {
    setEditingMaterialId(null);
    setMaterialForm({ name: "", unit: "", cost_per_unit: "", initial_stock: "" });
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none", transition: "0.2s", background: "var(--bg-primary)" };
  const labelStyle = { fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8, display: "block", letterSpacing: "0.5px" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: isMobile ? "32px 24px" : "40px 40px 60px 120px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Quản lý nguyên vật liệu</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Quản lý nguyên vật liệu pha chế & topping</p>
          </div>
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {currentUser?.role?.toUpperCase() === 'ADMIN' && (
              <div style={{ position: "relative" }}>
                <select
                  style={{ ...inputStyle, width: "auto", minWidth: 200, padding: "10px 16px", background: "white" }}
                  value={selectedBranchId}
                  onChange={e => setSelectedBranchId(e.target.value)}
                >
                  <option value="">Tất cả chi nhánh</option>
                  {branches.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                </select>
                <div style={{ position: "absolute", top: -10, left: 10, background: "white", padding: "0 4px", fontSize: 9, fontWeight: 900, color: "var(--accent)" }}>LỌC THEO CHI NHÁNH</div>
              </div>
            )}
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
              <HiDownload size={18} /> EXPORT
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
                      <input required placeholder="VD: Cà Phê Hạt Arabica" style={inputStyle} value={materialForm.name} onChange={e => setMaterialForm({ ...materialForm, name: e.target.value })} />
                    </div>
                    <div>
                      <label style={labelStyle}>ĐƠN VỊ TÍNH</label>
                      <input required placeholder="VD: kg, g, l, ml, cái" style={inputStyle} value={materialForm.unit} onChange={e => setMaterialForm({ ...materialForm, unit: e.target.value })} />
                    </div>
                    <div>
                      <label style={labelStyle}>GIÁ/ĐƠN VỊ (VNĐ)</label>
                      <input required type="number" step="0.01" placeholder="VD: 150000" style={inputStyle} value={materialForm.cost_per_unit} onChange={e => setMaterialForm({ ...materialForm, cost_per_unit: e.target.value })} />
                    </div>
                    <div>
                      <label style={labelStyle}>TỒN KHO KHỞI TẠO (tuỳ chọn)</label>
                      <input type="number" step="0.01" placeholder="VD: 10" style={inputStyle} value={materialForm.initial_stock} onChange={e => setMaterialForm({ ...materialForm, initial_stock: e.target.value })} />
                    </div>
                  </div>

                  <button disabled={loading} type="submit" style={{ width: "100%", padding: 16, background: "var(--accent)", color: "white", border: "none", borderRadius: 14, fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", transition: "0.2s" }} className="hover-btn">
                    {loading ? <AiOutlineLoading3Quarters size={18} className="spin" /> : editingMaterialId ? <><HiPencilAlt size={18} /> LƯU THAY ĐỔI</> : <><HiPlus size={18} /> THÊM NGUYÊN LIỆU</>}
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
            <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: "24px 8px 32px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", maxHeight: "450px", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 24, paddingRight: 24 }}>
                <h3 style={{ fontSize: 18, fontWeight: 900 }}>Danh sách nguyên liệu</h3>
                <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Nhấn vào dòng để xem giao dịch hoặc chỉnh sửa.</p>
              </div>

              {fetchLoading ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 12, paddingRight: 16 }}>
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="skeleton" style={{ height: 80, borderRadius: 16, width: "100%" }} />
                  ))}
                </div>
              ) : (
                <div style={{ flex: 1, overflowY: "auto", paddingRight: 16 }} className="custom-scroll animate-fade-in">
                  <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                    {materials.map((m, idx) => (
                      <div
                        key={m.id}
                        onClick={() => loadTransactions(m.id)}
                        style={{
                          padding: "16px 20px",
                          borderRadius: 16,
                          background: "var(--bg-primary)",
                          border: selectedMaterialId === m.id ? "2px solid var(--accent)" : "2px solid transparent",
                          cursor: "pointer",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          transition: "0.2s",
                          animationDelay: `${idx * 0.05}s`
                        }}
                        className="list-item animate-fade-in"
                      >
                        <div style={{ flex: 1 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                            <span style={{ fontSize: 14, fontWeight: 900 }}>{m.name}</span>
                            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--text-muted)" }}>({m.unit})</span>
                          </div>
                          <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700, display: "flex", gap: 16 }}>
                            <span style={{ color: m.stock_current <= 0 ? "var(--danger)" : "inherit", fontWeight: m.stock_current <= 0 ? 900 : 700 }}>Tồn: {Number(m.stock_current).toFixed(3).replace(/\.?0+$/, "")} {m.unit}</span>
                            {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                              <>
                                <span>Giá: ₫{m.cost_per_unit.toLocaleString("vi-VN")}</span>
                                <span style={{ fontWeight: 900 }}>Giá trị: ₫{m.stock_value.toLocaleString("vi-VN")}</span>
                              </>
                            )}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: 12 }}>
                          {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                            <>
                              <button onClick={(e) => { e.stopPropagation(); startEditMaterial(m); }} style={{ background: "transparent", border: "none", color: "var(--accent)", cursor: "pointer", fontSize: 16 }} title="Sửa"><HiPencilAlt size={18} /></button>
                              <button onClick={(e) => { e.stopPropagation(); handleDeleteMaterial(m.id); }} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer", fontSize: 16 }} title="Xóa"><HiTrash size={18} /></button>
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
                  {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                    <th style={{ padding: "12px 16px", fontWeight: 900 }}>GIÁ VỐN</th>
                  )}
                  <th style={{ padding: "12px 16px", fontWeight: 900 }}>TỒN HIỆN TẠI</th>
                  {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                    <th style={{ padding: "12px 16px", fontWeight: 900, textAlign: "right" }}>GIÁ TRỊ TỒN</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {fetchLoading ? (
                  [1, 2, 3, 4, 5].map(i => (
                    <tr key={i}>
                      <td colSpan={5} style={{ padding: "12px 16px" }}>
                        <div className="skeleton" style={{ height: 24, borderRadius: 4, width: "100%" }} />
                      </td>
                    </tr>
                  ))
                ) : (
                  materials.map(m => (
                    <tr key={m.id} style={{ borderBottom: "1px solid var(--bg-primary)" }} className="animate-fade-in">
                      <td style={{ padding: "16px", fontWeight: 700 }}>{m.name}</td>
                      <td style={{ padding: "16px", color: "var(--text-secondary)" }}>{m.unit}</td>
                      {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                        <td style={{ padding: "16px" }}>₫{m.cost_per_unit.toLocaleString("vi-VN")}</td>
                      )}
                      <td style={{ padding: "16px", fontWeight: 900, color: m.stock_current <= 0 ? "var(--danger)" : "var(--success)" }}>{Number(m.stock_current).toFixed(3).replace(/\.?0+$/, "")}</td>
                      {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                        <td style={{ padding: "16px", textAlign: "right", fontWeight: 900, color: "var(--accent)" }}>₫{m.stock_value.toLocaleString("vi-VN")}</td>
                      )}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* GLOBAL TRANSACTION SECTION */}
        <div style={{ marginTop: 32, background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h3 style={{ fontSize: 18, fontWeight: 900 }}>Lịch sử biến động kho toàn hệ thống</h3>
              <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Theo dõi nhập, xuất và hao hụt từ đơn hàng của tất cả nguyên liệu.</p>
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: currentUser?.role?.toUpperCase() === 'ADMIN' ? "1.2fr 2.8fr" : "1fr", gap: 32 }}>
            {currentUser?.role?.toUpperCase() === 'ADMIN' && (
              <div style={{ background: "var(--bg-primary)", borderRadius: 16, padding: 24, height: "fit-content" }}>
                <h4 style={{ fontSize: 14, fontWeight: 900, marginBottom: 16 }}>Ghi nhận thủ công</h4>
                <form onSubmit={handleAddTransaction} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={labelStyle}>NGUYÊN LIỆU</label>
                    <select style={inputStyle} value={selectedMaterialId || ""} onChange={e => setSelectedMaterialId(e.target.value)}>
                      <option value="">-- Chọn nguyên liệu --</option>
                      {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>LOẠI GIAO DỊCH</label>
                    <select style={inputStyle} value={transactionForm.type} onChange={e => setTransactionForm({ ...transactionForm, type: e.target.value as any })}>
                      <option value="IN">Nhập vào (IN)</option>
                      <option value="OUT">Xuất ra (OUT)</option>
                      <option value="ADJUST">Điều chỉnh (ADJUST)</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>SỐ LƯỢNG</label>
                    <input required type="number" step="0.01" placeholder="VD: 5" style={inputStyle} value={transactionForm.quantity} onChange={e => setTransactionForm({ ...transactionForm, quantity: e.target.value })} />
                  </div>
                  <div>
                    <label style={labelStyle}>GHI CHÚ (tuỳ chọn)</label>
                    <input placeholder="VD: Nhập thêm hàng" style={inputStyle} value={transactionForm.note} onChange={e => setTransactionForm({ ...transactionForm, note: e.target.value })} />
                  </div>
                  <button disabled={loading || !selectedMaterialId} type="submit" style={{ width: "100%", padding: 12, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 13, fontWeight: 900, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", transition: "0.2s", opacity: !selectedMaterialId ? 0.5 : 1 }}>
                    {loading ? <AiOutlineLoading3Quarters size={16} className="spin" /> : <HiPlus size={16} />} GHI NHẬN
                  </button>
                </form>
              </div>
            )}

            <div style={{ flex: 1 }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ textAlign: "left", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
                      <th style={{ padding: "12px 16px", fontWeight: 900 }}>THỜI GIAN</th>
                      <th style={{ padding: "12px 16px", fontWeight: 900 }}>NGUYÊN LIỆU</th>
                      <th style={{ padding: "12px 16px", fontWeight: 900 }}>LOẠI</th>
                      <th style={{ padding: "12px 16px", fontWeight: 900, textAlign: "right" }}>SỐ LƯỢNG</th>
                      <th style={{ padding: "12px 16px", fontWeight: 900 }}>GHI CHÚ / CHI TIẾT ĐƠN HÀNG</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fetchLoading ? (
                      [1, 2, 3, 4, 5].map(i => (
                        <tr key={i}>
                          <td colSpan={5} style={{ padding: "12px 16px" }}>
                            <div className="skeleton" style={{ height: 40, borderRadius: 8, width: "100%" }} />
                          </td>
                        </tr>
                      ))
                    ) : (
                      transactions.map(tx => (
                        <tr key={tx.id} style={{ borderBottom: "1px solid var(--bg-primary)", background: selectedMaterialId === tx.material_id ? "#f0f7ff" : "transparent" }} className="animate-fade-in">
                          <td style={{ padding: "16px", whiteSpace: "nowrap" }}>
                            <div style={{ fontWeight: 700 }}>{format(new Date(tx.created_at), "dd/MM/yyyy")}</div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{new Date(tx.created_at).toLocaleTimeString("vi-VN", { hour: '2-digit', minute: '2-digit' })}</div>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <div style={{ fontWeight: 900, color: "var(--text-primary)" }}>{(tx as any).material?.name}</div>
                            <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{(tx as any).material?.unit}</div>
                          </td>
                          <td style={{ padding: "16px" }}>
                            <span style={{ display: "inline-block", fontSize: 10, fontWeight: 900, padding: "4px 8px", borderRadius: 6, background: tx.type === 'IN' ? "#10b98120" : tx.type === 'OUT' ? "#ef444420" : tx.type === 'ADJUST' ? "#f5a62d20" : "#3b82f620", color: tx.type === 'IN' ? "#10b981" : tx.type === 'OUT' ? "#ef4444" : tx.type === 'ADJUST' ? "#f5a62d" : "#3b82f6" }}>
                              {tx.type}
                            </span>
                          </td>
                          <td style={{ padding: "16px", textAlign: "right", fontWeight: 900, fontSize: 14 }}>
                            <span style={{ color: tx.type === 'IN' || (tx.type === 'ADJUST' && tx.quantity > 0) ? "var(--success)" : "var(--danger)" }}>
                              {tx.type === 'IN' || (tx.type === 'ADJUST' && tx.quantity > 0) ? '+' : '-'}{Number(Math.abs(tx.quantity)).toFixed(3).replace(/\.?0+$/, "")}
                            </span>
                          </td>
                          <td style={{ padding: "16px", fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>
                            {tx.note || "Hao hụt tự động"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                {!fetchLoading && transactions.length === 0 && (
                  <div style={{ padding: 40, textAlign: "center", color: "var(--text-muted)", fontSize: 14 }}>Chưa có lịch sử giao dịch nào được ghi nhận.</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
