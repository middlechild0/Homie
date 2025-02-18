'use client';

import React from 'react';
import Image from 'next/image';
import { pictures } from './pictures';

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
  
  return React.cloneElement(image, {
    className,
    width: width || image.props.width,
    height: height || image.props.height,
    alt
  });
};

export default CustomImage;
