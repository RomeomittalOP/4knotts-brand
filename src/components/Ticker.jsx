function Ticker() {
  const items = [
    "PREMIUM NOTEBOOKS",
"EXECUTIVE DIARIES",
"SPIRAL COLLECTIONS",
"A4 PAPER PRODUCTS",
"OFFICE STATIONERY",
"SCHOOL SUPPLIES",
"CORPORATE GIFTING",
"CUSTOM BRANDING",
"WHOLESALE ORDERS",
"BULK SUPPLY",
"DELHI MANUFACTURERS",
"PAN INDIA DELIVERY",
"PREMIUM PRINTING",
"CUSTOM LOGO STATIONERY",
"BUSINESS ESSENTIALS",
"HOTEL & OFFICE SUPPLY",
"EXPORT QUALITY PRODUCTS",
"TRUSTED SINCE 2026",
  ];
      
  return (
    <section className="ticker-section">
      <div className="ticker-track">
        {[...items, ...items].map((item, index) => (
          <span key={index} className="ticker-item">
            • {item}
          </span>
        ))}
      </div>
    </section>
  );
}

export default Ticker;