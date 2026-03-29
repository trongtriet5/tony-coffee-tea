"use client";
import { useState, useEffect } from "react";
import { getDashboardStats } from "@/lib/api";
import type { DashboardStats } from "@/types";
import { 
  HiCalendar, HiDownload, HiCurrencyDollar, 
  HiShoppingCart, HiTicket, HiTrendingUp, HiStar
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format } from "date-fns";

const formatVND = (n: number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);

const formatK = (n: number) => {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(0) + "K";
  return n;
};

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    fetchData();
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const d = await getDashboardStats();
      setStats(d);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  if (loading) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--bg-primary)", paddingLeft: isMobile ? 0 : 80 }}>
      <AiOutlineLoading3Quarters size={32} className="spin" color="var(--accent)" />
    </div>
  );

  const maxRevenue = Math.max(...(stats?.revenue_by_day.map(d => d.revenue) || [1000000]), 1000000) * 1.2;
  const yTicks = [maxRevenue, maxRevenue * 0.75, maxRevenue * 0.5, maxRevenue * 0.25, 0];

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg-primary)", padding: "40px", paddingLeft: isMobile ? "24px" : "120px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
        <div>
           <h1 style={{ fontSize: 32, fontWeight: 900 }}>Financial Overview</h1>
           <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Phân tích tài chính TTVH POS GOLD</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 14, background: "white", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 13, fontWeight: 800 }}>
            <HiCalendar size={18} /> 7 NGÀY GẦN NHẤT
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 14, background: "var(--gold-gradient)", border: "none", color: "white", fontSize: 13, fontWeight: 900 }}>
            <HiDownload size={18} /> XUẤT CSV
          </button>
        </div>
      </div>

      {/* METRIC CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "DOANH THU (GROSS)", value: formatVND(stats?.today_revenue || 0), icon: HiCurrencyDollar, color: "var(--text-primary)" },
          { label: "ĐƠN HÀNG (SỐ LƯỢNG)", value: stats?.today_orders || 0, icon: HiShoppingCart, color: "var(--accent)" },
          { label: "KHUYẾN MÃI (GIẢM GIÁ)", value: formatVND(stats?.today_discount || 0), icon: HiTicket, color: "var(--danger)" },
          { label: "DOANH THU NET", value: formatVND(stats?.today_net_revenue || 0), icon: HiTrendingUp, color: "var(--success)" },
        ].map((c, i) => (
          <div key={i} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 24, padding: "32px", boxShadow: "0 4px 12px rgba(0,0,0,0.02)" }}>
             <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                <c.icon size={22} color={c.color || "var(--accent)"} />
             </div>
             <p style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 800, letterSpacing: "1px", marginBottom: 6 }}>{c.label}</p>
             <p style={{ fontSize: 24, fontWeight: 900, color: c.label === "DOANH THU NET" ? "var(--success)" : "inherit" }}>{c.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 400px", gap: 32 }}>
        {/* REVENUE FLOW CHART */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 32, padding: "48px" }}>
            <div style={{ marginBottom: 48 }}>
               <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Daily Revenue Flow</h3>
               <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>Biến động doanh thu thực tế</p>
            </div>
            
            <div style={{ position: "relative", height: 380, display: "flex", gap: 24 }}>
               <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100% - 40px)", paddingRight: 8 }}>
                  {yTicks.map((t, idx) => (
                     <span key={idx} style={{ fontSize: 11, color: "var(--text-muted)", fontWeight: 900, textAlign: "right", minWidth: 40 }}>
                        {formatK(t)}
                     </span>
                  ))}
               </div>

               <div style={{ flex: 1, position: "relative", height: "100%", display: "flex", alignItems: "flex-end", gap: isMobile ? 12 : 24 }}>
                  {[0.25, 0.5, 0.75, 1].map((pct, i) => (
                    <div key={i} style={{ position: "absolute", bottom: `calc(40px + ${pct * (100 - 40/100 * 100)}%)`, left: 0, right: 0, borderBottom: "1px dashed #eee", zIndex: 0 }} />
                  ))}
                  <div style={{ position: "absolute", left: 0, right: 0, bottom: 40, borderBottom: "2px solid var(--border-light)", zIndex: 0 }} />

                  {stats?.revenue_by_day.map((day, idx) => {
                     const heightPercent = (day.revenue / maxRevenue) * 100;
                     return (
                        <div key={idx} style={{ flex: 1, position: "relative", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-end", zIndex: 1, paddingBottom: 40 }}>
                           <div style={{ fontSize: 11, fontWeight: 900, color: "var(--accent)", marginBottom: 12 }}>
                              {day.revenue > 0 ? formatK(day.revenue) : "0"}
                           </div>
                           <div className="bar" style={{ width: "100%", maxWidth: 56, height: `${heightPercent}%`, background: "var(--gold-gradient)", borderRadius: "10px 10px 4px 4px", transition: "0.4s", boxShadow: "0 4px 10px rgba(225,194,51,0.15)" }} />
                           <div style={{ position: "absolute", bottom: 0, fontSize: 11, color: "var(--text-muted)", fontWeight: 900 }}>{format(new Date(day.date), "dd/MM")}</div>
                        </div>
                     );
                  })}
               </div>
            </div>
        </div>

        {/* TOP PRODUCTS CHART */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 32, padding: "40px" }}>
            <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
              <HiStar color="var(--accent)" /> Top Trending
            </h3>
            <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700, marginBottom: 32 }}>Sản phẩm bán chạy nhất hôm nay</p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {stats?.top_products.map((p, i) => {
                const maxCount = Math.max(...stats.top_products.map(x => x.count), 1);
                return (
                  <div key={i}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{ fontSize: 14, fontWeight: 800, color: "var(--text-primary)" }}>{p.name}</span>
                      <span style={{ fontSize: 13, fontWeight: 900, color: "var(--accent)" }}>{p.count} đơn</span>
                    </div>
                    <div style={{ height: 10, background: "var(--bg-primary)", borderRadius: 10, overflow: "hidden" }}>
                      <div style={{ width: `${(p.count / maxCount) * 100}%`, height: "100%", background: "var(--gold-gradient)", borderRadius: 10 }} />
                    </div>
                  </div>
                );
              })}
            </div>
        </div>
      </div>

      <style jsx>{`.spin { animation: spin 1s linear infinite; } @keyframes spin { 100% { transform: rotate(360deg); } } .bar:hover { filter: brightness(1.1); }`}</style>
    </div>
  );
}
