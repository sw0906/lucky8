
import React, { useState, useEffect } from 'react';
import { analyzeNumberSequence } from './utils';
import { AnalysisResult, BaziInfo, HistoryItem, StarType, Fortune } from './types';
import { getAIInterpretation, getRecommendedNumbers } from './geminiService';
import { logToCloud, isFirebaseEnabled } from './firebase';
import { NUMBER_MAP, STAR_DATA } from './constants';

const App: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [rawBazi, setRawBazi] = useState('');
  const [gender, setGender] = useState('男 (乾造)');
  const [targetLength, setTargetLength] = useState('11');
  const [targetPrefix, setTargetPrefix] = useState('139');
  const [jobNature, setJobNature] = useState('');
  const [healthCondition, setHealthCondition] = useState('');
  const [otherRequirements, setOtherRequirements] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [aiText, setAiText] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('master_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const handleProcess = async () => {
    if (!phone.trim()) {
      alert("请输入待测数字");
      return;
    }
    
    setLoading(true);
    setAiText('宗师正在审视乾坤，校对磁场...');
    setRecommendations('');
    
    const bazi: BaziInfo = { rawBazi, gender, jobNature, healthCondition, otherRequirements };
    const res = analyzeNumberSequence(phone);
    res.bazi = bazi;
    setAnalysis(res);

    try {
      const [interpretation, recs] = await Promise.all([
        getAIInterpretation(res),
        rawBazi ? getRecommendedNumbers(bazi, targetLength, targetPrefix) : Promise.resolve('')
      ]);
      setAiText(interpretation);
      setRecommendations(recs);

      const newItem: HistoryItem = {
        id: Date.now().toString(),
        timestamp: Date.now(),
        inputNumber: phone,
        score: res.summary.score,
        recommendations: recs
      };
      const updatedHistory = [newItem, ...history].slice(0, 10);
      setHistory(updatedHistory);
      localStorage.setItem('master_history', JSON.stringify(updatedHistory));

      if (isFirebaseEnabled()) {
        setIsSyncing(true);
        await logToCloud({
          input: { phone, bazi: rawBazi || "未提供", gender, job: jobNature || "未提供", req: otherRequirements || "未提供" },
          output: { score: res.summary.score, recommendedNumbers: [], fullText: interpretation }
        });
        setTimeout(() => setIsSyncing(false), 1500);
      }
    } catch (e) {
      setAiText("计算天机受阻，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  const isAuspicious = (analysis?.summary.score || 0) >= 60;

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-slate-900 pb-20 font-serif">
      <div className={`fixed top-0 left-0 right-0 h-1.5 z-50 transition-colors ${isSyncing ? 'bg-yellow-500 sync-active' : 'bg-transparent'}`}></div>

      <header className="bg-[#8B0000] text-[#D4AF37] py-12 px-4 shadow-2xl text-center border-b-[6px] border-[#D4AF37] relative">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black tracking-[0.15em] mb-2">数字能量分析大师</h1>
          <p className="text-[#f3e5ab] tracking-widest text-sm opacity-80 uppercase">合参四柱八字 · 严守宗师选号金律</p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto -mt-10 px-4 relative z-20">
        <div className="bg-white rounded-[2.5rem] shadow-2xl p-8 border-2 border-[#D4AF37] mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* 左侧：输入区域 */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-bold text-[#8B0000] mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#8B0000] rounded-full"></span>
                  壹 · 命主及特殊诉求
                </h3>
                <textarea 
                  rows={2} 
                  placeholder="请输入八字 (如: 庚辰 戊子 癸卯 丁巳)" 
                  className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#8B0000] bg-white text-lg font-bold outline-none placeholder:font-normal shadow-sm mb-3" 
                  value={rawBazi} 
                  onChange={(e) => setRawBazi(e.target.value)} 
                />
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <select 
                    className="px-4 py-3 rounded-xl border-2 border-gray-100 bg-white font-bold outline-none text-[#8B0000] shadow-sm cursor-pointer"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option>男 (乾造)</option><option>女 (坤造)</option>
                  </select>
                  <input 
                    type="text" 
                    placeholder="健康避讳 (如: 血压高)" 
                    className="px-4 py-3 rounded-xl border-2 border-gray-100 bg-white font-bold outline-none text-red-700 shadow-sm placeholder:text-red-200 placeholder:font-normal" 
                    value={healthCondition}
                    onChange={(e) => setHealthCondition(e.target.value)}
                  />
                </div>
                {/* 想要加强的输入框 */}
                <input 
                  type="text" 
                  placeholder="想要加强 (如: 财运、婚姻、贵人)" 
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-100 focus:border-[#8B0000] bg-white font-bold outline-none shadow-sm text-indigo-700 placeholder:text-gray-300 placeholder:font-normal" 
                  value={otherRequirements}
                  onChange={(e) => setOtherRequirements(e.target.value)}
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-[#8B0000] mb-3 flex items-center gap-2">
                  <span className="w-1 h-5 bg-[#8B0000] rounded-full"></span>
                  贰 · 待测数字分析
                </h3>
                <input 
                  type="text" 
                  placeholder="输入手机号/车牌/门牌" 
                  className="w-full px-5 py-5 rounded-2xl border-2 border-gray-100 focus:border-[#8B0000] outline-none bg-white text-3xl font-mono tracking-widest text-center text-[#8B0000] shadow-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                />
              </div>

              <button 
                onClick={handleProcess} 
                disabled={loading}
                className={`w-full py-5 rounded-2xl text-[#D4AF37] font-black text-xl shadow-lg transition-all active:scale-95 ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#8B0000] hover:bg-black'}`}
              >
                {loading ? '宗师详批中...' : '开始详批'}
              </button>
            </div>

            {/* 右侧：宗师规则看板 */}
            <div className="bg-[#fdfbf7] p-8 rounded-[2rem] border-2 border-dashed border-gray-200 relative overflow-hidden">
               <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                 <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor"><path d="M50 0 L100 50 L50 100 L0 50 Z"/></svg>
               </div>
               
               <h3 className="text-lg font-bold text-[#8B0000] mb-4 flex items-center gap-2">
                 <span className="w-1 h-5 bg-[#8B0000] rounded-full"></span>
                 宗师选号金律
               </h3>

               <div className="bg-[#fff9e6] border border-[#f3e5ab] p-5 rounded-xl mb-6 shadow-sm">
                 <ul className="text-xs space-y-3 text-[#856404] leading-relaxed">
                   <li className="flex items-start gap-2">
                     <span className="font-black text-[#8B0000]">● 吉星开头：</span>
                     <span>第一组磁场严禁出现凶星（五鬼、绝命、祸害、六煞）。</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="font-black text-[#8B0000]">● 能量爬升：</span>
                     <span>磁场分布由弱变强，象征运势步步高升，前程锦绣。</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="font-black text-[#8B0000]">● 平缓过渡：</span>
                     <span>相邻磁场能量等级差 ≤ 1，确保气场稳健，不生波折。</span>
                   </li>
                   <li className="flex items-start gap-2">
                     <span className="font-black text-[#8B0000]">● 吉星收尾：</span>
                     <span>最后4位必须主吉，且结尾两位严选顶级大吉磁场。</span>
                   </li>
                   <li className="flex items-start gap-2 border-t border-[#f3e5ab] pt-2 mt-2">
                     <span className="font-black text-indigo-700">★ 对症施治：</span>
                     <span>职业须匹配（如IT重延年）；<span className="text-red-700 font-black">健康须避讳</span>（如高血压严禁天医结尾，宜用生气）。</span>
                   </li>
                 </ul>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">推荐位数</label>
                    <input type="number" value={targetLength} onChange={(e)=>setTargetLength(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold outline-none focus:border-[#8B0000]" />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">固定开头</label>
                    <input type="text" value={targetPrefix} onChange={(e)=>setTargetPrefix(e.target.value)} className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold outline-none focus:border-[#8B0000]" />
                  </div>
               </div>
               <div className="space-y-4">
                 <div>
                   <label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">所属行业</label>
                   <input type="text" placeholder="如: 互联网、贸易、公务员" className="w-full p-3 rounded-xl border border-gray-200 bg-white font-bold outline-none focus:border-[#8B0000]" value={jobNature} onChange={(e)=>setJobNature(e.target.value)} />
                 </div>
               </div>
            </div>
          </div>
        </div>

        {analysis && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
            {/* 结果呈现 */}
            <div className={`relative overflow-hidden rounded-[3rem] p-10 shadow-2xl border-4 ${isAuspicious ? 'bg-indigo-950 border-indigo-400' : 'bg-red-950 border-red-400'}`}>
              <div className="absolute top-0 right-0 p-8 opacity-10 text-[14rem] font-black text-white leading-none select-none">
                {isAuspicious ? '吉' : '凶'}
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="text-center">
                   <div className="text-white/40 text-xs tracking-widest mb-1 uppercase font-bold">磁场总能值</div>
                   <div className="text-9xl font-black text-white drop-shadow-2xl">{analysis.summary.score}</div>
                </div>
                
                <div className="flex-1">
                  <div className={`inline-block px-5 py-1.5 rounded-full text-sm font-black mb-4 ${isAuspicious ? 'bg-indigo-400 text-indigo-950 shadow-[0_0_20px_rgba(129,140,248,0.5)]' : 'bg-yellow-400 text-red-950 shadow-[0_0_20px_rgba(250,204,21,0.5)]'}`}>
                    {isAuspicious ? '【乾坤定鼎 · 大吉之象】' : '【气场驳杂 · 避之则吉】'}
                  </div>
                  <h3 className="text-2xl font-bold text-[#f3e5ab] mb-4">宗师定断：</h3>
                  <div className="text-white/90 text-lg leading-relaxed whitespace-pre-wrap italic bg-white/5 p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-inner">
                    {aiText}
                  </div>
                </div>
              </div>
            </div>

            {/* 磁场明细 */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border border-gray-100">
              <h4 className="text-[#8B0000] font-bold mb-6 flex items-center gap-2">
                <span className="w-1.5 h-6 bg-[#8B0000] rounded-full"></span>
                详细磁场透视
              </h4>
              <div className="flex flex-wrap gap-4">
                {analysis.pairs.map((pair, i) => (
                  <div key={i} className={`px-6 py-5 rounded-3xl border-2 transition-all hover:scale-110 shadow-sm ${pair.star ? 'border-gray-50 bg-gray-50' : 'border-dashed border-gray-100 opacity-30'}`}>
                    <div className="text-3xl font-mono font-black text-gray-800 tracking-tighter mb-1">{pair.digits}</div>
                    <div className={`text-[10px] font-black px-2 py-0.5 rounded-md inline-block ${pair.star?.fortune === '吉' ? 'bg-indigo-100 text-indigo-700' : 'bg-red-100 text-red-700'}`}>
                      {pair.star?.name || '平'} {pair.star?.level}级
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {recommendations && (
              <div className="bg-slate-900 p-10 rounded-[3rem] shadow-2xl border-4 border-[#D4AF37] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-48 h-48 bg-[#D4AF37] opacity-5 -mr-20 -mt-20 rounded-full"></div>
                <h3 className="text-2xl font-bold text-[#D4AF37] mb-6 border-b pb-4 border-white/10 flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-[#D4AF37]"></span>
                  宗师开运吉数推荐
                </h3>
                <div className="text-white/90 text-xl leading-loose whitespace-pre-wrap italic font-light">
                  {recommendations}
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      <footer className="mt-20 text-center px-4 pb-12">
        <p className="text-gray-400 text-[10px] font-bold tracking-[0.4em] uppercase">※ 易道数能量详批系统 · 承天象以应人情 ※</p>
      </footer>
    </div>
  );
};

export default App;
