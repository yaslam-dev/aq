import React from "react";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer} data-testid="contentinfo">
      <p>data source: https://data.footprintnetwork.org</p>
    </footer>
  );
};

export default Footer;
