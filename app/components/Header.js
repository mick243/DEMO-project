"use client";

import { useState } from "react";

const NAV = [
  { href: "#about", label: "소개" },
  { href: "#skills", label: "기술 스택" },
/*  { href: "#career", label: "경력" }, */
  { href: "#projects", label: "프로젝트" },
  { href: "#process", label: "진행 방식" },
  { href: "#contact", label: "문의" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="header">
      <div className="header-inner">
        <a href="#top" className="logo">
          DEV
        </a>
        <nav className="nav-desktop">
          {NAV.map((n) => (
            <a key={n.href} href={n.href}>
              {n.label}
            </a>
          ))}
        </nav>
        <button
          className="nav-toggle"
          aria-label="메뉴 열기"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕" : "☰"}
        </button>
      </div>
      <nav className={`nav-mobile ${open ? "open" : ""}`}>
        {NAV.map((n) => (
          <a key={n.href} href={n.href} onClick={() => setOpen(false)}>
            {n.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
