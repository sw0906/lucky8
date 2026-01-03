
import { StarType, Fortune, StarInfo } from './types';

// Use StarInfo directly since it now includes the level property in types.ts
export const STAR_DATA: Record<StarType, Record<number, StarInfo>> = {
  [StarType.TIANYI]: {
    1: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 1, trait: '财富、聪明', energyLevel: 100, color: 'bg-indigo-600', description: '大财运', pros: [], cons: [] },
    2: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 2, trait: '财富、善良', energyLevel: 80, color: 'bg-indigo-500', description: '偏财运', pros: [], cons: [] },
    3: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 3, trait: '小财、聪明', energyLevel: 60, color: 'bg-indigo-400', description: '稳定财', pros: [], cons: [] },
    4: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 4, trait: '细水长流', energyLevel: 40, color: 'bg-indigo-300', description: '微薄财', pros: [], cons: [] },
  },
  [StarType.SHENGQI]: {
    1: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 1, trait: '贵人、乐天', energyLevel: 100, color: 'bg-green-600', description: '大贵人', pros: [], cons: [] },
    2: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 2, trait: '人缘、好运', energyLevel: 80, color: 'bg-green-500', description: '好人缘', pros: [], cons: [] },
    3: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 3, trait: '随缘、开心', energyLevel: 60, color: 'bg-green-400', description: '小幸运', pros: [], cons: [] },
    4: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 4, trait: '平稳、乐天', energyLevel: 40, color: 'bg-green-300', description: '小人缘', pros: [], cons: [] },
  },
  [StarType.YANNIAN]: {
    1: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 1, trait: '领导、事业', energyLevel: 100, color: 'bg-blue-600', description: '大权柄', pros: [], cons: [] },
    2: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 2, trait: '专业、能力', energyLevel: 80, color: 'bg-blue-500', description: '强能力', pros: [], cons: [] },
    3: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 3, trait: '责任、坚持', energyLevel: 60, color: 'bg-blue-400', description: '有担当', pros: [], cons: [] },
    4: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 4, trait: '执行、保守', energyLevel: 40, color: 'bg-blue-300', description: '稳健型', pros: [], cons: [] },
  },
  [StarType.FUWEI]: {
    1: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 1, trait: '等待、耐心', energyLevel: 80, color: 'bg-teal-600', description: '深思熟虑', pros: [], cons: [] },
    2: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 2, trait: '稳定、守成', energyLevel: 70, color: 'bg-teal-500', description: '细心观察', pros: [], cons: [] },
    3: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 3, trait: '保守、被动', energyLevel: 60, color: 'bg-teal-400', description: '逻辑缜密', pros: [], cons: [] },
    4: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 4, trait: '思考、平凡', energyLevel: 50, color: 'bg-teal-300', description: '一般耐心', pros: [], cons: [] },
  },
  [StarType.WUGUI]: {
    1: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '变化、凶险', energyLevel: 20, color: 'bg-red-700', description: '大变动', pros: [], cons: [] },
    2: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '疑心、才华', energyLevel: 30, color: 'bg-red-600', description: '诡变', pros: [], cons: [] },
    3: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '敏捷、波折', energyLevel: 40, color: 'bg-red-500', description: '不定', pros: [], cons: [] },
    4: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '学习、多疑', energyLevel: 50, color: 'bg-red-400', description: '小才华', pros: [], cons: [] },
  },
  [StarType.LIUSHA]: {
    1: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '桃花、纠纷', energyLevel: 30, color: 'bg-orange-600', description: '重纠结', pros: [], cons: [] },
    2: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '情绪、异性', energyLevel: 40, color: 'bg-orange-500', description: '多愁', pros: [], cons: [] },
    3: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '人际、忧郁', energyLevel: 50, color: 'bg-orange-400', description: '善感', pros: [], cons: [] },
    4: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '审美、魅力', energyLevel: 60, color: 'bg-orange-300', description: '小魅力', pros: [], cons: [] },
  },
  [StarType.HUOHAI]: {
    1: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '口舌、病痛', energyLevel: 20, color: 'bg-yellow-700', description: '招大非', pros: [], cons: [] },
    2: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '脾气、小人', energyLevel: 30, color: 'bg-yellow-600', description: '爱面子', pros: [], cons: [] },
    3: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '铁齿、逞强', energyLevel: 40, color: 'bg-yellow-500', description: '口才好', pros: [], cons: [] },
    4: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '固执、言多', energyLevel: 50, color: 'bg-yellow-400', description: '爱抱怨', pros: [], cons: [] },
  },
  [StarType.JUEMING]: {
    1: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '冲动、孤独', energyLevel: 10, color: 'bg-gray-900', description: '极端跌宕', pros: [], cons: [] },
    2: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '投资、敢拼', energyLevel: 25, color: 'bg-gray-800', description: '大起落', pros: [], cons: [] },
    3: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '敢干、风险', energyLevel: 40, color: 'bg-gray-700', description: '冒险家', pros: [], cons: [] },
    4: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '直爽、单一', energyLevel: 55, color: 'bg-gray-600', description: '小冲动', pros: [], cons: [] },
  }
};

