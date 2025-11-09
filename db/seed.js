import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
await db.query("DELETE FROM playlists_tracks");
await db.query("DELETE FROM playlists");
await db.query("DELETE FROM tracks");


 const tracks = [
  ["Know Good - Groove Session", 300000],
  ["Ganja White Night - Moon Cycle", 320000],
  ["Zingara - Solar Flare", 280000],
  ["Subtronics - Cyclops Army", 270000],
  ["Griz - Good Times Roll", 310000],
  ["Crankdat - Ding Dong", 260000],
  ["TroyBoi - Afterhours", 290000],
  ["Zeds Dead - Alive", 300000],
  ["Dom Dolla - San Frandisco", 280000],
  ["John Summit - Deep End", 270000],
  ["Monxx - Groove Conductor", 300000],
  ["CloZee - Koto", 320000],
  ["RL Grime - Era", 310000],
  ["Fred Again - Jungle Beats", 280000],
  ["Zeds Dead & Subtronics - Late Night", 330000],
  ["Griz & CloZee - Shamanic Flow", 340000],
  ["TroyBoi - O.G.", 300000],
  ["Dom Dolla - Take It", 290000],
  ["John Summit - Make Me Feel", 275000],
  ["Fred Again - Sunburst", 265000]
];
  for (const [name, duration] of tracks) {
    await db.query("INSERT INTO tracks(name, duration_ms) VALUES ($1, $2)", [name,duration]);
  }

const playlists = [
  ["Rave Nights", "High-energy EDM tracks perfect for all-night dancing."],
  ["Chill Drops", "Laid-back beats to relax and vibe to."],
  ["Bassquake", "Heavy bass and wobbles to shake the room."],
  ["Future Grooves", "Experimental and forward-thinking electronic sounds."],
  ["Club Bangers", "Tracks guaranteed to get the party started."],
  ["Sunset Sessions", "Melodic and chill tunes for golden hour vibes."],
  ["Festival Mainstage", "Anthems that dominate the festival stage."],
  ["Late Night Riddim", "Dark, hypnotic tunes for after hours."],
  ["Bassline Therapy", "Healing through heavy bass drops and vibes."],
  ["Global EDM Mix", "A diverse selection from EDM artists around the world."]
];
 
for(const [name, description] of playlists) {
  await db.query(
    "INSERT INTO playlists (name, description) VALUES ($1, $2)",
    [name, description]
  );
}

// Seed playlists_tracks
const playlists_tracks = [
  // Rave Nights (playlist_id = 1)
  [1, 3],  // Subtronics
  [1, 6],  // Crankdat
  [1, 9],  // Zeds Dead
  [1, 12], // TroyBoi

  // Chill Drops (playlist_id = 2)
  [2, 2],  // CloZee
  [2, 5],  // Griz
  [2, 15], // Fred Again

  // Bassquake (playlist_id = 3)
  [3, 3],  // Subtronics
  [3, 9],  // Zeds Dead
  [3, 12], // TroyBoi

  // Future Grooves (playlist_id = 4)
  [4, 2],  // CloZee
  [4, 10], // Monxx
  [4, 5],  // Griz

  // Club Bangers (playlist_id = 5)
  [5, 7],  // Dom Dolla
  [5, 11], // John Summit
  [5, 12], // TroyBoi

  // Sunset Sessions (playlist_id = 6)
  [6, 5],  // Griz
  [6, 15], // Fred Again
  [6, 2],  // CloZee

  // Festival Mainstage (playlist_id = 7)
  [7, 3],  // Subtronics
  [7, 5],  // Griz
  [7, 9],  // Zeds Dead
  [7, 12], // TroyBoi

  // Late Night Riddim (playlist_id = 8)
  [8, 12], // TroyBoi
  [8, 3],  // Subtronics
  [8, 10], // Monxx

  // Bassline Therapy (playlist_id = 9)
  [9, 3],  // Subtronics
  [9, 9],  // Zeds Dead
  [9, 12], // TroyBoi

  // Global EDM Mix (playlist_id = 10)
  [10, 1], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [10, 7], [10, 8],
  [10, 9], [10, 10], [10, 11], [10, 12], [10, 13], [10, 14], [10, 15], [10, 16],
  [10, 17], [10, 18], [10, 19], [10, 20]
];

// Insert playlists_tracks into database
for (const [playlistId, trackId] of playlists_tracks) {
  await db.query(
    "INSERT INTO playlists_tracks (playlist_id, track_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
    [playlistId, trackId]
  );
}




}
