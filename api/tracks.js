import { getTracks, getTracksById } from "#db/queries/tracks";
import express from "express";
const router = express.Router();




router.get("/", async (req, res) => {
    try {
            const tracks = await getTracks();
    res.json(tracks);
    } catch (error) {
        console.error("Error loading tracks:", error);
        res.status(500).send("Internal Server Error");
    }
});


router.get("/:id", async (req, res) => {
    const trackId = Number(req.params.id);

    if (isNaN(trackId)) {
        return res.status(400).json({ error: "ID must be a number" });
    }

    try {
        const track = await getTrackById(trackId);
        if (!track) {
            return res.status(404).json({ error: "Track not found" });
        }
        res.json(track);
    } catch (error) {
        console.error("Error loading track:", error);
        res.status(500).send("Internal Server Error");
    }
});





export default router;