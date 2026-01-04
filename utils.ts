
import { AnalysisResult, AnalysisPair, StarType, Fortune } from './types';
import { NUMBER_MAP, STAR_DATA } from './constants';

/**
 * 核心分析逻辑：
 * 1. 识别八星磁场
 * 2. 深度校验能量四律（开头、爬升、平缓、收官）
 */
export function analyzeNumberSequence(input: string): AnalysisResult {
  const digitsOnly = input.replace(/\D/g, '');
  // 基础剥离：5代表加强/凸显，0代表陷阱/空亡
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

  const validStars = pairs.filter(p => p.star).map(p => p.star!);
  
  // --- 能量金律深度校验 ---

  // 1. 吉星开头
  let headAuspicious = true;
  if (validStars.length > 0) {
    headAuspicious = validStars[0].fortune === Fortune.AUSPICIOUS;
  }

  // 2. 能量爬升：趋势向上（等级数字由大变小 4->3->2->1）
  let climbingLaw = true;
  if (validStars.length >= 3) {
    const mid = Math.floor(validStars.length / 2);
    const frontSum = validStars.slice(0, mid).reduce((acc, s) => acc + s.level, 0) / mid;
    const backSum = validStars.slice(mid).reduce((acc, s) => acc + s.level, 0) / (validStars.length - mid);
    // 后端等级平均值应小于或等于前端（越小越强）
    climbingLaw = backSum <= (frontSum + 0.3); 
  }

  // 3. 平缓过渡：相邻能量等级落差 ≤ 1
  let smoothLaw = true;
  for (let i = 0; i < validStars.length - 1; i++) {
    if (Math.abs(validStars[i].level - validStars[i+1].level) > 1.2) {
      smoothLaw = false;
      break;
    }
  }

  // 4. 收官大吉：最后4位主吉，结尾必大吉
  let closingLaw = false;
  if (validStars.length >= 2) {
    const lastTwo = validStars.slice(-2);
    const lastStar = lastTwo[1];
    // 结尾必须是大吉星且高能量
    closingLaw = lastStar.fortune === Fortune.AUSPICIOUS && lastStar.level <= 2;
  }

  // --- 综合得分逻辑 ---
  let score = 50;
  const auspiciousCount = validStars.filter(s => s.fortune === Fortune.AUSPICIOUS).length;
  const totalStars = validStars.length;
  
  if (totalStars > 0) {
    score = Math.round((auspiciousCount / totalStars) * 100);
  }

  // 宗师逻辑权重修正
  if (!headAuspicious) score -= 30; // 吉星开头是基本功
  if (climbingLaw) score += 10;
  if (smoothLaw) score += 5;
  if (closingLaw) score += 20; else score -= 35; // 结尾不好一票否决
  
  // 0结尾空亡惩罚
  if (digitsOnly.endsWith('0')) score -= 45; 

  score = Math.min(Math.max(score, 1), 99);

  return {
    originalInput: digitsOnly,
    pairs,
    summary: {
      auspiciousCount,
      inauspiciousCount: totalStars - auspiciousCount,
      score,
      dominantStar: null
    },
    laws: { climbingLaw, smoothLaw, closingLaw }
  };
}
