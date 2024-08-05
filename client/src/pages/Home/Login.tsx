import {
  Avatar,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";

type RegisterFormParams = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormParams>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<RegisterFormParams> = async (data) => {
    try {
      const res = await axios.post("http://localhost:3000/login", data);
      console.log(data);
      localStorage.setItem("accessToken", res.data.accessToken);
      alert("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      navigate("/NotFound");
    }
  };

  return (
    <Container sx={{ height: "100vh", padding: "20px" }}>
      <Stack
        maxWidth="sm"
        sx={{
          padding: 2,
          margin: "auto",
          border: "1px solid #ccc",
          borderRadius: 5,
          display: "flex",
          flexDirection: "column",
          // gap: 2,
          // width: "40%",
        }}
      >
        <Avatar
          sx={{ margin: "auto" }}
          alt="Remy Sharp"
          src="/static/images/avatar/1.jpg"
        />
        <Typography variant="h5" textAlign={"center"} mb={2}>
          Login
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap={2}>
            <TextField
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "invalid email address",
                },
              })}
              error={!!errors?.email?.message}
              helperText={errors?.email?.message}
            />
            <TextField
              label="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password is min length 6 characters",
                },
              })}
              type="password"
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Stack>
    </Container>
  );
};

export default Login;
