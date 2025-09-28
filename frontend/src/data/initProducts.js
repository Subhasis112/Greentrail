// // /src/data/initProducts.js

// export function initProducts() {
//   const products = [
//     // ───── Paintings ─────
//     { id: 1, category: "Paintings", name: "Sohrai Painting", img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Sohrai_painting.jpg", desc: "Traditional Sohrai wall art with natural colors and tribal motifs.", price: 800, rating: 4.5, tags: ["traditional","tribal","handmade"] },
//     { id: 2, category: "Paintings", name: "Khovar Painting", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Khovar_painting.jpg", desc: "Khovar marriage mural painting, symbolizing fertility and prosperity.", price: 950, rating: 4.7, tags: ["marriage","festive","tribal"] },
//     { id: 3, category: "Paintings", name: "Tribal Folk Art", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tribal_folk_art.jpg", desc: "Colorful folk art depicting tribal life and nature.", price: 600, rating: 4.3, tags: ["folk","colorful","nature"] },
//     { id: 4, category: "Paintings", name: "Warli Painting", img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Warli_painting.jpg", desc: "Warli tribal painting with geometric patterns and scenes.", price: 700, rating: 4.6, tags: ["geometric","tribal","folkart"] },
//     { id: 5, category: "Paintings", name: "Handmade Canvas", img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Handmade_canvas.jpg", desc: "Hand-painted canvas with Jharkhand tribal themes.", price: 1200, rating: 4.8, tags: ["canvas","hand-painted","tribal"] },
//     { id: 6, category: "Paintings", name: "Tribal Mask Art", img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_mask_art.jpg", desc: "Artistic mask painting inspired by tribal rituals.", price: 500, rating: 4.4, tags: ["mask","tribal","art"] },
//     { id: 7, category: "Paintings", name: "Nature Motif Painting", img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nature_motif_painting.jpg", desc: "Painting featuring flora and fauna of Jharkhand.", price: 650, rating: 4.5, tags: ["nature","flora","fauna"] },
//     { id: 8, category: "Paintings", name: "Festival Wall Art", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Festival_wall_art.jpg", desc: "Wall art celebrating tribal festivals and dances.", price: 900, rating: 4.6, tags: ["festival","celebration","tribal"] },
//     { id: 9, category: "Paintings", name: "Tribal Village Scene", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Tribal_village_scene.jpg", desc: "Painting depicting daily life in a tribal village.", price: 850, rating: 4.5, tags: ["village","tribal","daily-life"] },
//     { id: 10, category: "Paintings", name: "Peacock Motif", img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Peacock_motif_painting.jpg", desc: "Vibrant peacock motif, a popular theme in tribal art.", price: 750, rating: 4.3, tags: ["peacock","colorful","tribal"] },
//     { id: 11, category: "Paintings", name: "Harvest Festival Art", img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Harvest_festival_painting.jpg", desc: "Art celebrating the harvest festival with tribal dancers.", price: 980, rating: 4.7, tags: ["harvest","festival","dance"] },
//     { id: 12, category: "Paintings", name: "Elephant Procession", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Elephant_procession_painting.jpg", desc: "Painting of a festive elephant procession in Jharkhand.", price: 1100, rating: 4.8, tags: ["elephant","festival","tribal"] },

