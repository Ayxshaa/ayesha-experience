
export interface Project {
  id: string;
  title: string;
  year: string;
  category: string;
  description: string[];
  theme: string;
  color: string;
  deployedLink?: string;
  githubLink?: string;
}

export enum SceneState {
  HOME = 'HOME',
  PROJECT = 'PROJECT',
  TRANSITION = 'TRANSITION'
}
