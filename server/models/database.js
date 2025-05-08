import mongoose from "mongoose";

// ----- User Schema -----
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true },
  region: { type: String, required: true },
  goal: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});
export const User = mongoose.model("User", UserSchema);
const scenarioSchema = new mongoose.Schema({
  description: { type: String, required: true }, // detailed scenario description
  tags: [String],
  difficulty: String,
  topic: String,
  expectedSkill: String,
  quiz: [
    {
      question: String,
      options: [String],
    }
  ],
  links: [
    {
      title: String,
      url: String,
    }
  ],
  quizScore: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });
export const Scenario = mongoose.model("Scenario", scenarioSchema);
[
  {
    "id": "s1",
    "text": "A coworker makes a joke about someone’s accent in a team meeting. The group laughs, but the person looks uncomfortable.",
    "tags": ["microaggressions", "workplace", "bystander", "allyship"],
    "difficulty": "medium",
    "topic": "Cultural Sensitivity",
    "expectedSkill": "Speaking up against microaggressions",
    "idealResponse": "I’d speak up in the moment or later, saying the joke was inappropriate and making sure the person affected feels supported."
  },
  {
    "id": "s2",
    "text": "A colleague makes a dismissive remark about the ability of a team member because of their gender.",
    "tags": ["gender bias", "workplace", "bystander", "allyship"],
    "difficulty": "hard",
    "topic": "Gender Sensitivity",
    "expectedSkill": "Addressing gender bias in the workplace",
    "idealResponse": "I would challenge the remark by saying something like 'That’s not appropriate, everyone in this team is equally capable regardless of gender' and then check in with the person who was affected."
  },
  {
    "id": "s3",
    "text": "A group of coworkers laughs at a colleague’s clothing choices, making jokes about their personal style.",
    "tags": ["bullying", "workplace", "bystander", "allyship"],
    "difficulty": "medium",
    "topic": "Respect for Diversity",
    "expectedSkill": "Defending personal choices",
    "idealResponse": "I would step in and say that everyone should be allowed to express themselves in whatever way they choose, and that mocking someone’s appearance is never acceptable."
  },
  {
    "id": "s4",
    "text": "During a work lunch, someone makes a comment about a colleague’s ethnic background, implying they’re not ‘from here.’",
    "tags": ["racism", "workplace", "bystander", "allyship"],
    "difficulty": "hard",
    "topic": "Cultural Sensitivity",
    "expectedSkill": "Confronting racism",
    "idealResponse": "I would directly address the comment by saying 'That’s a hurtful and ignorant thing to say, we all come from different backgrounds and that’s something to celebrate, not mock.'"
  },
  {
    "id": "s5",
    "text": "A team leader always interrupts a quieter team member during meetings, ignoring their input.",
    "tags": ["communication", "workplace", "leadership", "team dynamics"],
    "difficulty": "medium",
    "topic": "Team Collaboration",
    "expectedSkill": "Ensuring equal participation in meetings",
    "idealResponse": "I would speak to the leader privately and let them know that the quieter team member may have valuable input and that they should ensure everyone has the chance to speak."
  },
  {
    "id": "s6",
    "text": "A coworker makes a joke about someone’s disability in front of the whole team, causing the person to become visibly upset.",
    "tags": ["disability", "workplace", "bystander", "allyship"],
    "difficulty": "hard",
    "topic": "Respect for All Abilities",
    "expectedSkill": "Defending against ableism",
    "idealResponse": "I would immediately say that making jokes about someone’s disability is not okay and check in with the person who was upset to make sure they’re okay."
  },
  {
    "id": "s7",
    "text": "A colleague makes an assumption about someone’s sexual orientation based on their appearance and expresses it aloud.",
    "tags": ["LGBTQ+", "workplace", "bystander", "allyship"],
    "difficulty": "medium",
    "topic": "LGBTQ+ Sensitivity",
    "expectedSkill": "Challenging assumptions about sexual orientation",
    "idealResponse": "I would address the comment by saying 'It’s important to not make assumptions about people’s identities, we should all feel free to express ourselves without judgment.'"
  },
  {
    "id": "s8",
    "text": "During a meeting, a senior manager dismisses a junior team member’s idea without considering it.",
    "tags": ["leadership", "workplace", "communication", "team dynamics"],
    "difficulty": "medium",
    "topic": "Team Collaboration",
    "expectedSkill": "Promoting inclusivity in team discussions",
    "idealResponse": "I would suggest that the manager give the junior team member a chance to fully explain their idea and encourage an inclusive environment where everyone’s ideas are valued."
  },
  {
    "id": "s9",
    "text": "A team member constantly uses gendered language, referring to colleagues as ‘guys’ or ‘ladies’ in group emails and meetings.",
    "tags": ["gender", "workplace", "bystander", "allyship"],
    "difficulty": "easy",
    "topic": "Gender Sensitivity",
    "expectedSkill": "Using inclusive language",
    "idealResponse": "I would kindly remind them that ‘guys’ is not always an inclusive term and suggest using gender-neutral language like 'everyone' or 'team.'"
  },
  {
    "id": "s10",
    "text": "A colleague repeatedly interrupts others during meetings and speaks over people without acknowledging their input.",
    "tags": ["communication", "workplace", "team dynamics", "bystander"],
    "difficulty": "medium",
    "topic": "Effective Communication",
    "expectedSkill": "Encouraging equal participation",
    "idealResponse": "I would speak to the colleague privately and mention that it’s important to listen to others fully before responding to ensure that everyone feels heard."
  },
    {
      "id": "s11",
      "text": "A colleague frequently makes assumptions about another coworker's abilities based on their age.",
      "tags": ["ageism", "workplace", "bystander", "allyship"],
      "difficulty": "medium",
      "topic": "Age Sensitivity",
      "expectedSkill": "Addressing ageism",
      "idealResponse": "I would speak up and say that making assumptions based on someone's age is discriminatory, and everyone should be judged based on their abilities, not their age."
    },
    {
      "id": "s12",
      "text": "A team member consistently overlooks a colleague when delegating tasks, despite their willingness to contribute.",
      "tags": ["communication", "workplace", "team dynamics", "bystander"],
      "difficulty": "medium",
      "topic": "Team Collaboration",
      "expectedSkill": "Ensuring equal task distribution",
      "idealResponse": "I would bring it up in a team meeting or privately to the colleague, suggesting they involve everyone equally in task delegation to foster a more inclusive team environment."
    },
    {
      "id": "s13",
      "text": "During a team brainstorming session, a senior team member continuously interrupts and dismisses the input from a quieter team member.",
      "tags": ["workplace", "leadership", "team dynamics", "bystander"],
      "difficulty": "hard",
      "topic": "Inclusive Leadership",
      "expectedSkill": "Encouraging equal participation",
      "idealResponse": "I would respectfully ask the senior member to allow the quieter team member to finish their thought and encourage a more inclusive discussion where everyone's ideas are heard."
    },
    {
      "id": "s14",
      "text": "A colleague uses terms like 'that’s so gay' to describe something negative, unaware of its harmful impact.",
      "tags": ["LGBTQ+", "workplace", "bystander", "allyship"],
      "difficulty": "medium",
      "topic": "LGBTQ+ Sensitivity",
      "expectedSkill": "Confronting inappropriate language",
      "idealResponse": "I would politely but firmly tell them that using 'gay' in a negative context is disrespectful, and suggest using more neutral or respectful language."
    },
    {
      "id": "s15",
      "text": "A group of colleagues are planning an event but fail to consider accessibility needs for a coworker with a disability.",
      "tags": ["disability", "workplace", "bystander", "inclusivity"],
      "difficulty": "medium",
      "topic": "Accessibility Awareness",
      "expectedSkill": "Addressing accessibility needs",
      "idealResponse": "I would bring up the concern about accessibility and suggest looking into accommodations such as wheelchair access, sign language interpretation, or other needs to ensure everyone can participate."
    },
    {
      "id": "s16",
      "text": "A teammate repeatedly makes comments that imply women are not as capable in technical roles as men.",
      "tags": ["gender bias", "workplace", "bystander", "allyship"],
      "difficulty": "hard",
      "topic": "Gender Sensitivity",
      "expectedSkill": "Confronting gender bias",
      "idealResponse": "I would call attention to the comment and explain that such views are harmful and untrue. I would reinforce that gender should never determine someone’s ability to perform in a role."
    },
    {
      "id": "s17",
      "text": "A colleague often dismisses or undermines the contributions of someone who speaks with an accent.",
      "tags": ["microaggressions", "workplace", "bystander", "allyship"],
      "difficulty": "medium",
      "topic": "Cultural Sensitivity",
      "expectedSkill": "Speaking up against microaggressions",
      "idealResponse": "I would address the colleague privately, letting them know that it's not acceptable to undermine others based on their accent, and that everyone’s contributions should be respected."
    },
    {
      "id": "s18",
      "text": "During a meeting, someone jokes about a colleague’s appearance in a way that makes others uncomfortable.",
      "tags": ["bullying", "workplace", "bystander", "allyship"],
      "difficulty": "medium",
      "topic": "Respect for Diversity",
      "expectedSkill": "Confronting inappropriate behavior",
      "idealResponse": "I would call out the joke in the moment, letting everyone know that it’s inappropriate to make fun of someone’s appearance, and I would make sure the affected colleague feels supported."
    },
    {
      "id": "s19",
      "text": "A team member makes a decision without consulting the rest of the team, which affects everyone’s workload.",
      "tags": ["communication", "workplace", "leadership", "team dynamics"],
      "difficulty": "medium",
      "topic": "Team Collaboration",
      "expectedSkill": "Encouraging collaborative decision-making",
      "idealResponse": "I would suggest having a more collaborative approach in future decisions, where everyone’s input is considered to ensure fairness and effectiveness."
    },
    {
      "id": "s20",
      "text": "A colleague makes a comment that implies that people from a certain country are lazy.",
      "tags": ["racism", "workplace", "bystander", "allyship"],
      "difficulty": "hard",
      "topic": "Cultural Sensitivity",
      "expectedSkill": "Confronting racism",
      "idealResponse": "I would immediately challenge the comment, explaining that it's based on a harmful stereotype, and remind everyone that individuals should not be judged by their nationality or background."
    }
  ];
  

  {
    "id": "s1",
    "quiz": [
      {
        "question": "What should you do when you witness a microaggression in the workplace?",
        "options": [
          "a) Ignore it and let it pass",
          "b) Laugh along with the group",
          "c) Speak up immediately, saying the joke was inappropriate",
          "d) Wait until the end of the meeting and talk to the person privately"
        ],
        "correct_answer": "c) Speak up immediately, saying the joke was inappropriate"
      },
      {
        "question": "Why is it important to address microaggressions in the workplace?",
        "options": [
          "a) To make sure the person responsible is reprimanded",
          "b) To create a more inclusive and supportive work environment",
          "c) To avoid confrontation",
          "d) To avoid making the person uncomfortable"
        ],
        "correct_answer": "b) To create a more inclusive and supportive work environment"
      },
      {
        "question": "How can you support the person affected by the microaggression?",
        "options": [
          "a) Ignore it and move on",
          "b) Apologize for the behavior of the group and offer support afterward",
          "c) Criticize the person for being sensitive",
          "d) Laugh to show solidarity"
        ],
        "correct_answer": "b) Apologize for the behavior of the group and offer support afterward"
      }
    ],
    "links": [
      {
        "title": "What are microaggressions? Understanding and combating microaggressions",
        "url": "https://www.shrm.org/resourcesandtools/hr-topics/employee-relations/pages/what-are-microaggressions.aspx"
      },
      {
        "title": "How to Respond to Microaggressions",
        "url": "https://www.psychologytoday.com/us/blog/words-matter/201710/how-respond-to-microaggressions"
      },
      {
        "title": "Addressing Microaggressions in the Workplace",
        "url": "https://www.microsolutions.org/guide-to-microaggressions-in-the-workplace"
      }
    ],
    "open_ended_question": "How would you personally address a situation like this if it happened to a colleague? Describe what you would say or do to support the person affected."
  }