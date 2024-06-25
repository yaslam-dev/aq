import React from "react";
import styles from "./Layout.module.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={styles.container} data-testid="layout-container">
      <Header />
      <main className={styles.main} data-testid="layout-main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
