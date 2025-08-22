import React from 'react';

export default function OcrResultModal({ isOpen, onClose, document }) {
  if (!isOpen || !document) return null;

  const data = document.extractedData || {};

  return (
    // Modal Overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      {/* Modal Content */}
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-slate-700">OCR Extraction Result</h2>
          <button onClick={onClose} className="text-slate-500 hover:text-slate-800">&times;</button>
        </div>
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 max-h-96 overflow-y-auto">
          <h3 className="font-semibold text-slate-800 mb-2">Extracted Data for: {document.fileName}</h3>
          <div className="space-y-2 text-slate-700 text-sm">
            {/* PUC-specific fields */}
            {data.licenceNo && (
              <div>
                <span className="font-semibold">License No:</span> {data.licenceNo}
              </div>
            )}
            {data.centerName && (
              <div>
                <span className="font-semibold">Center Name:</span> {data.centerName}
              </div>
            )}
            {data.puccNo && (
              <div>
                <span className="font-semibold">PUCC No:</span> {data.puccNo}
              </div>
            )}
            {data.vehicleNumber && (
              <div>
                <span className="font-semibold">Vehicle Number:</span> {data.vehicleNumber}
              </div>
            )}
            {data.yearOfRegn && (
              <div>
                <span className="font-semibold">Year of Registration:</span> {data.yearOfRegn}
              </div>
            )}
            {data.make && (
              <div>
                <span className="font-semibold">Make:</span> {data.make}
              </div>
            )}
            {data.model && (
              <div>
                <span className="font-semibold">Model:</span> {data.model}
              </div>
            )}
            {data.testDate && (
              <div>
                <span className="font-semibold">Test Date:</span> {data.testDate}
              </div>
            )}
            {data.validUntil && (
              <div>
                <span className="font-semibold">Valid Until:</span> {data.validUntil}
              </div>
            )}
            {data.customerName && (
              <div>
                <span className="font-semibold">Customer Name:</span> {data.customerName}
              </div>
            )}
            
            {/* Legacy RC fields (for backward compatibility) */}
            {data.registrationNumber && !data.vehicleNumber && (
              <div>
                <span className="font-semibold">Registration Number:</span> {data.registrationNumber}
              </div>
            )}
            {data.makerName && !data.make && (
              <div>
                <span className="font-semibold">Maker Name:</span> {data.makerName}
              </div>
            )}
            {data.modelName && !data.model && (
              <div>
                <span className="font-semibold">Model Name:</span> {data.modelName}
              </div>
            )}
            {data.monthYearOfMfg && (
              <div>
                <span className="font-semibold">Month-Year of Mfg:</span> {data.monthYearOfMfg}
              </div>
            )}
            {data.registrationAuthority && (
              <div>
                <span className="font-semibold">Registration Authority:</span> {data.registrationAuthority}
              </div>
            )}
            
            {/* Show rawText as collapsible */}
            {data.rawText && (
              <details className="mt-4">
                <summary className="cursor-pointer font-semibold">Raw OCR Text</summary>
                <pre className="bg-gray-100 p-2 rounded text-xs mt-2 whitespace-pre-wrap">{data.rawText}</pre>
              </details>
            )}
            
            {/* Fallback if nothing extracted */}
            {!data.licenceNo && !data.puccNo && !data.vehicleNumber && !data.registrationNumber && 
             !data.make && !data.makerName && !data.model && !data.modelName && (
              <div className="text-slate-500">No structured OCR data found for this document.</div>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg text-slate-600 bg-slate-100 hover:bg-slate-200 font-semibold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
