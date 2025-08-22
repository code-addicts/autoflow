import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getVehicleById, getWorkflowsForVehicle, deleteWorkflow, getDocumentsForVehicle } from '../services/api';
import AddWorkflowModal from '../components/AddWorkFlowModal';
import DocumentUploadModal from '../components/DocumentUploadModal';
import OcrResultModal from '../components/OcrResultModal';
import { deleteDocument } from '../services/api';

export default function VehicleDetailPage() {
  const { id } = useParams();
  const [vehicle, setVehicle] = useState(null);
  const [workflows, setWorkflows] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isWorkflowModalOpen, setIsWorkflowModalOpen] = useState(false);
  const [isDocModalOpen, setIsDocModalOpen] = useState(false);
  
  // 2. Add state for the OCR result modal
  const [isOcrModalOpen, setIsOcrModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [vehicleRes, workflowsRes, documentsRes] = await Promise.all([
        getVehicleById(id),
        getWorkflowsForVehicle(id),
        getDocumentsForVehicle(id)
      ]);
      
      setVehicle(vehicleRes.data);
      setWorkflows(workflowsRes.data);
      setDocuments(documentsRes.data);
    } catch (err) {
      setError('Failed to fetch vehicle details.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleWorkflowAdded = () => {
    setIsWorkflowModalOpen(false);
    fetchData();
  };
  
  const handleDocumentAdded = () => {
    setIsDocModalOpen(false);
    fetchData();
  };

  const handleDeleteWorkflow = async (workflowId) => {
    if (window.confirm('Are you sure you want to delete this workflow?')) {
      try {
        await deleteWorkflow(workflowId);
        fetchData();
      } catch (err) {
        console.error('Failed to delete workflow:', err);
      }
    }
  };

  // 3. Function to open the OCR modal with the selected document's data
  const handleViewOcr = (doc) => {
    setSelectedDocument(doc);
    setIsOcrModalOpen(true);
  };

  const handleDeleteDocument = async (docId) => {
    if (window.confirm('Are you sure you want to delete this document? This cannot be undone.')) {
      try {
        await deleteDocument(docId);
        fetchData(); // Refetch all data to update the list
      } catch (err) {
        console.error('Failed to delete document:', err);
        // Optionally, show an error message to the user
      }
    }
  };

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!vehicle) return <p className="text-center mt-8">Vehicle not found.</p>;

  return (
    <>
      <div className="container mx-auto p-6">
        {/* Vehicle Details Card */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h1 className="text-3xl font-bold text-slate-800">{vehicle.year} {vehicle.brand} {vehicle.model}</h1>
          <p className="text-slate-600 mt-2">Registration No: {vehicle.registrationNumber}</p>
          <p className="text-slate-600">Owner: {vehicle.ownerName}</p>
        </div>

        {/* Workflows Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-700">Workflows</h2>
            <button 
              onClick={() => setIsWorkflowModalOpen(true)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Add New Workflow
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {workflows.length > 0 ? (
              <ul>
                {workflows.map(workflow => (
                  <li key={workflow._id} className="flex justify-between items-center border-b last:border-b-0 p-4">
                    <div>
                      <p className="font-semibold text-slate-800">{workflow.name}</p>
                      <p className="text-sm text-slate-500">{workflow.description}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteWorkflow(workflow._id)}
                      className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-slate-500 py-8">No workflows found for this vehicle.</p>
            )}
          </div>
        </div>

        {/* Documents Section */}
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-slate-700">Documents</h2>
            <button 
              onClick={() => setIsDocModalOpen(true)}
              className="bg-slate-800 text-white px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-primary-600 transition-all duration-300 transform hover:scale-105"
            >
              Upload Document
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            {documents.length > 0 ? (
              <ul>
                {documents.map(doc => (
                  <li key={doc._id} className="flex justify-between items-center border-b last:border-b-0 p-4">
                    <div>
                      <p className="font-semibold text-slate-800">{doc.fileType}</p>
                      <p className="text-sm text-slate-500">{doc.fileName}</p>
                    </div>
                    {/* 4. Add the "View OCR Data" button */}
                    <button 
                      onClick={() => handleViewOcr(doc)}
                      className="text-slate-800 hover:text-slate-500 font-semibold"
                    >
                      View OCR Data
                    </button>
                    <button 
                      onClick={() => handleDeleteDocument(doc._id)}
                      className="text-red-500 hover:text-red-700 font-semibold transition-colors"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-center text-slate-500 py-8">No documents uploaded for this vehicle.</p>
            )}
          </div>
        </div>
      </div>

      {/* Render Modals */}
      <AddWorkflowModal 
        isOpen={isWorkflowModalOpen}
        onClose={() => setIsWorkflowModalOpen(false)}
        vehicleId={id}
        onWorkflowAdded={handleWorkflowAdded}
      />
      <DocumentUploadModal
        isOpen={isDocModalOpen}
        onClose={() => setIsDocModalOpen(false)}
        vehicleId={id}
        onDocumentAdded={handleDocumentAdded}
      />
      {/* 5. Render the OcrResultModal */}
      <OcrResultModal 
        isOpen={isOcrModalOpen}
        onClose={() => setIsOcrModalOpen(false)}
        document={selectedDocument}
      />
    </>
  );
}