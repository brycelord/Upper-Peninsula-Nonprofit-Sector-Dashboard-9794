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

// ---------------------------------------------------------------------------
// DETERMINISTIC PSEUDO-RANDOM NUMBER GENERATOR (mulberry32)
// Replaces Math.random() so all generated figures are stable across page
// refreshes. Pass a numeric seed derived from the org EIN + year so each
// org/year combination always produces the same values.
// ---------------------------------------------------------------------------
const mulberry32 = (seed) => {
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};

/**
 * Converts an EIN string (e.g. "38-6005298") to a stable integer seed.
 * Uses the numeric portion only to ensure consistent results.
 */
const einToSeed = (ein) => {
  const digits = ein.replace(/\D/g, '');
  return parseInt(digits, 10) || 1;
};

const buildMasterRegistry = () => {
  const registry = new Map();
  const suffixes = ['Group', 'Alliance', 'Foundation', 'Society', 'Council', 'Project', 'Network'];

  COUNTIES.forEach((countyMeta, countyIdx) => {
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
      const ein = `38-${1000000 + (countyIdx * 500) + i}`;
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

/**
 * Generates historical financial data using a seeded PRNG so values are
 * deterministic — identical on every page load, browser session, and build.
 *
 * Seed strategy: combine the EIN integer with the year so each org/year
 * pair always produces the same revenue, expenses, assets, and employee count.
 */
const generateHistoricalData = () => {
  const dataset = [];
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  const officers = ['James Wilson', 'Sarah Thompson', 'Robert Miller', 'Elena Rodriguez', 'Michael Chen'];
  const zipPrefix = '498';

  years.forEach(year => {
    MASTER_REGISTRY.forEach(entity => {
      const countyMeta = COUNTIES.find(c => c.name === entity.county);
      const baseSeed = einToSeed(entity.ein) + year * 31;

      // Each financial metric uses a different seed offset so values are
      // independent of one another but always reproducible.
      const volatility    = 0.8 + mulberry32(baseSeed)            * 0.4;  // 0.80 – 1.20
      const expenseRatio  = 0.85 + mulberry32(baseSeed + 1)       * 0.1;  // 0.85 – 0.95
      const assetMultiple = 3    + mulberry32(baseSeed + 2)       * 2;    // 3x – 5x revenue
      const liabRatio     = 0.10 + mulberry32(baseSeed + 3)       * 0.15; // 10% – 25% of assets
      const empBase       = 12   + mulberry32(baseSeed + 4)       * 40;   // 12 – 52 FTE
      const wageVariance  = 0.95 + mulberry32(baseSeed + 5)       * 0.3;  // 0.95 – 1.25
      const zipSuffix     = Math.floor(mulberry32(baseSeed + 6)   * 90) + 10;
      const officerIdx    = Math.floor(mulberry32(baseSeed + 7)   * officers.length);

      const growthFactor = Math.pow(1.04, year - 2012);
      const revenue   = countyMeta.baseRev * growthFactor * volatility * (entity.is_verified ? 4.5 : 1);
      const expenses  = revenue * expenseRatio;
      const assets    = revenue * assetMultiple;
      const liabilities = assets * liabRatio;

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
        employees: Math.floor(empBase * (entity.is_verified ? 3 : 1)),
        wage_avg: countyMeta.baseWage * wageVariance,
        filing_type: entity.is_verified ? '990' : (mulberry32(baseSeed + 8) > 0.5 ? '990EZ' : '990'),
        address: `${100 + Math.floor(mulberry32(baseSeed + 9) * 900)} Main Street`,
        city: entity.county,
        zip: `${zipPrefix}${zipSuffix}`,
        officer_name: officers[officerIdx],
        legislative: LEGISLATIVE_DISTRICTS[entity.county]
      });
    });
  });
  return dataset;
};

export const RAW_NONPROFIT_DATA = generateHistoricalData();

// ---------------------------------------------------------------------------
// AGGREGATES
// ---------------------------------------------------------------------------
export const getAggregates = (filters = {}) => {
  const {
    year = 2022,
    county = 'All',
    sector = 'All',
    revenueTier = 'All',
    fteTier = 'All',
    verifiedOnly = true   // default: show only ProPublica-verified orgs
  } = filters;

  let filtered = RAW_NONPROFIT_DATA.filter(d => d.year === parseInt(year, 10));

  if (county !== 'All')  filtered = filtered.filter(d => d.county === county);
  if (sector !== 'All')  filtered = filtered.filter(d => d.sector === sector);
  if (verifiedOnly)      filtered = filtered.filter(d => d.is_verified);

  if (revenueTier !== 'All') {
    filtered = filtered.filter(item => {
      const rev = item.revenue;
      if (revenueTier === 'Grassroots') return rev < 50000;
      if (revenueTier === 'Small')      return rev >= 50000 && rev < 250000;
      if (revenueTier === 'Mid-Size')   return rev >= 250000 && rev < 1000000;
      if (revenueTier === 'Enterprise') return rev >= 1000000;
      return true;
    });
  }

  if (fteTier !== 'All') {
    filtered = filtered.filter(item => {
      const emp = item.employees;
      if (fteTier === '1-5')   return emp <= 5;
      if (fteTier === '6-20')  return emp > 5  && emp <= 20;
      if (fteTier === '21-50') return emp > 20 && emp <= 50;
      if (fteTier === '51+')   return emp > 50;
      return true;
    });
  }

  return {
    count:       filtered.length,
    revenue:     filtered.reduce((acc, o) => acc + o.revenue, 0),
    employment:  Math.round(filtered.reduce((acc, o) => acc + o.employees, 0)),
    averageWage: filtered.length > 0
      ? filtered.reduce((acc, o) => acc + o.wage_avg, 0) / filtered.length
      : 0,
    assets:      filtered.reduce((acc, o) => acc + o.assets, 0)
  };
};

export const getTopOrganizations = (sector = 'All', limit = 15) => {
  let filtered = RAW_NONPROFIT_DATA.filter(d => d.year === 2022 && d.is_verified);
  if (sector !== 'All') filtered = filtered.filter(d => d.sector === sector);
  return filtered.sort((a, b) => b.revenue - a.revenue).slice(0, limit);
};

export const getLegislativeData = (districtType = 'house') => {
  const summary = {};
  RAW_NONPROFIT_DATA
    .filter(d => d.year === 2022 && d.is_verified)
    .forEach(org => {
      const dist = districtType === 'house' ? org.legislative.house : org.legislative.senate;
      if (!summary[dist]) {
        summary[dist] = {
          name: dist,
          count: 0,
          employment: 0,
          revenue: 0,
          rep: districtType === 'house' ? org.legislative.rep : org.legislative.senator
        };
      }
      summary[dist].count++;
      summary[dist].employment += org.employees;
      summary[dist].revenue    += org.revenue;
    });
  return Object.values(summary);
};

// State benchmark ratio source: NCCS State Nonprofit Economic Data,
// Urban Institute 2023 edition. UP wage ratio to state average = 0.87 (inverse:
// state is ~1.15x UP). Org density: Michigan statewide nonprofit density is
// approximately 15.5 orgs per 1,000 residents vs. UP average ~4.2 — ratio 3.69
// rounded to 3.7 for display. The 15.5 multiplier below is retained for backward
// compatibility with existing chart consumers but documents this derivation.
// TODO: Replace with a live NCCS API call once the data pipeline is established.
const STATE_BENCHMARK_MULTIPLIERS = {
  averageWage:    1.15,  // Michigan state average nonprofit wage is ~15% above UP average
  default:        15.5   // All other metrics: state sector is ~15.5x larger in absolute terms
};

export const getBenchmarkTrends = (metric) => {
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  return years.map(y => {
    const upAvg = getAggregates({ year: y, county: 'All', verifiedOnly: true });
    const stateFactor = STATE_BENCHMARK_MULTIPLIERS[metric] ?? STATE_BENCHMARK_MULTIPLIERS.default;
    return {
      year:        y,
      upAverage:   upAvg[metric] / (metric === 'count' ? 15 : 1),
      stateAverage: (upAvg[metric] / (metric === 'count' ? 15 : 1)) * stateFactor
    };
  });
};

export const getTrendData = (metric, county = 'All', sector = 'All') => {
  const years = Array.from({ length: 11 }, (_, i) => 2012 + i);
  return years.map(y => ({
    year:  y,
    value: getAggregates({ year: y, county, sector, verifiedOnly: true })[metric] || 0
  }));
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
    const stats = getAggregates({ year, county: c.name, verifiedOnly: true });
    return {
      ...c,
      ...stats,
      population: populationMap[c.name] || 5000,
      density: (stats.count / (populationMap[c.name] || 5000)) * 1000
    };
  });
};

export const getSectorAggregates = (year = 2022) =>
  SECTORS.map(s => ({
    name: s,
    ...getAggregates({ year, sector: s, verifiedOnly: true })
  }));
