"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiArrowLeft, HiViewGrid, HiShoppingCart, HiTicket, HiPresentationChartBar, HiClock } from "react-icons/hi";
import { MdOutlineReceiptLong, MdOutlineSpaceDashboard, MdPayment } from "react-icons/md";

export default function Sidebar() {
  const pathname = usePathname();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) return null; // Hide on mobile for POS screen custom nav

  const menuItems = [
    { href: "/", icon: MdOutlineSpaceDashboard, label: "POS" },
    { href: "/orders", icon: MdOutlineReceiptLong, label: "History" },
    { href: "/dashboard", icon: MdPayment, label: "Stats" },
    { href: "/vouchers", icon: HiTicket, label: "Vouchers" },
  ];

  return (
    <div style={{
      width: 80,
      minWidth: 80,
      height: "100vh",
      background: "white",
      borderRight: "1px solid var(--border)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "24px 0",
      position: "fixed",
      top: 0,
      left: 0,
      zIndex: 1000,
      boxShadow: "4px 0 10px rgba(0,0,0,0.01)"
    }}>
      {/* Nav Menu */}
      <div style={{ display: "flex", flexDirection: "column", gap: 32, marginTop: 40 }}>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} style={{ 
              color: isActive ? "var(--accent)" : "var(--text-muted)",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "0.2s"
            }}>
              <Icon size={28} />
            </Link>
          );
        })}
      </div>

      {/* Bottom Profile Placeholder */}
      <div style={{ marginTop: "auto", width: 32, height: 32, borderRadius: "50%", background: "var(--bg-primary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 900, color: "var(--accent)", border: "1px solid var(--border)" }}>
        TV
      </div>
    </div>
  );
}
