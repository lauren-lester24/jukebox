import db from "#db/client";

export async function getTracks() {
    try {
        const sql = `
        SELECT *
        FROM tracks
        `;
        const { rows: tracks } = await db.query(sql);
        return  tracks;
    } catch (error) {
        console.error("Failure Loading Tracks");
        throw error;
    }
}

export async function getTracksById(id) {
    try {
        const sql = `
        SELECT *
        FROM tracks
        WHERE id = $1
        `;
        const { rows: [tracks],

        } = await query.db(sql, [id]);
        return tracks;
    } catch (error) {
        console.error("Error Fetching Tracks by ID", error);
        throw error;
    }
    
}