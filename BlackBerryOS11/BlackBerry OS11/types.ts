export enum AppID {
  HOME = 'HOME',
  HUB = 'HUB',
  NEURAL = 'NEURAL',
  ASSISTANT = 'ASSISTANT',
  SETTINGS = 'SETTINGS'
}

export interface Notification {
  id: string;
  source: 'BBM' | 'EMAIL' | 'SYSTEM' | 'NEURAL';
  title: string;
  preview: string;
  time: string;
  read: boolean;
}

export interface BrainWaveData {
  time: string;
  alpha: number;
  beta: number;
  theta: number;
  delta: number;
}
