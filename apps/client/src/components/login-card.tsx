import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

export const LoginCard = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate({ from: "/" });

  const handleLogin = () => {
    if (!username.trim()) return;
    login(username);
    navigate({ to: "/dashboard" });
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400 }}>
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          Enter your username:
        </Typography>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            margin="normal"
          />
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2 }}
            disabled={!username}
          >
            Connect
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};
