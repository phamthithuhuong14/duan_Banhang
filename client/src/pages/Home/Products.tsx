import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "src/axios/instance";
import useFetchData from "src/hooks/useFetchData";
import { useProductCart } from "src/hooks/useProdutCart";
import { Category, Product } from "src/types/Product";

const Products = () => {
  const { datas: products } = useFetchData("/products");
  const [quantity, setQuantity] = useState<number>(1);
  const { addToCart } = useProductCart();
  const [category, setCategory] = useState<Category[]>([]);
  // Tạo state productFilter đêt dữ liệu sau mỗi khi lọc
  const [productFilter, setProductFilter] = useState<Product[]>([]);
  const handleAddToCart = (product: Product) => {
    if (quantity <= 0) return;
    addToCart({ product, quantity });
  };

  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/categories");
      setCategory(data);
    })();
  }, []);

  // cập nhật dữ liệu ban đầu khi chưa lọc
  useEffect(() => {
    setProductFilter(products);
  }, [products]);

  // Khi click vào một danh mục thì lấy ra id danh mục
  const hanldeFilterPro = (cateid: string) => {
    // nếu mà không lấy được id thì mặc định là dữ liệu ban đầu products
    if (!cateid) {
      setProductFilter(products);
    } else {
      // Nếu mà lấy được thì thực hiện kiểm tra trong mảng products có idCategory nào bằng với cateid danh mục click
      const profilter = products.filter(
        (item: Product) => item.category._id == cateid
      );
      // Nếu lấy được thì gọi setProductFilter
      setProductFilter(profilter);
    }
  };

  return (
    <>
      <img
        src="https://tienganhnghenoi.vn/wp-content/uploads/2023/09/banner-iphone-7-min.jpg"
        width="100%"
        height={"500px"}
      />
      <FormControl sx={{ width: 200, margin: "10px", display: "flex" }}>
        <InputLabel> Danh Mục</InputLabel>
        <Select label="Danh Mục">
          {category.map((cate) => (
            <MenuItem
              onClick={() => hanldeFilterPro(cate._id)}
              key={cate._id}
              value={cate._id}
            >
              {cate?.name}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained"> Filter </Button>
      </FormControl>
      <Typography
        component="h1"
        fontSize={"26px"}
        fontWeight={"bold"}
        sx={{ margin: "10px", textAlign: "center" }}
      >
        Latest product
      </Typography>
      <Stack
        direction={"row"}
        gap={1}
        sx={{
          justifyContent: "center",
          flexWrap: "wrap",
          margin: "10px 0",
          padding: "10px 0",
          width: "100%",
          hover: "none",
        }}
      >
        {productFilter.map((product: Product) => (
          <Card
            sx={{
              maxWidth: 345,
              margin: "10px",
              padding: "6px",
              hover: "none",
              transform: "translateY(0)",
              transition: "all 0.3s ease-in-out",
              "&:hover": { transform: "translateY(-10px)" },
              "&:hover img": { transform: "scale(1.1)" },
              "&:hover .MuiCardContent-root": { transform: "translateY(0)" },
              "&:hover .MuiCardActions-root": { transform: "translateY(0)" },
              "&:hover .MuiTypography-root": { transform: "translateY(0)" },
              "&:hover .MuiButton-root": { transform: "translateY(0)" },
            }}
          >
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={product.image}
              sx={{ objectFit: "contain", height: "200px" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {product.title}
              </Typography>
              <Typography
                gutterBottom
                variant="body1"
                component="div"
                color="red"
                fontWeight="bold"
              >
                {product.price}
              </Typography>
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ minHeight: "50px" }}
              >
                {product.description}
              </Typography>
            </CardContent>
            <CardActions
              sx={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                transform: "translateY(350%)",
                transition: "all 0.4s ease-in-out !important",
                "&:hover": { transform: "translateY(0)" },
              }}
            >
              <Button
                variant="contained"
                sx={{ bgcolor: "green", width: "50%" }}
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </Button>
              {/* <Button variant="contained" sx={{ bgcolor: "red" }}>
                Learn More
              </Button> */}
              <Link
                to={`/product/${product._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <Button variant="contained" sx={{ width: "120px" }}>
                  View
                </Button>
              </Link>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </>
  );
};

export default Products;
