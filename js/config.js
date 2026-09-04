/**
 * ===================================================================
 * BIRTHDAY WEBSITE CONFIGURATION
 * ===================================================================
 * Customize all details, names, dates, timeline moments, and the
 * love letter easily here.
 */

window.BIRTHDAY_CONFIG = {
  // Recipient details
  recipient: {
    name: "My Love", // Replace with your girlfriend's name (e.g., "Sarah", "Emily", etc.)
    nickname: "Beautiful",
    badge: "A Special Celebration For You",
    heroTitle: "Happy Birthday,",
    heroSubtitle: "A small digital sanctuary dedicated to you, the unforgettable memories we have shared, and every chapter waiting to be written.",
  },

  // Milestone Counter (Optional: counts days together or celebration days)
  counter: {
    show: true,
    startDate: "2023-10-14", // Format: YYYY-MM-DD (e.g., anniversary date or date you met)
    label: "Days of loving you and counting...",
  },

  // Timeline of Memories
  timeline: [
    {
      date: "October 14, 2023",
      title: "The Day Everything Began",
      tag: "First Date",
      description: "I still remember the butterflies before walking in. You wore that effortless smile, and within five minutes of talking, I knew you were someone rare and unforgettable.",
      image: "images/memory1.jpg",
      location: "That cozy corner cafe"
    },
    {
      date: "December 24, 2023",
      title: "Under the City Lights",
      tag: "Winter Wonder",
      description: "Cold winter air, warm cups of hot cocoa, and wandering through the glistening streets. You laughed at how terrible my jokes were, but you held my hand anyway.",
      image: "images/memory2.jpg",
      location: "Downtown City Square"
    },
    {
      date: "April 18, 2024",
      title: "Our First Road Trip",
      tag: "Ocean Breeze",
      description: "Windows rolled all the way down, singing our favorite playlist completely out of tune. Watching the ocean breeze in your hair made time stand completely still.",
      image: "images/memory3.jpg",
      location: "Pacific Coast Highway"
    },
    {
      date: "July 30, 2024",
      title: "The Quiet Rainy Sunday",
      tag: "Ordinary Magic",
      description: "No grand plans, no deadlines. Just messy morning coffee, quiet conversations, and discovering that the simplest days with you are the ones that mean the most.",
      image: "images/memory4.jpg",
      location: "Our favorite lazy spot"
    },
    {
      date: "November 12, 2024",
      title: "Underneath a Thousand Stars",
      tag: "Stargazing Night",
      description: "Wrapped in blankets under the clear night sky, searching for shooting stars. I realized every wish I could possibly make was already sitting right next to me.",
      image: "images/memory5.jpg",
      location: "The hill overlooking the lights"
    },
    {
      date: "Today & Forever",
      title: "Celebrating You",
      tag: "Happy Birthday",
      description: "Another year more radiant, more resilient, and more deeply cherished. You make the world infinitely softer and brighter just by being in it.",
      image: "images/memory6.jpg",
      location: "Right here with you"
    }
  ],

  // The Love Letter at the End
  letter: {
    envelopeTag: "Open when you're ready",
    sealText: "WITH LOVE",
    date: "Today & Always",
    salutation: "To the most wonderful person in my world,",
    paragraphs: [
      "Happy Birthday! Today, I want to pause everything for a moment just to remind you how deeply special, cherished, and admired you are.",
      "You bring an effortless warmth into every room you step into. The kindness you show to everyone, your sharp wit, your passion, and that radiant smile of yours never fail to amaze me. You make even the ordinary days feel like poetry.",
      "Thank you for being my confidante, my biggest supporter, and my favorite adventure partner. Through all the highs, the quiet moments, and everything in between, being by your side is my greatest privilege.",
      "As you blow out your candles this year, I hope you take a moment to see yourself the way I see you: brilliant, graceful, endlessly capable, and deserving of all the joy this universe has to offer.",
      "I hope every dream you've been nurturing starts to bloom this year. I'll be right beside you, cheering the loudest."
    ],
    closing: "Forever & always yours,",
    author: "Your Favorite Person",
    postscript: "P.S. Make a wish before you close this letter — you deserve it all."
  },

  // Audio / Music Settings
  music: {
    // If you have a custom mp3 file, put its URL or local path here (e.g., 'audio/our-song.mp3')
    // If empty, it automatically plays a gentle, procedurally-generated romantic piano lullaby!
    customAudioUrl: "",
    autoplayPrompt: "Tap anywhere for ambient piano music ♫",
  }
};
