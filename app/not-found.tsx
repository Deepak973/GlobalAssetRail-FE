"use client";

import Link from "next/link";
import { Box, Typography, Button, Container } from "@mui/material";
import Image from "next/image";

const NotFound = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "radial-gradient(circle at top, #e0e7ff, #f3f4f6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        {/* Gradient background with subtle illustration */}

        <Typography
          variant="h1"
          fontWeight={800}
          sx={{
            background: "linear-gradient(to right, #3B82F6, #6366F1)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontSize: { xs: "3rem", md: "4.5rem" },
            mb: 1,
          }}
        >
          404
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 3, fontSize: "1.25rem" }}
        >
          Lost in transit. The route you're looking for doesn’t exist.
        </Typography>

        <Link href="/" passHref>
          <Button
            variant="contained"
            size="large"
            sx={{
              textTransform: "none",
              background: "linear-gradient(to right, #3B82F6, #4F46E5)",
              borderRadius: 2,
              px: 4,
              py: 1.5,
              fontWeight: 600,
              fontSize: "1rem",
              boxShadow: "0 4px 14px rgba(59, 130, 246, 0.25)",
              "&:hover": {
                background: "linear-gradient(to right, #4F46E5, #3B82F6)",
              },
            }}
          >
            Back to Global Stable Rail
          </Button>
        </Link>
      </Container>
    </Box>
  );
};

export default NotFound;
