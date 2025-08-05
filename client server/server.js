// server/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Sample data (later: fetch from database)
const events = [
  {
    id: 1,
    name: "Summer Jazz Night",
    description: "An evening of smooth jazz under the stars.",
    date: "2025-08-20",
    image: "/images/jazz.jpg",
  },
  {
    id: 2,
    name: "Rock Fest",
    description: "Loud guitars, booming drums, unforgettable energy.",
    date: "2025-09-02",
    image: "/images/rock.jpg",
  }
];

// GET all events for a venue
app.get("/api/events", (req, res) => {
  res.json(events);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
