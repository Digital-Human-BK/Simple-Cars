import image from "../../assets/landing.jpg";

export const signInStyles = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `url(${image}) no-repeat center center/cover`,
  },
  card: {
    padding: "2rem 1rem",
    borderRadius: "0.25rem",
    backgroundColor: "rgba(255,255,255, 0.80)",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    mt: 3,
  },
  submit: {
    mt: 3,
    mb: 2,
  },
  link: {
    cursor: "pointer",
  },
  logo: {
    width: "100%",
    objectFit: "contain",
    mt: 8,
  },
};
