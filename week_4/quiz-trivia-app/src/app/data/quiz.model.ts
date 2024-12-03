export interface Quiz {
  title: string;
  icon: string;
  questions: QuestionData[];
}

export interface QuestionData {
  question: string;
  options: string[];
  answer: string;
}
