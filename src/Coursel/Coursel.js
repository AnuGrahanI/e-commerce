import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import styled from 'styled-components';
import ItemsCarousel from 'react-items-carousel';

const noOfItems = 4;
const noOfCards = 1;
const autoPlayDelay = 4000;
const chevronWidth = 40;

const Wrapper = styled.div`
  padding: 0 ${chevronWidth}px;
  max-width: 1000px;
  margin: 0 auto;
`;

const SlideItem = styled.div`
  height: 355px; /* Set the height for the carousel items */
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover; /* Make the image fit within the slide item */
  }
`;

const images = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath:
      'https://www.bigbasket.com/media/uploads/banner_images/hp_bcd_m_bcd_250223_400.jpg',
  },
  {
    label: 'Bird',
    imgPath:
      'https://www.bigbasket.com/media/uploads/banner_images/hp_m_babycare_250223_400.jpg',
  },
  {
    label: 'Bali, Indonesia',
    imgPath:
      'https://www.bigbasket.com/media/uploads/banner_images/hp_m_babycare_250223_400.jpg',
  },
  {
    label: 'Goč, Serbia',
    imgPath:
      'https://www.bigbasket.com/media/uploads/banner_images/hp_m_petstore_250423_400.jpg',
  },
];

const SwipeableTextMobileStepper = () => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveItemIndex((prevActiveIndex) => (prevActiveIndex + 1) % (noOfItems - noOfCards + 1));
    }, autoPlayDelay);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleItemChange = (value) => {
    setActiveItemIndex(value);
  };

  return (
    <Wrapper>
      <ItemsCarousel
        gutter={12}
        numberOfCards={noOfCards}
        activeItemIndex={activeItemIndex}
        requestToChangeActive={handleItemChange}
        rightChevron={<button>{'>'}</button>}
        leftChevron={<button>{'<'}</button>}
        chevronWidth={chevronWidth}
        outsideChevron
      >
        {/* Render carousel items using images array */}
        {images.map((image, index) => (
          <SlideItem key={index}>
            <img src={image.imgPath} alt={image.label} />
          </SlideItem>
        ))}
      </ItemsCarousel>
    </Wrapper>
  );
};

export default SwipeableTextMobileStepper;
