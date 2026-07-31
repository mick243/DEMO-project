export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", width: "100%", flexWrap: "wrap", gap: 12 }}>
        <span>{new Date().getFullYear()} DEMO </span>
        <a href="#top">맨 위로 ↑</a>
      </div>
    </footer>
  );
}
