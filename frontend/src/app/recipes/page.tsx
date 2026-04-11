"use client";
import React, { useState, useEffect, useRef } from "react";
import { 
  getProductRecipes, getToppingRecipes, createProductRecipe, 
  createToppingRecipe, deleteProductRecipe, deleteToppingRecipe,
  getProducts, getToppings, getMaterials,
  importRecipes, getRecipeTemplateUrl, exportRecipesExcel
} from "@/lib/api";
import { Product, Topping, Material } from "@/types";
import { HiPlus, HiCollection, HiSparkles, HiCheck, HiPencilAlt, HiTrash, HiUpload, HiDownload, HiDocumentText } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useToast } from "@/components/ToastProvider";

export default function RecipePage() {
  const currentUser = useCurrentUser();
  const { success: toastSuccess, error: toastError, warning: toastWarning } = useToast();
  const [activeTab, setActiveTab] = useState<"product" | "topping">("product");
  const [products, setProducts] = useState<Product[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedToppingId, setSelectedToppingId] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [recipeForm, setRecipeForm] = useState({ material_id: "", quantity: "" });

  useEffect(() => {
    if (currentUser) {
      if (currentUser.role?.toUpperCase() === 'MANAGER') setActiveTab('product');
      fetchData();
    }
  }, [currentUser]);

  useEffect(() => {
    if (activeTab === "product" && selectedProductId) {
      loadProductRecipes(selectedProductId);
    }
  }, [selectedProductId, activeTab]);

  useEffect(() => {
    if (activeTab === "topping" && selectedToppingId) {
      loadToppingRecipes(selectedToppingId);
    }
  }, [selectedToppingId, activeTab]);

  const fetchData = async () => {
    setFetchLoading(true);
    try {
      const [prods, tops, mats] = await Promise.all([
        getProducts({ all: true }),
        getToppings({ all: true }),
        getMaterials(),
      ]);
      setProducts(prods);
      setToppings(tops);
      setMaterials(mats);
    } catch (e) { console.error(e); }
    finally { setFetchLoading(false); }
  };


  const loadProductRecipes = async (productId: string) => {
    try {
      const data = await getProductRecipes(productId);
      setRecipes(data);
    } catch (err) { console.error(err); }
  };

  const loadToppingRecipes = async (toppingId: string) => {
    try {
      const data = await getToppingRecipes(toppingId);
      setRecipes(data);
    } catch (err) { console.error(err); }
  };

  const handleAddRecipe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipeForm.material_id || !recipeForm.quantity) return;
    setLoading(true);
    try {
      if (activeTab === "product") {
        await createProductRecipe({
          product_id: selectedProductId,
          material_id: recipeForm.material_id,
          quantity: parseFloat(recipeForm.quantity),
        });
        loadProductRecipes(selectedProductId);
      } else {
        await createToppingRecipe({
          topping_id: selectedToppingId,
          material_id: recipeForm.material_id,
          quantity: parseFloat(recipeForm.quantity),
        });
        loadToppingRecipes(selectedToppingId);
      }
      setRecipeForm({ material_id: "", quantity: "" });
      toastSuccess("Thêm công thức thành công!");
    } catch (error) {
      toastError("Có lỗi xảy ra khi thêm công thức");
    } finally { setLoading(false); }
  };

  const handleDeleteRecipe = async (id: string) => {
    if (!confirm("Bạn chắc chắn muốn xóa công thức này?")) return;
    try {
      setLoading(true);
      if (activeTab === "product") {
        await deleteProductRecipe(id);
        loadProductRecipes(selectedProductId);
      } else {
        await deleteToppingRecipe(id);
        loadToppingRecipes(selectedToppingId);
      }
      toastSuccess("Xóa công thức thành công!");
    } catch (error) {
      toastError("Có lỗi xảy ra khi xóa công thức");
    } finally { setLoading(false); }
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    try {
      const res = await importRecipes(file);
      toastSuccess(`Import thành công!`);
      if (res.errors.length > 0) {
        toastWarning(`Có ${res.errors.length} lỗi mapping — Kiểm tra file import.`);
      }
      fetchData();
      if (selectedProductId) loadProductRecipes(selectedProductId);
      if (selectedToppingId) loadToppingRecipes(selectedToppingId);
    } catch (err) {
      toastError("Lỗi import file recipe.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none", transition: "0.2s", background: "var(--bg-primary)" };
  const labelStyle = { fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8, display: "block", letterSpacing: "0.5px" };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px 40px 40px 120px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Recipe Management</h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Quản lý Công Thức (BOM) - Định lượng Nguyên Liệu cho Sản phẩm & Topping</p>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            {currentUser?.role?.toUpperCase() === 'ADMIN' && (
              <>
                <a href={getRecipeTemplateUrl()} target="_blank" style={{ textDecoration: "none", background: "white", color: "var(--accent)", padding: "12px 20px", borderRadius: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border)", boxShadow: "var(--shadow-sm)" }}>
                  <HiDocumentText size={18} /> TEMPLATE
                </a>
                <button onClick={() => fileInputRef.current?.click()} style={{ background: "white", color: "var(--text-primary)", padding: "12px 20px", borderRadius: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, border: "1px solid var(--border)", cursor: "pointer", boxShadow: "var(--shadow-sm)" }}>
                  <HiUpload size={18} /> IMPORT
                  <input type="file" ref={fileInputRef} onChange={handleImport} style={{ display: "none" }} accept=".xlsx,.xls" />
                </button>
                <a href={exportRecipesExcel()} target="_blank" style={{ textDecoration: "none", background: "var(--accent)", color: "white", padding: "12px 20px", borderRadius: 14, fontSize: 13, fontWeight: 900, display: "flex", alignItems: "center", gap: 8, border: "none", boxShadow: "var(--shadow-sm)" }}>
                  <HiDownload size={18} /> EXPORT ALL
                </a>
              </>
            )}
          </div>
        </div>


        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>

          {/* LEFT: FORM & ITEM SELECTION */}
          <div>
            {/* Tab Switcher */}
            <div style={{ display: "flex", gap: 10, marginBottom: 24, background: "white", padding: 6, borderRadius: 16, border: "1px solid var(--border)" }}>
              <button onClick={() => { setActiveTab("product"); setSelectedProductId(""); setRecipes([]); }} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", background: activeTab === "product" ? "var(--accent)" : "transparent", color: activeTab === "product" ? "white" : "var(--text-muted)", fontWeight: 800, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "0.2s" }}>
                <HiCollection size={16} /> SẢN PHẨM
              </button>
              {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                <button onClick={() => { setActiveTab("topping"); setSelectedToppingId(""); setRecipes([]); }} style={{ flex: 1, padding: "10px", borderRadius: 12, border: "none", background: activeTab === "topping" ? "var(--accent)" : "transparent", color: activeTab === "topping" ? "white" : "var(--text-muted)", fontWeight: 800, fontSize: 12, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "0.2s" }}>
                  <HiSparkles size={16} /> TOPPING
                </button>
              )}
            </div>

            {/* Item Selection */}
            <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, position: "sticky", top: 40, boxShadow: "0 4px 20px rgba(0,0,0,0.02)", maxHeight: "calc(100vh - 200px)", overflowY: "auto" }} className="custom-scroll">
              <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 16, color: "var(--text-muted)" }}>CHỌN {activeTab === "product" ? "SẢN PHẨM" : "TOPPING"}</h3>

              {fetchLoading ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: 200 }}><AiOutlineLoading3Quarters size={24} className="spin" color="var(--accent)" /></div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {activeTab === "product" ? (
                        (() => {
                          const orderMap: Record<string, number> = {
                            "CÀ PHÊ": 1, "TRÀ": 2, "TRÀ LẠNH": 2, "TRÀ NÓNG": 2,
                            "NƯỚC NGỌT": 3, "SINH TỐ": 4, "NƯỚC ÉP": 5, 
                            "YOGURT": 6, "KHÁC": 7, "TOPPING": 8, "ĐỒ ĂN": 9
                          };
                          const sortedCats = Array.from(new Set(products.map(p => p.category)))
                            .sort((a, b) => (orderMap[a.toUpperCase()] || 99) - (orderMap[b.toUpperCase()] || 99));

                          return sortedCats.map(cat => (
                            <div key={cat} style={{ marginBottom: 16 }}>
                              <div style={{ fontSize: 11, fontWeight: 900, color: "var(--accent)", marginBottom: 10, paddingLeft: 8, letterSpacing: 1.5 }}>{cat.toUpperCase()}</div>
                              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                                {products.filter(p => p.category === cat).map(item => (
                                  <button 
                                    key={item.id}
                                    onClick={() => setSelectedProductId(item.id)}
                                    style={{
                                      padding: "12px 16px",
                                      borderRadius: 14,
                                      border: selectedProductId === item.id ? "2px solid var(--accent)" : "2px solid transparent",
                                      background: selectedProductId === item.id ? "var(--bg-primary)" : "white",
                                      color: "var(--text-primary)",
                                      fontWeight: 700,
                                      fontSize: 13,
                                      cursor: "pointer",
                                      textAlign: "left",
                                      transition: "0.2s",
                                      boxShadow: selectedProductId === item.id ? "none" : "var(--shadow-sm)"
                                    }}
                                    className="list-item"
                                  >
                                    {item.name_vi}
                                  </button>
                                ))}
                              </div>
                            </div>
                          ));
                        })()
                      ) : (
                        toppings.map(item => (
                          <button 
                            key={item.id}
                            onClick={() => setSelectedToppingId(item.id)}
                            style={{
                              padding: "12px 16px",
                              borderRadius: 12,
                              border: selectedToppingId === item.id ? "2px solid var(--accent)" : "2px solid transparent",
                              background: selectedToppingId === item.id ? "var(--bg-primary)" : "white",
                              color: "var(--text-primary)",
                              fontWeight: 700,
                              fontSize: 13,
                              cursor: "pointer",
                              textAlign: "left",
                              transition: "0.2s"
                            }}
                            className="list-item"
                          >
                            {item.name}
                          </button>
                        ))
                      )}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: RECIPE LIST & FORM */}
          <div>
            {(activeTab === "product" && selectedProductId) || (activeTab === "topping" && selectedToppingId) ? (
              <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: "24px 8px 32px 32px", boxShadow: "0 4px 20px rgba(0,0,0,0.02)", height: "calc(100vh - 160px)", display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: 24, paddingRight: 24 }}>
                  <h3 style={{ fontSize: 18, fontWeight: 900 }}>
                    Công thức - {activeTab === "product" 
                      ? products.find(p => p.id === selectedProductId)?.name_vi 
                      : toppings.find(t => t.id === selectedToppingId)?.name}
                  </h3>
                  <p style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>Danh sách nguyên liệu và định lượng cần thiết.</p>
                </div>

                <div style={{ flex: 1, overflowY: "auto", paddingRight: 16, marginBottom: 24 }} className="custom-scroll">
                  {recipes.length === 0 ? (
                    <div style={{ padding: 24, textAlign: "center", color: "var(--text-secondary)" }}>
                      Chưa có công thức nào. Thêm nguyên liệu ở dưới.
                    </div>
                  ) : (
                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      {recipes.map(r => (
                        <div key={r.id} style={{ padding: "16px 20px", borderRadius: 16, background: "var(--bg-primary)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 4 }}>{r.material_name}</div>
                            <div style={{ fontSize: 12, color: "var(--text-secondary)", fontWeight: 700 }}>
                              {r.quantity} {r.material_unit} • ₫{(r.quantity * (r.cost_per_unit || 0)).toLocaleString("vi-VN")}
                            </div>
                          </div>
                          {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                            <button onClick={() => handleDeleteRecipe(r.id)} style={{ background: "transparent", border: "none", color: "var(--danger)", cursor: "pointer" }} title="Xóa">
                              <HiTrash size={18}/>
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Add Recipe Form */}
                {currentUser?.role?.toUpperCase() === 'ADMIN' && (
                  <div style={{ paddingTop: 16, borderTop: "1px solid var(--border)" }}>
                    <h4 style={{ fontSize: 13, fontWeight: 900, marginBottom: 16 }}>THÊM NGUYÊN LIỆU</h4>
                    <form onSubmit={handleAddRecipe} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <label style={labelStyle}>CHỌN NGUYÊN LIỆU</label>
                        <select style={inputStyle} value={recipeForm.material_id} onChange={e => setRecipeForm({ ...recipeForm, material_id: e.target.value })} required>
                          <option value="">-- Chọn nguyên liệu --</option>
                          {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                        </select>
                      </div>
                      <div>
                        <label style={labelStyle}>ĐỊNH LƯỢNG CẦN DÙNG</label>
                        <input type="number" step="0.01" required placeholder="VD: 30" style={inputStyle} value={recipeForm.quantity} onChange={e => setRecipeForm({ ...recipeForm, quantity: e.target.value })} />
                      </div>
                      <button disabled={loading} type="submit" style={{ width: "100%", padding: 12, background: "var(--accent)", color: "white", border: "none", borderRadius: 12, fontSize: 12, fontWeight: 900, cursor: "pointer", display: "flex", gap: 8, alignItems: "center", justifyContent: "center", transition: "0.2s" }} className="hover-btn">
                        {loading ? <AiOutlineLoading3Quarters size={16} className="spin" /> : <><HiPlus size={16}/> THÊM NGUYÊN LIỆU</>}
                      </button>
                    </form>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ background: "white", borderRadius: 24, border: "1px solid var(--border)", padding: 32, height: "calc(100vh - 160px)", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--text-secondary)" }}>
                <div>
                  <div style={{ fontSize: 40, marginBottom: 16, display: "flex", justifyContent: "center", opacity: 0.2 }}><HiCollection /></div>
                  <p style={{ fontSize: 14, fontWeight: 700 }}>Chọn một {activeTab === "product" ? "sản phẩm" : "topping"} ở bên trái để xem và quản lý công thức</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
