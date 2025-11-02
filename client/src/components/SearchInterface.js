import React, { useState } from 'react';
import styled from 'styled-components';
import { FaSearch, FaCheck, FaTimes, FaDownload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import ImageGrid from './ImageGrid';

const SearchContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  
  @media (max-width: 640px) {
    flex-direction: column;
  }
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.875rem 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchButton = styled.button`
  padding: 0.875rem 2rem;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  &:hover {
    background-color: #2563eb;
    transform: translateY(-1px);
  }
  
  &:disabled {
    background-color: #94a3b8;
    cursor: not-allowed;
    transform: none;
  }
`;

const ResultsHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
  
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const ResultsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const SearchTerm = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const ResultsCount = styled.p`
  color: #64748b;
  margin: 0;
  font-size: 0.875rem;
`;

const SelectionControls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  
  @media (max-width: 640px) {
    justify-content: space-between;
  }
`;

const SelectionInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-weight: 500;
  font-size: 0.875rem;
`;

const ControlButtons = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ControlButton = styled.button`
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  background-color: white;
  color: #374151;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #f9fafb;
    border-color: #9ca3af;
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled(ControlButton)`
  background-color: #10b981;
  color: white;
  border-color: #10b981;
  
  &:hover:not(:disabled) {
    background-color: #059669;
    border-color: #059669;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3rem;
  color: #3b82f6;
`;

const ErrorMessage = styled.div`
  background-color: #fef2f2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
`;

const SearchInterface = ({ 
  onSearchComplete, 
  searchResults, 
  selectedImages, 
  onImageSelect, 
  onSelectAll 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast.error('Please enter a search term');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ term: searchTerm.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        onSearchComplete(data);
        toast.success(`Found ${data.count} images for "${data.term}"`);
      } else {
        setError(data.message || 'Search failed');
        toast.error(data.message || 'Search failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      toast.error('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = () => {
    onSelectAll();
  };

  const handleDownloadSelected = () => {
    if (selectedImages.size === 0) {
      toast.warning('Please select images to download');
      return;
    }
    
    // In a real app, you'd implement actual download functionality
    toast.success(`Downloading ${selectedImages.size} selected images...`);
  };

  const handleClearSelection = () => {
    // Clear all selected images by calling onImageSelect for each selected image
    selectedImages.forEach(imageId => onImageSelect(imageId));
  };

  return (
    <SearchContainer>
      <SearchForm onSubmit={handleSubmit}>
        <SearchInput
          type="text"
          placeholder="Search for images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          disabled={loading}
        />
        <SearchButton type="submit" disabled={loading}>
          {loading ? (
            <>
              <div className="animate-spin" style={{ width: '16px', height: '16px', border: '2px solid transparent', borderTop: '2px solid currentColor', borderRadius: '50%' }} />
              Searching...
            </>
          ) : (
            <>
              <FaSearch />
              Search
            </>
          )}
        </SearchButton>
      </SearchForm>

      {error && (
        <ErrorMessage>
          {error}
        </ErrorMessage>
      )}

      {loading && (
        <LoadingSpinner>
          <div className="animate-spin" style={{ width: '32px', height: '32px', border: '4px solid #e2e8f0', borderTop: '4px solid #3b82f6', borderRadius: '50%' }} />
        </LoadingSpinner>
      )}

      {searchResults && !loading && (
        <>
          <ResultsHeader>
            <ResultsInfo>
              <SearchTerm>You searched for "{searchResults.term}"</SearchTerm>
              <ResultsCount>{searchResults.count} results found</ResultsCount>
            </ResultsInfo>
            
            <SelectionControls>
              <SelectionInfo>
                <FaCheck />
                Selected: {selectedImages.size} images
              </SelectionInfo>
              
              <ControlButtons>
                <ControlButton onClick={handleSelectAll}>
                  {selectedImages.size === searchResults.images.length ? 'Deselect All' : 'Select All'}
                </ControlButton>
                
                {selectedImages.size > 0 && (
                  <>
                    <ControlButton onClick={handleClearSelection}>
                      <FaTimes />
                      Clear
                    </ControlButton>
                    
                    <DownloadButton onClick={handleDownloadSelected}>
                      <FaDownload />
                      Download
                    </DownloadButton>
                  </>
                )}
              </ControlButtons>
            </SelectionControls>
          </ResultsHeader>

          <ImageGrid
            images={searchResults.images}
            selectedImages={selectedImages}
            onImageSelect={onImageSelect}
          />
        </>
      )}
    </SearchContainer>
  );
};

export default SearchInterface;
