"use client";

interface Answer {
  id: string;
  text: string;
}

interface QuestionCardProps {
  questionNumber: number;
  totalQuestions: number;
  question: string;
  answers: Answer[];
  selectedAnswerId: string | null;
  onSelect: (answerId: string) => void;
}

export function QuestionCard({
  questionNumber,
  totalQuestions,
  question,
  answers,
  selectedAnswerId,
  onSelect,
}: QuestionCardProps) {
  return (
    <div>
      <div className="mb-2 text-sm font-medium text-muted-foreground">
        Question {questionNumber} of {totalQuestions}
      </div>
      <h3 className="mb-6 text-lg font-semibold leading-snug">{question}</h3>
      <ul className="space-y-3">
        {answers.map((answer) => {
          const isSelected = selectedAnswerId === answer.id;
          return (
            <li key={answer.id}>
              <button
                type="button"
                onClick={() => onSelect(answer.id)}
                className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-colors ${
                  isSelected
                    ? "border-primary bg-primary/10 font-medium text-primary"
                    : "border-border bg-white hover:border-primary/50 hover:bg-muted"
                }`}
              >
                {answer.text}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
