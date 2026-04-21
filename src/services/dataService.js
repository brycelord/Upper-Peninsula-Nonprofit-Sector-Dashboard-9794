import supabase from '../supabase/supabase';
import { REAL_UP_ORGANIZATIONS } from './realData';

export const SECTORS = [
  'Arts & Culture',
  'Education',
  'Environment & Animals',
  'Health Services',
  'Human Services',
  'International Affairs',
  'Public & Societal Benefit',
  'Religion Related',
  'Mutual Benefit',
  'Other'
];

export const COUNTIES = [
  { name: 'Marquette County', count: 1142, baseRev: 480000, baseWage: 38500, confidence: 0.98 },
  { name: 'Houghton County', count: 486, baseRev: 310000, baseWage: 36000, confidence: 0.94 },
  { name: 'Chippewa County', count: 392, baseRev: 275000, baseWage: 34500, confidence: 0.92 },
  { name: 'Delta County', count: 345, baseRev: 260000, baseWage: 33000, confidence: 0.90 },
  { name: 'Dickinson County', count: 284, baseRev: 325000, baseWage: 35500, confidence: 0.88 },
  { name: 'Gogebic County', count: 212, baseRev: 195000, baseWage: 32000, confidence: 0.86 },
  { name: 'Menominee County', count: 245, baseRev: 230000, baseWage: 33500, confidence: 0.89 },
  { name: 'Mackinac County', count: 168, baseRev: 210000, baseWage: 32500, confidence: 0.84 },
  { name: 'Iron County', count: 142, baseRev: 185000, baseWage: 31000, confidence: 0.82 },
  { name: 'Alger County', count: 112, baseRev: 175000, baseWage: 31500, confidence: 0.80 },
  { name: 'Baraga County', count: 94, baseRev: 160000, baseWage: 30500, confidence: 0.78 },
  { name: 'Schoolcraft County', count: 86, baseRev: 155000, baseWage: 30000, confidence: 0.75 },
  { name: 'Luce County', count: 58, baseRev: 140000, baseWage: 29000, confidence: 0.70 },
  { name: 'Ontonagon County', count: 64, baseRev: 125000, baseWage: 28500, confidence: 0.65 },
  { name: 'Keweenaw County', count: 32, baseRev: 130000, baseWage: 27500, confidence: 0.62 }
];

export const LEGISLATIVE_DISTRICTS = {
  'Marquette County': { house: '109th', senate: '38th', rep: 'Jenn Hill', senator: 'Ed McBroom' },
  'Houghton County': { house: '110th', senate: '38th', rep: 'Greg Markkanen', senator: 'Ed McBroom' },
  'Chippewa County': { house: '107th', senate: '37th', rep: 'Neil Friske', senator: 'John Damoose' },
  'Delta County': { house: '108th', senate: '38th', rep: 'Dave Prestin', senator: 'Ed McBroom' },
  'Dickinson County': { house: '108th', senate: '38th', rep: 'Dave Prestin', senator: 'Ed McBroom' },
  'Gogebic County': { house: '110th', senate: '38th', rep: 'Greg Markkanen', senator: 'Ed McBroom' },
  'Mackinac County': { house: '107th', senate: '37th', rep: 'Neil Friske', senator: 'John Damoose' },
  'Alger County': { house: '109th', senate: '38th', rep: 'Jenn Hill', senator: 'Ed McBroom' },
  'Baraga County': { house: '110th', senate: '38th', rep: 'Greg Markkanen', senator: 'Ed McBroom' },
  'Iron County': { house: '110th', senate: '38th', rep: 'Greg Markkanen', senator: 'Ed McBroom' },
  'Keweenaw County': { house: '110th', senate: '38th', rep: 'Greg Markkanen', senator: 'Ed McBroom' },
  'Luce County': { house: '107th', senate: '37th', rep: 'Neil Friske', senator: 'John Damoose' },
  'Menominee County': { house: '108th', senate: '38th', rep: 'Dave Prestin', senator: 'Ed McBroom' },
  'Ontonagon County': { house: '110th', senate: '38th', rep: 'Greg Markkanen', senator: 'Ed McBroom' },
  'Schoolcraft County': { house: '109th', senate: '38th', rep: 'Jenn Hill', senator: 'Ed McBroom' }
};

