import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link
        color="text.primary"
        underline="hover"
        href="https://github.com/Digital-Human-BK/Simple-Cars"
        target="_blank"
        rel="noopener"
      >
        Simple Cars
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Copyright;
