import { Container, Stack, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "src/components/Loading";
import ProductForm from "src/components/ProductForm";
import { useGlobalContext } from "src/context";
import { Product, ProductFormParams, } from "src/types/Product";

function AdminProductEdit() {
  const nav = useNavigate();
  const { loading, setLoading, setFlash } = useGlobalContext()
  const { id } = useParams();
  const [product, setProduct] = useState<Product | undefined>();

  const getProduct = async (id: string) => {
    try {
      setLoading(true)
      const { data } = await axios.get(`http://localhost:3000/products/${id}`);
      setProduct(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  };
  useEffect(() => {
    if (!id) return;
    getProduct(id);
  }, [id]);

  const onSubmit = async (values: ProductFormParams) => {
    try {
      await axios.put(`/products/${id}`, values);
      setFlash((state: any) => ({ ...state, isShow: true, type: "success", content: "Cập nhật thành công" }))
      nav("/admin/product/list");
    } catch (error) {
      setFlash((state: any) => ({ ...state, isShow: true, type: "error", content: "Cập nhật thất bại" }))

    }
  };

  return (
    <>
      <Container>
        <Stack gap={2}>
          <Typography variant="h3" textAlign={"center"} mt={"50px"}>
            Edit Product
          </Typography>
          <ProductForm onSubmit={onSubmit} initialValues={product} />
        </Stack>
      </Container>
      {loading && (
        <Loading />
      )}
    </>
  );
}

export default AdminProductEdit;