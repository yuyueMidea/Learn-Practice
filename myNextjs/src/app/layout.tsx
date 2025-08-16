import "./global.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar"; // 新增侧边栏组件

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Routing Demo",
  description: "Demo of routing and menu in Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <html lang="en">
    //   <body >
    //     <Navbar />
    //     <main className="mainContainer">{children}</main>
    //   </body>
    // </html>
    <html lang="en">
      <body>
        {/* 顶部状态条 */}
        <Navbar />

        {/* 主体部分：左侧菜单 + 右侧内容 */}
        <div className="layoutContainer">
          <aside className="sidebar">
            <Sidebar />
          </aside>
          <main className="content">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}