const buildMasterRegistry = () => {
  const registry = new Map();
  const suffixes = ["Group", "Alliance", "Foundation", "Society", "Council", "Project", "Network"];
  
  COUNTIES.forEach(countyMeta => {
    const realOrgs = REAL_UP_ORGANIZATIONS[countyMeta.name] || [];
    realOrgs.forEach(org => {
      registry.set(org.ein, {
        ein: org.ein,
        name: org.name,
        sector: org.sector,
        is_verified: true,
        county: countyMeta.name
      });
    });

    for (let i = 0; i < 150; i++) {
      const sector = SECTORS[i % SECTORS.length];
      const ein = `38-${1000000 + (COUNTIES.indexOf(countyMeta) * 500) + i}`;
      if (!registry.has(ein)) {
        registry.set(ein, {
          ein,
          name: `${countyMeta.name.replace(' County', '')} ${sector} ${suffixes[i % suffixes.length]}`,
          sector,
          is_verified: false,
          county: countyMeta.name
        });
      }
    }
  });
  return Array.from(registry.values());
};

const MASTER_REGISTRY = buildMasterRegistry();

const generateHistoricalData = () => {
  const dataset = [];
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  const officers = ["James Wilson", "Sarah Thompson", "Robert Miller", "Elena Rodriguez", "Michael Chen"];
  const zipPrefix = "498";

  years.forEach(year => {
    MASTER_REGISTRY.forEach(entity => {
      const countyMeta = COUNTIES.find(c => c.name === entity.county);
      const growthFactor = Math.pow(1.04, year - 2012);
      const volatility = 0.8 + Math.random() * 0.4;
      
      const revenue = countyMeta.baseRev * growthFactor * volatility * (entity.is_verified ? 4.5 : 1);
      const expenses = revenue * (0.85 + Math.random() * 0.1);
      const assets = revenue * (3 + Math.random() * 2);
      const liabilities = assets * (0.1 + Math.random() * 0.15);

      dataset.push({
        ...entity,
        year,
        revenue,
        expenses,
        assets,
        liabilities,
        net_assets: assets - liabilities,
        program_rev: revenue * 0.75,
        investment_income: revenue * 0.05,
        employees: Math.floor((12 + Math.random() * 40) * (entity.is_verified ? 3 : 1)),
        wage_avg: countyMeta.baseWage * (0.95 + Math.random() * 0.3),
        filing_type: entity.is_verified ? '990' : (Math.random() > 0.5 ? '990EZ' : '990'),
        address: `${100 + Math.floor(Math.random() * 900)} Main Street`,
        city: entity.county,
        zip: `${zipPrefix}${Math.floor(Math.random() * 90) + 10}`,
        officer_name: officers[Math.floor(Math.random() * officers.length)],
        legislative: LEGISLATIVE_DISTRICTS[entity.county]
      });
    });
  });
  return dataset;
};

export const RAW_NONPROFIT_DATA = generateHistoricalData();

// Pre-index data by year for O(1) year lookups (eliminates 11x full scans)
const DATA_BY_YEAR = RAW_NONPROFIT_DATA.reduce((acc, row) => {
  if (!acc[row.year]) acc[row.year] = [];
  acc[row.year].push(row);
  return acc;
}, {});

// LRU-ish memoization cache keyed by serialized filters. Bounded to prevent growth.
const AGG_CACHE = new Map();
const AGG_CACHE_MAX = 200;
const cacheKey = (f) => `${f.year}|${f.county}|${f.sector}|${f.revenueTier}|${f.fteTier}|${f.verifiedOnly ? 1 : 0}`;

// ENHANCED AGGREGATES TO SUPPORT ALL FILTERS
export const getAggregates = (filters = {}) => {
  const normalized = {
    year: parseInt(filters.year ?? 2022),
    county: filters.county ?? 'All',
    sector: filters.sector ?? 'All',
    revenueTier: filters.revenueTier ?? 'All',
    fteTier: filters.fteTier ?? 'All',
    verifiedOnly: !!filters.verifiedOnly
  };

  const key = cacheKey(normalized);
  const cached = AGG_CACHE.get(key);
  if (cached) return cached;

  const { year, county, sector, revenueTier, fteTier, verifiedOnly } = normalized;
  const source = DATA_BY_YEAR[year] || [];

  let count = 0, revenue = 0, employment = 0, wageSum = 0, assets = 0;

  for (let i = 0; i < source.length; i++) {
    const d = source[i];
    if (county !== 'All' && d.county !== county) continue;
    if (sector !== 'All' && d.sector !== sector) continue;
    if (verifiedOnly && !d.is_verified) continue;

    if (revenueTier !== 'All') {
      const r = d.revenue;
      if (revenueTier === 'Grassroots' && !(r < 50000)) continue;
      else if (revenueTier === 'Small' && !(r >= 50000 && r < 250000)) continue;
      else if (revenueTier === 'Mid-Size' && !(r >= 250000 && r < 1000000)) continue;
      else if (revenueTier === 'Enterprise' && !(r >= 1000000)) continue;
    }

    if (fteTier !== 'All') {
      const e = d.employees;
      if (fteTier === '1-5' && !(e <= 5)) continue;
      else if (fteTier === '6-20' && !(e > 5 && e <= 20)) continue;
      else if (fteTier === '1-20' && !(e <= 20)) continue;
      else if (fteTier === '21-50' && !(e > 20 && e <= 50)) continue;
      else if (fteTier === '51+' && !(e > 50)) continue;
    }

    count++;
    revenue += d.revenue;
    employment += d.employees;
    wageSum += d.wage_avg;
    assets += d.assets;
  }

  const result = {
    count,
    revenue,
    employment: Math.round(employment),
    averageWage: count > 0 ? wageSum / count : 0,
    assets
  };

  if (AGG_CACHE.size >= AGG_CACHE_MAX) {
    const firstKey = AGG_CACHE.keys().next().value;
    AGG_CACHE.delete(firstKey);
  }
  AGG_CACHE.set(key, result);
  return result;
};

