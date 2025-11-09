import db from "#db/client";
import { getPlaylists, 
    getPlaylistsById, 
    createPlaylist, 
    addTrackToPlaylist, 
     getPlaylistByIdWithTracks, 
     getPlaylistsWithTracks  } from "#db/queries/playlists";
import express from "express";
const router = express.Router();



router.get("/playlists", async (req, res) => {
    try {
         const playlists = await getPlaylists();
    res.json(playlists);
    } catch (error) {
        console.error("Error loading Playlist:", error);
        res.status(500).send("Internal Server Error");
    }
   
});


router.get("/playlist/:id", async (req, res) => {
    const { id } = req.params;
      if (isNaN(id)) 
    try {
        const playlist = await getPlaylistsById(id);
        if (!playlist) {
            return res.status(404).send("Playlist not Found");
        }
      res.json(playlist);
    } catch (error) {
        console.error("Error Fetching playlist by ID", error);
        res.status(500).send("Internal Server Error");
    }
})

router.get("/playlists", async (req, res) => {
    try {
        const playlists = await getPlaylistsWithTracks(); 
    } catch (error) {
        console.error("Error loading playlists:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/playlists/:id/tracks", async (req, res) => {
    const { id } = req.params;  
     
  
    try {
        const playlist = await getPlaylistByIdWithTracks(id);
        if (!playlist) {
            return res.status(404).send("Playlist not found"); 
        }
        res.json(playlist); 
    } catch (error) {
        console.error("Error fetching playlist by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/playlist", async (req, res) => {
    const {name, description } = req.body;

    if (!name || !description) {
        return res.status(400).send("Playlist name and description are required");
    }
    try {
        const newPlaylist = await createPlaylist(name, description);
         res.status(201).json(newPlaylist);
    } catch (error) {
       res.status(500).send("Error creating playlist"); 
    }
})


router.post("/playlists/:id/tracks", async (req, res) => {
  const { id } = req.params; 
  const { trackId } = req.body; 

  if (!trackId) {
    return res.status(400).send("Track ID is required.");
  }

  try {
    const playlistTrack = await addTrackToPlaylist(id, trackId);
    res.status(201).json(playlistTrack);
  } catch (error) {
    res.status(500).send("Error adding track to playlist");
  }
});

export default router;