
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, BaziInfo } from "./types";

// 使用推荐的 Gemini 3 Flash 模型，适用于此类文本分析任务
const MODEL_NAME = "gemini-3-flash-preview";

export async function getAIInterpretation(analysis: AnalysisResult): Promise<string> {
  // 严格按照规范初始化
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const starsString = analysis.pairs
    .filter(p => p.star)
    .map(p => `${p.digits}(${p.star?.name})`)
    .join(', ');

  const baziContext = analysis.bazi 
    ? `用户提供的八字（年柱 月柱 日柱 时柱）：${analysis.bazi.rawBazi}
       性别：${analysis.bazi.gender}
       职业性质：${analysis.bazi.jobNature || "未提供"}
       特别述求：${analysis.bazi.otherRequirements || "无"}`
    : "（仅分析数字能量）";

  const prompt = `
你是一位精通《易经》、子平八字与数字能量学的命理宗师。

【用户信息】：
${baziContext}
当前待分析号码：${analysis.originalInput}
数字磁场解析：${starsString}

【分析要求】：
1. **命业同参**：简述该八字命局，并分析号码磁场与用户的职业性质是否契合。
2. **疾厄避讳**：深度检查号码中的健康风险。特别注意血压、心脑血管风险。
3. **能量三律审视**：
   - 爬升律：分析号码能量是否整体呈上升趋势。
   - 平缓律：相邻磁场能量差是否≤1级。
   - 收官律：最后4位及结尾是否为大吉之象。
4. **全局制化**：评价全盘凶星是否得到有效化解。
5. 给出终极断语。

语气：专业、古雅、简洁。
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
      config: {
        thinkingConfig: { thinkingBudget: 0 } // 禁用思考以获得更快的响应
      }
    });
    // 严格使用 .text 属性提取内容
    return response.text || "大师闭关中，请重试。";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "解析出错，请检查输入或 API 配置。";
  }
}

export async function getRecommendedNumbers(bazi: BaziInfo, targetLength: string, targetPrefix: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
你是一位精通《易经》与数字能量学的命理宗师。
根据用户八字：${bazi.rawBazi}，性别：${bazi.gender}，职业：${bazi.jobNature}。
精准推荐 5 个【${targetLength}位】且以【${targetPrefix}】开头的吉祥号码。
要求遵循：爬升律（能量由弱变强）、平缓律（过渡平滑）、收官律（结尾必吉）。
请直接输出推荐结果。
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "未能生成推荐，请重试。";
  } catch (error) {
    return "生成推荐失败，请稍后再试。";
  }
}
