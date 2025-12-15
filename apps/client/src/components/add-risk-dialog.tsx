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
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useState, useEffect } from "react";
import {
  useCreateRiskMutation,
  useGetCategoriesQuery,
  RiskStatusEnum,
} from "../generated/graphql";

interface AddRiskDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddRiskDialog = ({ open, onClose }: AddRiskDialogProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState(RiskStatusEnum.Unresolved);

  const { data: categoriesData, loading: categoriesLoading } =
    useGetCategoriesQuery({
      variables: { pagination: { pageSize: 100 } },
    });

  const [createRisk, { loading, error, reset }] = useCreateRiskMutation();

  useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setName("");
      setDescription("");
      setCategoryId("");
      setStatus(RiskStatusEnum.Unresolved);
      reset();
    }
  }, [open, reset]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name.trim() || !description.trim() || !categoryId) {
      alert("Name, Description, and Category are required.");
      return;
    }

    try {
      await createRisk({
        variables: {
          input: {
            name,
            description,
            categoryId,
            status,
          },
        },
        refetchQueries: ["GetRisks"],
      });
      onClose();
    } catch (e) {
      console.error("Failed to create risk:", e);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit}>
        <DialogTitle>Add New Risk</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Risk Name"
            type="text"
            fullWidth
            variant="standard"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <FormControl fullWidth margin="dense" variant="standard" required>
            <InputLabel>Category</InputLabel>
            <Select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              label="Category"
              disabled={categoriesLoading}
            >
              {categoriesData?.categories.items.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth margin="dense" variant="standard" required>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              onChange={(e) => setStatus(e.target.value as RiskStatusEnum)}
              label="Status"
            >
              <MenuItem value={RiskStatusEnum.Unresolved}>Unresolved</MenuItem>
              <MenuItem value={RiskStatusEnum.Resolved}>Resolved</MenuItem>
            </Select>
          </FormControl>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              Error: {error.message}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" disabled={loading || categoriesLoading}>
            {loading ? <CircularProgress size={24} /> : "Add"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};
