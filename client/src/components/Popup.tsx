import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Link } from "react-router-dom";

export default function AlertDialog({ open, setOpen }: any) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Đặt hàng thành công"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Vui lòng kiếm trả điện thoại email để xác nhận đơn hàng !
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Link style={{display: "block"}} to="/" onClick={handleClose}>Về trang chủ</Link>
          <Link style={{display: "block"}} to="/products" onClick={handleClose} autoFocus>
            Tiếp tục mua hàng
          </Link>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
