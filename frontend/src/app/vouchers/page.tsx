"use client";
import { useState, useEffect } from "react";
import { createVoucher, getVoucherStatus, getVouchers, getVoucherStats } from "@/lib/api";
import type { Voucher, VoucherStats } from "@/types";
import { HiTicket, HiClock, HiDuplicate } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

export default function VoucherPage() {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [stats, setStats] = useState<VoucherStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const [employeeId, setEmployeeId] = useState("");
  const [amount, setAmount] = useState<number>(100000);
  const [creating, setCreating] = useState(false);
  const [newVoucher, setNewVoucher] = useState<string | null>(null);

  const [checkCode, setCheckCode] = useState("");
  const [checkResult, setCheckResult] = useState<Voucher | null>(null);
  const [checkLoading, setCheckLoading] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    fetchData();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = async () => {
    try {
      const vData = await getVouchers({ limit: 12 });
      const sData = await getVoucherStats();
      setVouchers((vData as any).data); setStats(sData);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault(); if (!employeeId) return;
    setCreating(true); setNewVoucher(null);
    try {
      const v = await createVoucher({ employee_id: employeeId, amount });
      setNewVoucher(v.voucher_code); setEmployeeId(""); fetchData();
    } catch (err: any) { alert("Lỗi tạo voucher"); } finally { setCreating(false); }
  };

  const handleCheck = async () => {
    if (!checkCode) return;
    setCheckLoading(true); setCheckResult(null);
    try {
      const res = await getVoucherStatus(checkCode.trim());
      setCheckResult(res);
    } catch (err: any) { alert("Không thấy mã"); } finally { setCheckLoading(false); }
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", paddingLeft: isMobile ? 0 : 80 }}>
      <AiOutlineLoading3Quarters size={32} className="spin" color="var(--accent)" />
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px", paddingLeft: isMobile ? "24px" : "120px" }}>
      <div style={{ marginBottom: 40 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900 }}>E-Voucher GOLD</h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Ưu đãi nội bộ chuỗi Thịnh Thế Vinh Hoa</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "TỔNG PHÁT", value: stats?.total || 0 },
          { label: "SỬ DỤNG", value: stats?.used || 0 },
          { label: "CÒN LẠI", value: stats?.unused || 0 },
          { label: "GIÁ TRỊ", value: (stats?.total_discount_given || 0).toLocaleString('vi-VN') + ' đ' },
        ].map((s, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 24, padding: "32px", boxShadow: "0 4px 10px rgba(0,0,0,0.02)" }}>
            <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 900, marginBottom: 8 }}>{s.label}</p>
            <p style={{ fontSize: 24, fontWeight: 900 }}>{s.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: 32 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <section style={{ background: "white", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 28 }}>Tạo Voucher</h3>
            <form onSubmit={handleCreate}>
              <div style={{ marginBottom: 20 }}><label style={{ display: "block", fontSize: 12, fontWeight: 900, marginBottom: 10 }}>NHÂN VIÊN (ID)</label><input type="text" value={employeeId} onChange={(e) => setEmployeeId(e.target.value)} placeholder="VD: NV001" required style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, fontWeight: 800 }} /></div>
              <div style={{ marginBottom: 32 }}><label style={{ display: "block", fontSize: 12, fontWeight: 900, marginBottom: 10 }}>MỆNH GIÁ</label><select value={amount} onChange={(e) => setAmount(Number(e.target.value))} style={{ width: "100%", background: "var(--bg-primary)", border: "1px solid var(--border)", borderRadius: 12, padding: 14, fontWeight: 900 }}><option value={100000}>100,000 ₫</option><option value={200000}>200,000 ₫</option><option value={500000}>500,000 ₫</option></select></div>
              <button type="submit" disabled={creating} className="btn-primary" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, padding: 16 }}>{creating ? <AiOutlineLoading3Quarters size={20} className="spin" /> : <HiTicket size={22} />} PHÁT HÀNH</button>
            </form>
            {newVoucher && (
              <div style={{ marginTop: 24, padding: 24, background: "var(--accent-light)", borderRadius: 16, border: "1px dashed var(--accent)", textAlign: "center" }}>
                <p style={{ fontSize: 12, fontWeight: 900, color: "var(--accent)", marginBottom: 12 }}>CODE: {newVoucher}</p>
                <button onClick={() => { navigator.clipboard.writeText(newVoucher); alert("Copied!"); }} style={{ background: "white", padding: "10px 20px", borderRadius: 10, fontWeight: 900, display: "inline-flex", alignItems: "center", gap: 8, cursor: "pointer", border: "1px solid var(--border)" }}><HiDuplicate size={18} /> COPY</button>
              </div>
            )}
          </section>

          <section style={{ background: "white", border: "1px solid var(--border)", borderRadius: 24, padding: 32 }}>
            <h3 style={{ fontSize: 18, fontWeight: 900, marginBottom: 24 }}>Check Code</h3>
            <div style={{ display: "flex", gap: 10, marginBottom: 20 }}><input type="text" placeholder="Nhập mã..." value={checkCode} onChange={(e) => setCheckCode(e.target.value.toUpperCase())} style={{ flex: 1, border: "1px solid var(--border)", borderRadius: 12, padding: 14, fontWeight: 800, fontFamily: "monospace" }} /><button onClick={handleCheck} disabled={checkLoading} className="btn-primary" style={{ padding: "0 22px" }}>CHECK</button></div>
            {checkResult && (
              <div style={{ background: "var(--bg-primary)", borderRadius: 16, padding: 20, display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }}>
                <div><p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>STATUS</p><span className={`badge badge-${checkResult.status === "UNUSED" ? "warning" : "success"}`} style={{ fontSize: 10 }}>{checkResult.status}</span></div>
                <div><p style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>GIÁ TRỊ</p><p style={{ fontWeight: 800, fontSize: 14 }}>{formatVND(checkResult.amount)}</p></div>
              </div>
            )}
          </section>
        </div>

        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 24, overflow: "hidden" }}>
          <div style={{ padding: 32, borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 18, fontWeight: 900 }}>Issuing Log</h3><HiClock size={20} color="var(--text-muted)" /></div>
          <div style={{ overflowY: "auto", maxHeight: 500 }}>
            {vouchers.map((v, i) => (
              <div key={i} style={{ padding: "20px 32px", borderBottom: "1px solid var(--border-light)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div><p style={{ fontSize: 14, fontWeight: 900, fontFamily: "monospace" }}>{v.voucher_code}</p><p style={{ fontSize: 12, color: "var(--text-muted)", fontWeight: 700 }}>{v.employee_id} • {v.created_at ? format(new Date(v.created_at), "dd/MM") : "-"}</p></div>
                <div style={{ textAlign: "right" }}><p style={{ fontSize: 15, fontWeight: 900, color: "var(--accent)" }}>{formatVND(v.amount)}</p><span className={`badge badge-${v.status === "UNUSED" ? "warning" : "success"}`} style={{ fontSize: 9 }}>{v.status}</span></div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
