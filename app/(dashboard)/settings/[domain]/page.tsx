import { onGetDomainInfo } from "@/actions/settings";
import BotTrainingForm from "@/components/forms/settings/bot-training";
import SettingsForm from "@/components/forms/settings/form";
import InfoBar from "@/components/infotbar";
import { redirect } from "next/navigation";

const DomainSettingsPage = async ({
  params,
}: {
  params: { domain: string };
}) => {
  const domain = await onGetDomainInfo(params.domain);

  if (!domain) return redirect("/dashbaord");

  return (
    <>
      <InfoBar />
      <SettingsForm
        plan={domain.subscription?.plan!}
        chatBot={domain.domains[0].chatBot}
        id={domain.domains[0].id}
        name={domain.domains[0].name}
      />

      <BotTrainingForm id={domain.domains[0].id} />
    </>
  );
};

export default DomainSettingsPage;
