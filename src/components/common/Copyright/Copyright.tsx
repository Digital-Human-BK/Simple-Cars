import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";

type CopyrightProps = {
  sx: {}
}

function Copyright({sx}: CopyrightProps) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      sx={sx}
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
