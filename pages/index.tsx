import type { GetServerSideProps, NextPage } from "next";
import { Box } from "@mui/material";

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const token = (req.cookies as { "ngelink-token": string })["ngelink-token"];

  if (!token) {
    res.writeHead(307, { Location: "/auth/login" });
    res.end();
    return { props: {} };
  }

  return {
    props: {},
  };
};

const Home: NextPage = () => {
  return <Box>Index</Box>;
};

export default Home;
