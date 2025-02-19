'use client';

import React from 'react';
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
  
  return (
    <div className={`${styles.container} ${className}`}>
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
