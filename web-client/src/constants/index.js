export const foodCategories = [
  { id: 1, name: "Burgers", icon: "🍔" },
  { id: 2, name: "Pizza", icon: "🍕" },
  { id: 3, name: "Sushi", icon: "🍣" },
  { id: 4, name: "Salads", icon: "🥗" },
  { id: 5, name: "Desserts", icon: "🍰" },
  { id: 6, name: "Drinks", icon: "🥤" },
  { id: 7, name: "Snacks", icon: "🍿" },
  { id: 8, name: "Breakfast", icon: "🍳" },
  { id: 9, name: "Brunch", icon: "🥂" },
  { id: 10, name: "Lunch", icon: "🍽️" },
  { id: 11, name: "Dinner", icon: "🍽️" },
  { id: 12, name: "Takeout", icon: "📦" },
  { id: 13, name: "Delivery", icon: "🚚" },
  { id: 14, name: "Catering", icon: "🍽️" },
  { id: 15, name: "Vegan", icon: "🥬" },
];

export const featuredRestaurants = [
  {
    id: 1,
    name: "Restaurant 1",
    description: "A great place for burgers and pizza. Try our sushi too!",
    image:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    deliveryFee: 100,
    rating: 4.5,
    deliveryTime: "30-45 min",
    foodItems: [
      {
        id: 1,
        name: "Chicken Pizza",
        category: "Pizza",
        price: 1200,
        image:
          "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cGl6emF8ZW58MHx8MHx8fDA%3D",
        sizePrice: [
          { id: 1, size: "Small", price: 1000 },
          { id: 2, size: "Medium", price: 1200 },
          { id: 3, size: "Large", price: 1500 },
        ],
      },
      {
        id: 2,
        name: "Classic Beef Burger",
        category: "Burgers",
        price: 900,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YnVyZ2VyfGVufDB8fDB8fHww",
        sizePrice: [
          { id: 1, size: "Small", price: 1000 },
          { id: 2, size: "Medium", price: 1200 },
          { id: 3, size: "Large", price: 1500 },
        ],
      },
      {
        id: 3,
        name: "Spicy Tuna Roll",
        category: "Sushi",
        price: 1500,
        image:
          "https://images.unsplash.com/photo-1556906918-c3071bd11598?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHVuYSUyMHJvbGx8ZW58MHx8MHx8fDA%3D",
          sizePrice:[
          {id: 1, size: "Small", price: 1000},
          {id: 2, size: "Medium", price: 1200},
          {id: 3, size: "Large", price: 1500},
        ]
      },
    ],
  },
  {
    id: 2,
    name: "Restaurant 2",
    description: "Fresh salads and delicious desserts.",
    image:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
      
    deliveryFee: 150,
    rating: 4.0,
    deliveryTime: "20-30 min",
    foodItems: [
      {
        id: 1,
        name: "Caesar Salad",
        category: "Salads",
        price: 700,
        image:
          "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FsYWR8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: 2,
        name: "Chocolate Lava Cake",
        category: "Desserts",
        price: 850,
        image:
          "https://images.unsplash.com/photo-1673551490812-eaee2e9bf0ef?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bGF2YSUyMGNha2V8ZW58MHx8MHx8fDA%3D",
      },
      {
        id: 3,
        name: "Fruit Parfait",
        category: "Desserts",
        price: 600,
        image:
          "https://images.unsplash.com/photo-1490474504059-bf2db5ab2348?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8UGFyZmFpdHxlbnwwfHwwfHx8MA%3D%3D",
      },
    ],
  },
  {
    id: 3,
    name: "Restaurant 3",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cmVzdGF1cmFudHxlbnwwfHwwfHx8MA%3D%3D",
    deliveryFee: 200,
    rating: 4.8,
    deliveryTime: "15-25 min",
    foodItems: [
      {
        id: 1,
        name: "Vegan Buddha Bowl",
        category: "Vegan",
        price: 1000,
        image:
          "https://images.unsplash.com/photo-1631311695255-8dde6bf96cb5?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmVnYW4lMjBib3dsfGVufDB8fDB8fHww",
      },
      {
        id: 2,
        name: "Berry Smoothie",
        category: "Drinks",
        price: 450,
        image:
          "https://images.unsplash.com/photo-1600718374662-0483d2b9da44?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHNtb290aGllfGVufDB8fDB8fHww",
      },
      {
        id: 3,
        name: "Avocado Toast",
        category: "Brunch",
        price: 800,
        image:
          "https://images.unsplash.com/photo-1659778059522-d280d965fde8?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhY2FkbyUyMHRvYXN0fGVufDB8fDB8fHww",
      },
    ],
  },
  {
    id: 4,
    name: "Restaurant 4",
    image:
      "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    deliveryFee: 250,
    rating: 4.2,
    deliveryTime: "10-20 min",
    foodItems: [
      {
        id: 1,
        name: "Morning Pancakes",
        category: "Breakfast",
        price: 650,
        image: "",
      },
      {
        id: 2,
        name: "Chicken Club Sandwich",
        category: "Lunch",
        price: 110,
        image: "",
      },
      {
        id: 3,
        name: "Grilled Salmon",
        category: "Dinner",
        price: 2000,
        image: "",
      },
    ],
  },
  {
    id: 5,
    name: "Restaurant 5",
    image:
      "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    deliveryFee: 300,
    rating: 4.6,
    deliveryTime: "5-15 min",
    foodItems: [
      {
        id: 1,
        name: "Family Size Pepperoni Pizza",
        category: "Takeout",
        price: 2200,
      },
      {
        id: 2,
        name: "Mini Taco Platter",
        category: "Snacks",
        price: 950,
        image: "",
      },
      {
        id: 3,
        name: "Delivery Combo Meal",
        category: "Delivery",
        price: 1800,
        image: "",
      },
    ],
  },
  {
    id: 6,
    name: "Restaurant 6",
    image:
      "https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    deliveryFee: 350,
    rating: 4.1,
    deliveryTime: "0-5 min",
    foodItems: [
      {
        id: 1,
        name: "Party Catering Pack",
        category: "Catering",
        price: 5000,
        image: "",
      },
      {
        id: 2,
        name: "Organic Green Salad",
        category: "Salads",
        price: 80,
        image: "",
      },
      {
        id: 3,
        name: "Signature Vegan Burger",
        category: "Vegan",
        price: 1200,
        image: "",
      },
    ],
  },
  {
    id: 7,
    name: "Restaurant 7",
    image:
      "https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjJ8fHJlc3RhdXJhbnR8ZW58MHx8MHx8fDA%3D",
    deliveryFee: 400,
    rating: 4.3,
    deliveryTime: "0-5 min",
    foodItems: [
      {
        id: 1,
        name: "Cheesy Nachos",
        category: "Snacks",
        price: 700,
        image: "",
      },
      {
        id: 2,
        name: "Fresh Orange Juice",
        category: "Drinks",
        price: 500,
        image: "",
      },
      {
        id: 3,
        name: "Blueberry Muffin",
        category: "Breakfast",
        price: 450,
        image: "",
      },
    ],
  },
];

