import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useCreateCategoryMutation } from "../generated/graphql";

interface AddCategoryDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddCategoryDialog = ({
  open,
  onClose,
}: AddCategoryDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [createCategory, { loading, error, reset }] =
    useCreateCategoryMutation();

  useEffect(() => {
    if (!open) {
      setName("");
      setDescription("");
      reset();
    }
  }, [open, reset]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !description.trim()) {
      alert("Name and Description are required.");
      return;
    }

    try {
      await createCategory({
        variables: {
          input: {
            name,
            description,
          },
        },
        refetchQueries: ["GetCategories"],
      });
      onClose();
    } catch (e) {
      console.error("Failed to create category:", e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Add New Category</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            id="name"
            label="Category Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading}>
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