export const getTopOrganizations = (sector = 'All', limit = 15) => {
  let filtered = RAW_NONPROFIT_DATA.filter(d => d.year === 2022);
  if (sector !== 'All') filtered = filtered.filter(d => d.sector === sector);
  return filtered.sort((a,b) => b.revenue - a.revenue).slice(0, limit);
};

export const getLegislativeData = (districtType = 'house') => {
  const summary = {};
  RAW_NONPROFIT_DATA.filter(d => d.year === 2022).forEach(org => {
    const dist = districtType === 'house' ? org.legislative.house : org.legislative.senate;
    if (!summary[dist]) summary[dist] = {
      name: dist,
      count: 0,
      employment: 0,
      revenue: 0,
      rep: districtType === 'house' ? org.legislative.rep : org.legislative.senator
    };
    summary[dist].count++;
    summary[dist].employment += org.employees;
    summary[dist].revenue += org.revenue;
  });
  return Object.values(summary);
};

export const getBenchmarkTrends = (metric) => {
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  return years.map(y => {
    const upAvg = getAggregates({ year: y, county: 'All' });
    const stateFactor = metric === 'averageWage' ? 1.15 : 15.5;
    return {
      year: y,
      upAverage: upAvg[metric] / (metric === 'count' ? 15 : 1),
      stateAverage: (upAvg[metric] / (metric === 'count' ? 15 : 1)) * stateFactor
    };
  });
};

const TREND_CACHE = new Map();
export const getTrendData = (metric, county = 'All', sector = 'All') => {
  const k = `${metric}|${county}|${sector}`;
  const hit = TREND_CACHE.get(k);
  if (hit) return hit;
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  const result = years.map(y => ({
    year: y,
    value: getAggregates({ year: y, county, sector })[metric] || 0
  }));
  if (TREND_CACHE.size > 100) TREND_CACHE.delete(TREND_CACHE.keys().next().value);
  TREND_CACHE.set(k, result);
  return result;
};

// Batched version: returns multiple metric trends in a single pass over years.
export const getMultiTrendData = (metrics, county = 'All', sector = 'All') => {
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  const out = {};
  metrics.forEach(m => { out[m] = []; });
  years.forEach(y => {
    const agg = getAggregates({ year: y, county, sector });
    metrics.forEach(m => out[m].push({ year: y, value: agg[m] || 0 }));
  });
  return out;
};

export const getCountyAggregates = (year = 2022) => {
  const populationMap = {
    'Alger County': 9108, 'Baraga County': 8158, 'Chippewa County': 36785,
    'Delta County': 36903, 'Dickinson County': 25947, 'Gogebic County': 14380,
    'Houghton County': 37361, 'Iron County': 11631, 'Keweenaw County': 2046,
    'Luce County': 6302, 'Mackinac County': 10834, 'Marquette County': 66017,
    'Menominee County': 23502, 'Ontonagon County': 5816, 'Schoolcraft County': 8047
  };

  return COUNTIES.map(c => {
    const stats = getAggregates({ year, county: c.name });
    return {
      ...c,
      ...stats,
      population: populationMap[c.name] || 5000,
      density: (stats.count / (populationMap[c.name] || 5000)) * 1000
    };
  });
};

export const getSectorAggregates = (year = 2022) => SECTORS.map(s => ({
  name: s,
  ...getAggregates({ year, sector: s })
}));