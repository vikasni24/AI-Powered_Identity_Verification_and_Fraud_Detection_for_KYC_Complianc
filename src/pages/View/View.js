import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, AlertCircle, FileText, ShieldCheck } from 'lucide-react';

const View = () => {
  const navigate = useNavigate();

  // Sample data - in a real app, this would come from your state management or API
  const verificationResults = {
    documentType: 'Aadhaar Card',
    status: 'verified', // 'verified', 'warning', 'error'
    confidence: 98,
    extractedData: {
      name: 'John Doe',
      dob: '01/01/1990',
      gender: 'Male',
      aadhaarNumber: '1234 5678 9012',
      address: '123 Main St, City, State, 123456'
    },
    verificationChecks: [
      { id: 1, name: 'Document Authenticity', status: 'pass', details: 'Document appears to be authentic' },
      { id: 2, name: 'Data Consistency', status: 'pass', details: 'All data fields are consistent' },
      { id: 3, name: 'Image Quality', status: 'warning', details: 'Image quality could be better' },
      { id: 4, name: 'Face Match', status: 'pass', details: 'Face matches the document photo' }
    ]
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pass':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'error':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pass':
        return <CheckCircle2 className="h-5 w-5" />;
      case 'warning':
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to previous
          </button>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-5 border-b border-gray-200 bg-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <h2 className="text-xl font-semibold text-gray-900">Document Verification Results</h2>
                  <p className="text-sm text-gray-500">
                    {verificationResults.documentType} • {new Date().toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${verificationResults.status === 'verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {verificationResults.status === 'verified' ? 'Verified' : 'Needs Review'}
              </div>
            </div>
          </div>

          {/* Verification Overview */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Overview</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Confidence Score</p>
                <p className="text-2xl font-bold text-gray-900">{verificationResults.confidence}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Document Type</p>
                <p className="text-lg font-medium text-gray-900">{verificationResults.documentType}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm font-medium text-gray-500">Verification Status</p>
                <div className="flex items-center mt-1">
                  <ShieldCheck className={`h-5 w-5 ${verificationResults.status === 'verified' ? 'text-green-500' : 'text-yellow-500'}`} />
                  <span className="ml-2 text-sm font-medium">
                    {verificationResults.status === 'verified' ? 'Verified' : 'Needs Review'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Data */}
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Extracted Information</h3>
            <div className="bg-gray-50 overflow-hidden shadow rounded-lg">
              <dl className="divide-y divide-gray-200">
                {Object.entries(verificationResults.extractedData).map(([key, value]) => (
                  <div key={key} className="px-4 py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">
                      {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Verification Checks */}
          <div className="px-6 py-5">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Checks</h3>
            <div className="space-y-4">
              {verificationResults.verificationChecks.map((check) => (
                <div key={check.id} className="flex items-start">
                  <div className={`flex-shrink-0 h-5 w-5 mt-0.5 ${getStatusColor(check.status).split(' ')[0]}`}>
                    {getStatusIcon(check.status)}
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-gray-900">{check.name}</p>
                    <p className="text-sm text-gray-500">{check.details}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => navigate('/upload')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Verify Another Document
          </button>
        </div>
      </div>
    </div>
  );
};

export default View;