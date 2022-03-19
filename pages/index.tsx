import type { GetServerSideProps, NextPage } from "next";
import { Box } from "@mui/material";
import { PrismaClient, User } from "@prisma/client";
import { Fragment } from "react";

const prisma = new PrismaClient();

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const users = await prisma.user.findMany();

  return {
    props: { users },
  };
};

const Home: NextPage<{ users: User[] }> = ({ users }) => {
  return (
    <Box>
      {users.map((u) => (
        <Fragment key={u.id}>
          <h1>{u.firstName}</h1>
          <p>{u.lastName}</p>
          <p>{u.email}</p>
        </Fragment>
      ))}
    </Box>
  );
};

export default Home;
