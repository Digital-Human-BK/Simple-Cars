import ReactDOM from "react-dom";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type DialogProps = {
  open: boolean;
  message: string;
  onClose: () => void;
  onConfirm: () => void;
};

function DialogComponent({ open, message, onClose, onConfirm }: DialogProps) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {message}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click OK to continue.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={onConfirm}
            autoFocus
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default function AlertDialog({ open, message, onClose, onConfirm }: DialogProps) {
  return ReactDOM.createPortal(
    <DialogComponent
      open={open}
      message={message}
      onClose={onClose}
      onConfirm={onConfirm}
    />,
    document.getElementById("overlays") as HTMLElement
  );
}
