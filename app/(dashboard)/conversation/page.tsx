import { onGetAllAccountDomains } from "@/actions/settings";
import ConversationMenu from "@/components/conversations";
import Messanger from "@/components/conversations/messanger";
import InfoBar from "@/components/infotbar";
import { Separator } from "@/components/ui/separator";

const ConversationPage = async () => {
  const domains = await onGetAllAccountDomains();
  return (
    <div className="h-full w-full flex">
      <ConversationMenu domains={domains?.domains} />
      <Separator orientation="vertical" />
      <div className="w-full flex flex-col">
        <div className="px-5">
          <InfoBar />
        </div>
        <Messanger />
      </div>
    </div>
  );
};

export default ConversationPage;
