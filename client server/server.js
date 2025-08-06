import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock venue + event data (later: replace with DB)
const venues = {
  "jazzclub": {
    name: "Blue Note Jazz Club",
    logo: "/images/jazzclub-logo.png",
    website: "https://bluenotejazz.com",
    events: [
      {
        id: 1,
        name: "Summer Jazz Night",
        description: "Smooth jazz under the stars.",
        date: "2025-08-20",
        image: "/images/jazz.jpg",
      },
      {
        id: 2,
        name: "Saxophone Sundays",
        description: "Weekly saxophone performances.",
        date: "2025-09-01",
        image: "/images/sax.jpg",
      }
    ]
  },
  "rockhall": {
    name: "Downtown Rock Hall",
    logo: "/images/rockhall-logo.png",
    website: "https://downtownrockhall.com",
    events: [
      {
        id: 1,
        name: "Rock Fest",
        description: "Loud guitars, booming drums.",
        date: "2025-09-02",
        image: "/images/rock.jpg",
      }
    ]
  }
};

// Get single event for a venue (more specific, so put first)
app.get("/api/venues/:venueId/events/:eventId", (req, res) => {
  const venueId = req.params.venueId.toLowerCase(); // ✅
  const eventId = parseInt(req.params.eventId);
  const venue = venues[venueId];
  if (!venue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  const event = venue.events.find(e => e.id === eventId);
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json({
    venue: { name: venue.name, logo: venue.logo, website: venue.website },
    event
  });
});


// Get events for a venue
app.get("/api/venues/:venueId/events", (req, res) => {
  const venueId = req.params.venueId.toLowerCase();
  const venue = venues[venueId];
  if (!venue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  res.json({ venue: { name: venue.name, logo: venue.logo, website: venue.website }, events: venue.events });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));