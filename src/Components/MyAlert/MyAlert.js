import {React,forwardRef,useState} from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function MyAlert({severity,message}) {

    const [display, setDisplay] = useState(true)

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setDisplay(false)
  };
  return (
    <Snackbar
      open={display}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}

export default MyAlert;
