import {
  Box,
  Button,
  Container,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import { useMemo, useState } from "react";
import { useCart } from "src/context/cart";
import { useUser } from "src/context/user";

import { useProductCart } from "src/hooks/useProdutCart";
import { InputText } from "src/components/Element/InputText";
import { SubmitHandler, useForm } from "react-hook-form";
import AlertDialog from "src/components/Popup";

type CheckoutFormParams = {
  name: string;
  phone: string;
  address: string;
  payment: string;
};

function Checkout() {
  const nav = useNavigate();
  const { cart, setCart } = useCart();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const totalPrice = useMemo(
    () =>
      cart
        ? cart.products.reduce(
            (total, { product, quantity }) => total + product.price * quantity,
            0
          )
        : 0,
    [cart]
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CheckoutFormParams>();
  const onSubmit: SubmitHandler<CheckoutFormParams> = async (data) => {
    if (!user || !cart || !cart?.products.length) return;
    try {
      await axios.post("/orders", {
        ...data,
        products: cart.products,
        user: user._id,
        totalPrice,
      });
      setOpen(true);
      setCart(null);
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {cart?.products?.length || open ? (
        <>
          <form style={{ width: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <Box
              mt={5}
              sx={{
                width: "80%",
                display: "flex",
                justifyContent: "space-between",
                mx: "auto",
                gap: 10,
                minHeight: "50px",
              }}
            >
              <Container
                sx={{
                  mb: 10,
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: 5,
                }}
              >
                <Typography variant="h5" fontWeight={500}>
                  Billing Details
                </Typography>
                <Box>
                  <TextField
                    id="standard-basic"
                    label="Name"
                    variant="standard"
                    {...register("name", { required: "Vui lòng nhập tên" })}
                    sx={{ width: "100%", my: "10px" }}
                  />
                  {errors.name && (
                    <p style={{ color: "red" }}>{errors.name.message}</p>
                  )}
                </Box>
                <Box>
                  <TextField
                    id="standard-basic"
                    label="Address"
                    type="text"
                    variant="standard"
                    {...register("address", {
                      required: "Vui lòng nhập địa chỉ",
                    })}
                    sx={{ width: "100%", my: "10px" }}
                  />
                  {errors.address && (
                    <p style={{ color: "red" }}>{errors.address.message}</p>
                  )}
                </Box>
                <Box>
                  <TextField
                    type="number"
                    id="standard-basic"
                    label="Phone"
                    variant="standard"
                    {...register("phone", {
                      required: "Vui lòng nhập số điện thoại",
                      minLength: {
                        value: 9,
                        message: "Số điện thoại không đúng định dạng",
                      },
                      min: {
                        value: 0,
                        message: "Số điện thoại không được là số âm",
                      },
                    })}
                    sx={{ width: "100%", my: "10px" }}
                  />
                  {errors.phone && (
                    <p style={{ color: "red" }}>{errors.phone.message}</p>
                  )}
                </Box>
                <Box>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                  >
                    <FormControlLabel
                      value="COD"
                      control={<Radio />}
                      label="COD"
                      {...register("payment", {
                        required: "Vui lòng chọn phương thức thanh toán",
                      })}
                    />
                    <FormControlLabel
                      value="Banh"
                      control={<Radio />}
                      label="Bank"
                      {...register("payment", {
                        required: "Vui lòng chọn phương thức thanh toán",
                      })}
                    />
                    {errors.payment && (
                      <p style={{ color: "red" }}>{errors.payment.message}</p>
                    )}
                  </RadioGroup>
                </Box>
              </Container>

              <Box
                sx={{
                  width: "60%",
                  border: "1px solid #ccc",
                  padding: "20px",
                  borderRadius: "5px",
                  height: "fit-content",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                  overflow: "auto",
                }}
              >
                <Typography
                  fontWeight={600}
                  variant="h5"
                  sx={{ textAlign: "center" }}
                >
                  Products
                </Typography>
                {/* <LabelWrapper
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-around"}
            sx={{ width: "100%", padding: "20px" }}
          >
            {lables.map((label, index) => (
              <Typography key={index} fontWeight={500} sx={{ width: "50%" }}>
                {label}
              </Typography>
            ))}
          </LabelWrapper> */}
                <Stack
                  gap={3}
                  my={3}
                  sx={{ width: "100%", bgColor: "gray", padding: "10px" }}
                >
                  {cart?.products.map((item, index) => (
                    <Stack
                      key={index}
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Typography fontWeight={500}>
                        <img src={item.product.image} alt="" width={"50px"} />
                      </Typography>
                      <Typography fontWeight={500}>
                        {" "}
                        {item.product.title}đ
                      </Typography>
                      <Typography fontWeight={500}>
                        {" "}
                        {item.product.price}đ
                      </Typography>
                      <Typography fontWeight={500}> {item.quantity}</Typography>
                    </Stack>
                  ))}
                </Stack>
                <Typography
                  fontWeight={500}
                  sx={{
                    fontWeight: "bold",
                    fontSize: "18px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  {" "}
                  <Box
                    sx={{ fontWeight: "bold", fontSize: "18px", color: "red" }}
                  >
                    Total:
                  </Box>
                  {totalPrice}đ
                </Typography>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ width: "100%", mt: 3, bgcolor: "#551a8b" }}
                  // onClick={() => onSubmit(values)}
                >
                  Submit
                </Button>
              </Box>
            </Box>
          </form>
        </>
      ) : (
        <Navigate to={"/"}></Navigate>
      )}
      <AlertDialog open={open} setOpen={setOpen} />
    </>
  );
}

export default Checkout;

const Wrapper = styled(Stack)({
  paddingTop: 72,
});

const LabelWrapper = styled(Stack)(({ theme }) => ({
  // background: "#F9F1E7",
  height: 55,
  margin: "0 auto",
}));
