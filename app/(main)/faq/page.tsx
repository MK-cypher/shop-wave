import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {FAQs} from "@/lib/consts";

export default function page() {
  return (
    <main className="mt-28">
      <h2 className="text-center text-3xl mb-10 font-bold">FAQs</h2>
      <div className="container py-10 ">
        <Accordion type="single" collapsible className="bg-secondary rounded-lg p-3">
          {FAQs.map((item, i) => (
            <AccordionItem key={i} value={item.title}>
              <AccordionTrigger className="[&[data-state=open]>svg]:text-primary [&[data-state=open]]:text-primary">
                {item.title}
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
