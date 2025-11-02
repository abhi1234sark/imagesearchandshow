import React from 'react';
import styled from 'styled-components';
import { FaGoogle } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const LoginContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 1rem;
`;

const LoginCard = styled.div`
  background: white;
  border-radius: 16px;
  padding: 3rem;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  width: 100%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  color: #1e293b;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  color: #64748b;
  margin-bottom: 2rem;
  font-size: 1rem;
`;

const LoginButton = styled.button`
  width: 100%;
  padding: 0.875rem 1rem;
  margin-bottom: 1rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const GoogleButton = styled(LoginButton)`
  background-color: #db4437;
  color: white;
  
  &:hover {
    background-color: #c23321;
  }
`;

const FeatureList = styled.div`
  margin-top: 2rem;
  text-align: left;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.75rem;
  color: #64748b;
  font-size: 0.875rem;
`;

const CheckIcon = styled.span`
  color: #10b981;
  margin-right: 0.5rem;
  font-weight: bold;
`;

const LoginPage = () => {
  const { login } = useAuth();

  return (
    <LoginContainer>
      <LoginCard>
        <Title>Image Search & Show</Title>
        <Subtitle>Sign in to search and manage your favorite images</Subtitle>
        
        <GoogleButton onClick={() => login('google')}>
          <FaGoogle size={20} />
          Continue with Google
        </GoogleButton>
        
        <FeatureList>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            Search millions of high-quality images
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            Multi-select and organize favorites
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            View your search history
          </FeatureItem>
          <FeatureItem>
            <CheckIcon>✓</CheckIcon>
            Discover trending searches
          </FeatureItem>
        </FeatureList>
      </LoginCard>
    </LoginContainer>
  );
};

export default LoginPage;
