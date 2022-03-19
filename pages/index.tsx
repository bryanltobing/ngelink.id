import type { GetServerSideProps, NextPage } from "next";
import { Box } from "@mui/material";

const Home: NextPage = () => {
  return <Box>Get Cookie Page</Box>;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  return {
    props: {},
  };
};

export default Home;
