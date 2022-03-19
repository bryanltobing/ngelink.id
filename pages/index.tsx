import type { GetServerSideProps, NextPage } from "next";
import { Box } from "@mui/material";
import cookies from "js-cookie";
import { useRouter } from "next/router";

import { Button } from "@components/atoms";

const Home: NextPage = () => {
  const router = useRouter();

  const handleLogout = () => {
    cookies.remove("ngelink-token");
    router.push("/login");
  };

  return (
    <Box>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </Box>
  );
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