//     // ───── Tribal Handcrafts ─────
//     { id: 21, category: "Tribal Handcrafts", name: "Bamboo Basket", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Bamboo_basket.jpg", desc: "Handwoven bamboo basket crafted by local artisans.", price: 350, rating: 4.4, tags: ["bamboo","handmade","eco-friendly"] },
//     { id: 22, category: "Tribal Handcrafts", name: "Wooden Mask", img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Tribal_wooden_mask.jpg", desc: "Traditional wooden mask used in tribal festivals.", price: 600, rating: 4.5, tags: ["wooden","festival","tribal"] },
//     { id: 23, category: "Tribal Handcrafts", name: "Beaded Necklace", img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tribal_beaded_necklace.jpg", desc: "Colorful beaded necklace made by tribal women.", price: 250, rating: 4.2, tags: ["beaded","jewelry","tribal"] },
//     { id: 24, category: "Tribal Handcrafts", name: "Terracotta Figurine", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Terracotta_figurine.jpg", desc: "Handcrafted terracotta figurine representing tribal culture.", price: 400, rating: 4.3, tags: ["terracotta","handmade","decor"] },
//     { id: 25, category: "Tribal Handcrafts", name: "Bamboo Flute", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bamboo_flute.jpg", desc: "Traditional bamboo flute with melodious sound.", price: 200, rating: 4.5, tags: ["bamboo","musical","traditional"] },
//     { id: 26, category: "Tribal Handcrafts", name: "Tribal Drum", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Tribal_drum.jpg", desc: "Handmade drum used in tribal music and dance.", price: 550, rating: 4.6, tags: ["drum","music","tribal"] },
//     { id: 27, category: "Tribal Handcrafts", name: "Painted Pottery", img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Painted_pottery.jpg", desc: "Beautifully painted pottery with tribal motifs.", price: 300, rating: 4.3, tags: ["pottery","decor","tribal"] },
//     { id: 28, category: "Tribal Handcrafts", name: "Jute Bag", img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jute_bag.jpg", desc: "Eco-friendly jute bag crafted by tribal artisans.", price: 180, rating: 4.2, tags: ["jute","eco-friendly","bag"] },
//     { id: 29, category: "Tribal Handcrafts", name: "Tribal Earrings", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tribal_earrings.jpg", desc: "Handcrafted earrings with traditional tribal designs.", price: 120, rating: 4.1, tags: ["earrings","handmade","tribal"] },
//     { id: 30, category: "Tribal Handcrafts", name: "Tribal Wall Hanging", img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_wall_hanging.jpg", desc: "Decorative wall hanging featuring tribal art and motifs.", price: 450, rating: 4.4, tags: ["wall-hanging","decor","tribal"] },
//     { id: 31, category: "Tribal Handcrafts", name: "Handmade Clay Lamp", img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Clay_lamp.jpg", desc: "Traditional clay lamp used in tribal households.", price: 90, rating: 4.0, tags: ["clay","decor","traditional"] },
//     { id: 32, category: "Tribal Handcrafts", name: "Tribal Bead Bracelet", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bead_bracelet.jpg", desc: "Vibrant bead bracelet crafted by tribal artisans.", price: 160, rating: 4.2, tags: ["bracelet","beaded","tribal"] },

