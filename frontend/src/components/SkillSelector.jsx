import React from 'react';

const SkillSelector = ({ formData, toggleSkill }) => {
  const availableSkills = [
    'Python',
    'React',
    'JavaScript',
    'Node.js',
    'SQL',
    'AWS',
    'Docker',
    'Git',
    'TypeScript',
    'Machine Learning',
    'Java',
    'Go',
    'Kubernetes',
    'MongoDB',
    'REST API',
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-800">Select Key Skills</h2>
        <p className="text-gray-600 mt-2">
          Choose 3-10 skills (selected: {formData.skills.length})
        </p>
        {formData.skills.length < 3 && (
          <p className="text-red-500 text-sm mt-1">
            Please select at least 3 skills
          </p>
        )}
        {formData.skills.length > 10 && (
          <p className="text-red-500 text-sm mt-1">
            Please select no more than 10 skills
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {availableSkills.map((skill) => (
          <button
            key={skill}
            type="button"
            onClick={() => toggleSkill(skill)}
            className={`px-4 py-3 rounded-lg border-2 transition font-medium text-left ${
              formData.skills.includes(skill)
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-300 hover:border-gray-400 text-gray-700'
            }`}
          >
            {skill}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SkillSelector;