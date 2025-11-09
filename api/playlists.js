import db from "#db/client";
import { getPlaylists, 
    getPlaylistsById, 
    createPlaylist, 
    addTrackToPlaylist, 
     getPlaylistByIdWithTracks, 
     getPlaylistsWithTracks  } from "#db/queries/playlists";
import express from "express";
const router = express.Router();



router.get("/:id", async (req, res) => {
    const playlistId = Number(req.params.id);
    if (isNaN(playlistId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }

    try {
        const playlist = await getPlaylistsById(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }
        res.json(playlist);
    } catch (error) {
        console.error("Error fetching playlist by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/", async (req, res) => {
    try {
        const playlists = await getPlaylistsWithTracks();
        res.json(playlists);
    } catch (error) {
        console.error("Error loading playlists:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/:id/tracks", async (req, res) => {
    const playlistId = Number(req.params.id);
    if (isNaN(playlistId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }

    try {
        const playlist = await getPlaylistByIdWithTracks(playlistId);
        if (!playlist) {
            return res.status(404).json({ error: "Playlist not found" });
        }
        res.json(playlist);
    } catch (error) {
        console.error("Error fetching playlist by ID:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.post("/", async (req, res) => {
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


router.post("/:id/tracks", async (req, res) => {
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