//     // ───── Handwoven Textiles ─────
//     { id: 41, category: "Handwoven Textiles", name: "Tribal Handloom Saree", img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Handloom_textiles.jpg", desc: "Beautiful handwoven saree with traditional tribal patterns.", price: 1500, rating: 4.7, tags: ["saree","handwoven","tribal"] },
//     { id: 42, category: "Handwoven Textiles", name: "Cotton Shawl", img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Handwoven_cotton_shawl.jpg", desc: "Soft cotton shawl crafted by local weavers.", price: 900, rating: 4.5, tags: ["shawl","cotton","handwoven"] },
//     { id: 43, category: "Handwoven Textiles", name: "Jute Table Runner", img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jute_table_runner.jpg", desc: "Eco-friendly jute table runner with tribal motifs.", price: 650, rating: 4.3, tags: ["jute","table","handwoven"] },
//     { id: 44, category: "Handwoven Textiles", name: "Woolen Blanket", img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Woolen_blanket.jpg", desc: "Warm woolen blanket handwoven by artisans.", price: 1200, rating: 4.6, tags: ["woolen","blanket","handwoven"] },
//     { id: 45, category: "Handwoven Textiles", name: "Handloom Dupatta", img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Handloom_dupatta.jpg", desc: "Elegant dupatta with intricate tribal designs.", price: 700, rating: 4.4, tags: ["dupattas","handwoven","tribal"] },
//     { id: 46, category: "Handwoven Textiles", name: "Tribal Cushion Cover", img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_cushion_cover.jpg", desc: "Colorful cushion cover made from handwoven fabric.", price: 350, rating: 4.2, tags: ["cushion","handwoven","decor"] },
//     { id: 47, category: "Handwoven Textiles", name: "Bamboo Mat", img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Bamboo_mat.jpg", desc: "Durable bamboo mat woven by tribal artisans.", price: 400, rating: 4.3, tags: ["bamboo","mat","handwoven"] },
//     { id: 48, category: "Handwoven Textiles", name: "Handwoven Tote Bag", img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Handwoven_tote_bag.jpg", desc: "Stylish tote bag made from handwoven material.", price: 550, rating: 4.5, tags: ["tote","handwoven","bag"] },
//     { id: 49, category: "Handwoven Textiles", name: "Tribal Table Cloth", img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tribal_table_cloth.jpg", desc: "Table cloth featuring vibrant tribal patterns.", price: 800, rating: 4.4, tags: ["table-cloth","handwoven","tribal"] },
//     { id: 50, category: "Handwoven Textiles", name: "Handloom Scarf", img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Handloom_scarf.jpg", desc: "Soft scarf with traditional handloom weaving.", price: 300, rating: 4.1, tags: ["scarf","handwoven","tribal"] },
//     { id: 51, category: "Handwoven Textiles", name: "Woven Wall Hanging", img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Woven_wall_hanging.jpg", desc: "Decorative wall hanging made from handwoven threads.", price: 600, rating: 4.3, tags: ["wall-hanging","handwoven","decor"] },
//     { id: 52, category: "Handwoven Textiles", name: "Tribal Apron", img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Tribal_apron.jpg", desc: "Apron with unique tribal handwoven designs.", price: 250, rating: 4.0, tags: ["apron","handwoven","tribal"] },
//   ];

//   // Save to localStorage
//   localStorage.setItem("products", JSON.stringify(products));
// }




// src/data/initProducts.js


