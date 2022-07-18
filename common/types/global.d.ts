export declare global {
  interface PollConfiguration {
    title: string;
    answers: string[];
    duplicationCheck: 'IP' | 'COOKIE' | 'NONE';
    description?: string;
    allowMultipleAnswers?: boolean;
    allowCreateAnswer?: boolean;
    requireName?: boolean;
    endDate?: Date;
    passwordToResults?: string;
  }

  interface NameVoted {
    name: string;
    voted: number[];
  }
}
