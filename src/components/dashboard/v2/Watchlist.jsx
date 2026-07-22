import {
  HiArrowTrendingUp,
  HiArrowTrendingDown,
} from "react-icons/hi2";

import styles from "./Watchlist.module.css";

const assets = [
  {
    symbol: "BTC",
    name: "Bitcoin",
    price: "$118,450",
    change: "+4.28%",
    positive: true,
  },
  {
    symbol: "ETH",
    name: "Ethereum",
    price: "$6,540",
    change: "+2.17%",
    positive: true,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: "$231.84",
    change: "-0.84%",
    positive: false,
  },
  {
    symbol: "TSLA",
    name: "Tesla",
    price: "$412.12",
    change: "+5.18%",
    positive: true,
  },
];

const Watchlist = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <h2>Market Watchlist</h2>

        <button>Explore Markets</button>
      </div>

      <div className={styles.list}>
        {assets.map((asset) => (
          <div
            key={asset.symbol}
            className={styles.card}
          >
            <div>
              <h3>{asset.symbol}</h3>
              <span>{asset.name}</span>
            </div>

            <div className={styles.price}>
              {asset.price}
            </div>

            <div
              className={
                asset.positive
                  ? styles.up
                  : styles.down
              }
            >
              {asset.positive ? (
                <HiArrowTrendingUp />
              ) : (
                <HiArrowTrendingDown />
              )}

              {asset.change}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Watchlist;