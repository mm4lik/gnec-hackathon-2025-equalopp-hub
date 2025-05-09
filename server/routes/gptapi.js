import express from "express";
import 'dotenv/config';
import { Scenario } from '../models/database.js';
import OpenAI from "openai";
import { authenticateUser } from '../middleswares/auth.js'; 
const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_KEY });

// Route to fetch all scenarios
// GET /api/generate-scenarios
router.get('/get-scenarios', authenticateUser, async (req, res) => {
  try {
    const { gender, country, goal, _id: userId } = req.user;

    // Step 1: Check if scenarios already exist for this user and goal
    const existingScenarios = await Scenario.find({ userId, goal });
    if (existingScenarios.length > 0) {
      return res.status(200).json({ scenarios: existingScenarios });
    }

    // Step 2: Prompt for generating new scenarios
    const prompt = `You are a personal AI inclusion coach. Generate 3 realistic, detailed scenarios related to allyship and gender inclusivity in workplace or public settings. Each scenario should consider a user who identifies as ${gender}, is from ${country}, and has a goal of "${goal}". Each scenario must include:

- A "description" (minimum 100 words) that paints a vivid picture of the situation
- A "tags" array (e.g. ["gender identity", "bystander intervention"])
- "difficulty", "topic", and "expectedSkill" fields
- A short multiple-choice quiz with at least 5 questions, each having 4 options, and indicate the correct answer for each question with a field called "correctAnswer" (the exact text of the correct option)
- 1 or more helpful "links"
- An "openEndedQuestion" field with a reflective question like: "How would you respond if this happened to a colleague?"

Return the response as:
{ "scenarios": [ ... ] }

Use this JSON format per scenario:
{
  "description": "...",
  "tags": ["..."],
  "difficulty": "medium",
  "topic": "...",
  "expectedSkill": "...",
  "quiz": [
    {
      "question": "...",
      "options": ["a) ...", "b) ...", "c) ...", "d) ..."],
      "correctAnswer": "a) ..."
    },
    // ...more questions...
  ],
  "links": [
    { "title": "...", "url": "https://..." }
  ],
  "openEndedQuestion": "..."
}

Use double quotes for all fields. Do not include explanation or commentary.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 2048,
    });
console.log(response);
console.log("fff");
console.log(response.choices);
    let content = response.choices[0].message.content;
    console.log(response.choices[0].message.content);
    let parsed;
    if (typeof content === "string") {
      // Keep trimming the string until it starts with '{' and ends with '}'
      while (content.charAt(0) !== "{" || content.charAt(content.length - 1) !== "}") {
        if (content.charAt(0) !== "{") {
          content = content.substring(1); // Trim the first character
        }
        if (content.charAt(content.length - 1) !== "}") {
          content = content.substring(0, content.length - 1); // Trim the last character
        }
      }
    

    parsed = JSON.parse(content);
  } else {
    parsed = content;
  }

    // Step 3: Save each scenario with openEndedQuestion to DB
    const savedScenarios = await Promise.all(parsed.scenarios.map(async (s) => {
      const scenario = new Scenario({
        description: s.description,
        tags: s.tags,
        difficulty: s.difficulty,
        topic: s.topic,
        expectedSkill: s.expectedSkill,
        quiz: s.quiz,
        links: s.links,
        openEndedQuestion: s.openEndedQuestion,
        quizScore: 0,
        completed: false,
        userId: userId,
        goal: goal,
      });
      return await scenario.save();
    }));

    res.status(200).json({ scenarios: savedScenarios });

  } catch (error) {
    console.error("Error generating scenarios:", error.message);
    res.status(500).json({ message: 'Failed to generate scenarios', error: error.message });
  }
});

// POST /api/submit-open-ended
router.post('/api/submit-open-ended', async (req, res) => {
  const { userAnswer } = req.body;

  if (!userAnswer) {
    return res.status(400).json({ message: 'userAnswer is required' });
  }

  try {
    const prompt = `You are an AI allyship coach. A user answered the following open-ended question about supporting a colleague who faced a DEI issue:

"${userAnswer}"

Give thoughtful, supportive, and constructive feedback on their response. Mention what they did well and what they could improve. Keep it under 150 words.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
    });

    const feedback = response.choices[0].message.content.trim();

    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error generating open-ended feedback:", error);
    res.status(500).json({ message: 'Failed to generate feedback', error: error.message });
  }
});


export default router;
