import React from 'react';
import styled from 'styled-components';
import { FaHeart, FaUser, FaDownload } from 'react-icons/fa';

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
  
  @media (max-width: 640px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.75rem;
  }
`;

const ImageCard = styled.div`
  position: relative;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: scale(1.05);
  }
`;

const CheckboxOverlay = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  z-index: 10;
`;

const Checkbox = styled.input`
  width: 24px;
  height: 24px;
  cursor: pointer;
  accent-color: #3b82f6;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  padding: 1rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
  
  ${ImageCard}:hover & {
    transform: translateY(0);
  }
`;

const ImageInfo = styled.div`
  padding: 1rem;
`;

const ImageTitle = styled.h4`
  font-size: 0.875rem;
  font-weight: 500;
  color: #1e293b;
  margin: 0 0 0.5rem 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ImageMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.75rem;
  color: #64748b;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const LikesInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ActionButton = styled.button`
  position: absolute;
  top: 8px;
  left: 8px;
  background: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 6px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 5;
  
  &:hover {
    background: white;
    transform: scale(1.1);
  }
`;

const ImageGrid = ({ images, selectedImages, onImageSelect }) => {
  const handleImageClick = (imageId) => {
    onImageSelect(imageId);
  };

  const handleDownload = (e, imageUrl) => {
    e.stopPropagation();
    window.open(imageUrl, '_blank');
  };

  if (!images || images.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#64748b' }}>
        No images found. Try a different search term.
      </div>
    );
  }

  return (
    <GridContainer>
      {images.map((image) => (
        <ImageCard
          key={image.id}
          onClick={() => handleImageClick(image.id)}
          style={{
            border: selectedImages.has(image.id) ? '3px solid #3b82f6' : 'none',
            transform: selectedImages.has(image.id) ? 'scale(0.98)' : 'none'
          }}
        >
          <ImageContainer>
            <Image src={image.url} alt={image.alt} />
            
            <CheckboxOverlay>
              <Checkbox
                type="checkbox"
                checked={selectedImages.has(image.id)}
                onChange={() => handleImageClick(image.id)}
                onClick={(e) => e.stopPropagation()}
              />
            </CheckboxOverlay>
            
            <ActionButton
              onClick={(e) => handleDownload(e, image.downloadUrl)}
              title="Download image"
            >
              <FaDownload size={14} color="#3b82f6" />
            </ActionButton>
            
            <ImageOverlay>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                <FaUser size={12} />
                <span style={{ fontSize: '0.75rem' }}>{image.author}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaHeart size={12} />
                <span style={{ fontSize: '0.75rem' }}>{image.likes} likes</span>
              </div>
            </ImageOverlay>
          </ImageContainer>
          
          <ImageInfo>
            <ImageTitle>{image.alt || 'Untitled'}</ImageTitle>
            <ImageMeta>
              <AuthorInfo>
                <FaUser size={10} />
                {image.author}
              </AuthorInfo>
              <LikesInfo>
                <FaHeart size={10} />
                {image.likes}
              </LikesInfo>
            </ImageMeta>
          </ImageInfo>
        </ImageCard>
      ))}
    </GridContainer>
  );
};

export default ImageGrid;
