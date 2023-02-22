"use client";

import { theme } from "@/assets/styles/themeConfig";
import { ThemeProvider } from "styled-components";
import GlobalStyles from "./GlobalStyles";

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
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
      </body>
    </html>
  )
}

export default RootLayout; 
