import React from 'react';
import { ChevronRight, Check } from 'lucide-react';

const Stepper = ({ currentStep, steps }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div className="flex items-center">
              <div
                className={`flex items-center justify-center w-10 h-10 rounded-full transition-all ${
                  currentStep > idx + 1
                    ? 'bg-green-500 text-white'
                    : currentStep === idx + 1
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}
              >
                {currentStep > idx + 1 ? (
                  <Check size={20} />
                ) : (
                  <span className="font-semibold">{idx + 1}</span>
                )}
              </div>
              <span
                className={`ml-3 text-sm font-medium ${
                  currentStep === idx + 1 ? 'text-blue-600' : 'text-gray-600'
                }`}
              >
                {step}
              </span>
            </div>
            {idx < steps.length - 1 && (
              <ChevronRight className="mx-4 text-gray-400" size={20} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Stepper;