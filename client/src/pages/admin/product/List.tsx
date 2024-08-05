import {
  Alert,
  Button,
  Container,
  Paper,
  Snackbar,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import axiosInstance from "src/axios/instance";
import ConfirmDialog from "src/components/ConfirmDialog";
import Flash from "src/components/Flash";
import { ProductContext } from "src/conts/ProductProvider";
import Loading from "src/components/Loading";
import NotFound from "src/components/Notfound";
import { useGlobalContext } from "src/context";
import { Product } from "src/types/Product";
import { Link } from "react-router-dom";

function AdminProductList() {
  const [showFlash, setShowFlash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [idDelete, setIdDelete] = useState<string | null>(null);

  const [value, setValue] = useState("");
  const [arrange, setArrange] = useState("");

  const { loading, setLoading, setFlash } = useGlobalContext();

  const getAllProduct = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get("/products");
      setProducts(data);
    } catch (error) {
      return <NotFound />;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  const handleConfirm = (id: string) => {
    setConfirm(true);
    setIdDelete(id);
  };

  const handleDelete = async () => {
    try {
      setLoading(true);
      await axios.delete("/products/" + idDelete);
      setShowFlash(true);
      setFlash((state: any) => ({
        ...state,
        isShow: true,
        type: "success",
        content: "Xóa thành công!",
      }));
      getAllProduct();
    } catch (error) {
      console.log(error);
      setFlash((state: any) => ({
        ...state,
        isShow: true,
        type: "error",
        content: "Xóa thất bại",
      }));
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h4" textAlign={"center"}>
            Products List
          </Typography>
          <Typography variant="h3" textAlign={"center"} mt={"50px"}>
            {/* Products List */}
          </Typography>
          <Link to="/admin/product/add">
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#551a8b",
                ":hover": {
                  backgroundColor: "#551a8b",
                },
              }}
            >
              Add Product
            </Button>
          </Link>
          <TableContainer component={Paper}>
            <Table sx={{}} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Title</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Desc</TableCell>
                  <TableCell align="right">Image</TableCell>
                  <TableCell align="right">Category</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => (
                  <TableRow
                    key={index}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {product.title}
                    </TableCell>
                    <TableCell align="right">{product.price}</TableCell>
                    <TableCell align="right">{product.description}</TableCell>
                    <TableCell align="right">
                      <img src={product.image} alt="" width={100} />
                    </TableCell>
                    {/* <TableCell align="right">{product.category.name}</TableCell> */}
                    <TableCell align="right">{product?.price}</TableCell>
                    <TableCell align="right">{product?.description}</TableCell>
                    <TableCell align="right">
                      <img src={product?.image} alt="" width={100} />
                    </TableCell>
                    <TableCell align="right">
                      {product?.category?.name}
                    </TableCell>
                    <TableCell align="right">
                      <Stack
                        direction={"row"}
                        gap={3}
                        justifyContent={"center"}
                      >
                        <Link to={""}></Link>
                        <Link to={`/admin/product/edit/${product._id}`}>
                          <Button variant="contained">Edit</Button>
                        </Link>
                        <Button
                          variant="contained"
                          sx={{ bgcolor: "red" }}
                          onClick={() => handleConfirm(product._id)}
                        >
                          Delete
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <ConfirmDialog
              confirm={confirm}
              onConfirm={setConfirm}
              onDelete={handleDelete}
            />
          </TableContainer>
        </Stack>
      </Container>
      {loading && <Loading />}
    </>
  );
}

export default AdminProductList;
