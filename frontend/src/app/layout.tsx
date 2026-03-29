import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

export const metadata: Metadata = {
  title: "TTVH POS GOLD - F&B Management System",
  description: "Hệ thống bán hàng TTVH POS chuyên nghiệp tích hợp voucher dành cho Thịnh Thế Vinh Hoa",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
        <Sidebar />
        <main style={{ minHeight: "100vh" }}>
          {children}
        </main>
      </body>
    </html>
  );
}
