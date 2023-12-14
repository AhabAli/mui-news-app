import { FC, ReactNode } from "react";
import { Box, Container } from "@mui/material";

import { Header } from "../Header";
import { Footer } from "../Footer";

interface ILayoutProps {
  children: ReactNode;
}
export const Layout: FC<ILayoutProps> = ({ children }) => {
  const bodyStyles = {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        ...bodyStyles,
      }}
    >
      <Box component="header">
        <Header />
      </Box>
      <Box component="main" sx={{ flexGrow: 1, p: 5, pt: 5 }}>
        <Container maxWidth="xl">{children}</Container>
      </Box>

      <Box component="footer">
        <Footer />
      </Box>
    </Box>
  );
};
