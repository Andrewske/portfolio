// Common component prop types

export interface BaseComponentProps {
  className?: string;
}

export interface WithChildren {
  children: React.ReactNode;
}

export interface BackToHomeProps extends BaseComponentProps {
  section?: string;
  githubLink?: string;
}

export interface ProjectLayoutProps extends WithChildren {
  githubLink?: string;
}

export interface ContainerProps extends WithChildren, BaseComponentProps {}

export interface RowProps extends WithChildren, BaseComponentProps {
  id: string;
}

export interface TypingAnimationProps {
  text: string;
  speed?: number;
}

// Experience data structure for lib files
export interface ExperienceItem {
  className: string;
  text: Array<[string, string]>;
}