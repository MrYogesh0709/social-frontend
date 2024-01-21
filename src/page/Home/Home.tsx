import { Container, Grid, Grow } from "@mui/material";
import { useState } from "react";

import Posts from "../../components/Posts/Posts";
import Form from "../../components/Form/Form";
const styles = [
  "font-size: 20px",
  "text-transform: uppercase",
  "background: linear-gradient(to right, #30cfd0, #330867);",
  "color: white",
  "padding: 8px",
  "border-radius: 4px",
].join(";");
const Home = () => {
  const [currentId, setCurrentId] = useState<string>("");
  console.log(
    `%c Hello User. Service hosted on Render may take some time to load data.`,
    styles
  );
  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          sx={{ flexDirection: { xs: "column-reverse", sm: "row" } }}
        >
          <Grid item xs={12} sm={6} md={9} sx={{ m: "auto" }}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          {/* TODO:make it right  */}
          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
