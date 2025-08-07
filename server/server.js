// server.js
import express from "express";
import cors from "cors";
import pkg from "express-session";
const session = pkg;

const app = express();

app.use(cors({
  origin: "http://localhost:5173", // React dev server
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: "eventustix-secret-key",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

// ====== MOCK VENUE DATA ======
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

// ====== VENUE / EVENT ROUTES ======

// Get all events for a venue
app.get("/api/venues/:venueId/events", (req, res) => {
  const venueId = req.params.venueId.toLowerCase();
  const venue = venues[venueId];
  if (!venue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  res.json({
    venue: { name: venue.name, logo: venue.logo, website: venue.website },
    events: venue.events
  });
});

// Get single event for a venue
app.get("/api/venues/:venueId/events/:eventId", (req, res) => {
  const { venueId, eventId } = req.params;
  const venue = venues[venueId.toLowerCase()];
  if (!venue) {
    return res.status(404).json({ error: "Venue not found" });
  }
  const event = venue.events.find(e => e.id === parseInt(eventId));
  if (!event) {
    return res.status(404).json({ error: "Event not found" });
  }
  res.json({
    venue: { name: venue.name, logo: venue.logo, website: venue.website },
    event
  });
});

// ====== CART (SESSION) ROUTES ======

// Initialize cart for each session
app.use((req, res, next) => {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  next();
});

// Get cart for this session
app.get("/api/cart", (req, res) => {
  res.json(req.session.cart);
});

// Add or update an order for this session
app.post("/api/cart", (req, res) => {
  const { venueId, eventId, event, formData } = req.body;
  if (!venueId || !eventId || !event || !formData) {
    return res.status(400).json({ error: "Invalid order data" });
  }

  const existingIndex = req.session.cart.findIndex(
    o => o.venueId === venueId && o.eventId === eventId
  );
  if (existingIndex !== -1) {
    req.session.cart[existingIndex] = { venueId, eventId, event, formData };
  } else {
    req.session.cart.push({ venueId, eventId, event, formData });
  }

  res.json(req.session.cart);
});

// ====== START SERVER ======
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
