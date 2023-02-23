"use client";

import { theme } from "@/assets/styles/themeConfig";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "@/assets/styles/GlobalStyles";
import { useEffect } from "react";

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  useEffect(() => {

    // Helper function
    const domReady = (cb: () => void) => {
      document.readyState === 'interactive' || document.readyState === 'complete'
        ? cb()
        : document.addEventListener('DOMContentLoaded', cb);
    };

    domReady(() => {
      // Display body when DOM is loaded
      document.body.style.visibility = 'visible';
    });

  }, [])
  
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          {children}
        </ThemeProvider>
        <noscript><style jsx>{`body { visibility: visible; }`}</style></noscript>
      </body>
    </html>
  )
}

export default RootLayout; 
