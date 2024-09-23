/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
   export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "create kids story on description for 5-8 years kids . Educational story and all images in paper cut style . story of a boy and a magic school , give me 5 chapters with detailed image text prompt for each of chapter and image prompt for story cover book for story name ,all in JSON file format "},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"story\": {\n    \"title\": \"The Boy Who Found Magic School\",\n    \"cover_image\": {\n      \"description\": \"A paper cut illustration of a boy with a curious expression, wearing a backpack and carrying a book, standing in front of a whimsical, colorful building with a sign that reads 'Magic School'.  The building has a tower with a swirling, starry sky above it.  Use bright, vibrant colors for the illustration.  Add a small, playful dragon in the background, peering out from behind the building.\",\n      \"style\": \"paper cut\"\n    },\n    \"chapters\": [\n      {\n        \"title\": \"The Curious Boy\",\n        \"text\": \"Once upon a time, there was a curious boy named Oliver who loved to explore.  He lived in a small town where everything was predictable and boring. Oliver longed for something exciting, something magical.  One day, while playing in the woods behind his house, he stumbled upon a hidden path.  It was overgrown with vines, and the leaves whispered secrets in the breeze.  Oliver, always the adventurer, decided to follow the path, his heart pounding with anticipation.  He walked for what felt like hours, the sunlight filtering through the leaves, painting the ground in a mosaic of light and shadow.\",\n        \"image\": {\n          \"description\": \"A paper cut illustration of Oliver, a boy with bright, curious eyes, walking along a winding, overgrown path in the woods.  Show the sunlight dappling through the leaves, creating a pattern of light and shadow on the ground.  Include small, playful woodland creatures peeking from behind trees.\",\n          \"style\": \"paper cut\"\n        }\n      },\n      {\n        \"title\": \"The Enchanted Gate\",\n        \"text\": \"At the end of the path, Oliver found a magnificent gate.  It was made of shimmering silver, with intricate carvings of magical creatures.  Above the gate, a sign glowed with an ethereal light, proclaiming: 'Welcome to Magic School.'  Oliver's eyes widened in disbelief.  He had never imagined such a place existed!  With a trembling hand, he reached out to touch the gate.  As soon as his fingers brushed against the cold silver, the gate swung open, revealing a breathtaking sight.\",\n        \"image\": {\n          \"description\": \"A paper cut illustration of Oliver standing before a shimmering silver gate with intricate carvings.  The gate leads to a magical garden filled with blooming flowers in vibrant colors.  Show a small, mischievous pixie flying above the gate, sprinkling glitter.\",\n          \"style\": \"paper cut\"\n        }\n      },\n      {\n        \"title\": \"Inside Magic School\",\n        \"text\": \"Oliver stepped through the gate and found himself in a dazzling garden.  Flowers in every color imaginable bloomed in profusion, their petals sparkling with dew.  Butterflies with wings as big as his hand fluttered around him, their colors a kaleidoscope of beauty.  A gentle breeze carried the scent of cinnamon and honeysuckle, filling the air with magic.  He saw a path leading towards a majestic building.  Its walls were made of iridescent glass, shimmering with all the colors of the rainbow.  On top of the building, a tower reached for the sky, with a golden star twinkling at its peak.\",\n        \"image\": {\n          \"description\": \"A paper cut illustration of Oliver walking through a vibrant garden with blooming flowers, butterflies, and a path leading to the colorful, glass-walled Magic School.  Show the tower with a golden star on top, reaching towards a swirling, starry sky.  Use bold, vibrant colors.\",\n          \"style\": \"paper cut\"\n        }\n      },\n      {\n        \"title\": \"New Friends and Magical Lessons\",\n        \"text\": \"Inside Magic School, Oliver met other students from all over the world.  There was Lily, who could talk to animals, and Max, who could control the wind.  Together, they learned about spells, potions, and the wonders of the magical world.  Oliver discovered he had a knack for creating illusions, and he quickly became known for his dazzling tricks.  He learned to make objects disappear, to conjure beautiful flowers, and even to create a shimmering, rainbow-colored mist that danced in the air.\",\n        \"image\": {\n          \"description\": \"A paper cut illustration of Oliver, Lily, and Max in a classroom filled with magical objects, books, and whimsical decorations.  Show Oliver holding a wand, creating a shimmering, rainbow-colored mist.  Lily is talking to a fluffy, white rabbit, and Max is holding a small, swirling whirlwind in his hands.\",\n          \"style\": \"paper cut\"\n        }\n      },\n      {\n        \"title\": \"A Magical Adventure\",\n        \"text\": \"One day, a mischievous goblin stole a powerful spell book from Magic School.  Oliver and his friends knew they had to find the goblin and retrieve the book before it fell into the wrong hands.  They embarked on a thrilling adventure, traveling through enchanted forests, over bubbling rivers, and through shadowy caves.  They faced many challenges along the way, but they always worked together, using their magical abilities to overcome each obstacle.  Finally, they reached the goblin's lair and retrieved the stolen spell book.  They returned to Magic School, heroes and forever friends.\",\n        \"image\": {\n          \"description\": \"A paper cut illustration of Oliver, Lily, and Max on a grand adventure, facing a grumpy goblin in a dark cave.  Show the stolen spell book nearby, surrounded by shimmering, magical objects.  Use dramatic lighting and shadow effects to create a sense of excitement and mystery.\",\n          \"style\": \"paper cut\"\n        }\n      }\n    ]\n  }\n}\n```"},
          ],
        },
      ],
    });
  