import {
  Accordion as ShadAccordian,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const AccordionEle = (id: string, trigger: string, content: string) => {
  return (
    <ShadAccordian type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>{trigger}</AccordionTrigger>
        <AccordionContent>{content}</AccordionContent>
      </AccordionItem>
    </ShadAccordian>
  );
};

export default AccordionEle;
