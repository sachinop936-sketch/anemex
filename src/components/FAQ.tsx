import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'Is this real?',
    answer: 'Yes, 100% real service. All profiles are verified and genuine. We ensure quality service delivery.'
  },
  {
    question: 'How does payment work?',
    answer: 'We use secure UPI payment. Simply select your service, pay via UPI, and connect instantly via Telegram.'
  },
  {
    question: 'Can I get a refund?',
    answer: 'Yes, refunds are provided only if the service is not delivered as promised. Contact support for assistance.'
  },
  {
    question: 'Is my information safe?',
    answer: 'Absolutely. We don\'t store any personal information. All transactions are secure and private.'
  }
];

const FAQ = () => {
  return (
    <section className="py-8">
      <div className="container">
        <h2 className="mb-4 text-center text-xl font-bold text-foreground">
          Frequently Asked Questions
        </h2>
        
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border-border/50"
            >
              <AccordionTrigger className="text-sm font-medium hover:text-primary">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
