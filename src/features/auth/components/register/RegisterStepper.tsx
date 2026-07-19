import { Check } from "lucide-react";

interface RegisterStepperProps {
  currentStep: number;
}

const steps = [
  "Account",
  "Personal",
  "Address",
  "Emergency",
];

const RegisterStepper = ({
  currentStep,
}: RegisterStepperProps) => {
  return (
    <div className="mb-10">

      <div className="flex items-center justify-between">

        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const completed =
            currentStep > stepNumber;

          const active =
            currentStep === stepNumber;

          return (
            <div
              key={step}
              className="flex flex-1 items-center"
            >
              <div className="flex flex-col items-center">

                <div
                  className={`
                    flex h-12 w-12 items-center justify-center rounded-full border-2
                    transition-all duration-300

                    ${
                      completed
                        ? "border-primary bg-primary text-white"
                        : active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-slate-300 bg-white text-slate-400"
                    }
                  `}
                >
                  {completed ? (
                    <Check size={20} />
                  ) : (
                    <span className="font-semibold">
                      {stepNumber}
                    </span>
                  )}
                </div>

                <p
                  className={`
                    mt-3 text-xs font-medium

                    ${
                      active
                        ? "text-primary"
                        : "text-slate-500"
                    }
                  `}
                >
                  {step}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div
                  className={`
                    mx-3 mb-6 h-1 flex-1 rounded-full

                    ${
                      completed
                        ? "bg-primary"
                        : "bg-slate-200"
                    }
                  `}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RegisterStepper;