import React from "react";
import styles from "./Header.module.css";

const Header: React.FC = () => {
  return (
    <header className={styles.header} data-testid="header">
      <h1 className={styles.heading} data-testid="heading">
        Historic global carbon footprint
      </h1>
    </header>
  );
};

export default Header;
