import { Check } from 'lucide-react';

interface CheckoutStepsProps {
  currentStep: 1 | 2 | 3;
}

const steps = [
  { number: 1, label: 'Address' },
  { number: 2, label: 'Order Summary' },
  { number: 3, label: 'Payment' },
];

const CheckoutSteps = ({ currentStep }: CheckoutStepsProps) => {
  return (
    <div className="flex items-center justify-center py-4 px-4 bg-card border-b border-border">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          {/* Step Circle */}
          <div className="flex flex-col items-center">
            <div
              className={`h-7 w-7 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                step.number < currentStep
                  ? 'bg-green-500 text-white'
                  : step.number === currentStep
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground'
              }`}
            >
              {step.number < currentStep ? (
                <Check className="h-4 w-4" />
              ) : (
                step.number
              )}
            </div>
            <span
              className={`text-[10px] mt-1 font-medium ${
                step.number <= currentStep ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {step.label}
            </span>
          </div>
          
          {/* Connector Line */}
          {index < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-0.5 mx-2 ${
                step.number < currentStep ? 'bg-green-500' : 'bg-muted'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckoutSteps;
