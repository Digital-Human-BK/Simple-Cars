import image from "../../assets/notFound.jpg";

export const notFoundStyles = {
  main: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: `url(${image}) no-repeat center center/cover`,
  },
  center: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  }
};
