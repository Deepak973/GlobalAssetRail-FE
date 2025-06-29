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
  Tooltip,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { ConnectButton } from "@/app/components/ConnectButton";
import Image from "next/image";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Institution Onboarding", href: "/institution-onboarding" },
  { label: "Mint/Burn", href: "/mint-burn" },
  { label: "Cross-Border", href: "/cross-border", comingSoon: true },
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
              <Link
                key={"home"}
                href={"/"}
                passHref
                style={{
                  display: "flex",
                  alignItems: "center",
                  textDecoration: "none",
                }}
              >
                <Image
                  src="/gar-logo.png"
                  alt="Global Asset Rail Logo"
                  width={32}
                  height={32}
                  style={{ borderRadius: 8, marginRight: 12 }}
                />
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
                            sx={{
                              flexDirection: "column",
                              alignItems: "flex-start",
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                              }}
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
                              {link.comingSoon && (
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: "#22c55e",
                                    fontSize: "0.75rem",
                                    fontWeight: 500,
                                    mt: 0.5,
                                    ml: 2,
                                  }}
                                >
                                  Coming Soon
                                </Typography>
                              )}
                            </Box>
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
                    <Tooltip
                      key={link.href}
                      title={link.comingSoon ? "Coming Soon" : ""}
                      arrow
                      placement="bottom"
                    >
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                        }}
                      >
                        <Link href={link.href} passHref>
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
                      </Box>
                    </Tooltip>
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
