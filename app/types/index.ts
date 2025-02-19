export interface CustomImageProps {
  imageKey: keyof typeof import('../components/pictures').pictures;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
}
