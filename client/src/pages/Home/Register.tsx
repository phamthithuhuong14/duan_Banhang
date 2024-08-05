import {
  Avatar,
  Box,
  Button,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import axios from "axios";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { Link, useNavigate } from "react-router-dom";
import { InputText } from "src/components/Element/InputText";
import { MIN_PASSWORD } from "src/conts";
import isEmail from "validator/lib/isEmail";

type RegisterFormParams = {
  username: string;
  email: string;
  password: string;
  confrimPassword: string;
};

const Register = () => {
  const nav = useNavigate();
  const validate = (values: RegisterFormParams) => {
    const { username, email, password } = values;
    const errors: ValidationErrors = {};
    if (!username) errors.username = "Can nhap username vao";
    if (!email) errors.email = "Can nhap email vao";
    if (email && !isEmail(email)) errors.email = "Chua dung dinh dang email";
    if (!password) errors.password = "Can nhap password vao";
    if (password && password.length < MIN_PASSWORD)
      errors.password = `Can nhap password toi thieu ${MIN_PASSWORD} ky tu`;
    return errors;
  };

  const onSubmit = async (data: RegisterFormParams) => {
    try {
      await axios.post("/auth/register", data);
      nav("/login");
    } catch (error) {
      alert(error);
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
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ bgcolor: deepOrange[500] }}
            alt="Remy Sharp"
            src="/broken-image.jpg"
          />
        </Box>
        <Typography variant="h5" textAlign={"center"} mb={2}>
          Register
        </Typography>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={({ values }) => {
            return (
              <Stack gap={2}>
                <Field
                  name="username"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Username"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field
                  name="email"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Email"}
                      messageError={meta.touched && meta.error}
                    />
                  )}
                />
                <Field
                  name="password"
                  render={({ input, meta }) => (
                    <InputText
                      input={input}
                      label={"Password"}
                      messageError={meta.touched && meta.error}
                      type="password"
                    />
                  )}
                />
                <Button variant="contained" onClick={() => onSubmit(values)}>
                  Submit
                </Button>
                <Box
                  sx={{
                    textAlign: "center",
                    justifyContent: "space-between",
                    display: "flex",
                    textDecoration: "none",
                  }}
                >
                  <Link to="/forgot-password">Forgot password?</Link>
                  <Link to="/login">Do you already have an account? Login</Link>
                </Box>
              </Stack>
            );
          }}
        />
      </Stack>
    </Container>
  );
};

export default Register;
