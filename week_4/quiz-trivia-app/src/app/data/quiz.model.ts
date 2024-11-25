export class Quiz {
  constructor(
    public title: string,
    public icon: string,
    public questions: { question: string; options: string[]; answer: string }[]
  ) {}
}
