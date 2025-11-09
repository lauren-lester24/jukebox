import db from "#db/client";

export async function getPlaylists() {
    try {
        const sql = `
        SELECT *
        FROM playlists`;
        const { rows: playlists } = await db.query(sql);
        return playlists;
    } catch (error) {
        console.error("Error getting all tracks:", error);
    throw new Error("Failed to fetch tracks.");
    }
}
export async function getPlaylistsById(id) {
    try {
        const sql = `
        SELECT *
        FROM playlists
        WHERE id = $1`;
        const { 
          rows: [playlist],
         } = await db.query(sql, [id]);
        return playlist;
    } catch (error) {
        console.error("Error fetching playlist by id", error);
        throw error;
    }
}

export async function createPlaylist(name, description) {
  try {
    const sql = `
      INSERT INTO playlists (name, description) 
      VALUES ($1, $2) 
      RETURNING *;
    `;

    const { rows: [playlist] } = await db.query(sql, [name, description]);

    return playlist; 
  } catch (error) {
    console.error("Error creating playlist", error);
    throw error;
  }
}


    


export async function addTrackToPlaylist(playlistId, trackId) {
  try {
    const sql = `
      INSERT INTO playlists_tracks (playlist_id, track_id)
      VALUES ($1, $2)
      RETURNING *;
    `;

    const { rows: [playlistTrack] } = await db.query(sql, [playlistId, trackId]);

    return playlistTrack; 
  } catch (error) {
    console.error("Error adding track to playlist", error);
    throw error;
  }
}

export async function getPlaylistById(id) {
  const sql = `
  SELECT tracks.*
  FROM
    playlists
    JOIN playlists_tracks ON playlists.id = playlists_tracks.playlist_id  
    JOIN tracks ON playlists_tracks.track_id = tracks.id
  WHERE playlists.id = $1
  `;
  const { rows: tracks } = await db.query(sql, [id]);
  return tracks;
}