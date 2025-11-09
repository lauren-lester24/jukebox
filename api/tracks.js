import { getTracks, getTracksById } from "#db/queries/tracks";
import express from "express";
const router = express.Router();




router.get("/tracks", async (req, res) => {
    try {
            const tracks = await getTracks();
    res.json(tracks);
    } catch (error) {
        console.error("Error loading tracks:", error);
        res.status(500).send("Internal Server Error");
    }
});


 router.get("/tracks/:id", async(res,req) => {
    const { id } = req.params;

    try {
        const track = await getTracksById(id);
    if (!track) {

     return res.statusCode(404).send("Track not found");
    }
    res.json(track);  

    } catch (error) {
          console.error("Error fetching track by ID:", error);
        res.status(500).send("Internal Server Error");
    }
   
 });





export default router;