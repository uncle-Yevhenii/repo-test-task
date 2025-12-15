import { createFileRoute, useNavigate, redirect } from "@tanstack/react-router";
import { Button, Typography, Box } from "@mui/material";
import { CategoriesTable } from "../components/categories-table";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { AddCategoryDialog } from "../components/add-category-dialog";
import { RisksTable } from "../components/risks-table";
import { AddRiskDialog } from "../components/add-risk-dialog";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    if (!localStorage.getItem("username")) {
      throw redirect({ to: "/" });
    }
  },
  component: DashboardComponent,
});

function DashboardComponent() {
  const { username, logout } = useAuth();
  const navigate = useNavigate({ from: "/dashboard" });

  const [isAddCategoryOpen, setIsAddCategoryOpen] = useState(false);
  const [isAddRiskOpen, setIsAddRiskOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/" });
  };

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4">Dashboard</Typography>
        <Button variant="outlined" onClick={handleLogout}>
          Log Out
        </Button>
      </Box>
      <Typography variant="h6" sx={{ mb: 4 }}>
        Welcome, {username || "Guest"}!
      </Typography>

      {/* Categories Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5" component="div">
          Categories
        </Typography>
        <Button
          variant="contained"
          onClick={() => setIsAddCategoryOpen(true)}
        >
          Add Category
        </Button>
      </Box>
      <CategoriesTable />
      <AddCategoryDialog
        open={isAddCategoryOpen}
        onClose={() => setIsAddCategoryOpen(false)}
      />

      {/* Risks Section */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
        mt={4}
      >
        <Typography variant="h5" component="div">
          Risks
        </Typography>
        <Button variant="contained" onClick={() => setIsAddRiskOpen(true)}>
          Add Risk
        </Button>
      </Box>
      <RisksTable />
      <AddRiskDialog
        open={isAddRiskOpen}
        onClose={() => setIsAddRiskOpen(false)}
      />
    </Box>
  );
}
