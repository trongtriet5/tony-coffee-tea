"use client";
import React, { useState, useEffect } from "react";
import { getProductRecipes, getToppingRecipes, createProductRecipe, createToppingRecipe, deleteProductRecipe, deleteToppingRecipe } from "@/lib/api";
import { getProducts, getToppings, getMaterials } from "@/lib/api";
import { Product, Topping, Material } from "@/types";
import { HiPlus, HiCollection, HiSparkles, HiCheck, HiPencilAlt, HiTrash } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function RecipePage() {
  const [activeTab, setActiveTab] = useState<"product" | "topping">("product");
  const [products, setProducts] = useState<Product[]>([]);
  const [toppings, setToppings] = useState<Topping[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);

  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const [selectedToppingId, setSelectedToppingId] = useState<string>("");
  const [recipes, setRecipes] = useState<any[]>([]);

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [successMsg, setSuccessMsg] = useState("");

  const [recipeForm, setRecipeForm] = useState({ material_id: "", quantity: "" });

  useEffect(() => {
    fetchData();
  }, []);

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

  const notify = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
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
      notify("Thêm công thức thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm công thức");
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
      notify("Xóa công thức thành công!");
    } catch (error) {
      alert("Có lỗi xảy ra khi xóa công thức");
    } finally { setLoading(false); }
  };

  const inputStyle = { width: "100%", padding: "12px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none", transition: "0.2s", background: "white" };
  const labelStyle = { fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 8, display: "block", letterSpacing: "0.5px" };

  const totalRecipeCost = (recipes || []).reduce((sum, r) => sum + (r.quantity * (r.cost_per_unit || 0)), 0);

  const [searchItem, setSearchItem] = useState("");
  const filteredItems = (activeTab === "product" ? products : toppings).filter(item => {
    const name = activeTab === "product" ? (item as Product).name_vi : (item as Topping).name;
    return name.toLowerCase().includes(searchItem.toLowerCase());
  });

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px 40px 40px 100px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* HEADER */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, marginBottom: 8 }}>Định Lượng <span style={{ color: "var(--accent)" }}>Công Thức</span></h1>
            <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Quản lý BOM (Bill of Materials) • Tối ưu hóa chi phí cốt (Food Cost)</p>
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

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 32 }}>

          {/* LEFT: MASTER LIST */}
          <div style={{ display: "flex", flexDirection: "column", gap: 24, position: "sticky", top: 40, maxHeight: "calc(100vh - 80px)" }}>
            {/* Tab Switcher */}
            <div style={{ display: "flex", gap: 6, background: "white", padding: 6, borderRadius: 18, border: "1px solid var(--border)", boxShadow: "0 2px 10px rgba(0,0,0,0.02)" }}>
              <button onClick={() => { setActiveTab("product"); setSelectedProductId(""); setRecipes([]); }} style={{ flex: 1, padding: "10px", borderRadius: 14, border: "none", background: activeTab === "product" ? "var(--gold-gradient)" : "transparent", color: activeTab === "product" ? "white" : "var(--text-muted)", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: "0.2s" }}>
                 SẢN PHẨM
              </button>
              <button onClick={() => { setActiveTab("topping"); setSelectedToppingId(""); setRecipes([]); }} style={{ flex: 1, padding: "10px", borderRadius: 14, border: "none", background: activeTab === "topping" ? "var(--gold-gradient)" : "transparent", color: activeTab === "topping" ? "white" : "var(--text-muted)", fontWeight: 900, fontSize: 11, cursor: "pointer", transition: "0.2s" }}>
                 TOPPING
              </button>
            </div>

            {/* Selection Column */}
            <div className="card" style={{ padding: 24, overflow: "hidden", display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative", marginBottom: 20 }}>
                 <input 
                   type="text" 
                   placeholder="Tìm tên..." 
                   value={searchItem}
                   onChange={e => setSearchItem(e.target.value)}
                   style={{ ...inputStyle, paddingLeft: 36, fontSize: 12 }} 
                 />
                 <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--text-muted)" }}>🔍</span>
              </div>

              <div style={{ flex: 1, overflowY: "auto", paddingRight: 8 }} className="custom-scroll">
                 <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {fetchLoading ? (
                    <div style={{ padding: 40, textAlign: "center" }}><AiOutlineLoading3Quarters size={20} className="spin" color="var(--accent)" /></div>
                  ) : filteredItems.length === 0 ? (
                    <div style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", padding: 20 }}>Rỗng...</div>
                      ) : filteredItems.map(item => {
                    const isSelected = (activeTab === "product" ? selectedProductId : selectedToppingId) === item.id;
                    const displayName = activeTab === "product" ? (item as Product).name_vi : (item as Topping).name;
                    return (
                      <button 
                        key={item.id}
                        onClick={() => activeTab === "product" ? setSelectedProductId(item.id) : setSelectedToppingId(item.id)}
                        style={{
                          padding: "12px 16px", borderRadius: 12, border: "1px solid", 
                          borderColor: isSelected ? "var(--accent)" : "transparent",
                          background: isSelected ? "var(--accent-light)" : "white",
                          color: isSelected ? "var(--accent)" : "var(--text-primary)",
                          fontWeight: isSelected ? 900 : 700, fontSize: 12, cursor: "pointer", textAlign: "left", transition: "0.2s"
                        }}
                      >
                        {displayName}
                      </button>
                    );
                  })}
                 </div>
              </div>
            </div>
          </div>

          {/* RIGHT: DETAIL VIEW */}
          <div>
            {(activeTab === "product" && selectedProductId) || (activeTab === "topping" && selectedToppingId) ? (
              <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                {/* Header Card */}
                <div className="card animate-fade-in" style={{ padding: 32, background: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                   <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                      <div style={{ width: 64, height: 64, borderRadius: 20, background: "var(--accent-light)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                         <HiCollection size={32} />
                      </div>
                      <div>
                        <h2 style={{ fontSize: 24, fontWeight: 900 }}>
                          {activeTab === "product" 
                            ? (products.find(p => p.id === selectedProductId) as Product | undefined)?.name_vi 
                            : (toppings.find(t => t.id === selectedToppingId) as Topping | undefined)?.name}
                        </h2>
                        <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
                           <span className="badge badge-accent">ĐANG CÓ {recipes.length} NGUYÊN LIỆU</span>
                        </div>
                      </div>
                   </div>
                   <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)", marginBottom: 4 }}>CHI PHÍ CỐT (FOOD COST)</p>
                      <p style={{ fontSize: 24, fontWeight: 900, color: "var(--success)" }}>₫{totalRecipeCost.toLocaleString("vi-VN")}</p>
                   </div>
                </div>

                {/* Main Content Dashboard */}
                <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 24 }}>
                   {/* Ingredients List */}
                   <div className="card" style={{ padding: 24 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 20, color: "var(--text-primary)" }}>📜 CHI TIẾT ĐỊNH LƯỢNG</h3>
                      
                      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                        {recipes.length === 0 ? (
                          <div style={{ padding: 40, textAlign: "center", border: "2px dashed var(--border)", borderRadius: 20, color: "var(--text-muted)" }}>
                            <p style={{ fontSize: 12, fontWeight: 700 }}>Chưa có gì được định lượng.</p>
                          </div>
                        ) : recipes.map(r => (
                          <div key={r.id} style={{ padding: "14px 18px", borderRadius: 16, background: "var(--bg-primary)", border: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                             <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--accent)" }}></div>
                                <div>
                                   <div style={{ fontSize: 13, fontWeight: 900 }}>{r.material_name}</div>
                                   <div style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 700 }}>{r.quantity} {r.material_unit}</div>
                                </div>
                             </div>
                             <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                                <div style={{ textAlign: "right" }}>
                                   <div style={{ fontSize: 14, fontWeight: 900, color: "var(--text-primary)" }}>₫{(r.quantity * (r.cost_per_unit || 0)).toLocaleString("vi-VN")}</div>
                                </div>
                                <button onClick={() => handleDeleteRecipe(r.id)} style={{ width: 32, height: 32, borderRadius: 8, background: "white", border: "1px solid var(--border)", color: "var(--danger)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                                   <HiTrash size={16} />
                                </button>
                             </div>
                          </div>
                        ))}
                      </div>
                   </div>

                   {/* Add Form */}
                   <div className="card" style={{ padding: 24, height: "fit-content" }}>
                      <h3 style={{ fontSize: 14, fontWeight: 900, marginBottom: 20, color: "var(--text-primary)" }}>✨ THÊM NGUYÊN LIỆU</h3>
                      <form onSubmit={handleAddRecipe} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        <div>
                          <label style={labelStyle}>TÀI NGUYÊN</label>
                          <select style={{ ...inputStyle, background: "var(--bg-primary)" }} value={recipeForm.material_id} onChange={e => setRecipeForm({...recipeForm, material_id: e.target.value})} required>
                            <option value="">-- Chọn thành phần --</option>
                            {materials.map(m => <option key={m.id} value={m.id}>{m.name} ({m.unit})</option>)}
                          </select>
                        </div>
                        <div>
                          <label style={labelStyle}>SỐ LƯỢNG (DÙNG CHO 1 MÓN)</label>
                          <input type="number" step="0.1" required placeholder="VD: 50.0" style={{ ...inputStyle, background: "var(--bg-primary)" }} value={recipeForm.quantity} onChange={e => setRecipeForm({...recipeForm, quantity: e.target.value})} />
                        </div>
                        <button disabled={loading} type="submit" className="btn-primary" style={{ width: "100%", padding: 14, fontSize: 11 }}>
                          {loading ? <AiOutlineLoading3Quarters size={18} className="spin" /> : "THÊM VÀO CÔNG THỨC"}
                        </button>
                      </form>
                   </div>
                </div>
              </div>
            ) : (
              <div className="card" style={{ padding: 80, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", color: "var(--text-muted)", gap: 20 }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: "var(--accent-light)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                   <HiCollection size={40} />
                </div>
                <div>
                   <h3 style={{ fontSize: 18, fontWeight: 900, color: "var(--text-primary)" }}>CHƯA CHỌN SẢN PHẨM</h3>
                   <p style={{ fontSize: 13, fontWeight: 700, maxWidth: 300, margin: "10px auto" }}>Vui lòng chọn một Sản phẩm hoặc Topping ở menu bên trái để thiết lập BOM.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .custom-scroll::-webkit-scrollbar { width: 4px; }
        .custom-scroll::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
