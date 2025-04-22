
export interface ConversationStarter {
  id: number;
  text: string;
  category: Category;
}

export type Category = 'general' | 'funny' | 'deep' | 'date' | 'work';

export const categoryLabels: Record<Category, string> = {
  general: 'General',
  funny: 'Funny',
  deep: 'Deep',
  date: 'Dating',
  work: 'Work',
};

export const conversationStarters: ConversationStarter[] = [
  {
    id: 1,
    text: "What's the most interesting thing you've read or seen lately?",
    category: 'general',
  },
  {
    id: 2,
    text: "If you could have dinner with any historical figure, who would it be and why?",
    category: 'general',
  },
  {
    id: 3,
    text: "What's your go-to comfort food when you're having a bad day?",
    category: 'general',
  },
  {
    id: 4,
    text: "If you could instantly become an expert in something, what would you choose?",
    category: 'general',
  },
  {
    id: 5,
    text: "What's the weirdest food combination you actually enjoy?",
    category: 'funny',
  },
  {
    id: 6,
    text: "If animals could talk, which one would be the rudest?",
    category: 'funny',
  },
  {
    id: 7,
    text: "What's the funniest thing you've seen someone do at work?",
    category: 'funny',
  },
  {
    id: 8,
    text: "If you had to sing karaoke right now, what song would you pick?",
    category: 'funny',
  },
  {
    id: 9,
    text: "What's something you believe that most people don't?",
    category: 'deep',
  },
  {
    id: 10,
    text: "What do you think happens after we die?",
    category: 'deep',
  },
  {
    id: 11,
    text: "If you could see one statistic floating above everyone's head, what would you want it to be?",
    category: 'deep',
  },
  {
    id: 12,
    text: "What's something you've changed your mind about in the last few years?",
    category: 'deep',
  },
  {
    id: 13,
    text: "What's your idea of a perfect day?",
    category: 'date',
  },
  {
    id: 14,
    text: "What's something you're passionate about that most people don't know?",
    category: 'date',
  },
  {
    id: 15,
    text: "What qualities do you value most in close friends?",
    category: 'date',
  },
  {
    id: 16,
    text: "What's something you've always wanted to try but haven't yet?",
    category: 'date',
  },
  {
    id: 17,
    text: "What's the best piece of career advice you've ever received?",
    category: 'work',
  },
  {
    id: 18,
    text: "How do you handle work-life balance?",
    category: 'work',
  },
  {
    id: 19,
    text: "What's a skill you'd like to improve in your professional life?",
    category: 'work',
  },
  {
    id: 20,
    text: "If you could change one thing about your industry, what would it be?",
    category: 'work',
  },
];
