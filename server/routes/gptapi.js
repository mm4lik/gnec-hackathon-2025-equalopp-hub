import express from "express";
import 'dotenv/config';
import axios from "axios";
import { Scenario, Response } from '../models/database.js';
import OpenAI from "openai";
import { authenticateUser } from '../middleware/auth.js'; // path as needed

const router = express.Router();

const openai = new OpenAI({ apiKey: process.env.VITE_OPENAI_KEY });

// Route to fetch all scenarios
// GET /api/generate-scenarios

router.get('/api/generate-scenarios', authenticateUser, async (req, res) => {
  try {
    const { gender, country } = req.user;

    const prompt = `You are a personal AI inclusion coach. Generate 3 realistic, detailed scenarios related to allyship and gender inclusivity in workplace or public settings. Each scenario should consider a user who identifies as ${gender} and is from ${country}. Each scenario should include a rich, thoughtful "description" (at least 100 words) that paints a vivid picture of the situation. Use the following JSON structure:

    [
      {
        "id": "s1",
        "description": "...",  // <-- Long and detailed description
        "tags": ["..."],
        "difficulty": "medium",
        "topic": "...",
        "expectedSkill": "...",
        "quiz": [
          {
            "question": "...",
            "options": ["a) ...", "b) ...", "c) ...", "d) ..."]
          },
          ...
        ],
        "links": [
          { "title": "...", "url": "https://..." },
          ...
        ]
      },
      ...
    ]
    
    At the end, add one shared open_ended_question (outside of the scenario objects): "How would you personally address a situation like this if it happened to a colleague? Describe what you would say or do to support the person affected."
    
    Return the entire response as a JSON object:
    { "scenarios": [...], "open_ended_question": "..." }
    
    DO NOT include any explanation or commentary. Use double quotes for all fields.`;
    
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7,
      max_tokens: 1200,
    });

    const content = response.choices[0].message.content;
    const jsonStart = content.indexOf('{');
    const jsonText = content.slice(jsonStart);
    const parsed = JSON.parse(jsonText);

    res.status(200).json(parsed);
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

};

export default router;
