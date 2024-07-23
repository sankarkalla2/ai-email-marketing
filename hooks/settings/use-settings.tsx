import { updatePassword } from "@/actions/auth";
import {
  onChatBotImageUpdate,
  onDeleteUserDomain,
  onUpdateDomain,
  onUpdateLongMessage,
} from "@/actions/settings";
import { useToast } from "@/components/ui/use-toast";
import { upload } from "@/lib/upload";
import {
  ChangePasswordProps,
  changePasswordSchema,
} from "@/schemas/auth-schema";
import {
  DomainSettingsProps,
  DomainSettingsSchema,
} from "@/schemas/settings.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