export const NUMBER_MAP: Record<string, { type: StarType; level: number }> = {
  // 天医
  '13': { type: StarType.TIANYI, level: 1 }, '31': { type: StarType.TIANYI, level: 1 },
  '68': { type: StarType.TIANYI, level: 2 }, '86': { type: StarType.TIANYI, level: 2 },
  '49': { type: StarType.TIANYI, level: 3 }, '94': { type: StarType.TIANYI, level: 3 },
  '27': { type: StarType.TIANYI, level: 4 }, '72': { type: StarType.TIANYI, level: 4 },
  // 生气
  '14': { type: StarType.SHENGQI, level: 1 }, '41': { type: StarType.SHENGQI, level: 1 },
  '67': { type: StarType.SHENGQI, level: 2 }, '76': { type: StarType.SHENGQI, level: 2 },
  '39': { type: StarType.SHENGQI, level: 3 }, '93': { type: StarType.SHENGQI, level: 3 },
  '28': { type: StarType.SHENGQI, level: 4 }, '82': { type: StarType.SHENGQI, level: 4 },
  // 延年
  '19': { type: StarType.YANNIAN, level: 1 }, '91': { type: StarType.YANNIAN, level: 1 },
  '78': { type: StarType.YANNIAN, level: 2 }, '87': { type: StarType.YANNIAN, level: 2 },
  '34': { type: StarType.YANNIAN, level: 3 }, '43': { type: StarType.YANNIAN, level: 3 },
  '26': { type: StarType.YANNIAN, level: 4 }, '62': { type: StarType.YANNIAN, level: 4 },
  // 伏位
  '11': { type: StarType.FUWEI, level: 1 }, '22': { type: StarType.FUWEI, level: 1 },
  '88': { type: StarType.FUWEI, level: 2 }, '99': { type: StarType.FUWEI, level: 2 },
  '66': { type: StarType.FUWEI, level: 3 }, '77': { type: StarType.FUWEI, level: 3 },
  '33': { type: StarType.FUWEI, level: 4 }, '44': { type: StarType.FUWEI, level: 4 },
  // 五鬼
  '18': { type: StarType.WUGUI, level: 1 }, '81': { type: StarType.WUGUI, level: 1 },
  '79': { type: StarType.WUGUI, level: 2 }, '97': { type: StarType.WUGUI, level: 2 },
  '36': { type: StarType.WUGUI, level: 3 }, '63': { type: StarType.WUGUI, level: 3 },
  '24': { type: StarType.WUGUI, level: 4 }, '42': { type: StarType.WUGUI, level: 4 },
  // 六煞
  '16': { type: StarType.LIUSHA, level: 1 }, '61': { type: StarType.LIUSHA, level: 1 },
  '47': { type: StarType.LIUSHA, level: 2 }, '74': { type: StarType.LIUSHA, level: 2 },
  '38': { type: StarType.LIUSHA, level: 3 }, '83': { type: StarType.LIUSHA, level: 3 },
  '29': { type: StarType.LIUSHA, level: 4 }, '92': { type: StarType.LIUSHA, level: 4 },
  // 祸害
  '17': { type: StarType.HUOHAI, level: 1 }, '71': { type: StarType.HUOHAI, level: 1 },
  '89': { type: StarType.HUOHAI, level: 2 }, '98': { type: StarType.HUOHAI, level: 2 },
  '46': { type: StarType.HUOHAI, level: 3 }, '64': { type: StarType.HUOHAI, level: 3 },
  '23': { type: StarType.HUOHAI, level: 4 }, '32': { type: StarType.HUOHAI, level: 4 },
  // 绝命
  '12': { type: StarType.JUEMING, level: 1 }, '21': { type: StarType.JUEMING, level: 1 },
  '69': { type: StarType.JUEMING, level: 2 }, '96': { type: StarType.JUEMING, level: 2 },
  '48': { type: StarType.JUEMING, level: 3 }, '84': { type: StarType.JUEMING, level: 3 },
  '37': { type: StarType.JUEMING, level: 4 }, '73': { type: StarType.JUEMING, level: 4 }
};
