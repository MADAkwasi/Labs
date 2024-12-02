export interface Quiz {
  title: string;
  icon: string;
  questions: { question: string; options: string[]; answer: string }[];
}

export interface QuestionData {
  question: string;
  options: string[];
  answer: string;
}
