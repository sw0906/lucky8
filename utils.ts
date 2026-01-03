
import { AnalysisResult, AnalysisPair, StarType, Fortune } from './types';
import { NUMBER_MAP, STAR_DATA } from './constants';

export function analyzeNumberSequence(input: string): AnalysisResult {
  const digitsOnly = input.replace(/\D/g, '');
  const processedDigits = digitsOnly.replace(/[05]/g, '');
  const pairs: AnalysisPair[] = [];
  
  for (let i = 0; i < processedDigits.length - 1; i++) {
    const pairStr = processedDigits.substring(i, i + 2);
    const starMapData = NUMBER_MAP[pairStr];
    if (starMapData) {
      pairs.push({
        digits: pairStr,
        star: STAR_DATA[starMapData.type][starMapData.level]
      });
    } else {
      pairs.push({ digits: pairStr, star: null });
    }
  }

  // --- 能量三律校验 ---
  const validStars = pairs.filter(p => p.star).map(p => p.star!);
  
  // 1. 爬升律：整体趋势向上 (level 1 最强，所以 level 应呈递减趋势或保持)
  // 简化判断：后半段平均能级强于前半段
  let climbingLaw = true;
  if (validStars.length >= 2) {
    const mid = Math.floor(validStars.length / 2);
    // Accessing .level is now safe as it's defined in StarInfo in types.ts
    const firstHalfAvg = validStars.slice(0, mid).reduce((acc, cur) => acc + cur.level, 0) / mid;
    const secondHalfAvg = validStars.slice(mid).reduce((acc, cur) => acc + cur.level, 0) / (validStars.length - mid);
    climbingLaw = secondHalfAvg <= firstHalfAvg; // 后半段 level 越小代表能量越强
  }

  // 2. 平缓律：相邻差值 <= 1
  let smoothLaw = true;
  for (let i = 0; i < validStars.length - 1; i++) {
    // Accessing .level is now safe as it's defined in StarInfo in types.ts
    if (Math.abs(validStars[i].level - validStars[i+1].level) > 1) {
      smoothLaw = false;
      break;
    }
  }

  // 3. 收官律：结尾必大吉 (最后一位是天医、延年、生气、伏位，且能级 <= 2)
  let closingLaw = false;
  if (validStars.length > 0) {
    const lastStar = validStars[validStars.length - 1];
    // Accessing .level is now safe as it's defined in StarInfo in types.ts
    closingLaw = lastStar.fortune === Fortune.AUSPICIOUS && lastStar.level <= 2;
  }

  // 计算得分
  let score = 50;
  const auspiciousCount = validStars.filter(s => s.fortune === Fortune.AUSPICIOUS).length;
  const totalStars = validStars.length;
  if (totalStars > 0) {
    score = Math.round((auspiciousCount / totalStars) * 100);
  }

  // 规则扣/加分
  if (climbingLaw) score += 5;
  if (smoothLaw) score += 5;
  if (closingLaw) score += 10; else score -= 20;
  if (digitsOnly.endsWith('0')) score -= 30; // 0结尾大忌

  score = Math.min(Math.max(score, 0), 100);

  return {
    originalInput: digitsOnly,
    pairs,
    summary: {
      auspiciousCount,
      inauspiciousCount: totalStars - auspiciousCount,
      score,
      dominantStar: null // 简化的分析结果
    },
    laws: { climbingLaw, smoothLaw, closingLaw }
  };
}
