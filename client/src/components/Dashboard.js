import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useAuth } from '../contexts/AuthContext';
import TopSearchesBanner from './TopSearchesBanner';
import SearchInterface from './SearchInterface';
import SearchHistory from './SearchHistory';
import Header from './Header';

const DashboardContainer = styled.div`
  min-height: 100vh;
  background-color: #f8fafc;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
  
  @media (min-width: 1024px) {
    display: grid;
    grid-template-columns: 1fr 300px;
    gap: 2rem;
    padding: 2rem;
  }
`;

const SearchSection = styled.div`
  @media (min-width: 1024px) {
    order: 1;
  }
`;

const Sidebar = styled.div`
  @media (min-width: 1024px) {
    order: 2;
  }
  
  @media (max-width: 1023px) {
    margin-top: 2rem;
  }
`;

const Dashboard = () => {
  const { user } = useAuth();
  const [searchResults, setSearchResults] = useState(null);
  const [selectedImages, setSelectedImages] = useState(new Set());
  const [searchHistory, setSearchHistory] = useState([]);
  const [topSearches, setTopSearches] = useState([]);

  // Fetch top searches on component mount
  useEffect(() => {
    fetchTopSearches();
  }, []);

  const fetchTopSearches = async () => {
    try {
      const response = await fetch('/api/search/top-searches');
      const data = await response.json();
      if (data.success) {
        setTopSearches(data.topSearches);
      }
    } catch (error) {
      console.error('Error fetching top searches:', error);
    }
  };

  const handleSearchComplete = (results) => {
    setSearchResults(results);
    setSelectedImages(new Set()); // Reset selection on new search
    fetchSearchHistory(); // Refresh history
    fetchTopSearches(); // Refresh top searches
  };

  const fetchSearchHistory = async () => {
    try {
      const response = await fetch('/api/history', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setSearchHistory(data.searches);
      }
    } catch (error) {
      console.error('Error fetching search history:', error);
    }
  };

  const handleImageSelect = (imageId) => {
    setSelectedImages(prev => {
      const newSelection = new Set(prev);
      if (newSelection.has(imageId)) {
        newSelection.delete(imageId);
      } else {
        newSelection.add(imageId);
      }
      return newSelection;
    });
  };

  const handleSelectAll = () => {
    if (searchResults && searchResults.images) {
      if (selectedImages.size === searchResults.images.length) {
        setSelectedImages(new Set());
      } else {
        setSelectedImages(new Set(searchResults.images.map(img => img.id)));
      }
    }
  };

  return (
    <DashboardContainer>
      <Header user={user} />
      
      <TopSearchesBanner topSearches={topSearches} />
      
      <MainContent>
        <SearchSection>
          <SearchInterface 
            onSearchComplete={handleSearchComplete}
            searchResults={searchResults}
            selectedImages={selectedImages}
            onImageSelect={handleImageSelect}
            onSelectAll={handleSelectAll}
          />
        </SearchSection>
        
        <Sidebar>
          <SearchHistory 
            history={searchHistory}
            onHistoryClick={(term) => {
              // This would trigger a new search
              // Implementation depends on SearchInterface design
            }}
          />
        </Sidebar>
      </MainContent>
    </DashboardContainer>
  );
};

export default Dashboard;
