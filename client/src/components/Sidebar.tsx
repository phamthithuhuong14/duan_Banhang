import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { Link } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import { Box } from "@mui/material";

const drawerWidth = "16%";

function Sidebar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box textAlign={"center"}>
        <Link to="">
          <img
            src="https://images.vexels.com/content/224138/preview/abstract-wavy-violet-logo-2321b7.png "
            alt="logo"
            width={"60px"}
          />
        </Link>
      </Box>
      <Divider />
      <List>
        <Link to="/admin" style={{ display: "block", textDecoration: "none" }}>
          <ListItem>
            <ListItemButton sx={{display: "flex", gap: 1, alignItems: "center"}}>
              <DashboardIcon sx={{
                color: "#551a8b"
              }} />
              <ListItemText sx={{
                color: "#551a8b"
              }} primary={"Dashboard"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/admin/product/list"
          style={{ display: "block", textDecoration: "none" }}
        >
          <ListItem>
            <ListItemButton sx={{display: "flex", gap: 1, alignItems: "center"}}>
              <ListAltIcon sx={{
                color: "#551a8b"
              }} />
              <ListItemText sx={{
                color: "#551a8b"
              }} primary={"List Product"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/admin/product/add"
          style={{ display: "block", textDecoration: "none" }}
        >
          <ListItem>
            <ListItemButton sx={{display: "flex", gap: 1, alignItems: "center"}}>
              <AddCircleIcon sx={{
                color: "#551a8b"
              }}/>
              <ListItemText sx={{
                color: "#551a8b"
              }} primary={"Add product"} />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link
          to="/admin/product/add"
          style={{ display: "block", textDecoration: "none" }}
        >
          <ListItem>
            <ListItemButton sx={{display: "flex", gap: 1, alignItems: "center"}}>
              <LeaderboardIcon sx={{
                color: "#551a8b"
              }}/>
              <ListItemText sx={{
                color: "#551a8b"
              }} primary={"Statistical"} />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

export default Sidebar;
