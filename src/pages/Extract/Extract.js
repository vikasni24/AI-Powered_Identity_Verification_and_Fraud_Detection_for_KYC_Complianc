import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, CheckCircle, AlertCircle, FileText, Image as ImageIcon } from 'lucide-react';

const Extract = () => {
  const [extractionStatus, setExtractionStatus] = useState('extracting'); // 'extracting', 'completed', 'error'
  const [progress, setProgress] = useState(0);
  const [extractedData, setExtractedData] = useState(null);
  const navigate = useNavigate();

  // Simulate extraction process
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setExtractionStatus('completed');
          // Simulate extracted data
          setExtractedData({
            documentType: 'Aadhaar Card',
            fields: {
              name: 'John Doe',
              dob: '01/01/1990',
              gender: 'Male',
              aadhaarNumber: '1234 5678 9012',
              address: '123 Main St, City, State, 123456'
            }
          });
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(timer);
  }, []);

  const handleViewResults = () => {
    navigate('/view');
  };

  const renderStatusIcon = () => {
    switch (extractionStatus) {
      case 'extracting':
        return <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="h-12 w-12 text-green-500" />;
      case 'error':
        return <AlertCircle className="h-12 w-12 text-red-500" />;
      default:
        return null;
    }
  };

  const renderStatusText = () => {
    switch (extractionStatus) {
      case 'extracting':
        return 'Extracting information from your documents...';
      case 'completed':
        return 'Document processing complete!';
      case 'error':
        return 'An error occurred while processing your documents.';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Processing Documents</h1>
          <p className="mt-2 text-sm text-gray-600">
            We're extracting information from your uploaded documents
          </p>
        </div>

        <div className="bg-white shadow rounded-lg p-8 text-center">
          <div className="flex flex-col items-center justify-center space-y-6">
            {renderStatusIcon()}
            
            <div className="w-full max-w-md">
              <p className="text-lg font-medium text-gray-900 mb-2">
                {renderStatusText()}
              </p>
              
              {extractionStatus === 'extracting' && (
                <div className="mt-4">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{progress}% complete</p>
                </div>
              )}

              {extractionStatus === 'completed' && extractedData && (
                <div className="mt-6 text-left bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3">Extracted Information:</h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Document Type:</span> {extractedData.documentType}</p>
                    {Object.entries(extractedData.fields).map(([key, value]) => (
                      <p key={key}>
                        <span className="font-medium">{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}:</span> {value}
                      </p>
                    ))}
                  </div>
                </div>
              )}

              {extractionStatus === 'error' && (
                <div className="mt-4 text-red-600 text-sm">
                  <p>Please try again or contact support if the problem persists.</p>
                </div>
              )}
            </div>

            {extractionStatus === 'completed' && (
              <div className="mt-6">
                <button
                  onClick={handleViewResults}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  View Detailed Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Extract;