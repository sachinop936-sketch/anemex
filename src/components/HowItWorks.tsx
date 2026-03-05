import { UserCheck, CreditCard, MessageCircle } from "lucide-react";

const steps = [
  {
    icon: UserCheck,
    title: "Select Host & Service",
    description: "Browse verified hosts and choose your preferred service",
  },
  {
    icon: CreditCard,
    title: "Pay via UPI",
    description: "Pay the exact service amount using any UPI app",
  },
  {
    icon: MessageCircle,
    title: "Send Screenshot & Start",
    description: "Send payment screenshot on Telegram & start service",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-6 bg-card/50">
      <div className="container">
        <h2 className="text-center text-lg font-bold text-foreground mb-4">How It Works</h2>

        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl bg-card p-4 card-shadow"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full gradient-primary">
                <step.icon className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary">Step {index + 1}</span>
                </div>
                <h3 className="font-semibold text-foreground">{step.title}</h3>
                <p className="text-xs text-muted-foreground mt-0.5">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
