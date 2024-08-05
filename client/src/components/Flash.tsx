import { Alert, Snackbar } from "@mui/material";
import { useState } from "react";

type FlashProps = {
  isCheck: any
};

function Flash({ isCheck, setFlash }: any) {
  
  return (
    <Snackbar
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open={isCheck.isShow}
      onClose={() => setFlash((state:any) => ({...state, isShow: false, type: "", content: ""}))}
      autoHideDuration={2000}
    >
      <Alert severity={isCheck.type}>{isCheck.content}</Alert>
    </Snackbar>
  );
}

export default Flash;
