import { onGetPaymentConnected } from "@/actions/integration";
import InfoBar from "@/components/infotbar";
import IntegrationsPage from "@/components/integrations";

const Integration = async () => {
  const payment = await onGetPaymentConnected();

  const connections = {
    stripe: payment ? true : false,
  };
  return (
    <>
      <InfoBar />
      <IntegrationsPage connections={connections} />
    </>
  );
};

export default Integration;
