/**
 * Touch Grass — Nature Missions & Outdoor Challenges Data
 * All missions encourage real-world action, nature observation, and screen detachment.
 */

export const INITIAL_MISSIONS = [
  {
    id: 'm_screen_free_15',
    title: '15-Minute Unplugged Senses',
    category: 'Mindfulness & Screen-Free',
    difficulty: 'Beginner',
    estimatedTime: '15 Mins',
    durationMinutes: 15,
    icon: 'SmartphoneOff',
    description: 'Leave your phone on silent inside and sit outside for 15 unbroken minutes doing nothing but observing your immediate surroundings.',
    instructions: [
      'Find a bench, doorstep, or patch of grass outdoors.',
      'Leave all digital screens inside or in your pocket.',
      'For the first 5 minutes, close your eyes and focus purely on sounds and wind texture.',
      'For the remaining 10 minutes, notice 3 small details you normally walk past without seeing.'
    ],
    environmentalTip: 'Unplugging chargers and screens for 15 minutes reduces unnecessary standby power draw!',
    safetyNote: 'Choose a safe, peaceful spot where you can relax comfortably.'
  },
  {
    id: 'm_plant_observer_5',
    title: 'The 5-Plant Taxonomist',
    category: 'Flora & Plants',
    difficulty: 'Beginner',
    estimatedTime: '20 Mins',
    durationMinutes: 20,
    icon: 'Leaf',
    description: 'Find, examine, and compare 5 distinctly different plant or tree species in your neighborhood or park.',
    instructions: [
      'Locate 5 plants with distinct foliage (e.g., smooth oval leaves, needle clusters, serrated edges, broad fronds).',
      'Feel the leaf texture gently without ripping or picking it.',
      'Compare light patterns filtering through the leaves.',
      'Note whether each plant prefers shade or direct sunlight.'
    ],
    environmentalTip: 'Never break live branches or pull up wildflowers; leaves serve as vital solar panels for plants!',
    safetyNote: 'Be aware of poison ivy/oak (remember: leaves of three, let it be!).'
  },
  {
    id: 'm_bird_listener_3',
    title: '3 Bird Calls Audio Scavenger',
    category: 'Birds & Wildlife',
    difficulty: 'Intermediate',
    estimatedTime: '25 Mins',
    durationMinutes: 25,
    icon: 'Feather',
    description: 'Sit quietly near trees or bushes and distinguish 3 separate bird calls or song patterns by ear.',
    instructions: [
      'Stand or sit motionlessly near cover (trees, thickets, or park edges).',
      'Close your eyes to sharpen your hearing.',
      'Listen for pitch, rhythm, and repetition (e.g. sharp chirps vs melodious trills vs deep coos).',
      'Try to spot the birds responsible from a respectful distance of at least 10 feet.'
    ],
    environmentalTip: 'Keeping dogs on leashes near bushes prevents scaring ground-nesting birds during breeding season.',
    safetyNote: 'Do not use artificial call playback audio that might stress nesting birds.'
  },
  {
    id: 'm_nature_pattern_photo',
    title: 'Natural Pattern Photography',
    category: 'Photography & Art',
    difficulty: 'Beginner',
    estimatedTime: '20 Mins',
    durationMinutes: 20,
    icon: 'Camera',
    description: 'Capture a close-up photograph of a naturally occurring fractal, symmetry, or texture created by nature.',
    instructions: [
      'Look closely at bark patterns, spider webs, fern fronds, pinecones, or water ripples.',
      'Take 1 or 2 macro photos focusing on light and texture.',
      'Save the photo to your local Touch Grass Journal.',
      'Put your camera away as soon as the capture is complete.'
    ],
    environmentalTip: 'Avoid stepping on delicate moss beds or flower patches to capture close shots.',
    safetyNote: 'Keep an eye out for spiders or stinging insects when inspecting tight crevices.'
  },
  {
    id: 'm_herb_garden_starter',
    title: 'Micro Herb Garden Pioneer',
    category: 'Micro-Gardening',
    difficulty: 'Intermediate',
    estimatedTime: '30 Mins',
    durationMinutes: 30,
    icon: 'Sprout',
    description: 'Plant a single herb seed (basil, mint, cilantro, or parsley) in a small pot, recycled cup, or outdoor patch.',
    instructions: [
      'Get a small container with drainage holes and moist potting soil.',
      'Plant seed 1/4 inch deep and gently pat down soil.',
      'Place in a sunny window or outdoor balcony spot.',
      'Water with a gentle mist until damp.'
    ],
    environmentalTip: 'Growing herbs locally cuts down on single-use plastic grocery packaging and transport emissions!',
    safetyNote: 'Wash hands thoroughly after handling soil or compost.'
  },
  {
    id: 'm_cloud_gazer_10',
    title: '10-Minute Cloud Architecture',
    category: 'Mindfulness & Screen-Free',
    difficulty: 'Beginner',
    estimatedTime: '10 Mins',
    durationMinutes: 10,
    icon: 'CloudSun',
    description: 'Lie down or recline on a grassy hill or bench and observe cloud formations moving across the sky.',
    instructions: [
      'Find a clear view of the sky away from tall buildings.',
      'Identify cloud types (e.g. fluffy Cumulus, wispy Cirrus, layered Stratus).',
      'Watch how wind speed shapes and morphs cloud silhouettes.',
      'Take 5 deep breaths, syncing breathing with cloud motion.'
    ],
    environmentalTip: 'Sky watching connects us to atmospheric circulation and weather awareness.',
    safetyNote: 'Never look directly into the sun while cloud gazing!'
  },
  {
    id: 'm_park_walk_20',
    title: '20-Minute Local Park Discovery Walk',
    category: 'Outdoor Walking',
    difficulty: 'Beginner',
    estimatedTime: '20 Mins',
    durationMinutes: 20,
    icon: 'Footprints',
    description: 'Walk a continuous 20-minute route through a neighborhood park, greenway, or wooded path.',
    instructions: [
      'Maintain a comfortable, steady pace for 20 minutes.',
      'Vary your route to explore a path or meadow corner you haven’t walked before.',
      'Notice how the light changes as you walk between open clearings and shaded trees.',
      'Greet 1 fellow trail walker with a friendly smile or head nod.'
    ],
    environmentalTip: 'Always carry out any trash you generate and pick up 1 stray piece of litter if safe.',
    safetyNote: 'Stay on designated trails and inform someone of your route if walking in dense woods.'
  },
  {
    id: 'm_soil_biome_microscope',
    title: 'Soil & Decomposer Inspection',
    category: 'Flora & Plants',
    difficulty: 'Intermediate',
    estimatedTime: '15 Mins',
    durationMinutes: 15,
    icon: 'Bug',
    description: 'Carefully roll over a fallen log or stone to observe earthworms, sowbugs, and leaf litter decomposers at work.',
    instructions: [
      'Find a loose, damp stone or fallen log on moist earth.',
      'Gently lift it toward you so critters can retreat safely.',
      'Observe the rich dark humus soil and tiny creatures for 2 minutes.',
      'Gently lower the log/stone back into its exact original position.'
    ],
    environmentalTip: 'Decomposers are nature’s recyclers, turning dead foliage into nutrient-dense topsoil!',
    safetyNote: 'Never place hands under stones where you cannot see; handle critters gently.'
  }
];
