import React from 'react';

const LivePreview = ({ formData }) => {
  if (!formData.jobTitle) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center text-gray-500">
        <p>Fill in the form to see a live preview</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
      <h3 className="text-xl font-bold text-gray-900">{formData.jobTitle}</h3>

      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex gap-2">
          <span className="font-semibold">Industry:</span>
          <span>{formData.industry}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Level:</span>
          <span>{formData.experienceLevel}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-semibold">Culture:</span>
          <span>{formData.culture}</span>
        </div>
        {formData.skills.length > 0 && (
          <div>
            <span className="font-semibold">Selected Skills:</span>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LivePreview;