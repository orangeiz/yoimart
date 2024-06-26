import { Check, ChevronRight } from "lucide-react";

interface StepProps {
  currentState: string;
  stepLabel: string;
  Number: number;
}

const Step = ({ currentState, Number, stepLabel }: StepProps) => {
  return (
    <div className="flex flex-row items-center gap-x-8">
      {currentState === "pending" && (
        <div className="flex flex-row items-center gap-x-4 text-gray-500 group hover:text-black transition-all">
          <div className="z-10 w-10 h-10 flex items-center justify-center border rounded-full border-gray-300 group-hover:border-gray-500 transition-all">
            {Number}
          </div>
          <div className="text-l  text-center font-semibold">{stepLabel}</div>
        </div>
      )}
      {currentState === "current" && (
        <div className="flex flex-row items-center gap-x-4 text-custom1">
          <div className="z-10 w-10 h-10 flex items-center justify-center border rounded-full border-custom1">
            {Number}
          </div>
          <div className="text-l text-center font-semibold">{stepLabel}</div>
        </div>
      )}
      {currentState === "completed" && (
        <div className="flex flex-row  items-center gap-x-4 text-black group">
          <div className="z-10 w-10 h-10 flex items-center justify-center border rounded-full bg-custom2 group-hover:bg-blue-800">
            <Check className="text-white w-5 h-5" />
          </div>
          <div className="text-l text-center font-semibold">{stepLabel}</div>
        </div>
      )}
      {Number!==3&&(
        <ChevronRight className="text-sky-400 h-10 w-10"/>
      )}
    </div>
  );
};

export default Step;