export const paintingsProducts = [
  {
    id: 1,
    category: "Paintings",
    name: "Sohrai Painting",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6b/Sohrai_painting.jpg",
    desc: "Traditional Sohrai wall art with natural colors and tribal motifs.",
    price: 800,
    rating: 4.5,
    tags: ["traditional", "tribal", "handmade"],
    madeOf: "Natural pigments on canvas",
    dealer: "Tribal Arts Co.",
    type: "products",
    comments: [
      { user: "Rita", comment: "Beautifully crafted!" },
      { user: "Sam", comment: "Perfect for home decor." }
    ]
  },
  {
    id: 2,
    category: "Paintings",
    name: "Khovar Painting",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Khovar_painting.jpg",
    desc: "Khovar marriage mural painting, symbolizing fertility and prosperity.",
    price: 950,
    rating: 4.7,
    tags: ["marriage", "festive", "tribal"],
    madeOf: "Canvas and natural dyes",
    dealer: "Jharkhand Folk Arts",
    type: "products",
    comments: [
      { user: "Anita", comment: "Vibrant and authentic!" },
      { user: "Raj", comment: "Really represents tribal culture." }
    ]
  },
  {
    id: 3,
    category: "Paintings",
    name: "Tribal Folk Art",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Tribal_folk_art.jpg",
    desc: "Colorful folk art depicting tribal life and nature.",
    price: 600,
    rating: 4.3,
    tags: ["folk", "colorful", "nature"],
    madeOf: "Acrylic on canvas",
    dealer: "Folk Artisans",
    type: "products",
    comments: [
      { user: "Maya", comment: "Lovely colors and details!" }
    ]
  },
  {
    id: 4,
    category: "Paintings",
    name: "Warli Painting",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Warli_painting.jpg",
    desc: "Warli tribal painting with geometric patterns and scenes.",
    price: 700,
    rating: 4.6,
    tags: ["geometric", "tribal", "folkart"],
    madeOf: "Handmade paper and natural pigment",
    dealer: "Warli Arts Co.",
    type: "products",
    comments: [
      { user: "Sonia", comment: "Authentic tribal art!" },
      { user: "Vikram", comment: "Perfect for my office wall." }
    ]
  },
  {
    id: 5,
    category: "Paintings",
    name: "Handmade Canvas",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Handmade_canvas.jpg",
    desc: "Hand-painted canvas with Jharkhand tribal themes.",
    price: 1200,
    rating: 4.8,
    tags: ["canvas", "hand-painted", "tribal"],
    madeOf: "Canvas and acrylic paints",
    dealer: "Jharkhand Tribal Crafts",
    type: "products",
    comments: [
      { user: "Priya", comment: "A masterpiece!" },
      { user: "Rohan", comment: "Highly recommend it." }
    ]
  },
  {
    id: 6,
    category: "Paintings",
    name: "Tribal Mask Art",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_mask_art.jpg",
    desc: "Artistic mask painting inspired by tribal rituals.",
    price: 500,
    rating: 4.4,
    tags: ["mask", "tribal", "art"],
    madeOf: "Wood and natural paint",
    dealer: "Mask Makers Co.",
    type: "products",
    comments: [
      { user: "Kiran", comment: "Looks amazing on my wall." }
    ]
  },
  {
    id: 7,
    category: "Paintings",
    name: "Nature Motif Painting",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Nature_motif_painting.jpg",
    desc: "Painting featuring flora and fauna of Jharkhand.",
    price: 650,
    rating: 4.5,
    tags: ["nature", "flora", "fauna"],
    madeOf: "Canvas and natural pigment",
    dealer: "Eco Tribal Arts",
    type: "products",
    comments: [
      { user: "Lata", comment: "Captures nature beautifully." }
    ]
  },
  {
    id: 8,
    category: "Paintings",
    name: "Festival Wall Art",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Festival_wall_art.jpg",
    desc: "Wall art celebrating tribal festivals and dances.",
    price: 900,
    rating: 4.6,
    tags: ["festival", "celebration", "tribal"],
    madeOf: "Acrylic on handmade paper",
    dealer: "Festival Arts Co.",
    type: "products",
    comments: [
      { user: "Anil", comment: "Really festive and lively!" }
    ]
  },
  {
    id: 9,
    category: "Paintings",
    name: "Tribal Village Scene",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Tribal_village_scene.jpg",
    desc: "Painting depicting daily life in a tribal village.",
    price: 850,
    rating: 4.5,
    tags: ["village", "tribal", "daily-life"],
    madeOf: "Canvas and natural pigments",
    dealer: "Village Artisans",
    type: "products",
    comments: [
      { user: "Rashmi", comment: "Feels like village life on my wall!" }
    ]
  },
  {
    id: 10,
    category: "Paintings",
    name: "Peacock Motif",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Peacock_motif_painting.jpg",
    desc: "Vibrant peacock motif, a popular theme in tribal art.",
    price: 750,
    rating: 4.3,
    tags: ["peacock", "colorful", "tribal"],
    madeOf: "Canvas and acrylic paint",
    dealer: "Peacock Art Co.",
    type: "products",
    comments: [
      { user: "Anya", comment: "Bright and lively colors!" }
    ]
  },
  {
    id: 11,
    category: "Paintings",
    name: "Harvest Festival Art",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Harvest_festival_painting.jpg",
    desc: "Art celebrating the harvest festival with tribal dancers.",
    price: 980,
    rating: 4.7,
    tags: ["harvest", "festival", "dance"],
    madeOf: "Canvas and natural dyes",
    dealer: "Harvest Arts Co.",
    type: "products",
    comments: [
      { user: "Neha", comment: "Brings festival vibes to home!" }
    ]
  },
  {
    id: 12,
    category: "Paintings",
    name: "Elephant Procession",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Elephant_procession_painting.jpg",
    desc: "Painting of a festive elephant procession in Jharkhand.",
    price: 1100,
    rating: 4.8,
    tags: ["elephant", "festival", "tribal"],
    madeOf: "Canvas and acrylic paints",
    dealer: "Elephant Arts Co.",
    type: "products",
    comments: [
      { user: "Vimal", comment: "Majestic and colorful!" }
    ]
  }
];



