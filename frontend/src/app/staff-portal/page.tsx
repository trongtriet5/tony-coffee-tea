"use client";
import { useState, useEffect } from "react";
import { getVouchers } from "@/lib/api";
import { Voucher, Employee } from "@/types";
import { QRCodeSVG } from "qrcode.react";
import Barcode from "react-barcode";
import { HiTicket, HiCheckCircle, HiXCircle, HiLogout, HiUser, HiStar, HiChevronRight, HiLightningBolt } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

type Brand = "MAYCHA" | "TAMHAO";

export default function StaffPortal() {
  const [employeeId, setEmployeeId] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [employee, setEmployee] = useState<any>(null);
  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [selectedVoucher, setSelectedVoucher] = useState<any>(null);
  const [activeBrand, setActiveBrand] = useState<Brand>("MAYCHA");
  const [isMobile, setIsMobile] = useState(false);

  const [selectedAmount, setSelectedAmount] = useState<number>(50);

  useEffect(() => {
    const savedId = localStorage.getItem("staff_id");
    if (savedId) handleLogin(savedId);

    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogin = async (id: string) => {
    setLoading(true);
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/voucher/employee/${id}`);
      if (!resp.ok) throw new Error("ID không tồn tại");
      const empData = await resp.json();
      setEmployee(empData);
      setIsLoggedIn(true);
      localStorage.setItem("staff_id", id);

      const { data } = await getVouchers({ limit: 30 });
      setVouchers(data.filter((v: any) => v.employee_id === id));
    } catch (err) {
      alert("Sai mã nhân viên hoặc chưa là thành viên chính thức");
      localStorage.removeItem("staff_id");
    } finally {
      setLoading(false);
    }
  };

  const handleGetVoucher = async () => {
    if (!employee?.id) return;
    setCreating(true);
    try {
      const resp = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'}/voucher/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          employee_id: employee.id,
          amount: selectedAmount,
          brand: activeBrand
        })
      });

      if (!resp.ok) {
        const err = await resp.json();
        throw new Error(err.message || "Lỗi tạo voucher");
      }

      const v = await resp.json();
      setVouchers([v, ...vouchers]);
      setSelectedVoucher(v);
      handleLogin(employee.id);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setCreating(false);
    }
  };

  const containerStyle: React.CSSProperties = {
    minHeight: "100vh",
    background: "var(--bg-primary)",
    color: "var(--text-primary)",
    padding: "24px 20px 100px",
    paddingLeft: isMobile ? 20 : 100, // Account for fixed sidebar
    transition: "padding 0.3s ease"
  };

  const contentStyle: React.CSSProperties = {
    maxWidth: 480,
    margin: "0 auto"
  };

  if (loading) return (
    <div style={containerStyle}>
      <div style={{ ...contentStyle, display: "flex", alignItems: "center", justifyContent: "center", minHeight: "80vh" }}>
        <AiOutlineLoading3Quarters size={40} className="spin" color="var(--accent)" />
      </div>
    </div>
  );

  if (!isLoggedIn) return (
    <div style={containerStyle}>
      <div style={{ ...contentStyle, paddingTop: "10vh" }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div style={{ background: "var(--gold-gradient)", width: 80, height: 80, borderRadius: 28, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", boxShadow: "var(--shadow-lg)" }}>
            <HiStar size={44} color="white" />
          </div>
          <h1 style={{ color: "var(--text-primary)", fontSize: 26, fontWeight: 900, letterSpacing: -1 }}>TTVH Staff Portal</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, fontWeight: 600, marginTop: 4 }}>Dành riêng cho nhân viên Thịnh Thế Vinh Hoa</p>
        </div>

        <div style={{ width: "100%", background: "white", padding: 40, borderRadius: 32, border: "1px solid var(--border)", boxShadow: "var(--shadow-md)" }}>
          <label style={{ display: "block", color: "var(--text-muted)", fontSize: 11, fontWeight: 800, marginBottom: 10, letterSpacing: 1 }}>MÃ NHÂN VIÊN</label>
          <input
            type="text"
            value={employeeId}
            onChange={(e) => setEmployeeId(e.target.value.toUpperCase())}
            placeholder="VD: NV001"
            style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 16, padding: "18px 20px", color: "var(--text-primary)", fontWeight: 800, fontSize: 18, marginBottom: 24, outline: "none" }}
          />
          <button
            onClick={() => handleLogin(employeeId)}
            className="btn-primary"
            style={{ width: "100%", padding: 18, fontSize: 15, fontWeight: 900 }}
          >
            XÁC THỰC DANH TÍNH
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 14, background: "var(--gold-gradient)", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
              <HiUser size={24} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div>
                <h2 style={{ fontSize: 16, fontWeight: 900 }}>{employee?.name}</h2>
                <p style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 700 }}>{employee?.position_name} • {employee?.role}</p>
              </div>
              <div style={{ background: "white", padding: "6px 14px", borderRadius: 100, border: "1.5px solid var(--accent-light)", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
                <HiLightningBolt size={14} color="var(--accent)" />
                <span style={{ fontSize: 13, fontWeight: 900, color: "var(--accent)" }}>{employee?.balance || 0}</span>
                <span style={{ fontSize: 10, fontWeight: 800, color: "var(--text-muted)", marginTop: 1 }}>Tổng điểm</span>
              </div>
            </div>
          </div>
          <button onClick={() => { setIsLoggedIn(false); localStorage.removeItem("staff_id"); }} style={{ width: 40, height: 40, borderRadius: 12, background: "white", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--danger)" }}>
            <HiLogout size={20} />
          </button>
        </div>

        {/* Brand Selector */}
        <div style={{ display: "flex", background: "white", padding: 6, borderRadius: 18, border: "1px solid var(--border)", marginBottom: 24 }}>
          <button
            onClick={() => setActiveBrand("MAYCHA")}
            style={{ flex: 1, padding: "12px", borderRadius: 14, border: "none", background: activeBrand === "MAYCHA" ? "var(--gold-gradient)" : "transparent", color: activeBrand === "MAYCHA" ? "white" : "var(--text-secondary)", fontWeight: 800, fontSize: 13, transition: "0.3s" }}
          >
            MAYCHA
          </button>
          <button
            onClick={() => setActiveBrand("TAMHAO")}
            style={{ flex: 1, padding: "12px", borderRadius: 14, border: "none", background: activeBrand === "TAMHAO" ? "var(--gold-gradient)" : "transparent", color: activeBrand === "TAMHAO" ? "white" : "var(--text-secondary)", fontWeight: 800, fontSize: 13, transition: "0.3s" }}
          >
            TAM HẢO
          </button>
        </div>

        {/* Allowance Insight */}
        <div className="card" style={{ padding: 28, marginBottom: 24, position: "relative", overflow: "hidden", background: "white" }}>
          <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.05 }}><HiLightningBolt size={120} color="var(--accent)" /></div>
          <p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 12 }}>ĐIỂM TRONG THÁNG ({activeBrand})</p>
          <h3 style={{ fontSize: 42, fontWeight: 900, color: "var(--text-primary)", marginBottom: 4 }}>
            {employee?.balances ? employee.balances[activeBrand].toFixed(0) : 0}<span style={{ fontSize: 18, marginLeft: 6 }}> điểm</span>
          </h3>
          <p style={{ fontSize: 13, color: "var(--success)", fontWeight: 800 }}>
            ≃ {formatVND((employee?.balances?.[activeBrand] || 0) * 1000)} Giảm giá
          </p>
        </div>

        {/* Amount Selector */}
        <div style={{ marginBottom: 32 }}>
          <p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)", letterSpacing: 1, marginBottom: 16 }}>CHỌN MỨC ĐỔI</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
            {[50, 100, 200, 300].map(amt => (
              <button
                key={amt}
                onClick={() => setSelectedAmount(amt)}
                style={{
                  padding: "16px 0",
                  borderRadius: 16,
                  border: selectedAmount === amt ? "2px solid var(--accent)" : "1px solid var(--border)",
                  background: selectedAmount === amt ? "var(--accent-light)" : "white",
                  color: selectedAmount === amt ? "var(--accent)" : "var(--text-secondary)",
                  fontWeight: 900,
                  fontSize: 15,
                  transition: "0.2s"
                }}
              >
                {amt} điểm
              </button>
            ))}
          </div>
          <button
            disabled={creating || (employee?.balances?.[activeBrand] || 0) < selectedAmount}
            onClick={handleGetVoucher}
            className="btn-primary"
            style={{ width: "100%", height: 60, marginTop: 24, fontSize: 16, borderRadius: 18, opacity: (employee?.balances?.[activeBrand] || 0) < selectedAmount ? 0.5 : 1 }}
          >
            {creating ? <AiOutlineLoading3Quarters className="spin" /> : `ĐỔI VOUCHER ${selectedAmount} ĐIỂM`}
          </button>
        </div>

        {/* History */}
        <div style={{ marginBottom: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 13, fontWeight: 900, color: "var(--text-muted)", letterSpacing: 1 }}>LỊCH SỬ ĐỔI QUÀ</h3>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {vouchers.length === 0 && <div style={{ textAlign: "center", padding: 40, background: "white", borderRadius: 24, border: "1px dashed var(--border)", color: "var(--text-muted)", fontWeight: 600 }}>Chưa có mã nào được đổi</div>}
          {vouchers.map((v) => (
            <div
              key={v.id}
              onClick={() => setSelectedVoucher(v)}
              className="card"
              style={{ padding: 18, display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: v.brand === 'MAYCHA' ? 'var(--accent-light)' : 'rgba(0,0,0,0.05)', display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <HiTicket size={24} color={v.brand === 'MAYCHA' ? 'var(--accent)' : '#333'} />
                </div>
                <div>
                  <p style={{ fontWeight: 800, fontSize: 15, letterSpacing: 0.5 }}>{v.voucher_code}</p>
                  <p style={{ fontSize: 11, color: "var(--text-secondary)", fontWeight: 600 }}>{v.brand} • {format(new Date(v.created_at), "HH:mm dd/MM/yyyy")}</p>
                </div>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontWeight: 900, fontSize: 14, color: "var(--text-primary)" }}>-{v.amount} điểm</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 4, marginTop: 4 }}>
                  <span className={`badge ${v.status === 'UNUSED' ? 'badge-success' : 'badge-muted'}`} style={{ fontSize: 9 }}>
                    {v.status === 'UNUSED' ? 'CÒN HẠN' : 'ĐÃ DÙNG'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Voucher Detail Modal */}
      {selectedVoucher && (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.6)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20, backdropFilter: "blur(4px)" }}>
          <div className="animate-fade-in" style={{ background: "white", width: "100%", maxWidth: 360, borderRadius: 40, padding: 32, textAlign: "center", position: "relative", boxShadow: "0 20px 50px rgba(0,0,0,0.2)" }}>
            <button onClick={() => setSelectedVoucher(null)} style={{ position: "absolute", top: 20, right: 20, background: "#F1F3F5", border: "none", width: 32, height: 32, borderRadius: "50%", cursor: "pointer", fontWeight: 900 }}>×</button>
            <p style={{ color: "var(--text-secondary)", fontWeight: 800, fontSize: 12, marginBottom: 8 }}>E-VOUCHER NHÂN VIÊN</p>
            <h3 style={{ fontSize: 24, fontWeight: 900, color: "var(--text-primary)", marginBottom: 24 }}>{selectedVoucher.brand}</h3>

            <div style={{ background: "var(--bg-primary)", padding: 24, borderRadius: 28, border: "1px solid var(--border)", marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "center", marginBottom: 20, padding: 12, background: "white", borderRadius: 16 }}>
                <QRCodeSVG value={selectedVoucher.voucher_code} size={160} />
              </div>
              <div style={{ display: "flex", justifyContent: "center", overflow: "hidden", background: "white", padding: "12px 16px", borderRadius: 12 }}>
                <Barcode value={selectedVoucher.voucher_code} width={1.4} height={40} fontSize={12} />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", padding: "0 10px", marginBottom: 24 }}>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 800 }}>GIÁ TRỊ</p>
                <p style={{ fontSize: 18, fontWeight: 900, color: "var(--accent)" }}>{formatVND(selectedVoucher.amount * 1000)}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: 10, color: "var(--text-muted)", fontWeight: 800 }}>HẾT HẠN</p>
                <p style={{ fontSize: 14, fontWeight: 800 }}>{format(new Date(selectedVoucher.expires_at), "dd/MM/yy")}</p>
              </div>
            </div>

            <p style={{ color: "var(--text-muted)", fontSize: 12, fontWeight: 600 }}>Quét mã tại quầy thanh toán POS của {selectedVoucher.brand} để áp dụng giảm giá trực tiếp.</p>
          </div>
        </div>
      )}

      <style jsx>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        .badge-muted { background: var(--border); color: var(--text-secondary); }
      `}</style>
    </div>
  );
}
