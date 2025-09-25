// Common component prop types

export interface BaseComponentProps {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface TypingAnimationProps {
  text: string;
  speed?: number;
}