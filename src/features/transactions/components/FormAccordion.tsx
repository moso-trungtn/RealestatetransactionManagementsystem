import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/accordion";

export interface AccordionSection {
  id: string;
  title: string;
  content: React.ReactNode;
}

interface FormAccordionProps {
  sections: AccordionSection[];
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  className?: string;
}

export function FormAccordion({
  sections,
  type = 'single',
  defaultValue,
  className = ''
}: FormAccordionProps) {
  return (
    <Accordion
      type={type as any}
      defaultValue={defaultValue}
      className={className}
    >
      {sections.map((section) => (
        <AccordionItem key={section.id} value={section.id}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>
            {section.content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
