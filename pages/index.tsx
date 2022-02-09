import type { NextPage } from "next";
import { Button, Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <>
      <Button variant="contained" color="success">
        Contained Variant
      </Button>
      <Typography variant="h1" component="h2">
        h1. Heading
      </Typography>
      <Typography variant="h1" component="h2">
        h1. Heading
      </Typography>
      <Button variant="outlined">Outlined Variant</Button>
      <Button variant="text">Outlined Variant</Button>
    </>
  );
};

export default Home;
