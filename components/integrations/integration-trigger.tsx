import React from "react";
import { Card } from "../ui/card";
import { CloudIcon } from "lucide-react";
import Modal from "../modal/modal";
import { Separator } from "../ui/separator";
import { IntegrationModalBody } from "./integration-modal-botdy";

type Props = {
  name: "stripe";
  connections: {
    stripe: boolean;
  };
  logo: string;
  description: string;
  title: string;
};

const IntegrationTrigger = ({
  connections,
  name,
  logo,
  description,
  title,
}: Props) => {
  return (
    <Modal
      title={title}
      type="Integration"
      logo={logo}
      description={description}
      trigger={
        <Card className="px-3 py-2 cursor-pointer flex gap-2">
          <CloudIcon />
          {connections[name] ? "connected" : "connect"}
        </Card>
      }
    >
      <Separator orientation="horizontal" />
      <IntegrationModalBody connections={connections} type={name} />
    </Modal>
  );
};

export default IntegrationTrigger;