export const carts = [
  {
    id: 1,
    restaurant: {
      id: 1,
      name: "Restaurant 1",
      deliveryFee: 100,
      rating: 4.5,
      deliveryTime: "30-45 min",
    },
    items: [
      { id: 1, name: "Item 1", quantity: 2, price: 100 },
      { id: 2, name: "Item 2", quantity: 1, price: 200 },
    ],
  },
  {
    id: 2,
    restaurant: {
      id: 2,
      name: "Restaurant 2",
      deliveryFee: 200,
      rating: 4.5,
      deliveryTime: "30-45 min",
    },
    items: [
      { id: 1, name: "Item 1", quantity: 1, price: 100 },
      { id: 2, name: "Item 2", quantity: 2, price: 200 },
      { id: 3, name: "Item 3", quantity: 1, price: 300 },
      { id: 4, name: "Item 4", quantity: 1, price: 400 },
      { id: 5, name: "Item 5", quantity: 1, price: 500 },
    ],
  },
];

export const customerLocations = [
  {
    deliveryAddress: {
      location: {
        type: "Point",
        coordinates: [79.8612, 6.9271],
      },
      address: "123 Main Street, Colombo",
    },
    _id: "6809d482ed123c5c8c9a37fe",
    customerID: "6809d14ff303ed8706d4b234",
    name: "Home",
    createdAt: "2025-04-24T06:04:50.952Z",
    updatedAt: "2025-04-24T06:04:50.952Z",
    __v: 0,
  },
  {
    deliveryAddress: {
      location: {
        type: "Point",
        coordinates: [80.6378, 7.2906],
      },
      address: "456 Park Avenue, Kandy",
    },
    _id: "6809d7390df7f0150c7514b0",
    customerID: "6809d14ff303ed8706d4b234",
    name: "Office",
    createdAt: "2025-04-24T06:16:25.863Z",
    updatedAt: "2025-04-24T06:16:25.863Z",
    __v: 0,
  },
];
