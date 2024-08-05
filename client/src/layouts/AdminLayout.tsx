import { Box, Stack } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "src/components/NavBar";
import Sidebar from "src/components/Sidebar";

function AdminLayout() {
  const nav = useNavigate();

  // const user = localStorage.getItem('user');

  // if (!user) {
  //   nav("/login")
  // }

  return (
    <>
      <Box display={"flex"} justifyContent={"space-between"}>
        <Box>
          <Sidebar />
        </Box>
        <Box width={"84%"}>
          <PrimarySearchAppBar />
          <Outlet />
        </Box>
      </Box>
    </>
  );
}

export default AdminLayout;