export const tribalProducts = [
  {
    id: 21,
    category: "Tribal Handcrafts",
    name: "Bamboo Basket",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Bamboo_basket.jpg",
    desc: "Handwoven bamboo basket crafted by local artisans.",
    price: 350,
    rating: 4.4,
    tags: ["bamboo", "handmade", "eco-friendly"],
    madeOf: "Bamboo",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Rita", comment: "Beautifully crafted!" },
      { user: "Sam", comment: "Perfect for home decor." }
    ]
  },
  {
    id: 22,
    category: "Tribal Handcrafts",
    name: "Wooden Mask",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2a/Tribal_wooden_mask.jpg",
    desc: "Traditional wooden mask used in tribal festivals.",
    price: 600,
    rating: 4.5,
    tags: ["wooden", "festival", "tribal"],
    madeOf: "Wood",
    dealer: "Heritage Artisans",
    type: "products",
    comments: [{ user: "Anil", comment: "Looks authentic!" }]
  },
  {
    id: 23,
    category: "Tribal Handcrafts",
    name: "Beaded Necklace",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Tribal_beaded_necklace.jpg",
    desc: "Colorful beaded necklace made by tribal women.",
    price: 250,
    rating: 4.2,
    tags: ["beaded", "jewelry", "tribal"],
    madeOf: "Beads",
    dealer: "Tribal Treasures",
    type: "products",
    comments: [{ user: "Priya", comment: "Lovely colors!" }]
  },
  {
    id: 24,
    category: "Tribal Handcrafts",
    name: "Terracotta Figurine",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Terracotta_figurine.jpg",
    desc: "Handcrafted terracotta figurine representing tribal culture.",
    price: 400,
    rating: 4.3,
    tags: ["terracotta", "handmade", "decor"],
    madeOf: "Terracotta",
    dealer: "Clay Artisans",
    type: "products",
    comments: [{ user: "Rohit", comment: "Great detail!" }]
  },
  {
    id: 25,
    category: "Tribal Handcrafts",
    name: "Bamboo Flute",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Bamboo_flute.jpg",
    desc: "Traditional bamboo flute with melodious sound.",
    price: 200,
    rating: 4.5,
    tags: ["bamboo", "musical", "traditional"],
    madeOf: "Bamboo",
    dealer: "Tribal Music Co.",
    type: "products",
    comments: [{ user: "Sonia", comment: "Sound is amazing!" }]
  },
  {
    id: 26,
    category: "Tribal Handcrafts",
    name: "Tribal Drum",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Tribal_drum.jpg",
    desc: "Handmade drum used in tribal music and dance.",
    price: 550,
    rating: 4.6,
    tags: ["drum", "music", "tribal"],
    madeOf: "Wood and animal skin",
    dealer: "Rhythm Artisans",
    type: "products",
    comments: [{ user: "Arjun", comment: "Authentic and loud!" }]
  },
  {
    id: 27,
    category: "Tribal Handcrafts",
    name: "Painted Pottery",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Painted_pottery.jpg",
    desc: "Beautifully painted pottery with tribal motifs.",
    price: 300,
    rating: 4.3,
    tags: ["pottery", "decor", "tribal"],
    madeOf: "Clay",
    dealer: "Pottery Works",
    comments: [{ user: "Meera", comment: "Stunning artwork!" }],
    type: "products",
  },
  {
    id: 28,
    category: "Tribal Handcrafts",
    name: "Jute Bag",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jute_bag.jpg",
    desc: "Eco-friendly jute bag crafted by tribal artisans.",
    price: 180,
    rating: 4.2,
    tags: ["jute", "eco-friendly", "bag"],
    madeOf: "Jute",
    dealer: "Eco Tribal",
    type: "products",
    comments: [{ user: "Nikhil", comment: "Useful and stylish." }]
  },
  {
    id: 29,
    category: "Tribal Handcrafts",
    name: "Tribal Earrings",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Tribal_earrings.jpg",
    desc: "Handcrafted earrings with traditional tribal designs.",
    price: 120,
    rating: 4.1,
    tags: ["earrings", "handmade", "tribal"],
    madeOf: "Beads & Metal",
    dealer: "Tribal Jewelry Co.",
    type: "products",
    comments: [{ user: "Ritu", comment: "Cute and light." }]
  },
  {
    id: 30,
    category: "Tribal Handcrafts",
    name: "Tribal Wall Hanging",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_wall_hanging.jpg",
    desc: "Decorative wall hanging featuring tribal art and motifs.",
    price: 450,
    rating: 4.4,
    tags: ["wall-hanging", "decor", "tribal"],
    madeOf: "Cotton & Bamboo",
    type: "products",
    dealer: "WallArt Tribal",
    comments: [{ user: "Simran", comment: "Looks amazing in my living room." }]
  },
  {
    id: 31,
    category: "Tribal Handcrafts",
    name: "Handmade Clay Lamp",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Clay_lamp.jpg",
    desc: "Traditional clay lamp used in tribal households.",
    price: 90,
    rating: 4.0,
    type: "products",
    tags: ["clay", "decor", "traditional"],
    madeOf: "Clay",
    dealer: "ClayArt Co.",
    comments: [{ user: "Ramesh", comment: "Small but elegant." }]
  },
  {
    id: 32,
    category: "Tribal Handcrafts",
    name: "Tribal Bead Bracelet",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Bead_bracelet.jpg",
    desc: "Vibrant bead bracelet crafted by tribal artisans.",
    price: 160,
    rating: 4.2,
    type: "products",
    tags: ["bracelet", "beaded", "tribal"],
    madeOf: "Beads",
    dealer: "Tribal Treasures",
    comments: [{ user: "Anaya", comment: "Beautiful and colorful." }]
  }
];






