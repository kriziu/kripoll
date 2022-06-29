export declare global {
  interface PollConfiguration {
    title: string;
    options: string[];
    duplicationCheck: 'IP' | 'COOKIE' | 'NONE';
    description?: string;
    allowMultipleVotes?: boolean;
    allowCreateOption?: boolean;
    requireName?: boolean;
    endDate?: Date;
    passwordToResults?: string;
  }
}
