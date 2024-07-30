import { onGetSubscriptionPlan } from "@/actions/settings";
import { redirect } from "next/navigation";
import HeadingLabel from "@/components/heading/index";
import { Card, CardContent, CardDescription } from "../ui/card";
import { CheckCircle2, Plus } from "lucide-react";
import { pricingCards } from "@/constants/pricing-cards";

const BillingSettings = async () => {
  const res = await onGetSubscriptionPlan();

  const planFeatures = pricingCards.find(
    (card) => card.title.toUpperCase() === res?.plan?.toUpperCase()
  )?.features;

  if (!planFeatures) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
      <div className="lg:col-span-1">
        <HeadingLabel
          label="Billing Settings"
          message="Add Payment information, upgrade and modify you plan"
        />
      </div>
      <div className="lg:col-span-2 flex justify-start lg:justify-center">
        <Card className="border-dashed bg-muted 99 border-muted-foreground w-full cursor-pointer h-[270px] flex justify-center items-center">
          <CardContent className="flex gap-2 items-center">
            <div className="rounded-full border-2 p-1">
              <Plus className="text-muted-foreground" />
            </div>
            <CardDescription className="font-semibold">
              Upgrade you plan
            </CardDescription>
          </CardContent>
        </Card>
      </div>

      <div className="col-span-1">
        <h2 className="text-xl font-semibold mb-2">Current Plan</h2>
        <p className="text-sm font-semibold">{res?.plan && res?.plan}</p>
        <div className="mt-2 text-sm">
          {planFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-x-1">
              <CheckCircle2 className="text-muted-foreground h-5 w-5 " />
              <p>{feature}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BillingSettings;
