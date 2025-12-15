import {
  useGetRisksQuery,
  useDeleteRiskMutation,
  useUpdateRiskMutation,
  RiskStatusEnum,
} from "../generated/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
  TablePagination,
  Box,
  Switch,
  FormControlLabel,
  Chip,
} from "@mui/material";
import { useState } from "react";

export const RisksTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [hideResolved, setHideResolved] = useState(true);

  const { data, loading, error } = useGetRisksQuery({
    variables: {
      pagination: {
        page: page + 1,
        pageSize,
      },
      filter: {
        status: hideResolved ? RiskStatusEnum.Unresolved : undefined,
      },
    },
    fetchPolicy: "cache-and-network", // Ensure we get fresh data
  });

  const [deleteRisk, { loading: deleteLoading }] = useDeleteRiskMutation();
  const [updateRisk, { loading: updateLoading }] = useUpdateRiskMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this risk?")) {
      try {
        await deleteRisk({
          variables: { id },
          refetchQueries: ["GetRisks"],
        });
      } catch (e) {
        console.error("Error deleting risk", e);
        alert("Failed to delete risk.");
      }
    }
  };

  const handleStatusToggle = async (id: string, currentStatus: RiskStatusEnum) => {
    const newStatus =
      currentStatus === RiskStatusEnum.Resolved
        ? RiskStatusEnum.Unresolved
        : RiskStatusEnum.Resolved;
    try {
      await updateRisk({
        variables: { id, input: { status: newStatus } },
      });
    } catch (e) {
      console.error("Error updating risk status", e);
      alert("Failed to update risk status.");
    }
  };

  const handleChangePage = (_: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading && !data) return <CircularProgress />;
  if (error) return <Typography color="error">Error: {error.message}</Typography>;

  const risks = data?.risks.items || [];
  const pageInfo = data?.risks.pageInfo;

  return (
    <Paper>
      <Box sx={{ padding: 2, borderBottom: 1, borderColor: "divider" }}>
        <FormControlLabel
          control={
            <Switch
              checked={hideResolved}
              onChange={(e) => setHideResolved(e.target.checked)}
            />
          }
          label="Hide Resolved Risks"
        />
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {risks.map((risk) => (
              <TableRow key={risk.id}>
                <TableCell>{risk.name}</TableCell>
                <TableCell>{risk.description}</TableCell>
                <TableCell>{risk.category?.name || "Uncategorized"}</TableCell>
                <TableCell>
                  <Chip
                    label={risk.status}
                    color={
                      risk.status === RiskStatusEnum.Resolved
                        ? "success"
                        : "warning"
                    }
                    onClick={() => handleStatusToggle(risk.id, risk.status)}
                    disabled={updateLoading}
                    size="small"
                  />
                </TableCell>
                <TableCell>{risk.createdBy}</TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    onClick={() => handleDelete(risk.id)}
                    disabled={deleteLoading}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pageInfo?.total || 0}
        rowsPerPage={pageSize}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
