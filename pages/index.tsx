import type { NextPage } from "next";
import { Button, Grid, TextField, Typography } from "@mui/material";

const Home: NextPage = () => {
  return (
    <Grid
      container
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: "100vh" }}
      spacing={0}
    >
      <Grid container spacing={4} maxWidth="sm">
        <Grid item xs={12}>
          <Typography variant="h1" align="center">
            ngelink.id
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Masukkan link yang ingin disingkat"
            label="Link"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            placeholder="Masukkan ngelink url"
            label="Shortened link"
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button color="primary" variant="contained" fullWidth>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Home;
