import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";

const Home: NextPage = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [longUrl, setLongUrl] = useState("");

  const [urls, setUrls] = useState([] as any);

  useEffect(() => {
    fetch("/api/read")
      .then((response) => response.json())
      .then((data) => {
        setUrls(data);
      });
  }, []);

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault();

    fetch("/api/write", {
      // Adding method type
      method: "POST",

      // Adding body or contents to send
      body: JSON.stringify({
        shortUrl,
        longUrl,
      }),

      // Adding headers to the request
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then((data) => {
      alert("Posted");
      setShortUrl("");
      setLongUrl("");
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <List>
        {urls.map((url: any, id: any) => (
          <ListItem key={id}>
            <ListItemText primary={url?.longUrl as any} />
          </ListItem>
        ))}
      </List>
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
              onChange={(evt) => setLongUrl(evt.target.value)}
              value={longUrl}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              placeholder="Masukkan ngelink url"
              label="Shortened link"
              fullWidth
              onChange={(evt) => setShortUrl(evt.target.value)}
              value={shortUrl}
            />
          </Grid>
          <Grid item xs={12}>
            <Button color="primary" variant="contained" fullWidth type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

export default Home;
