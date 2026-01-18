import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import Stepper from '../components/Stepper';
import JobForm from '../components/JobForm';
import SkillSelector from '../components/SkillSelector';
import LivePreview from '../components/LivePreview';
import EditableSection from '../components/EditableSection';
import ExportButtons from '../components/ExportButtons';
import { generateJobDescription } from '../services/api';

const CreateJob = () => {
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    jobTitle: '',
    companyName: 'Our Company',
    industry: 'Technology',
    experienceLevel: 'Mid',
    skills: [],
    culture: 'Startup',
    specialRequirements: '',
  });
  const [generatedJD, setGeneratedJD] = useState(null);

  const steps = ['Basic Info', 'Skills', 'Culture', 'Preview'];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleSkill = (skill) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill],
    }));
  };

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const payload = {
        job_title: formData.jobTitle,
        industry: formData.industry,
        experience_level: formData.experienceLevel,
        skills: formData.skills,
        culture: formData.culture,
        special_requirements: formData.specialRequirements || null,
        company_name: formData.companyName,
      };

      const result = await generateJobDescription(payload);
      setGeneratedJD(result);
      setStep(4);
    } catch (error) {
      alert('Error generating job description. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegenerate = async () => {
    await handleGenerate();
  };

  const handleCopy = () => {
    if (!generatedJD) return;

    const text = formatJDAsText(generatedJD);
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const handleDownload = () => {
    if (!generatedJD) return;

    const text = formatJDAsText(generatedJD);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${generatedJD.title.replace(/\s/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const formatJDAsText = (jd) => {
    return `${jd.title}

About the Role:
${jd.about}

Key Responsibilities:
${jd.responsibilities.map((r) => `• ${r}`).join('\n')}

Required Skills:
${jd.required_skills.map((s) => `• ${s}`).join('\n')}

Preferred Skills:
${jd.preferred_skills.map((s) => `• ${s}`).join('\n')}

Experience:
${jd.experience}

What We Offer:
${jd.benefits.map((b) => `• ${b}`).join('\n')}

About Us:
${jd.company_description}
${jd.special_requirements ? `\nSpecial Requirements:\n${jd.special_requirements}` : ''}`;
  };

  const updateJDSection = (section, content) => {
    setGeneratedJD((prev) => ({ ...prev, [section]: content }));
  };

  const canProceed = () => {
    if (step === 1) return formData.jobTitle.trim() !== '';
    if (step === 2) return formData.skills.length >= 3 && formData.skills.length <= 10;
    return true;
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <JobForm formData={formData} handleInputChange={handleInputChange} />;

      case 2:
        return <SkillSelector formData={formData} toggleSkill={toggleSkill} />;

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-800">Company Culture & Requirements</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Company Culture
              </label>
              <div className="grid grid-cols-3 gap-3">
                {['Startup', 'Corporate', 'Remote-first'].map((culture) => (
                  <button
                    key={culture}
                    type="button"
                    onClick={() => handleInputChange('culture', culture)}
                    className={`px-4 py-3 rounded-lg border-2 transition font-medium ${
                      formData.culture === culture
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400 text-gray-700'
                    }`}
                  >
                    {culture}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Special Requirements (Optional)
              </label>
              <textarea
                value={formData.specialRequirements}
                onChange={(e) => handleInputChange('specialRequirements', e.target.value)}
                placeholder="e.g., Must be willing to travel, Security clearance required..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>

            <button
              onClick={handleGenerate}
              disabled={!canProceed() || isLoading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Generating...
                </>
              ) : (
                'Generate Job Description'
              )}
            </button>
          </div>
        );

      case 4:
        return (
          generatedJD && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Generated Job Description</h2>
                <ExportButtons
                  onCopy={handleCopy}
                  onDownload={handleDownload}
                  onRegenerate={handleRegenerate}
                />
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-6">
                <h1 className="text-3xl font-bold text-gray-900">{generatedJD.title}</h1>

                <EditableSection
                  title="About the Role:"
                  content={generatedJD.about}
                  onSave={(content) => updateJDSection('about', content)}
                />

                <EditableSection
                  title="Key Responsibilities:"
                  content={generatedJD.responsibilities}
                  onSave={(content) => updateJDSection('responsibilities', content)}
                  isArray
                />

                <EditableSection
                  title="Required Skills:"
                  content={generatedJD.required_skills}
                  onSave={(content) => updateJDSection('required_skills', content)}
                  isArray
                />

                <EditableSection
                  title="Preferred Skills:"
                  content={generatedJD.preferred_skills}
                  onSave={(content) => updateJDSection('preferred_skills', content)}
                  isArray
                />

                <EditableSection
                  title="Experience:"
                  content={generatedJD.experience}
                  onSave={(content) => updateJDSection('experience', content)}
                />

                <EditableSection
                  title="What We Offer:"
                  content={generatedJD.benefits}
                  onSave={(content) => updateJDSection('benefits', content)}
                  isArray
                />

                <EditableSection
                  title="About Us:"
                  content={generatedJD.company_description}
                  onSave={(content) => updateJDSection('company_description', content)}
                />

                {generatedJD.special_requirements && (
                  <EditableSection
                    title="Special Requirements:"
                    content={generatedJD.special_requirements}
                    onSave={(content) => updateJDSection('special_requirements', content)}
                  />
                )}
              </div>
            </div>
          )
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Create Job Description
        </h1>
        <p className="text-gray-600">
          Generate professional, ATS-friendly job descriptions in minutes
        </p>
      </div>

      <Stepper currentStep={step} steps={steps} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Form */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            {renderStep()}
          </div>

          {/* Navigation */}
          {step < 4 && (
            <div className="flex justify-between mt-6">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition font-medium"
                >
                  <ChevronLeft size={20} /> Previous
                </button>
              )}
              {step < 3 && (
                <button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition ml-auto disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
                >
                  Next <ChevronRight size={20} />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Live Preview Sidebar */}
        {step < 4 && (
          <div className="lg:col-span-1">
            <div className="sticky top-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Live Preview</h3>
              <LivePreview formData={formData} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CreateJob;