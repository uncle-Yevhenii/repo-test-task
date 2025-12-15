import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
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
} from "@mui/material";
import { useState } from "react";

export const CategoriesTable = () => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const { data, loading, error } = useGetCategoriesQuery({
    variables: {
      pagination: {
        page: page + 1,
        pageSize,
      },
    },
  });

  const [deleteCategory, { loading: deleteLoading }] =
    useDeleteCategoryMutation();

  const handleDelete = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory({
          variables: { id },
          refetchQueries: ["GetCategories"],
        });
      } catch (e) {
        console.error("Error deleting category", e);
        alert("Failed to delete category.");
      }
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

  if (loading) return <CircularProgress />;
  if (error)
    return <Typography color="error">Error: {error.message}</Typography>;

  const categories = data?.categories.items || [];
  const pageInfo = data?.categories.pageInfo;

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Created By</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell>{category.name}</TableCell>
                <TableCell>{category.description}</TableCell>
                <TableCell>{category.createdBy}</TableCell>
                <TableCell align="right">
                  <Button
                    color="error"
                    onClick={() => handleDelete(category.id)}
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
