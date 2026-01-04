
import { StarType, Fortune, StarInfo } from './types';

export const STAR_DATA: Record<StarType, Record<number, StarInfo>> = {
  [StarType.TIANYI]: {
    1: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 1, trait: '财富、聪明、婚姻、善良', energyLevel: 100, color: 'bg-indigo-600', description: '顶级财富能量', pros: [], cons: [] },
    2: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 2, trait: '财富、聪明、婚姻、善良', energyLevel: 80, color: 'bg-indigo-500', description: '强效财富能量', pros: [], cons: [] },
    3: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 3, trait: '财富、聪明、婚姻、善良', energyLevel: 60, color: 'bg-indigo-400', description: '稳健财富能量', pros: [], cons: [] },
    4: { name: StarType.TIANYI, fortune: Fortune.AUSPICIOUS, level: 4, trait: '财富、聪明、婚姻、善良', energyLevel: 40, color: 'bg-indigo-300', description: '平稳财富能量', pros: [], cons: [] },
  },
  [StarType.SHENGQI]: {
    1: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 1, trait: '人缘、贵人、开朗、随缘', energyLevel: 100, color: 'bg-green-600', description: '顶级贵人能量', pros: [], cons: [] },
    2: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 2, trait: '人缘、贵人、开朗、随缘', energyLevel: 80, color: 'bg-green-500', description: '强效贵人能量', pros: [], cons: [] },
    3: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 3, trait: '人缘、贵人、开朗、随缘', energyLevel: 60, color: 'bg-green-400', description: '稳健贵人能量', pros: [], cons: [] },
    4: { name: StarType.SHENGQI, fortune: Fortune.AUSPICIOUS, level: 4, trait: '人缘、贵人、开朗、随缘', energyLevel: 40, color: 'bg-green-300', description: '平稳贵人能量', pros: [], cons: [] },
  },
  [StarType.YANNIAN]: {
    1: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 1, trait: '成功、事业、领导、健康', energyLevel: 100, color: 'bg-blue-600', description: '顶级事业能量', pros: [], cons: [] },
    2: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 2, trait: '成功、事业、领导、健康', energyLevel: 80, color: 'bg-blue-500', description: '强效事业能量', pros: [], cons: [] },
    3: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 3, trait: '成功、事业、领导、健康', energyLevel: 60, color: 'bg-blue-400', description: '稳健事业能量', pros: [], cons: [] },
    4: { name: StarType.YANNIAN, fortune: Fortune.AUSPICIOUS, level: 4, trait: '成功、事业、领导、健康', energyLevel: 40, color: 'bg-blue-300', description: '平稳事业能量', pros: [], cons: [] },
  },
  [StarType.FUWEI]: {
    1: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 1, trait: '等待、保守、被动、思考', energyLevel: 80, color: 'bg-teal-600', description: '顶级稳健能量', pros: [], cons: [] },
    2: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 2, trait: '等待、保守、被动、思考', energyLevel: 70, color: 'bg-teal-500', description: '强效稳健能量', pros: [], cons: [] },
    3: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 3, trait: '等待、保守、被动、思考', energyLevel: 60, color: 'bg-teal-400', description: '稳健思考能量', pros: [], cons: [] },
    4: { name: StarType.FUWEI, fortune: Fortune.AUSPICIOUS, level: 4, trait: '等待、保守、被动、思考', energyLevel: 50, color: 'bg-teal-300', description: '平稳思考能量', pros: [], cons: [] },
  },
  [StarType.WUGUI]: {
    1: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '凶险、智慧、才华、变化', energyLevel: 20, color: 'bg-red-700', description: '大变动能量', pros: [], cons: [] },
    2: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '凶险、智慧、才华、变化', energyLevel: 30, color: 'bg-red-600', description: '诡变能量', pros: [], cons: [] },
    3: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '凶险、智慧、才华、变化', energyLevel: 40, color: 'bg-red-500', description: '动荡能量', pros: [], cons: [] },
    4: { name: StarType.WUGUI, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '凶险、智慧、才华、变化', energyLevel: 50, color: 'bg-red-400', description: '波折能量', pros: [], cons: [] },
  },
  [StarType.LIUSHA]: {
    1: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '桃花、人际、情绪、纠葛', energyLevel: 30, color: 'bg-orange-600', description: '重纠结能量', pros: [], cons: [] },
    2: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '桃花、人际、情绪、纠葛', energyLevel: 40, color: 'bg-orange-500', description: '多愁能量', pros: [], cons: [] },
    3: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '桃花、人际、情绪、纠葛', energyLevel: 50, color: 'bg-orange-400', description: '善感能量', pros: [], cons: [] },
    4: { name: StarType.LIUSHA, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '桃花、人际、情绪、纠葛', energyLevel: 60, color: 'bg-orange-300', description: '忧郁能量', pros: [], cons: [] },
  },
  [StarType.HUOHAI]: {
    1: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '病痛、口才、铁齿、暴躁', energyLevel: 20, color: 'bg-yellow-700', description: '极强口舌能量', pros: [], cons: [] },
    2: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '病痛、口才、铁齿、暴躁', energyLevel: 30, color: 'bg-yellow-600', description: '招非能量', pros: [], cons: [] },
    3: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '病痛、口才、铁齿、暴躁', energyLevel: 40, color: 'bg-yellow-500', description: '逞强能量', pros: [], cons: [] },
    4: { name: StarType.HUOHAI, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '病痛、口才、铁齿、暴躁', energyLevel: 50, color: 'bg-yellow-400', description: '固执能量', pros: [], cons: [] },
  },
  [StarType.JUEMING]: {
    1: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 1, trait: '孤独、投资、极端、直爽', energyLevel: 10, color: 'bg-gray-900', description: '极速波折能量', pros: [], cons: [] },
    2: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 2, trait: '孤独、投资、极端、直爽', energyLevel: 25, color: 'bg-gray-800', description: '大起大落能量', pros: [], cons: [] },
    3: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 3, trait: '孤独、投资、极端、直爽', energyLevel: 40, color: 'bg-gray-700', description: '冒险能量', pros: [], cons: [] },
    4: { name: StarType.JUEMING, fortune: Fortune.INAUSPICIOUS, level: 4, trait: '孤独、投资、极端、直爽', energyLevel: 55, color: 'bg-gray-600', description: '直率冲突能量', pros: [], cons: [] },
  }
};

