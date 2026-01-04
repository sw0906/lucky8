
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, BaziInfo } from "./types";

const MODEL_NAME = "gemini-3-flash-preview";

export async function getAIInterpretation(analysis: AnalysisResult): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const starsString = analysis.pairs
    .filter(p => p.star)
    .map(p => `${p.digits}(${p.star?.name}${p.star?.level}级)`)
    .join(', ');

  const prompt = `
你是一位精通《易经》数字能量学（八星磁场）的命理大师。
用户待测数字：${analysis.originalInput}
磁场明细：${starsString}
计算总能分：${analysis.summary.score}
命主信息：八字(${analysis.bazi?.rawBazi || '未提供'})，性别(${analysis.bazi?.gender})，行业(${analysis.bazi?.jobNature || '通用'})，健康避讳(${analysis.bazi?.healthCondition || '良好'})。
用户特别想要加强的方向：${analysis.bazi?.otherRequirements || '未提供'}

【审视要点】：
1. **核准能量分级**：必须遵循图片标准：天医(13/31-1级, 68/86-2级, 49/94-3级, 72/27-4级)；生气(14/41-1级, 67/76-2级, 93/39-3级, 82/28-4级)；祸害(17/71-1级, 89/98-2级)；绝命(12/21-1级, 69/96-2级, 84/48-3级) 等。
2. **健康避讳（硬性要求）**：若用户提到血压、心脏、血液疾病或失眠，检查结尾是否为【天医】。若是，必须指出天医虽主财但极旺血脉，对该类病情不利，必须避讳。
3. **特别加强诉求**：结合用户想要加强的方向（如财运、贵人、婚姻），点评该号码是否能达成目标。若不能，给出简要修补建议。
4. **宗师金律**：结合“吉星开头、能量爬升（前弱后强）、平缓过渡（落差小）、收官大吉”给出最终断语。

字数150字内，语气古朴威严，断语如刀。
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "天机难测，宗师闭关中。";
  } catch (error) {
    return "解析受阻。";
  }
}

export async function getRecommendedNumbers(bazi: BaziInfo, targetLength: string, targetPrefix: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
你是一位数字能量宗师。
要求：根据八字(${bazi.rawBazi})、行业(${bazi.jobNature || '通用'})、健康(${bazi.healthCondition || '无特殊'})、以及用户想要加强的方向(${bazi.otherRequirements || '通用'})。
生成 5 个【${targetLength}位】且以【${targetPrefix}】开头的开运号码。

【选号金律 - 严格执行】：
1. **健康定制**：若有血压、血液、失眠问题，【绝对禁止】天医（13, 31, 68, 86等）结尾。必须改用【生气】（如67, 76, 39, 93）作为结尾磁场，以平复气血。
2. **吉星开头**：${targetPrefix}后的第一组磁场必须是吉星（天医、延年、生气）。
3. **能量爬升**：能量分布需从弱（3-4级）向强（1-2级）逐渐过渡。
4. **平缓过渡**：相邻磁场能量等级落差 ≤ 1。
5. **收官大吉**：最后4位必须为全吉组合，结尾两位严禁凶星。
6. **对症施治**：重点根据用户“想要加强”的方向配置高等级磁场。

列出号码并简述推荐理由。
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "未能感应到合适吉号。";
  } catch (error) {
    return "推荐生成失败。";
  }
}