export const handwovenProducts = [
  {
    id: 41,
    category: "Handwoven Textiles",
    name: "Tribal Handloom Saree",
    img: "https://upload.wikimedia.org/wikipedia/commons/1/1a/Handloom_textiles.jpg",
    desc: "Beautiful handwoven saree with traditional tribal patterns.",
    price: 1500,
    rating: 4.7,
    tags: ["saree","handwoven","tribal"],
    madeOf: "Cotton and silk threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Rita", comment: "Beautifully crafted!" },
      { user: "Sam", comment: "Perfect for home decor." }
    ]
  },
  {
    id: 42,
    category: "Handwoven Textiles",
    name: "Cotton Shawl",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Handwoven_cotton_shawl.jpg",
    desc: "Soft cotton shawl crafted by local weavers.",
    price: 900,
    rating: 4.5,
    tags: ["shawl","cotton","handwoven"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Anita", comment: "Very soft and cozy!" },
      { user: "Raj", comment: "High-quality weaving." }
    ]
  },
  {
    id: 43,
    category: "Handwoven Textiles",
    name: "Jute Table Runner",
    img: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Jute_table_runner.jpg",
    desc: "Eco-friendly jute table runner with tribal motifs.",
    price: 650,
    rating: 4.3,
    tags: ["jute","table","handwoven"],
    madeOf: "Jute fibers",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Neha", comment: "Eco-friendly and stylish." },
      { user: "Vikram", comment: "Looks perfect on my dining table." }
    ]
  },
  {
    id: 44,
    category: "Handwoven Textiles",
    name: "Woolen Blanket",
    img: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Woolen_blanket.jpg",
    desc: "Warm woolen blanket handwoven by artisans.",
    price: 1200,
    rating: 4.6,
    tags: ["woolen","blanket","handwoven"],
    madeOf: "Wool",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Sita", comment: "Keeps me warm in winters!" },
      { user: "Amit", comment: "Excellent craftsmanship." }
    ]
  },
  {
    id: 45,
    category: "Handwoven Textiles",
    name: "Handloom Dupatta",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Handloom_dupatta.jpg",
    desc: "Elegant dupatta with intricate tribal designs.",
    price: 700,
    rating: 4.4,
    tags: ["dupattas","handwoven","tribal"],
    madeOf: "Cotton and silk",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Rina", comment: "Lovely colors and texture." },
      { user: "Rahul", comment: "Matches perfectly with my saree." }
    ]
  },
  {
    id: 46,
    category: "Handwoven Textiles",
    name: "Tribal Cushion Cover",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Tribal_cushion_cover.jpg",
    desc: "Colorful cushion cover made from handwoven fabric.",
    price: 350,
    rating: 4.2,
    tags: ["cushion","handwoven","decor"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Priya", comment: "Brightens up the living room." },
      { user: "Sanjay", comment: "Good quality fabric." }
    ]
  },
  {
    id: 47,
    category: "Handwoven Textiles",
    name: "Bamboo Mat",
    img: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Bamboo_mat.jpg",
    desc: "Durable bamboo mat woven by tribal artisans.",
    price: 400,
    rating: 4.3,
    tags: ["bamboo","mat","handwoven"],
    madeOf: "Bamboo",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Rita", comment: "Eco-friendly and strong." },
      { user: "Sam", comment: "Perfect for floor seating." }
    ]
  },
  {
    id: 48,
    category: "Handwoven Textiles",
    name: "Handwoven Tote Bag",
    img: "https://upload.wikimedia.org/wikipedia/commons/8/8e/Handwoven_tote_bag.jpg",
    desc: "Stylish tote bag made from handwoven material.",
    price: 550,
    rating: 4.5,
    tags: ["tote","handwoven","bag"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Meera", comment: "Durable and spacious." },
      { user: "Rakesh", comment: "Perfect for shopping." }
    ]
  },
  {
    id: 49,
    category: "Handwoven Textiles",
    name: "Tribal Table Cloth",
    img: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Tribal_table_cloth.jpg",
    desc: "Table cloth featuring vibrant tribal patterns.",
    price: 800,
    rating: 4.4,
    tags: ["table-cloth","handwoven","tribal"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Anita", comment: "Beautiful tribal motifs." },
      { user: "Vikram", comment: "Looks perfect on my table." }
    ]
  },
  {
    id: 50,
    category: "Handwoven Textiles",
    name: "Handloom Scarf",
    img: "https://upload.wikimedia.org/wikipedia/commons/2/2e/Handloom_scarf.jpg",
    desc: "Soft scarf with traditional handloom weaving.",
    price: 300,
    rating: 4.1,
    tags: ["scarf","handwoven","tribal"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Sita", comment: "Very soft and comfortable." },
      { user: "Amit", comment: "Nice traditional pattern." }
    ]
  },
  {
    id: 51,
    category: "Handwoven Textiles",
    name: "Woven Wall Hanging",
    img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Woven_wall_hanging.jpg",
    desc: "Decorative wall hanging made from handwoven threads.",
    price: 600,
    rating: 4.3,
    tags: ["wall-hanging","handwoven","decor"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Rina", comment: "Adds color to my room." },
      { user: "Rahul", comment: "High-quality weaving." },
      
    ]
  },
  {
    id: 52,
    category: "Handwoven Textiles",
    name: "Tribal Apron",
    img: "https://upload.wikimedia.org/wikipedia/commons/4/4a/Tribal_apron.jpg",
    desc: "Apron with unique tribal handwoven designs.",
    price: 250,
    rating: 4.0,
    tags: ["apron","handwoven","tribal"],
    madeOf: "Cotton threads",
    dealer: "Tribal Crafts Co.",
    type: "products",
    comments: [
      { user: "Neha", comment: "Very handy and pretty." },
      { user: "Vikram", comment: "Good craftsmanship." }
    ]
  },
];
