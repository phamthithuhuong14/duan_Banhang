import {
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { useNavigate } from "react-router-dom";
import Loading from "src/components/Loading";
import NotFound from "src/components/Notfound";
import ProductForm from "src/components/ProductForm";
import { useGlobalContext } from "src/context";

function AdminProductAdd() {
  const nav = useNavigate();
  const { loading, setLoading, setFlash } = useGlobalContext();
  const onSubmit = async (values: any) => {
    console.log(values);
    
    try {
      setLoading(true);
      await axios.post("/products", values);
      setFlash((state: any) => ({
        ...state,
        isShow: true,
        type: "success",
        content: "Thêm thành công",
      }));
      nav("/admin/product/list");
    } catch (error) {
      setFlash((state: any) => ({
        ...state,
        isShow: true,
        type: "error",
        content: "Thêm thất bại",
      }));
      return <NotFound />;
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"} mt={"50px"}>
            Add Product
          </Typography>
          <ProductForm onSubmit={onSubmit} />
        </Stack>
      </Container>
      {loading && <Loading />}
    </>
  );
}

export default AdminProductAdd;
