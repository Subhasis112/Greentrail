// data/initBuses.js
export const buses = [
  {
    id: 1,
    name: "Ranchi Express Volvo",
    img: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?auto=format&fit=crop&w=1200&q=80",
    desc: "Luxury AC Volvo bus with pushback seats and entertainment system.",
    price: "₹1200 / seat",
    capacity: 40,
    route: ["Ranchi", "Ramgarh", "Hazaribagh", "Koderma", "Gaya", "Patna"],
    departureTime: "08:00 AM",
    arrivalTime: "02:00 PM",
    driver: {
      name: "Rajesh Kumar",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
      language: "Hindi, English"
    },
    amenities: ["AC", "WiFi", "Charging Port", "Water Bottle"],
    coordinates: [
      { lat: 23.3441, lng: 85.3096 }, // Ranchi
      { lat: 23.63, lng: 85.52 },     // Ramgarh
      { lat: 24.0, lng: 85.4 },       // Hazaribagh
      { lat: 24.467, lng: 85.5946 },  // Koderma
      { lat: 24.7955, lng: 85.0078 }, // Gaya
      { lat: 25.5941, lng: 85.1376 }  // Patna
    ]
  },
  {
    id: 2,
    name: "Dhanbad Deluxe",
    img: "https://images.unsplash.com/photo-1600195077900-e48be2c3f7c0?auto=format&fit=crop&w=1200&q=80",
    desc: "Comfortable deluxe bus with ample legroom and clean interiors.",
    price: "₹950 / seat",
    capacity: 35,
    route: ["Dhanbad", "Bagodar", "Hazaribagh", "Ranchi"],
    departureTime: "09:00 AM",
    arrivalTime: "01:30 PM",
    driver: {
      name: "Suresh Yadav",
      img: "https://randomuser.me/api/portraits/men/34.jpg",
      language: "Hindi, Bengali"
    },
    amenities: ["AC", "Recliner Seats", "Water Bottle", "Reading Light"],
    coordinates: [
      { lat: 23.7957, lng: 86.4304 }, // Dhanbad
      { lat: 24.17, lng: 85.87 },     // Bagodar
      { lat: 24.0, lng: 85.4 },       // Hazaribagh
      { lat: 23.3441, lng: 85.3096 }  // Ranchi
    ]
  },
  {
    id: 3,
    name: "Jamshedpur AC Sleeper",
    img: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1200&q=80",
    desc: "AC sleeper bus for overnight journeys with comfortable berths.",
    price: "₹1500 / seat",
    capacity: 28,
    route: ["Jamshedpur", "Chandil", "Ramgarh", "Ranchi"],
    departureTime: "10:00 PM",
    arrivalTime: "06:00 AM",
    driver: {
      name: "Mohammad Irfan",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
      language: "Hindi, Urdu"
    },
    amenities: ["Sleeper Berths", "AC", "Blankets", "Charging Ports"],
    coordinates: [
      { lat: 22.8046, lng: 86.2029 }, // Jamshedpur
      { lat: 22.96, lng: 86.05 },     // Chandil
      { lat: 23.63, lng: 85.52 },     // Ramgarh
      { lat: 23.3441, lng: 85.3096 }  // Ranchi
    ]
  },
  {
    id: 4,
    name: "Bokaro Traveller Mini",
    img: "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?auto=format&fit=crop&w=1200&q=80",
    desc: "Mini traveler bus, best for small groups and short trips.",
    price: "₹3000 / trip",
    capacity: 20,
    route: ["Bokaro", "Ramgarh", "Ranchi"],
    departureTime: "07:30 AM",
    arrivalTime: "11:30 AM",
    driver: {
      name: "Ajay Singh",
      img: "https://randomuser.me/api/portraits/men/56.jpg",
      language: "Hindi, English"
    },
    amenities: ["AC", "Music System", "Comfortable Seats"],
    coordinates: [
      { lat: 23.6693, lng: 86.1512 }, // Bokaro
      { lat: 23.63, lng: 85.52 },     // Ramgarh
      { lat: 23.3441, lng: 85.3096 }  // Ranchi
    ]
  },
  {
    id: 5,
    name: "Hazaribagh Superfast",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=80",
    desc: "Superfast AC bus service with excellent punctuality.",
    price: "₹1100 / seat",
    capacity: 45,
    route: ["Hazaribagh", "Ramgarh", "Ranchi"],
    departureTime: "06:00 AM",
    arrivalTime: "10:00 AM",
    driver: {
      name: "Vivek Kumar",
      img: "https://randomuser.me/api/portraits/men/67.jpg",
      language: "Hindi, English"
    },
    amenities: ["AC", "WiFi", "Water Bottle", "Luggage Storage"],
    coordinates: [
      { lat: 24.0, lng: 85.4 },       // Hazaribagh
      { lat: 23.63, lng: 85.52 },     // Ramgarh
      { lat: 23.3441, lng: 85.3096 }  // Ranchi
    ]
  },
  {
    id: 6,
    name: "Giridih Comfort Coach",
    img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80",
    desc: "Comfortable non-AC bus with spacious seats and good service.",
    price: "₹700 / seat",
    capacity: 32,
    route: ["Giridih", "Bagodar", "Hazaribagh", "Ranchi"],
    departureTime: "08:30 AM",
    arrivalTime: "12:30 PM",
    driver: {
      name: "Ratan Das",
      img: "https://randomuser.me/api/portraits/men/78.jpg",
      language: "Hindi, Bengali"
    },
    amenities: ["Comfortable Seats", "Reading Light", "Water Bottle"],
    coordinates: [
      { lat: 24.1833, lng: 86.3 },    // Giridih
      { lat: 24.17, lng: 85.87 },     // Bagodar
      { lat: 24.0, lng: 85.4 },       // Hazaribagh
      { lat: 23.3441, lng: 85.3096 }  // Ranchi
    ]
  }
];
