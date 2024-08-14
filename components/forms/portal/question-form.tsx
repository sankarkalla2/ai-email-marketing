import React, { useEffect } from "react";
import {
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";
import FormGenerator from "../form-generator";
import { Button } from "@/components/ui/button";

type Props = {
  questions: {
    id: string;
    question: string;
    answered: string | null;
  }[];
  register: UseFormRegister<FieldValues>;
  error: FieldErrors<FieldValues>;
  onNext: () => void;
};

const QuestionsForm = ({ register, questions, error, onNext }: Props) => {
  return (
    <div className="flex flex-col justify-center gap-4">
      {questions.map((question) => (
        <FormGenerator
          defaultValue={question.answered || ""}
          key={question.id}
          name={`question-${question.id}`}
          errors={error}
          register={register}
          label={question.question}
          type="text"
          inputType="input"
          placeholder={question.answered || "Not answered"}
        />
      ))}

      <Button type="button" onClick={onNext}>
        Next
      </Button>
    </div>
  );
};

export default QuestionsForm;
