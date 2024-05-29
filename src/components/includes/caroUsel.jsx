import React, { useState } from 'react';
import styled from 'styled-components';

const ImageCarousel = ({ images }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <CarouselContainer>
            <ImageButton onClick={handlePrevClick}>&lt;</ImageButton>
            <Image src={"http://localhost:5000/api/v1" + images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} />
            <ImageButton onClick={handleNextClick}>&gt;</ImageButton>
        </CarouselContainer>
    );
};

const CarouselContainer = styled.div`
position: relative;
    width: 100%;
    align-items: center;
    margin: auto;
    padding:20px;
    display: flex;
`;

const Image = styled.img`
  width: 90%;
  height: 100%;
  margin:auto;
  object-fit: fill;
`;

const ImageButton = styled.button`

  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  padding: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 1;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
`;

export default ImageCarousel;
