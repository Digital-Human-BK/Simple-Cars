import Link from "@mui/material/Link";
import { useNavigate } from "react-router-dom";

type LinkComponentProps = {
  children: string;
  path: string;
  styles?: {}
}

function LinkComponent({children, path, styles}: LinkComponentProps) {
  const navigate = useNavigate();
  return (
    <Link
      onClick={() => navigate(path)}
      variant="body2"
      underline="hover"
      sx={{ cursor: "pointer", ...styles }}
    >
      {children}
    </Link>
  );
}

export default LinkComponent;
