'use client';

import React, { useState } from 'react';
import { pictures } from '../pictures';
import styles from './styles.module.css';

interface CustomImageProps {
  imageKey: keyof typeof pictures;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}

const CustomImage: React.FC<CustomImageProps> = ({ 
  imageKey, 
  alt, 
  className, 
  width, 
  height 
}) => {
  const image = pictures[imageKey];
  const [isRippling, setIsRippling] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    setIsRippling(true);
    setTimeout(() => setIsRippling(false), 600);
  };
  
  return (
    <div 
      className={`${styles.container} ${className} ripple ${isRippling ? 'active' : ''}`}
      onClick={handleClick}
    >

      {React.cloneElement(image, {
        className: styles.image,
        width: width || image.props.width,
        height: height || image.props.height,
        alt
      })}
    </div>
  );
};

export default CustomImage;
