import express from "express";
const app = express();

import morgan from "morgan";

import tracksRouter from "#api/tracks";
import playlistsRouter from "#api/playlists"


app.use(express.json());
app.use(express.urlencoded( { extended: true}));

app.use(morgan("dev"));

app.use("/tracks", tracksRouter);
app.use("/playlists", playlistsRouter);



app.use((err, req, res, next) => {
 
  if (err.code === "23503") {
    return res.status(400).send(err.detail);
  }

  
if (err.code === "22P02") {
  return res.status(400).send("Invalid input syntax for integer field");
}

if (err.code === "22007") {
  return res.status(400).send("Invalid format in date");

}

if (err.code === "22008") {
  return res.status(400).send("Date in not in range");
}

if (err.code === "23505") {
  return res.status(400).send("Error, this is a dublicate");
}
  next(err);
});

app.use((err, req, res, next) => {
  console.error('Error details:', err); 
  res.status(500).send("Sorry! Something went wrong.");
});













export default app;
