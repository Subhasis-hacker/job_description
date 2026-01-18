import React from 'react';

const JobForm = ({ formData, handleInputChange }) => {
  const industries = ['Technology', 'Finance', 'Healthcare', 'E-commerce', 'Education'];
  const experienceLevels = ['Entry', 'Mid', 'Senior'];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Basic Information</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.jobTitle}
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
          placeholder="e.g., Senior Full Stack Developer"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Company Name
        </label>
        <input
          type="text"
          value={formData.companyName}
          onChange={(e) => handleInputChange('companyName', e.target.value)}
          placeholder="e.g., TechCorp Inc."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Industry/Domain
        </label>
        <select
          value={formData.industry}
          onChange={(e) => handleInputChange('industry', e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
        >
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Experience Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {experienceLevels.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => handleInputChange('experienceLevel', level)}
              className={`px-4 py-3 rounded-lg border-2 transition font-medium ${
                formData.experienceLevel === level
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400 text-gray-700'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default JobForm;