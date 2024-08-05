import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { ValidationErrors } from "final-form";
import { Field, Form } from "react-final-form";
import { ProductFormParams } from "src/types/Product";
import { useGlobalContext } from "src/context";
import { InputText } from "../components/Element/InputText";

type ProductFormProps = {
  onSubmit: (values: ProductFormParams) => void;
  initialValues?: any;
};

function ProductForm({ onSubmit, initialValues }: ProductFormProps) {
  const { setFlash } = useGlobalContext();

  const validate = (values: ProductFormParams) => {
    const { title, image, category, price, description } = values;
    const errors: ValidationErrors = {};
    if (!title) errors.title = "Can nhap title vao";
    if (title && title.length < 6)
      errors.title = "Can nhap toi thieu 6 ky tu vao";
    if (!image) errors.image = "Can nhap image vao";
    if (!category) errors.category = "Can nhap category vao";
    if (!description) errors.description = "Can nhap description vao";
    if (!price) errors.price = "Can nhap price vao";
    return errors;
  };

  return (
    <Form
      onSubmit={onSubmit}
      validate={validate}
      initialValues={initialValues}
      render={({ values }) => {
        return (
          <Stack>
            <Field
              name="title"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Title"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field
              name="image"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Image"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<string>
              name="description"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Description"}
                  messageError={meta.touched && meta.error}
                />
              )}
            />
            <Field<number>
              name="price"
              render={({ input, meta }) => (
                <InputText
                  input={input}
                  label={"Price"}
                  messageError={meta.touched && meta.error}
                  type="number"
                />
              )}
            />
            <Field<string>
              name="isShow"
              type="checkbox"
              render={({ input, meta }) => {
                return (
                  <FormControlLabel
                    control={<Checkbox {...input} />}
                    label="Show Product"
                  />
                );
              }}
            />
            <Field<string>
              name="category"
              render={({ input, meta }) => {
                return (
                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                      label="Category"
                      {...input}
                      error={meta.touched && meta.error ? true : false}
                    >
                      <MenuItem value="">Select</MenuItem>
                      <MenuItem value={"6693a6e23e21098d9255638c"}>
                        Điện thoại
                      </MenuItem>
                      <MenuItem value={"6693a7013e21098d92556cc4"}>
                        Laptop
                      </MenuItem>
                      <MenuItem value={"6693a71d3e21098d92557510"}>
                        Đồng hồ
                      </MenuItem>
                    </Select>
                    {meta.touched && meta.error && (
                      <FormHelperText>{meta.error}</FormHelperText>
                    )}
                  </FormControl>
                );
              }}
            />

            <Button
              type="submit"
              variant="contained"
              sx={{
                marginTop: "16px",
                padding: "12px 0",
                backgroundColor: "#551a8b",
                ":hover": {
                  backgroundColor: "#551a8b",
                },
              }}
              onClick={() =>
                Object.keys(validate(values)).length == 0
                  ? onSubmit(values)
                  : setFlash((state: any) => ({
                      ...state,
                      isShow: true,
                      type: "warning",
                      content: "Vui lòng nhập chính xác thông tin",
                    }))
              }
            >
              Submit
            </Button>
          </Stack>
        );
      }}
    />
  );
}

export default ProductForm;
