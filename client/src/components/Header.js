import React from 'react';
import styled from 'styled-components';
import { FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const HeaderContainer = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 0;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const UserSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  background-color: #f1f5f9;
  border-radius: 8px;
`;

const UserAvatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.span`
  font-weight: 500;
  color: #1e293b;
  font-size: 0.875rem;
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #dc2626;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Header = ({ user }) => {
  const { logout } = useAuth();

  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>Image Search & Show</Logo>
        
        <UserSection>
          <UserInfo>
            {user?.avatar ? (
              <UserAvatar src={user.avatar} alt={user.name} />
            ) : (
              <FaUser size={16} color="#64748b" />
            )}
            <UserName>{user?.name}</UserName>
          </UserInfo>
          
          <LogoutButton onClick={logout}>
            <FaSignOutAlt size={14} />
            Logout
          </LogoutButton>
        </UserSection>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
