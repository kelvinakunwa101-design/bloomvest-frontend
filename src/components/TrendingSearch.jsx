import React from "react";

const trendingSearches = [
  "Bitcoin",
  "Ethereum",
  "Tesla stock",
  "AAPL",
  "Market news"
];

export default function TrendingSearch({ onSelect }) {
  return (
    <div style={styles.wrapper}>
      <h3 style={styles.title}>Trending Searches</h3>

      <div style={styles.container}>
        {trendingSearches.map((item, index) => (
          <button
            key={index}
            style={styles.button}
            onClick={() => onSelect && onSelect(item)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    padding: "16px",
    borderRadius: "10px",
    background: "#111",
    color: "#fff",
    marginBottom: "20px"
  },
  title: {
    marginBottom: "10px"
  },
  container: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px"
  },
  button: {
    padding: "8px 12px",
    borderRadius: "20px",
    border: "none",
    cursor: "pointer",
    background: "#222",
    color: "#fff"
  }
};