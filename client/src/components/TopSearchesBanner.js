import React from 'react';
import styled from 'styled-components';
import { FaHashtag } from 'react-icons/fa';
import { FiTrendingUp } from 'react-icons/fi';

const BannerContainer = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%);
  color: white;
  padding: 1rem 0;
  margin-bottom: 1rem;
`;

const BannerContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
`;

const BannerTitle = styled.h2`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

const SearchesList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

const SearchItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
`;

const SearchTerm = styled.span`
  font-weight: 600;
`;

const SearchCount = styled.span`
  opacity: 0.8;
  font-size: 0.75rem;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 1rem;
  opacity: 0.8;
  font-style: italic;
`;

const TopSearchesBanner = ({ topSearches = [] }) => {
  if (!topSearches || topSearches.length === 0) {
    return (
      <BannerContainer>
        <BannerContent>
          <BannerTitle>
            <FiTrendingUp />
            Trending Searches
          </BannerTitle>
          <EmptyState>No searches yet. Be the first to search!</EmptyState>
        </BannerContent>
      </BannerContainer>
    );
  }

  return (
    <BannerContainer>
      <BannerContent>
        <BannerTitle>
          <FiTrendingUp />
          Trending Searches
        </BannerTitle>
        <SearchesList>
          {topSearches.map((search, index) => (
            <SearchItem key={search.term}>
              <FaHashtag size={12} />
              <SearchTerm>{search.term}</SearchTerm>
              <SearchCount>({search.count} searches)</SearchCount>
            </SearchItem>
          ))}
        </SearchesList>
      </BannerContent>
    </BannerContainer>
  );
};

export default TopSearchesBanner;
