 import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload as UploadIcon, X, FileText, Image as ImageIcon, AlertCircle, FileUp, FileCheck } from 'lucide-react';

const Upload = () => {
  const [files, setFiles] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  // Define handleFiles first since it's used in other callbacks
  const handleFiles = useCallback((fileList) => {
    setError(null);
    
    // Validate file types and size (10MB max)
    const validFiles = fileList.filter(file => {
      const isValidType = file.type === 'application/pdf' || 
                         file.type.startsWith('image/');
      const isValidSize = file.size <= 10 * 1024 * 1024; // 10MB
      
      if (!isValidType) {
        setError('Only PDF and image files are allowed');
        return false;
      }
      if (!isValidSize) {
        setError('File size should be less than 10MB');
        return false;
      }
      return true;
    });

    if (validFiles.length === 0) return;

    const newFiles = validFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type
    }));

    setFiles(prevFiles => [...prevFiles, ...newFiles]);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    setError(null);
    
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  }, [handleFiles]); // Add handleFiles to dependencies

  const handleFileInput = (e) => {
    setError(null);
    const selectedFiles = Array.from(e.target.files);
    handleFiles(selectedFiles);
  };

  const removeFile = (id) => {
    setFiles(prevFiles => prevFiles.filter(file => file.id !== id));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (files.length === 0) {
      setError('Please select at least one file to upload');
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Navigate to extract page with the files
      navigate('/extract', { 
        state: { files: files.map(f => f.file) } 
      });
      
    } catch (err) {
      console.error('Upload failed:', err);
      setError('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Document Upload
          </h1>
          <p className="mt-3 text-lg text-gray-600 max-w-2xl mx-auto">
            Upload your identity documents for quick and secure verification
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="p-1 bg-gradient-to-r from-blue-500 to-indigo-600"></div>
          
          <div className="p-6 sm:p-8">
            <div
              className={`border-3 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                isDragging 
                  ? 'border-indigo-400 bg-indigo-50 scale-[1.01] shadow-lg' 
                  : 'border-gray-300 hover:border-indigo-300'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-4 bg-indigo-100 rounded-full shadow-inner">
                  {files.length > 0 ? (
                    <FileCheck className="h-10 w-10 text-indigo-600" />
                  ) : (
                    <FileUp className="h-10 w-10 text-indigo-600" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium text-gray-900">
                    {files.length > 0 ? 'Files Ready' : 'Drag & Drop Files'}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {files.length > 0 
                      ? `${files.length} file${files.length > 1 ? 's' : ''} selected` 
                      : 'or click to browse files'}
                  </p>
                </div>
                <div>
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 inline-flex items-center"
                  >
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Choose Files
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      multiple
                      onChange={handleFileInput}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-400">Supports: PDF, JPG, PNG (Max 10MB)</p>
              </div>
            </div>

            {error && (
              <div className="mt-4 flex items-center justify-center p-3 bg-red-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                <span className="text-red-600 text-sm">{error}</span>
              </div>
            )}

            {files.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center">
                  <span className="w-1.5 h-5 bg-indigo-500 rounded-full mr-2"></span>
                  Selected Files
                </h3>
                <ul className="space-y-2">
                  {files.map((file) => (
                    <li 
                      key={file.id} 
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg p-3 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center min-w-0">
                          {file.type === 'application/pdf' ? (
                            <div className="p-2 bg-red-100 rounded-lg mr-3">
                              <FileText className="h-5 w-5 text-red-500" />
                            </div>
                          ) : (
                            <div className="p-2 bg-blue-100 rounded-lg mr-3">
                              <ImageIcon className="h-5 w-5 text-blue-500" />
                            </div>
                          )}
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                            <p className="text-xs text-gray-500">{file.size}</p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(file.id)}
                          className="p-1.5 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
                          disabled={isUploading}
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                disabled={isUploading}
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={files.length === 0 || isUploading}
                className={`px-6 py-2.5 rounded-lg text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all ${
                  files.length === 0 || isUploading
                    ? 'bg-indigo-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5'
                }`}
              >
                {isUploading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <UploadIcon className="h-4 w-4 mr-2" />
                    Process Documents
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;