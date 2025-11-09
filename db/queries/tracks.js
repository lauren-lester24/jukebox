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

export async function getTrackById(id) {
    try {
        const sql = `SELECT *
         FROM tracks 
         WHERE id = $1`;
        const { rows } = await db.query(sql, [id]);
        return rows[0]; 
    } catch (error) {
        console.error("Failure Loading Track By ID");
        throw error;
    }
}
