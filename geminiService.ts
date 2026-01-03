
import { GoogleGenAI } from "@google/genai";
import { AnalysisResult, BaziInfo } from "./types";

const MODEL_NAME = "gemini-3-pro-preview";

export async function getAIInterpretation(analysis: AnalysisResult): Promise<string> {
  // Use a fresh client instance with named apiKey parameter as per guidelines
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

【分析要求 - 遵照宗师选号逻辑·修订版】：
1. **命业同参**：简述该八字命局，并分析号码磁场与用户的职业性质是否契合。
2. **疾厄避讳**：深度检查号码中的健康风险。特别注意：若用户提到血液、心脑血管或血压问题，检查结尾是否使用了过强的“天医”磁场（天医主血，过强可能导致血压问题），并给出规避建议。
3. **能量三律审视**：
   - 爬升律：分析号码能量是否整体呈上升趋势。
   - 平缓律：相邻磁场能量差是否≤1级。
   - 收官律：最后4位及结尾是否为大吉之象。
4. **全局制化**：评价全盘凶星是否得到有效化解。
5. 给出终极断语。

语气：专业、古雅、富有洞见。
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    // Use .text property directly instead of calling a function
    return response.text || "大师闭关中，请重试。";
  } catch (error) {
    return "解析出错，请检查输入或 API 配置。";
  }
}

export async function getRecommendedNumbers(bazi: BaziInfo, targetLength: string, targetPrefix: string): Promise<string> {
  // Use a fresh client instance with named apiKey parameter as per guidelines
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const prompt = `
你是一位精通《易经》、子平八字与数字能量学的顶级宗师。

【核心任务】：
根据用户的八字命局，【精准推荐 5 个】最能助运、化煞、旺财、利事业、保健康的号码。

【新号码规则限制】：
1. 号码位数：必须是 ${targetLength} 位。
2. 开头数字：必须以 "${targetPrefix}" 中的数字开头。
3. 推荐数量：必须恰好给出 5 个不同的号码。

【宗师选号逻辑·修订版（必须严格执行）】：
一、命业同参
首重职业与命局契合，将行业核心属性（如互联网之“智”、金融之“稳”）以对应数字磁场形式植入。
二、疾厄避讳
结合健康命理，若用户提到血液/血压疾病，严禁天医结尾（13, 31, 68, 86等），改用延年或伏位。
三、能量三律
1. 爬升律：号码磁场能量级从前往后整体呈上升趋势（由弱变强，象征步步登高）。
2. 平缓律：相邻数字组合的能量等级差控制在1级以内，确保运势顺畅不剧烈波动。
3. 收官律：号码末四位必须以吉星主导，结尾必选大吉磁场（天医、延年、生气、伏位）。
四、全局制化
凶星若现，必有强力吉星于其后制化，求阴阳平衡。

【用户信息】：
八字（四柱）：${bazi.rawBazi}
性别：${bazi.gender}
职业性质：${bazi.jobNature || "未提供"}
特别述求：${bazi.otherRequirements || "无"}

【输出格式要求】：
### 1. 【宗师批注：命业与健康合参】
简述该八字、行业特性及健康需求如何通过修订版逻辑达成平衡。

### 2. 【大吉号码推荐（5个）】
*解析其如何遵循“能量三律”与“疾厄避讳”原则：*
1. **[号码1]**：[解析逻辑]
2. **[号码2]**：[解析逻辑]
3. **[号码3]**：[解析逻辑]
4. **[号码4]**：[解析逻辑]
5. **[号码5]**：[解析逻辑]

### 3. 【宗师叮嘱】
说明这组号码如何从全局制化的角度解决了用户在事业或身体上的隐忧。
`;

  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    // Use .text property directly instead of calling a function
    return response.text || "未能生成推荐，请重试。";
  } catch (error) {
    return "生成推荐失败，请稍后再试。";
  }
}
