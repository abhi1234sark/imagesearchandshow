import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaHistory, FaClock, FaSearch, FaTrash, FaChartBar } from 'react-icons/fa';

const HistoryContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  height: fit-content;
`;

const HistoryHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e2e8f0;
`;

const HistoryTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #1e293b;
  margin: 0;
`;

const StatsSection = styled.div`
  background: #f8fafc;
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1.5rem;
`;

const StatsTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.75rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
`;

const StatItem = styled.div`
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #3b82f6;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: #64748b;
  margin-top: 0.25rem;
`;

const HistoryList = styled.div`
  max-height: 400px;
  overflow-y: auto;
`;

const HistoryItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  margin-bottom: 0.5rem;
  
  &:hover {
    background-color: #f1f5f9;
  }
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SearchIcon = styled.div`
  width: 32px;
  height: 32px;
  background-color: #e2e8f0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
  flex-shrink: 0;
`;

const SearchInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const SearchTerm = styled.div`
  font-weight: 500;
  color: #1e293b;
  font-size: 0.875rem;
  margin-bottom: 0.25rem;
  word-break: break-word;
`;

const SearchMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.75rem;
  color: #64748b;
`;

const SearchTime = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ResultCount = styled.div`
  background-color: #dbeafe;
  color: #1e40af;
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.625rem;
  font-weight: 500;
`;

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #ef4444;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
  opacity: 0;
  
  ${HistoryItem}:hover & {
    opacity: 1;
  }
  
  &:hover {
    background-color: #fef2f2;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 2rem 1rem;
  color: #64748b;
`;

const EmptyIcon = styled.div`
  width: 48px;
  height: 48px;
  background-color: #f1f5f9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem;
  color: #94a3b8;
`;

const EmptyText = styled.p`
  margin: 0;
  font-size: 0.875rem;
`;

const LoadMoreButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  color: #64748b;
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  
  &:hover {
    background-color: #f1f5f9;
    border-color: #cbd5e1;
  }
`;

const SearchHistory = ({ history, onHistoryClick }) => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/history/stats', {
        credentials: 'include'
      });
      const data = await response.json();
      if (data.success) {
        setStats(data.stats);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const searchTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - searchTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return searchTime.toLocaleDateString();
  };

  const handleHistoryClick = (term) => {
    if (onHistoryClick) {
      onHistoryClick(term);
    }
  };

  if (!history || history.length === 0) {
    return (
      <HistoryContainer>
        <HistoryHeader>
          <FaHistory color="#3b82f6" />
          <HistoryTitle>Search History</HistoryTitle>
        </HistoryHeader>
        
        <EmptyState>
          <EmptyIcon>
            <FaSearch size={20} />
          </EmptyIcon>
          <EmptyText>No searches yet</EmptyText>
        </EmptyState>
      </HistoryContainer>
    );
  }

  return (
    <HistoryContainer>
      <HistoryHeader>
        <FaHistory color="#3b82f6" />
        <HistoryTitle>Search History</HistoryTitle>
      </HistoryHeader>
      
      {stats && (
        <StatsSection>
          <StatsTitle>
            <FaChartBar />
            Your Stats
          </StatsTitle>
          <StatsGrid>
            <StatItem>
              <StatValue>{stats.totalSearches}</StatValue>
              <StatLabel>Searches</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.uniqueTermsCount}</StatValue>
              <StatLabel>Unique Terms</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.totalResults}</StatValue>
              <StatLabel>Images Found</StatLabel>
            </StatItem>
            <StatItem>
              <StatValue>{stats.averageResults}</StatValue>
              <StatLabel>Avg per Search</StatLabel>
            </StatItem>
          </StatsGrid>
        </StatsSection>
      )}
      
      <HistoryList>
        {history.map((search) => (
          <HistoryItem
            key={`${search._id}-${search.timestamp}`}
            onClick={() => handleHistoryClick(search.term)}
          >
            <SearchIcon>
              <FaSearch size={12} />
            </SearchIcon>
            
            <SearchInfo>
              <SearchTerm>{search.term}</SearchTerm>
              <SearchMeta>
                <SearchTime>
                  <FaClock size={10} />
                  {formatTimeAgo(search.timestamp)}
                </SearchTime>
                <ResultCount>{search.resultCount} results</ResultCount>
              </SearchMeta>
            </SearchInfo>
            
            <DeleteButton
              onClick={(e) => {
                e.stopPropagation();
                // Implement delete functionality
              }}
              title="Delete search"
            >
              <FaTrash size={12} />
            </DeleteButton>
          </HistoryItem>
        ))}
      </HistoryList>
    </HistoryContainer>
  );
};

export default SearchHistory;
