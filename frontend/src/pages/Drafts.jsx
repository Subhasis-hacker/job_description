import React, { useState, useEffect } from 'react';
import { FileText, Trash2, Eye, Loader2, Download, Copy } from 'lucide-react';
import { getDrafts, getDraftById, deleteDraft } from '../services/api';

const Drafts = () => {
  const [drafts, setDrafts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedDraft, setSelectedDraft] = useState(null);
  const [isViewingDraft, setIsViewingDraft] = useState(false);

  useEffect(() => {
    fetchDrafts();
  }, []);

  const fetchDrafts = async () => {
    setIsLoading(true);
    try {
      const data = await getDrafts();
      setDrafts(data);
    } catch (error) {
      console.error('Error fetching drafts:', error);
      alert('Failed to load drafts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewDraft = async (id) => {
    try {
      const draft = await getDraftById(id);
      setSelectedDraft(draft);
      setIsViewingDraft(true);
    } catch (error) {
      console.error('Error fetching draft:', error);
      alert('Failed to load draft');
    }
  };

  const handleDeleteDraft = async (id) => {
    if (!window.confirm('Are you sure you want to delete this draft?')) {
      return;
    }

    try {
      await deleteDraft(id);
      setDrafts(drafts.filter((d) => d.id !== id));
      if (selectedDraft?.id === id) {
        setSelectedDraft(null);
        setIsViewingDraft(false);
      }
      alert('Draft deleted successfully');
    } catch (error) {
      console.error('Error deleting draft:', error);
      alert('Failed to delete draft');
    }
  };

  const handleCopyDraft = () => {
    if (!selectedDraft) return;

    const text = formatJDAsText(selectedDraft);
    navigator.clipboard.writeText(text);
    alert('Job description copied to clipboard!');
  };

  const handleDownloadDraft = () => {
    if (!selectedDraft) return;

    const text = formatJDAsText(selectedDraft);
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedDraft.title.replace(/\s/g, '_')}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6 flex justify-center items-center min-h-screen">
        <Loader2 className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Saved Drafts</h1>
        <p className="text-gray-600">
          View and manage your job descriptions ({drafts.length} total)
        </p>
      </div>

      {drafts.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FileText size={64} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No drafts yet
          </h3>
          <p className="text-gray-500 mb-6">
            Create your first job description to see it here
          </p>
          
            href="/"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
          >
            Create Job Description
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Drafts List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              All Drafts
            </h2>
            {drafts.map((draft) => (
              <div
                key={draft.id}
                className={`bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition cursor-pointer border-2 ${
                  selectedDraft?.id === draft.id
                    ? 'border-blue-500'
                    : 'border-transparent'
                }`}
                onClick={() => handleViewDraft(draft.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {draft.job_title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {draft.industry}
                    </p>
                    <p className="text-xs text-gray-500">
                      Created: {formatDate(draft.created_at)}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleViewDraft(draft.id);
                      }}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteDraft(draft.id);
                      }}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Draft Viewer */}
          <div className="lg:sticky lg:top-6 lg:self-start">
            {isViewingDraft && selectedDraft ? (
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Header with actions */}
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                  <h2 className="text-2xl font-bold mb-4">
                    {selectedDraft.title}
                  </h2>
                  <div className="flex gap-3">
                    <button
                      onClick={handleCopyDraft}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition text-sm font-medium"
                    >
                      <Copy size={16} />
                      Copy
                    </button>
                    <button
                      onClick={handleDownloadDraft}
                      className="flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg hover:bg-white/30 transition text-sm font-medium"
                    >
                      <Download size={16} />
                      Download
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6 max-h-[calc(100vh-250px)] overflow-y-auto">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      About the Role
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedDraft.about}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Key Responsibilities
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedDraft.responsibilities.map((resp, idx) => (
                        <li key={idx}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Required Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDraft.required_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Preferred Skills
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedDraft.preferred_skills.map((skill, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      Experience
                    </h3>
                    <p className="text-gray-700">{selectedDraft.experience}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      What We Offer
                    </h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700">
                      {selectedDraft.benefits.map((benefit, idx) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                      About Us
                    </h3>
                    <p className="text-gray-700">
                      {selectedDraft.company_description}
                    </p>
                  </div>

                  {selectedDraft.special_requirements && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        Special Requirements
                      </h3>
                      <p className="text-gray-700">
                        {selectedDraft.special_requirements}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg p-12 text-center border-2 border-dashed border-gray-300">
                <Eye size={48} className="mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">
                  Select a draft from the list to view its details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Drafts;