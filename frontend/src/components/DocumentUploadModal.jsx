import React, { useState } from 'react';
import { uploadDocument } from '../services/api';

export default function DocumentUploadModal({ isOpen, onClose, vehicleId, onDocumentAdded }) {
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('PUC');
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      return setError('Please select a file to upload.');
    }
    setError(null);
    setIsUploading(true);

    const formData = new FormData();
    formData.append('document', file);
    formData.append('fileType', fileType);
    formData.append('vehicleId', vehicleId);

    try {
      await uploadDocument(formData);
      onDocumentAdded();
    } catch (err) {
      setError('Upload failed. Please try again.');
      console.error(err);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-slate-700 mb-6">Upload New Document</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="fileType" className="block text-slate-600 font-semibold mb-2">Document Type</label>
            <select
              id="fileType"
              value={fileType}
              onChange={(e) => setFileType(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="PUC">PUC Certificate</option>
              <option value="RC">Registration Certificate (RC)</option>
              <option value="Insurance">Insurance Paper</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-6">
            <label htmlFor="document" className="block text-slate-600 font-semibold mb-2">Select File</label>
            <input
              type="file"
              id="document"
              onChange={handleFileChange}
              className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
              accept="image/png, image/jpeg, image/jpg"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <div className="flex justify-center space-x-4">
            <button type="button" onClick={onClose} disabled={isUploading} className="px-4 py-2 rounded-lg text-slate-800 bg-slate-100 hover:bg-slate-200 font-semibold disabled:opacity-50">
              Cancel
            </button>
            <button type="submit" disabled={isUploading} className="px-4 py-2 rounded-lg bg-slate-800 text-white font-bold hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed">
              {isUploading ? 'Uploading...' : 'Upload & Process'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}