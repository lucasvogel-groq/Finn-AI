"use client";
import React from "react";
import "../../styles/global.css";
import { InfoForm } from "../InfoForm.js";
import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "../Hero-Highlight.js";

function Home() {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: "smooth",
    });
  };
  const styles = {
    getStartedContainer: {
      backgroundColor: "black", // Light gray background
      color: "#ffffff", // White text
      height: "100vh", // Full viewport height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px",
    },
    formContainer: {
      backgroundColor: "black", // Light gray background
      color: "#ffffff", // White text
      height: "100vh", // Full viewport height
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      padding: "0 20px",
    },
    heading: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "20px",
    },
  };
  return (
    <>
      <div style={styles.getStartedContainer}>
        <HeroHighlight>
          <motion.h1
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: [20, -5, 0],
            }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            className="text-2xl px-4 md:text-5xl lg:text-7xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
          >
            Put a spotlight on your finances with Finn AI{" "}
            <Highlight className="text-black dark:text-white lg:text-4xl p-3">
              <button buttonStyle="btn--outline" onClick={scrollDown}>
                Get Started
              </button>
            </Highlight>
          </motion.h1>
        </HeroHighlight>
      </div>
      <div style={styles.getStartedContainer}>
        <HeroHighlight>
          <InfoForm></InfoForm>
        </HeroHighlight>
      </div>
    </>
  );
}

export default Home;
