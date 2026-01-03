
export enum StarType {
  TIANYI = '天医',
  SHENGQI = '生气',
  YANNIAN = '延年',
  FUWEI = '伏位',
  WUGUI = '五鬼',
  LIUSHA = '六煞',
  HUOHAI = '祸害',
  JUEMING = '绝命'
}

export enum Fortune {
  AUSPICIOUS = '吉',
  INAUSPICIOUS = '凶'
}

export interface StarInfo {
  name: StarType;
  fortune: Fortune;
  trait: string;
  energyLevel: number;
  /**
   * The energy level rank of the star (1-4). 
   * Added to fix property access errors in utils.ts.
   */
  level: number;
  description: string;
  pros: string[];
  cons: string[];
  color: string;
}

export interface AnalysisPair {
  digits: string;
  star: StarInfo | null;
}

export interface BaziInfo {
  rawBazi: string; 
  gender: string;
  jobNature?: string; 
  otherRequirements?: string; 
}

export interface AnalysisResult {
  originalInput: string;
  bazi?: BaziInfo;
  pairs: AnalysisPair[];
  summary: {
    auspiciousCount: number;
    inauspiciousCount: number;
    score: number;
    dominantStar: StarType | null;
  };
  /**
   * The state of the three energy laws for the analyzed sequence.
   * Added to match the structure returned by analyzeNumberSequence.
   */
  laws: {
    climbingLaw: boolean;
    smoothLaw: boolean;
    closingLaw: boolean;
  };
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  inputNumber: string;
  score: number;
  recommendations: string;
}
