import { updatePassword } from "@/actions/auth";
import {
  onChatBotImageUpdate,
  onCreateFilteredQuestion,
  onCreateHelpDeskQuestions,
  onDeleteUserDomain,
  onGetAllFilteredQuestions,
  onGetAllHelpDeskQuestions,
  onUpdateDomain,
  onUpdateLongMessage,
} from "@/actions/settings";
import FilteredQuestions from "@/components/forms/settings/filter-questions";
import { useToast } from "@/components/ui/use-toast";
import { upload } from "@/lib/upload";
import {
  ChangePasswordProps,
  changePasswordSchema,
} from "@/schemas/auth-schema";
import {
  DomainSettingsProps,
  DomainSettingsSchema,
  FilteredTypeQuestionsProps,
  FilteredTypeQuestionSchema,
  HelpDeskQuestionsProps,
  HelpDeskQuestionsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { HelpDesk } from "@prisma/client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export const useToggleMode = () => {
  const { setTheme, theme } = useTheme();

  return {
    setTheme,
    theme,
  };
};

export const useChangePassword = () => {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ChangePasswordProps>({
    resolver: zodResolver(changePasswordSchema),
    mode: "onChange",
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const onUpdatePassword = handleSubmit(async (values) => {
    try {
      setLoading(true);
      const updated = await updatePassword(values.password);
      if (updated) {
        reset();
        setLoading(false);
        toast({
          title: updated.status === 200 ? "Success" : "Error",
          description: updated.message,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  });

  return {
    register,
    loading,
    onUpdatePassword,
    errors,
  };
};

export const useSettings = (id: string) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<DomainSettingsProps>({
    resolver: zodResolver(DomainSettingsSchema),
  });

  const { toast } = useToast();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [deleting, setDeleting] = useState<boolean>(false);

  const onUpdateSettings = handleSubmit(async (values) => {
    setLoading(true);
    if (values.domain) {
      const domain = await onUpdateDomain(id, values.domain);
      if (domain) {
        toast({
          title: domain.status == 200 ? "Success" : "Error",
          description: domain.message,
        });
        domain.name && router.push(`/settings/${domain.name.split(".")[0]}`);
      }
    }

    if (values?.image?.[0]) {
      const uplodaed = await upload.uploadFile(values.image[0]);
      const image = await onChatBotImageUpdate(id, uplodaed.uuid);

      if (image) {
        toast({
          title: image.status == 200 ? "Success" : "Error",
          description: image.message,
        });
      }
    }

    if (values.welcomeMessage) {
      const message = await onUpdateLongMessage(id, values.welcomeMessage);

      if (message) {
        toast({
          title: message.status == 200 ? "Success" : "Error",
          description: message.message,
        });
      }
    }

    setLoading(false);
    reset();
    router.refresh();
  });

  const onDeleteDomain = async () => {
    setDeleting(true);
    const deleted = await onDeleteUserDomain(id);

    if (deleted) {
      toast({
        title: deleted.status === 200 ? "Success" : "Error",
        description: deleted.message,
      });
      return router.push("/dashbaord");
    }

    setDeleting(false);
  };

  return {
    register,
    onDeleteDomain,
    onUpdateSettings,
    errors,
    loading,
    deleting,
  };
};

export const useHelpDesk = (id: string) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<HelpDeskQuestionsProps>({
    resolver: zodResolver(HelpDeskQuestionsSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    {
      id: string;
      question: string;
      answer: string;
    }[]
  >([]);

  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true);

    const question = await onCreateHelpDeskQuestions(
      id,
      values.question,
      values.answer
    );
    if (question) {
      setIsQuestions(question.questions || []);
      toast({
        title: question.status == 200 ? "Success" : "Error",
        description: question.message,
      });
      setLoading(false);
      reset();
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const question = await onGetAllHelpDeskQuestions(id);
    if (question?.questions) {
      setIsQuestions(question?.questions);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    register,
    onSubmitQuestion,
    errors,
    isQuestions,
    loading,
  };
};

export const useFilteredQuestions = (id: string) => {
  const {
    reset,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<FilteredTypeQuestionsProps>({
    resolver: zodResolver(FilteredTypeQuestionSchema),
  });

  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [isQuestions, setIsQuestions] = useState<
    {
      id: string;
      question: string;
      answered: string | null;
    }[]
  >([]);

  const onSubmitQuestion = handleSubmit(async (values) => {
    setLoading(true);

    const question = await onCreateFilteredQuestion(
      id,
      values.question,
      values.answer
    );
    if (question) {
      setIsQuestions(question.questions || []);
      toast({
        title: question.status == 200 ? "Success" : "Error",
        description: question.message,
      });
      setLoading(false);
      reset();
    }
  });

  const onGetQuestions = async () => {
    setLoading(true);
    const question = await onGetAllFilteredQuestions(id);
    if (question?.questions) {
      setIsQuestions(question?.questions);
      setLoading(false);
    }
  };

  useEffect(() => {
    onGetQuestions();
  }, []);

  return {
    loading,
    register,
    onSubmitQuestion,
    isQuestions,
    errors,
  };
};