export const NUMBER_MAP: Record<string, { type: StarType; level: number }> = {
  // 天医 财富、聪明、婚姻、善良
  '13': { type: StarType.TIANYI, level: 1 }, '31': { type: StarType.TIANYI, level: 1 },
  '68': { type: StarType.TIANYI, level: 2 }, '86': { type: StarType.TIANYI, level: 2 },
  '49': { type: StarType.TIANYI, level: 3 }, '94': { type: StarType.TIANYI, level: 3 },
  '72': { type: StarType.TIANYI, level: 4 }, '27': { type: StarType.TIANYI, level: 4 },
  // 生气 人缘、贵人、开朗、随缘
  '14': { type: StarType.SHENGQI, level: 1 }, '41': { type: StarType.SHENGQI, level: 1 },
  '67': { type: StarType.SHENGQI, level: 2 }, '76': { type: StarType.SHENGQI, level: 2 },
  '93': { type: StarType.SHENGQI, level: 3 }, '39': { type: StarType.SHENGQI, level: 3 },
  '82': { type: StarType.SHENGQI, level: 4 }, '28': { type: StarType.SHENGQI, level: 4 },
  // 延年 成功、事业、领导、健康
  '19': { type: StarType.YANNIAN, level: 1 }, '91': { type: StarType.YANNIAN, level: 1 },
  '87': { type: StarType.YANNIAN, level: 2 }, '78': { type: StarType.YANNIAN, level: 2 },
  '43': { type: StarType.YANNIAN, level: 3 }, '34': { type: StarType.YANNIAN, level: 3 },
  '26': { type: StarType.YANNIAN, level: 4 }, '62': { type: StarType.YANNIAN, level: 4 },
  // 五鬼 凶险、智慧、才华、变化
  '18': { type: StarType.WUGUI, level: 1 }, '81': { type: StarType.WUGUI, level: 1 },
  '97': { type: StarType.WUGUI, level: 2 }, '79': { type: StarType.WUGUI, level: 2 },
  '36': { type: StarType.WUGUI, level: 3 }, '63': { type: StarType.WUGUI, level: 3 },
  '42': { type: StarType.WUGUI, level: 4 }, '24': { type: StarType.WUGUI, level: 4 },
  // 六煞 桃花、人际、情绪、纠葛
  '16': { type: StarType.LIUSHA, level: 1 }, '61': { type: StarType.LIUSHA, level: 1 },
  '74': { type: StarType.LIUSHA, level: 2 }, '47': { type: StarType.LIUSHA, level: 2 },
  '38': { type: StarType.LIUSHA, level: 3 }, '83': { type: StarType.LIUSHA, level: 3 },
  '92': { type: StarType.LIUSHA, level: 4 }, '29': { type: StarType.LIUSHA, level: 4 },
  // 祸害 病痛、口才、铁齿、暴躁
  '17': { type: StarType.HUOHAI, level: 1 }, '71': { type: StarType.HUOHAI, level: 1 },
  '89': { type: StarType.HUOHAI, level: 2 }, '98': { type: StarType.HUOHAI, level: 2 },
  '64': { type: StarType.HUOHAI, level: 3 }, '46': { type: StarType.HUOHAI, level: 3 },
  '32': { type: StarType.HUOHAI, level: 4 }, '23': { type: StarType.HUOHAI, level: 4 },
  // 绝命 孤独、投资、极端、直爽
  '12': { type: StarType.JUEMING, level: 1 }, '21': { type: StarType.JUEMING, level: 1 },
  '69': { type: StarType.JUEMING, level: 2 }, '96': { type: StarType.JUEMING, level: 2 },
  '84': { type: StarType.JUEMING, level: 3 }, '48': { type: StarType.JUEMING, level: 3 },
  '73': { type: StarType.JUEMING, level: 4 }, '37': { type: StarType.JUEMING, level: 4 },
  // 伏位 等待、保守、被动、思考
  '11': { type: StarType.FUWEI, level: 1 }, '22': { type: StarType.FUWEI, level: 1 },
  '99': { type: StarType.FUWEI, level: 2 }, '88': { type: StarType.FUWEI, level: 2 },
  '77': { type: StarType.FUWEI, level: 3 }, '66': { type: StarType.FUWEI, level: 3 },
  '44': { type: StarType.FUWEI, level: 4 }, '33': { type: StarType.FUWEI, level: 4 }
};
