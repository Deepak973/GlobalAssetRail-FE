"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppBar,
  Box,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ConnectButton } from "@/app/components/ConnectButton";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Institution Onboarding", href: "/institution-onboarding" },
  { label: "Mint/Burn", href: "/mint-burn" },
  { label: "Cross-Border", href: "/cross-border" },
];

export const NavBar = () => {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  if (!mounted) return null;

  return (
    <Box sx={{ borderBottom: "1px solid #e5e7eb" }}>
      <AppBar position="static" elevation={0} color="transparent">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            {/* Logo + Brand */}
            <Box display="flex" alignItems="center">
              <Box
                sx={{
                  width: 32,
                  height: 32,
                  background: "linear-gradient(to right, #4F46E5, #3B82F6)",
                  borderRadius: 2,
                  mr: 1.5,
                }}
              />
              <Link key={"home"} href={"/"} passHref>
                <Typography
                  variant="h6"
                  noWrap
                  sx={{ fontWeight: 700, color: "#111827" }}
                >
                  Global Asset Rail
                </Typography>
              </Link>
            </Box>

            {/* Navigation & Wallet */}
            <Box display="flex" alignItems="center" gap={2}>
              {isMobile ? (
                <>
                  <IconButton
                    edge="end"
                    color="inherit"
                    aria-label="menu"
                    onClick={toggleDrawer(true)}
                  >
                    <MenuIcon sx={{ color: "#111827" }} />
                  </IconButton>
                  <Drawer
                    anchor="right"
                    open={drawerOpen}
                    onClose={toggleDrawer(false)}
                  >
                    <Box
                      sx={{
                        width: 250,
                        padding: 2,
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={2}
                      >
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 700, color: "#111827" }}
                        >
                          Menu
                        </Typography>
                        <IconButton onClick={toggleDrawer(false)}>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <List>
                        {navLinks.map((link) => (
                          <ListItem
                            key={link.href}
                            component={Link}
                            href={link.href}
                            onClick={toggleDrawer(false)}
                          >
                            <ListItemText
                              primary={link.label}
                              primaryTypographyProps={{
                                sx: {
                                  color:
                                    pathname === link.href ? "black" : "gray",
                                  fontWeight: 500,
                                },
                              }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                    <Box mt={2}>
                      <ConnectButton />
                    </Box>
                  </Drawer>
                </>
              ) : (
                <Box display="flex" gap={3} alignItems="center">
                  {navLinks.map((link) => (
                    <Link key={link.href} href={link.href} passHref>
                      <Typography
                        variant="body1"
                        component="span"
                        sx={{
                          color: pathname === link.href ? "black" : "gray",
                          fontWeight: 500,
                          cursor: "pointer",
                          "&:hover": { color: "black" },
                        }}
                      >
                        {link.label}
                      </Typography>
                    </Link>
                  ))}
                  <ConnectButton />
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};
