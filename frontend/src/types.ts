export interface Guild {
  id: number;
  name: string;
  kingdom: string;
  max_capacity: number;
}

export interface Adventurer {
  id: number;
  name: string;
  class_type: 'MAGE' | 'WARRIOR' | 'ROGUE' | 'CLERIC';
  level: number;
  status: 'ACTIVE' | 'MISSION' | 'DEAD';
  guild: number;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}