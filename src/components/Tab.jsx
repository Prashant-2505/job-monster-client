"use client";
import { createContext, useContext } from "react";
import styles from "../styles/tab.module.css";
import { motion } from "framer-motion";

// Create the context
const TabContext = createContext();

// Main Tab component to wrap child components
export default function Tab({ currentTab, onchange, children }) {
  return (
    <div className={styles.tab}>
      <TabContext.Provider value={{ currentTab, onchange }}>
        {children}
      </TabContext.Provider>
    </div>
  );
}

// Subcomponent for the tab header container
Tab.headContainer = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={styles.tab_header}
    >
      {children}
    </motion.div>
  );
};

// Subcomponent for individual tab items
Tab.headerItem = ({ label, index }) => {
  const { currentTab, onchange } = useContext(TabContext);

  return (
    <motion.div
      initial={{ x: "-40%", opacity: 0 }}
      animate={{ x: "0%", opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4}}
      className={`${styles.headItem} ${
        currentTab === index ? styles.active : ""
      }`}
      onClick={() => onchange(index)}
    >
      {label}
    </motion.div>
  );
};

// Subcomponent for the tab content container
Tab.contentContainer = ({ children }) => {
  return <div className={styles.content_container}>{children}</div>;
};

// Subcomponent for individual content items
Tab.containerItem = ({ children, index }) => {
  const { currentTab } = useContext(TabContext);

  // Return the content only if the index matches the current tab
  if (index === currentTab) {
    return <div className={styles.container_item}>{children}</div>;
  }

  // Return null if this is not the current tab
  return null;
};
