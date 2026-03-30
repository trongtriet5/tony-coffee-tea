"use client";
import { useState, useEffect } from "react";
import { getDashboardStats } from "@/lib/api";
import type { DashboardStats } from "@/types";
import {
  HiCalendar, HiDownload, HiCurrencyDollar,
  HiShoppingCart, HiTicket, HiTrendingUp, HiStar,
  HiChevronDown
} from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { format, subDays, subMonths } from "date-fns";
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend, Filler, ChartDataLabels
);

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

  // Filtering states
  const [range, setRange] = useState("7d");
  const [startDate, setStartDate] = useState<string>(format(subDays(new Date(), 7), "yyyy-MM-dd"));
  const [endDate, setEndDate] = useState<string>(format(new Date(), "yyyy-MM-dd"));
  const [showRangeDropdown, setShowRangeDropdown] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    fetchData();
  }, [startDate, endDate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const d = await getDashboardStats({ startDate, endDate });
      setStats(d);
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  const handleRangeSelect = (r: string) => {
    setRange(r);
    setShowRangeDropdown(false);
    const now = new Date();
    let start = now;

    if (r === "7d") start = subDays(now, 7);
    else if (r === "1m") start = subMonths(now, 1);
    else if (r === "3m") start = subMonths(now, 3);
    else if (r === "6m") start = subMonths(now, 6);
    else if (r === "12m") start = subMonths(now, 12);

    if (r !== 'custom') {
      setStartDate(format(start, "yyyy-MM-dd"));
      setEndDate(format(now, "yyyy-MM-dd"));
    }
  };

  const rangeLabels: Record<string, string> = {
    "7d": "7 ngày gần nhất",
    "1m": "1 tháng gần nhất",
    "3m": "3 tháng gần nhất",
    "6m": "6 tháng gần nhất",
    "12m": "12 tháng gần nhất",
    "custom": "Tùy chỉnh khoảng ngày"
  };

  if (loading && !stats) return (
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
          <p style={{ color: "var(--text-secondary)", fontSize: 13, fontWeight: 700 }}>Phân tích tài chính TTVH POS</p>
        </div>
        <div style={{ display: "flex", gap: 16 }}>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setShowRangeDropdown(!showRangeDropdown)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 24px", borderRadius: 14, background: "white", border: "1px solid var(--border)", color: "var(--text-primary)", fontSize: 13, fontWeight: 800, cursor: "pointer" }}
            >
              <HiCalendar size={18} /> {rangeLabels[range].toUpperCase()} <HiChevronDown size={16} />
            </button>

            {showRangeDropdown && (
              <div style={{ position: "absolute", top: "100%", right: 0, marginTop: 8, background: "white", borderRadius: 20, border: "1px solid var(--border)", boxShadow: "0 10px 40px rgba(0,0,0,0.1)", zIndex: 2000, width: 240, overflow: "hidden" }}>
                {Object.entries(rangeLabels).map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => handleRangeSelect(k)}
                    style={{ width: "100%", textAlign: "left", padding: "14px 20px", background: range === k ? "var(--bg-primary)" : "white", border: "none", color: range === k ? "var(--accent)" : "var(--text-primary)", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "0.2s" }}
                  >
                    {v}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {range === 'custom' && (
        <div style={{ display: "flex", gap: 16, marginBottom: 32, background: "white", padding: 24, borderRadius: 24, border: "1px solid var(--border)", width: "fit-content" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>TỪ NGÀY</label>
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} style={{ padding: "10px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 11, fontWeight: 900, color: "var(--text-muted)" }}>ĐẾN NGÀY</label>
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} style={{ padding: "10px 16px", borderRadius: 12, border: "1px solid var(--border)", fontSize: 13, fontWeight: 700, outline: "none" }} />
          </div>
        </div>
      )}

      {/* METRIC CARDS */}
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(4, 1fr)", gap: 24, marginBottom: 40 }}>
        {[
          { label: "DOANH THU (PERIOD)", value: formatVND(stats?.today_revenue || 0), icon: HiCurrencyDollar, color: "var(--text-primary)" },
          { label: "ĐƠN HÀNG (SỐ LƯỢNG)", value: stats?.today_orders || 0, icon: HiShoppingCart, color: "var(--accent)" },
          { label: "KHUYẾN MÃI (CHẾ KHẤU)", value: formatVND(stats?.today_discount || 0), icon: HiTicket, color: "var(--danger)" },
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
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 48 }}>
            <div>
              <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Revenue Flow</h3>
              <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>Biến động doanh thu trong giai đoạn chọn</p>
            </div>
            {loading && <AiOutlineLoading3Quarters className="spin" color="var(--accent)" />}
          </div>

          <div style={{ position: "relative", height: 380, width: "100%" }}>
            {stats && (
              <Line
                data={{
                  labels: stats.revenue_by_day.map(d => format(new Date(d.date), "dd/MM")),
                  datasets: [{
                    fill: true,
                    label: 'Doanh thu',
                    data: stats.revenue_by_day.map(d => d.revenue),
                    borderColor: '#e1c233',
                    backgroundColor: (context: any) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 380);
                      gradient.addColorStop(0, 'rgba(225, 194, 51, 0.4)');
                      gradient.addColorStop(1, 'rgba(225, 194, 51, 0)');
                      return gradient;
                    },
                    borderWidth: 3,
                    pointRadius: isMobile ? 0 : 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#e1c233',
                    pointHoverRadius: 6,
                    tension: 0.4
                  }]
                }}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    datalabels: {
                      color: '#caa21a',
                      anchor: 'end',
                      align: 'top',
                      font: { weight: 800, size: 9 },
                      formatter: (v: any) => v > 0 ? formatK(v) : '',
                      display: 'auto'
                    },
                    tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 12, callbacks: { label: (c: any) => formatVND(c.raw as number) } }
                  },
                  scales: {
                    y: {
                      beginAtZero: true,
                      border: { display: false },
                      grid: { color: 'rgba(0, 0, 0, 0.04)' },
                      ticks: { callback: (v: any) => formatK(v as number), font: { family: 'inherit', size: 11, weight: 800 }, color: 'var(--text-muted)' }
                    },
                    x: {
                      border: { display: false },
                      grid: { display: false },
                      ticks: { maxTicksLimit: stats.revenue_by_day.length > 30 ? 15 : undefined, font: { family: 'inherit', size: 10, weight: 800 }, color: 'var(--text-muted)' }
                    }
                  }
                }}
              />
            )}
          </div>
        </div>

        {/* TOP PRODUCTS CHART */}
        <div style={{ background: "white", border: "1px solid var(--border)", borderRadius: 32, padding: "40px" }}>
          <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, display: "flex", alignItems: "center", gap: 10 }}>
            <HiStar color="var(--accent)" /> Top Performance
          </h3>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700, marginBottom: 32 }}>Sản phẩm bán chạy nhất giai đoạn này</p>

          <div style={{ height: 260, width: "100%" }}>
            {stats && (
              <Bar
                data={{
                  labels: stats.top_products.map(p => {
                    if (p.name.length > 10) {
                      const w = p.name.split(' ');
                      const half = Math.ceil(w.length / 2);
                      return [w.slice(0, half).join(' '), w.slice(half).join(' ')];
                    }
                    return p.name;
                  }),
                  datasets: [{
                    label: 'Đã bán',
                    data: stats.top_products.map(p => p.count),
                    backgroundColor: (context: any) => {
                      const ctx = context.chart.ctx;
                      const area = context.chart.chartArea;
                      if (!area) return '#caa21a';
                      const gradient = ctx.createLinearGradient(area.left, 0, area.right, 0);
                      gradient.addColorStop(0, '#f2d45c');
                      gradient.addColorStop(1, '#caa21a');
                      return gradient;
                    },
                    borderRadius: 6,
                    barPercentage: 0.6,
                    categoryPercentage: 0.8
                  }]
                }}
                options={{
                  indexAxis: 'y',
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    datalabels: {
                      color: '#caa21a',
                      anchor: 'end',
                      align: 'end',
                      font: { weight: 900, size: 11 },
                      formatter: (v: any) => `${v} món`
                    },
                    tooltip: {
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      padding: 12,
                      callbacks: {
                        title: (c: any) => {
                          const title = c[0].label || '';
                          return typeof title === 'object' ? title.join(' ') : title;
                        }
                      }
                    }
                  },
                  scales: {
                    x: { display: false, max: Math.max(...(stats.top_products.map(p => p.count) || [0]), 10) * 1.35 },
                    y: {
                      border: { display: false },
                      grid: { display: false },
                      ticks: { font: { family: 'inherit', size: 11, weight: 800 }, color: 'var(--text-primary)' }
                    }
                  },
                  layout: { padding: { right: 40, left: 40 } }
                }}
              />
            )}
          </div>
        </div>
      </div>

      {/* TRANSACTION COUNT ANALYZE (HOURLY) */}
      <div style={{ marginTop: 32, background: "white", border: "1px solid var(--border)", borderRadius: 32, padding: "48px" }}>
        <div style={{ marginBottom: 40 }}>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 4 }}>Total Product Sold</h3>
          <p style={{ fontSize: 13, color: "var(--text-secondary)", fontWeight: 700 }}>Tổng hợp lưu lượng bán ra (sản phẩm và topping) theo khung giờ</p>
        </div>

        <div style={{ height: 320, width: "100%" }}>
          {stats && (
            <Bar
              data={{
                labels: stats.transaction_count_by_hour.map(h => h.hour),
                datasets: [
                  {
                    label: 'Sản phẩm',
                    data: stats.transaction_count_by_hour.map(h => h.products),
                    backgroundColor: (context: any) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 320);
                      gradient.addColorStop(0, '#f2d45c');
                      gradient.addColorStop(1, '#caa21a');
                      return gradient;
                    },
                    borderRadius: 6,
                    borderWidth: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.5
                  },
                  {
                    label: 'Topping',
                    data: stats.transaction_count_by_hour.map(h => h.toppings),
                    backgroundColor: '#e5e7eb',
                    borderRadius: 6,
                    borderWidth: 0,
                    barPercentage: 0.8,
                    categoryPercentage: 0.5
                  }
                ]
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: { 
                    display: true,
                    position: 'top',
                    align: 'center',
                    labels: { 
                      font: { family: 'inherit', size: 11, weight: 800 }, 
                      color: 'var(--text-primary)', 
                      usePointStyle: true,
                      padding: 24 // Padding around the legend items to push them away from data labels
                    }
                  },
                  datalabels: {
                    color: (ctx: any) => ctx.datasetIndex === 0 ? '#caa21a' : '#888',
                    anchor: 'end',
                    align: 'top',
                    font: { weight: 900, size: 10 },
                    formatter: (v: any) => v > 0 ? v : '',
                    display: 'auto'
                  },
                  tooltip: { backgroundColor: 'rgba(0,0,0,0.8)', padding: 12, callbacks: { label: (c: any) => `${c.raw} ${c.datasetIndex === 0 ? 'món' : 'topping'}` } }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    border: { display: false },
                    grid: { color: 'rgba(0, 0, 0, 0.04)' },
                    ticks: { font: { family: 'inherit', size: 11, weight: 800 }, color: 'var(--text-muted)' }
                  },
                  x: {
                    border: { display: false },
                    grid: { display: false },
                    ticks: { font: { family: 'inherit', size: 10, weight: 800 }, color: 'var(--text-muted)' }
                  }
                }
              }}
            />
          )}
        </div>
      </div>

      <style jsx>{`
        .spin { animation: spin 1s linear infinite; } 
        @keyframes spin { 100% { transform: rotate(360deg); } } 
        .bar:hover { filter: brightness(1.1); }
      `}</style>
    </div>
  );
}
