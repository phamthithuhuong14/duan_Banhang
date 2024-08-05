import { Badge, Box, Stack, styled, Typography } from "@mui/material";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useCart } from "src/context/cart";
import { useMemo } from "react";

const menus = [
  {
    label: "Home",
    link: "/",
  },
  {
    label: "Shop",
    link: "/products",
  },
  {
    label: "About",
    link: "/about",
  }
];

const Header = () => {
  const { cart } = useCart(); 
  const cartQuantity = useMemo(
    () =>
      cart
        ? cart.products.reduce((total, { quantity }) => total + quantity, 0)
        : 0,
    [cart]
  );
  return (
    <Wrapper
      sx={{ padding: "0 50px" }}
      direction={"row"}
      justifyContent={"space-between"}
      alignItems={"center"}
    >
      <Link to="">
        <img
          src="https://images.vexels.com/content/224138/preview/abstract-wavy-violet-logo-2321b7.png "
          alt="logo"
          width={"60px"}
        />
      </Link>
      <Stack direction={"row"} gap={"55px"}>
        {/* menu */}
        {menus.map((menu, index) => (
          <Link to={menu.link} key={index} style={{ textDecoration: "none", color: "black", }}>
            <Typography fontWeight={"500"}>{menu.label}</Typography>
          </Link>
        ))}
      </Stack>
      <Stack gap={"45px"} direction={"row"}>
        {/* icon  */}
        <Link to={"/login"}>
          <img src="/user.svg" alt="user" />
        </Link>
        <SearchIcon />
        <FavoriteBorderIcon />
        <Link to={"/cart"}>
          <Badge badgeContent={cartQuantity} color="error">
            <img src="/cart.svg" alt="cart" />
          </Badge>
        </Link>
      </Stack>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled(Stack)({
  height: 100,
  padding: "0 50px",
  textDecoration: "none",
  
});
