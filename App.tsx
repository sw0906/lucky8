
import React, { useState, useEffect } from 'react';
import { analyzeNumberSequence } from './utils';
import { AnalysisResult, BaziInfo, HistoryItem } from './types';
import { getAIInterpretation, getRecommendedNumbers } from './geminiService';
import { logToCloud, isFirebaseEnabled, fetchCloudLogs } from './firebase';

const App: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [rawBazi, setRawBazi] = useState('');
  const [gender, setGender] = useState('男 (乾造)');
  const [targetLength, setTargetLength] = useState('8');
  const [targetPrefix, setTargetPrefix] = useState('9,8');
  const [jobNature, setJobNature] = useState('');
  const [otherRequirements, setOtherRequirements] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  // Replaced any with the concrete AnalysisResult type
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [aiText, setAiText] = useState('');
  const [recommendations, setRecommendations] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showCopyTip, setShowCopyTip] = useState(false);

  // 管理员相关状态
  const [isAdmin, setIsAdmin] = useState(false);
  const [cloudLogs, setCloudLogs] = useState<any[]>([]);
  const [isLoadingLogs, setIsLoadingLogs] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('master_history');
    if (saved) {
      try { setHistory(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const extractNumbers = (text: string): string[] => {
    const regex = /\b\d{7,12}\b/g;
    const matches = text.match(regex);
    return matches ? Array.from(new Set(matches)).slice(0, 5) : [];
  };

  const handleProcess = async () => {
    if (!phone.trim() || !rawBazi.trim()) {
      alert("请填写完整的八字和当前号码");
      return;
    }
    
    setLoading(true);
    setAiText('宗师正在审视乾坤，校对磁场...');
    setRecommendations('');
    
    const bazi: BaziInfo = { rawBazi, gender, jobNature, otherRequirements };
    const res = analyzeNumberSequence(phone);
    res.bazi = bazi;
    setAnalysis(res);

    try {
      const [interpretation, recs] = await Promise.all([
        getAIInterpretation(res),
        getRecommendedNumbers(bazi, targetLength, targetPrefix)
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
      const updatedHistory = [newItem, ...history].slice(0, 50);
      setHistory(updatedHistory);
      localStorage.setItem('master_history', JSON.stringify(updatedHistory));

      if (isFirebaseEnabled()) {
        setIsSyncing(true);
        const extracted = extractNumbers(recs);
        await logToCloud({
          input: { phone, bazi: rawBazi, gender, job: jobNature, req: otherRequirements },
          output: { score: res.summary.score, recommendedNumbers: extracted, fullText: recs }
        });
        setTimeout(() => setIsSyncing(false), 1500);
      }
    } catch (e) {
      setAiText("计算天机受阻，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowCopyTip(true);
    setTimeout(() => setShowCopyTip(false), 2000);
  };

  const enterAdminMode = () => {
    const pwd = prompt("请输入宗师管理密钥：");
    if (pwd === "admin888") {
      setIsAdmin(true);
      loadCloudLogs();
    } else if (pwd !== null) {
      alert("密钥错误，无权查阅密卷。");
    }
  };

  const loadCloudLogs = async () => {
    setIsLoadingLogs(true);
    const logs = await fetchCloudLogs();
    setCloudLogs(logs);
    setIsLoadingLogs(false);
  };

  return (
    <div className="min-h-screen bg-[#fcf9f2] text-slate-900 pb-20 font-serif">
      <div className={`fixed top-0 left-0 right-0 h-1 z-50 transition-colors ${isSyncing ? 'bg-[#D4AF37] sync-active' : 'bg-transparent'}`}></div>

      <header className="bg-[#8B0000] text-[#D4AF37] py-16 px-4 shadow-2xl text-center border-b-8 border-[#D4AF37] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none select-none" style={{ backgroundImage: 'radial-gradient(#D4AF37 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex justify-center items-center gap-3 mb-4">
            <h1 className="text-6xl font-black tracking-[0.2em] drop-shadow-lg">命理选号 · 宗师详批</h1>
            {isFirebaseEnabled() && (
              <div className="flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full text-[10px] text-[#f3e5ab] border border-white/20">
                <div className={`w-2 h-2 rounded-full ${isSyncing ? 'bg-yellow-400 animate-pulse' : 'bg-green-500'}`}></div>
                云端同步中
              </div>
            )}
          </div>
          <p className="text-xl text-[#f3e5ab] font-light tracking-widest">合参四柱八字 · 洞察八星磁场 · 严格能量三律</p>
          
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={copyShareLink} className="px-8 py-3 bg-[#D4AF37] text-[#8B0000] rounded-full font-bold shadow-lg hover:bg-white transition-all flex items-center gap-2 active:scale-95">
              分享网站
            </button>
          </div>
          {showCopyTip && <p className="mt-2 text-white animate-bounce">链接已复制！</p>}
        </div>
      </header>

      <main className="max-w-6xl mx-auto -mt-12 px-4 relative z-20">
        <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.2)] p-10 border-2 border-[#D4AF37] mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#8B0000] border-l-8 border-[#8B0000] pl-4">壹 · 命主八字</h3>
                  <textarea rows={2} placeholder="例如：甲子 乙丑 丙寅 丁卯" className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#8B0000] bg-gray-50 text-xl font-bold resize-none" value={rawBazi} onChange={(e) => setRawBazi(e.target.value)} />
                  <select className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#8B0000] bg-gray-50 text-lg font-bold" value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option>男 (乾造)</option><option>女 (坤造)</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-[#8B0000] border-l-8 border-[#8B0000] pl-4">贰 · 当前号码</h3>
                  <input type="text" placeholder="待分析的号码" className="w-full px-5 py-4 rounded-2xl border-2 border-gray-100 focus:border-[#8B0000] bg-gray-50 text-2xl font-mono tracking-[0.2em]" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <button onClick={handleProcess} disabled={loading} className={`w-full py-5 rounded-2xl text-[#D4AF37] font-black text-xl shadow-2xl transition-all active:scale-95 ${loading ? 'bg-gray-400' : 'bg-[#8B0000] hover:bg-[#a00000]'}`}>
                    {loading ? '正在开坛做法...' : '合参详批 · 存入云端'}
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-gray-50/50 p-8 rounded-3xl border-2 border-dashed border-gray-200">
               <h3 className="text-2xl font-bold text-[#8B0000] mb-4">叁 · 新号规则</h3>
               <div className="grid grid-cols-2 gap-4">
                  <input type="number" value={targetLength} onChange={(e)=>setTargetLength(e.target.value)} className="p-3 rounded-xl border" placeholder="位数"/>
                  <input type="text" value={targetPrefix} onChange={(e)=>setTargetPrefix(e.target.value)} className="p-3 rounded-xl border" placeholder="开头"/>
               </div>
               <div className="mt-4 space-y-2">
                 <input type="text" placeholder="职业性质" className="w-full p-3 rounded-xl border" value={jobNature} onChange={(e)=>setJobNature(e.target.value)} />
                 <textarea placeholder="健康或愿景述求" className="w-full p-3 rounded-xl border h-20" value={otherRequirements} onChange={(e)=>setOtherRequirements(e.target.value)} />
               </div>
            </div>
          </div>
        </div>

        {analysis && (
          <div className="space-y-12 animate-in fade-in slide-in-from-bottom-12 duration-1000">
            {/* 能量仪表盘 */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-[#8B0000] p-12 rounded-[3rem] text-center shadow-2xl border-4 border-[#D4AF37]">
                <h4 className="text-[#D4AF37] text-xl font-bold mb-4 tracking-widest uppercase">综合能量评分</h4>
                <div className="text-9xl font-black text-white drop-shadow-2xl mb-6">{analysis.summary.score}</div>
                <div className="text-[#f3e5ab] text-xl font-bold">
                  {analysis.summary.score >= 80 ? '【大吉·上上签】' : analysis.summary.score >= 60 ? '【中吉·平安签】' : '【慎用·凶险签】'}
                </div>
              </div>
              <div className="lg:col-span-2 bg-white p-12 rounded-[3rem] shadow-xl border border-gray-100">
                <h3 className="text-3xl font-bold text-[#8B0000] mb-8 border-b pb-6 flex items-center gap-4">
                  三律校核报告
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                  {[
                    { label: '爬升律', status: analysis.laws?.climbingLaw, desc: '能量步步登高' },
                    { label: '平缓律', status: analysis.laws?.smoothLaw, desc: '气流顺而不乱' },
                    { label: '收官律', status: analysis.laws?.closingLaw, desc: '结尾福泽深厚' }
                  ].map((law, idx) => (
                    <div key={idx} className={`p-6 rounded-3xl border-2 flex flex-col items-center text-center ${law.status ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                      <span className={`text-3xl mb-2`}>{law.status ? '✅' : '❌'}</span>
                      <span className="font-bold text-lg">{law.label}</span>
                      <span className="text-xs text-gray-500 mt-1">{law.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="text-gray-700 leading-relaxed text-xl italic whitespace-pre-wrap">{aiText}</div>
              </div>
            </div>

            {recommendations && (
              <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl border-4 border-[#D4AF37]">
                <h3 className="text-3xl font-bold text-[#D4AF37] mb-10 border-b pb-8 border-white/10">宗师定制 · 开运吉号 (已存云端)</h3>
                <div className="text-white/95 leading-relaxed text-xl whitespace-pre-wrap italic">{recommendations}</div>
              </div>
            )}
          </div>
        )}

        {/* 管理员专区 */}
        {isAdmin && (
          <div className="mt-24 bg-slate-900 rounded-[3rem] shadow-2xl border-4 border-[#D4AF37] p-12 text-white">
            <h3 className="text-3xl font-bold text-[#D4AF37] mb-8">云端密卷审计</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="text-[#D4AF37] border-b border-white/5 uppercase tracking-widest font-bold">
                  <tr><th className="py-4">时间</th><th className="py-4">命主/原号</th><th className="py-4">职业/诉求</th><th className="py-4">推荐号/评分</th></tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {cloudLogs.map((log: any) => (
                    <tr key={log.id}>
                      <td className="py-4 text-gray-500">{log.createdAt?.toDate?.().toLocaleString() || '同步中...'}</td>
                      <td className="py-4 font-bold text-[#D4AF37]">{log.input.phone}</td>
                      <td className="py-4 text-xs">{log.input.job}</td>
                      <td className="py-4">
                        <div className="flex gap-1">{log.output.recommendedNumbers.join(', ')}</div>
                        <div className="font-bold">评分：{log.output.score}</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="mt-32 text-center text-gray-400 pb-16">
        <div onClick={enterAdminMode} className="inline-block cursor-default select-none hover:text-[#8B0000]">
          <p className="font-bold tracking-widest uppercase">※ 易道数能量详批系统 ※</p>
        </div>
        <p className="text-xs mt-2">基于爬升律、平缓律、收官律及全局制化原则</p>
      </footer>
    </div>
  );
};

export default App;
