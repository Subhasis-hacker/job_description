import React from 'react';
import { Copy, Download, Save, RefreshCw } from 'lucide-react';

const ExportButtons = ({ onCopy, onDownload, onSave, onRegenerate, isSaving }) => {
  return (
    <div className="flex flex-wrap gap-3">
      <button
        onClick={onCopy}
        className="flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition font-medium"
      >
        <Copy size={18} />
        Copy to Clipboard
      </button>

      <button
        onClick={onDownload}
        className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition font-medium"
      >
        <Download size={18} />
        Download PDF
      </button>

      <button
        onClick={onRegenerate}
        className="flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition font-medium"
      >
        <RefreshCw size={18} />
        Regenerate
      </button>

      {onSave && (
        <button
          onClick={onSave}
          disabled={isSaving}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save size={18} />
          {isSaving ? 'Saving...' : 'Save Draft'}
        </button>
      )}
    </div>
  );
};

export default ExportButtons;