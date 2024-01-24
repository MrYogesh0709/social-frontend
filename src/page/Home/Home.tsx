import { Container, Grow } from "@mui/material";
import Posts from "../../components/Posts/Posts";
import { getUserFromLocalStorage } from "../../app/localStorage";

const styles = [
  "font-size: 20px",
  "text-transform: uppercase",
  "background: linear-gradient(to right, #30cfd0, red);",
  "color: white",
  "padding: 8px",
  "border-radius: 4px",
].join(";");

const Home = () => {
  const user = getUserFromLocalStorage();
  console.log(
    `%c Hello ${
      user ? user?.result?.name : "USER"
    } Service hosted on Render may take some time to load data.`,
    styles
  );

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Posts />
      </Container>
    </Grow>
  );
};

export default Home;
