import { createContext, ReactNode, useEffect, useReducer } from "react";
import axiosInstance from "src/axios/instance";
import reducerPro from "src/reducer/reducerProduct";
import { Product } from "src/types/Product";

interface Props {
  children: ReactNode;
}

export const ProductContext = createContext(
  {} as {
    products: Product[];
    dispathProducts: any;
  }
);
export const ProductProvider = (props: Props) => {
  const [products, dispathProducts] = useReducer(reducerPro, [] as Product[]);
  useEffect(() => {
    (async () => {
      const { data } = await axiosInstance.get("/products");
      dispathProducts({ type: "SET_PRODUCT", payload: data });
    })();
  }, []);
  return (
    <ProductContext.Provider value={{ products, dispathProducts }}>
      {props.children}
    </ProductContext.Provider>
  );
};
