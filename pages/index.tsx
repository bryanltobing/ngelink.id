import type { GetServerSideProps, NextPage } from "next";
import { Box } from "@mui/material";

const Home: NextPage = () => {
  return <Box>Index</Box>;
};

export default Home;

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = (req.cookies as { "ngelink-token": string })["ngelink-token"];

  if (!token) {
    res.writeHead(307, { Location: "/login" });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
};
