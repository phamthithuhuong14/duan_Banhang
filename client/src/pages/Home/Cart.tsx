import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  styled,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import { useCart } from "src/context/cart";
import { useProductCart } from "src/hooks/useProdutCart";
const labels = ["Product", "Price", "Quantity", "Subtotal", ""];
function Cart() {
  const { cart } = useCart();
  const { removeToCart } = useProductCart();

  return (
    <>
      {/* Tieu de */}
      <Container>
        <Wrapper sx={{ display: "flex", flexDirection: "column" }}>
          <LabelWrapper
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
          >
            {labels.map((label, index) => (
              <Typography fontWeight={500} key={index}>
                {label}
              </Typography>
            ))}
          </LabelWrapper>
          {/* Cart Item */}
          <Stack gap={3} my={3} direction={"column"} sx={{ overflow: "auto" }}>
            {cart?.products.map((item, index) => (
              <Stack
                key={index}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Stack direction={"row"} alignItems={"center"} gap={4}>
                  <img src={item.product.image} width={"100px"} />
                  <Typography fontWeight={500}>
                    {item.product.title.substring(0, 10)}...
                  </Typography>
                </Stack>

                <Typography fontWeight={500}>{item.product.price}đ</Typography>
                <Typography fontWeight={500}>{item.quantity}</Typography>
                <Typography fontWeight={500}>
                  {item.product.price * item.quantity}đ
                </Typography>
                <IconButton onClick={() => removeToCart(item.product._id)}>
                  <DeleteIcon sx={{ color: "red" }} />
                </IconButton>
              </Stack>
            ))}
          </Stack>
          <Stack>
            <Link to="/checkout">
              <Button
                variant="contained"
                sx={{ mb: 10, backgroundColor: "#551a8b" }}
                fullWidth
              >
                Checkout
              </Button>
            </Link>
          </Stack>
        </Wrapper>
      </Container>
    </>
  );
}

export default Cart;

const Wrapper = styled(Stack)({
  padding: 72,
});

const LabelWrapper = styled(Stack)(({ theme }) => ({
  background: "#551a8b",
  border: "1px solid #551a8b",
  borderRadius: 5,
  height: 55,
  width: "100%",
  color: "white",
  alignItems: "center",
  justifyContent: "space-around",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    height: 100,
  },

  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    height: 100,
  },
}));
