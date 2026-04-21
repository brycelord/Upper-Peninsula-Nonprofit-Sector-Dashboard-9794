import React from 'react';
import { motion } from 'framer-motion';
import EconomicImpactCalculator from '../components/EconomicImpactCalculator';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const {
  FiTarget, FiTrendingUp, FiActivity, FiGlobe, FiBookOpen,
  FiSliders, FiSave, FiBarChart2, FiCheckCircle, FiAlertCircle, FiUsers, FiDollarSign
} = FiIcons;

const STEPS = [
  {
    icon: FiSliders,
    title: '1. Set Your Scenario',
    body: 'Use the three sliders on the left to describe the sector you want to model. "Number of Groups" is how many nonprofits exist in the scenario, "Staff per Group" is the average full-time-equivalent headcount, and "Avg Revenue per Group" is the yearly budget each organization is assumed to manage.'
  },
  {
    icon: FiBarChart2,
    title: '2. Watch Live Results',
    body: 'The four cards in the result panel update instantly. Direct Jobs and Direct Revenue are what your inputs produce on their own. Total Jobs (with ripple) and Community Value apply the multipliers that account for secondary economic activity these nonprofits create locally.'
  },
  {
    icon: FiSave,
    title: '3. Save & Compare',
    body: 'Click Save Scenario to freeze the current inputs as a comparison shape on the radar chart. Save up to three scenarios to benchmark different growth strategies (e.g., "Status Quo" vs. "Double Funding" vs. "Workforce Expansion") side-by-side.'
  },
  {
    icon: FiCheckCircle,
    title: '4. Interpret & Act',
    body: 'Use the radar chart to spot trade-offs — a scenario with fewer, larger organizations will score high on revenue but lower on group count. Share results with funders, legislators, or board members to quantify what additional investment would realistically yield.'
  }
];

const METRICS = [
  { label: 'Direct Jobs', formula: 'Groups × Staff per Group', meaning: 'Headcount employed directly by the nonprofits themselves.' },
  { label: 'Total Jobs (Ripple)', formula: 'Direct Jobs × 1.48', meaning: 'Adds indirect jobs created at local vendors, childcare, housing, and hospitality that support nonprofit workers.' },
  { label: 'Direct Revenue', formula: 'Groups × Avg Revenue', meaning: 'Combined annual operating budgets flowing into the sector from grants, donations, and earned revenue.' },
  { label: 'Community Value', formula: 'Direct Revenue × 1.32', meaning: 'Total dollar value circulating through the regional economy after each dollar is re-spent roughly 1.32 times before leaving the area.' }
];

const ImpactCalculator = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-6">
      <div className="max-w-[1400px] mx-auto px-3 sm:px-5 lg:px-6">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-5 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest mb-2">
            <SafeIcon icon={FiGlobe} className="text-yellow-400" />
            Strategic Planning Tool
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tighter italic uppercase mb-2">
            Economic Impact Calculator
          </h1>
          <p className="text-gray-500 font-medium text-sm max-w-2xl mx-auto">
            Simulate the growth of UP nonprofit infrastructure and visualize ripple effects on employment and financial velocity.
          </p>
        </motion.div>

        <div className="mb-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 p-5 bg-white rounded-2xl border border-gray-100 shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#095339] text-[#ffc425] flex items-center justify-center shrink-0">
                <SafeIcon icon={FiBookOpen} className="text-sm" />
              </div>
              <h2 className="text-lg font-black uppercase italic tracking-tighter text-gray-900">What This Tool Does</h2>
            </div>
            <p className="text-sm text-gray-600 font-medium leading-relaxed">
              This calculator translates nonprofit sector assumptions into projected economic output for the Upper Peninsula.
              You describe the sector by three levers — how many organizations, how many staff each employs, and how much
              revenue each manages — and the calculator multiplies those inputs through two evidence-based ratios to estimate
              both <span className="font-black text-gray-900">direct activity</span> (what the nonprofits do themselves) and
              <span className="font-black text-gray-900"> ripple effects</span> (the extra jobs and dollars generated in the
              surrounding regional economy).
            </p>
            <p className="text-sm text-gray-600 font-medium leading-relaxed mt-2">
              It is designed for board retreats, grant proposals, legislative briefings, and internal planning sessions where
              stakeholders need a defensible, transparent projection rather than a black-box estimate.
            </p>
          </div>

          <div className="p-5 bg-gradient-to-br from-[#095339] to-[#0d7a53] text-white rounded-2xl shadow-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-[#ffc425] text-[#095339] flex items-center justify-center shrink-0">
                <SafeIcon icon={FiAlertCircle} className="text-sm" />
              </div>
              <h2 className="text-lg font-black uppercase italic tracking-tighter">Before You Start</h2>
            </div>
            <ul className="space-y-2 text-[11px] font-medium leading-relaxed">
              <li className="flex gap-2"><span className="text-[#ffc425] font-black">01.</span> Results are projections, not audited figures. Use them for directional planning.</li>
              <li className="flex gap-2"><span className="text-[#ffc425] font-black">02.</span> Multipliers assume UP regional spending patterns. Urban multipliers differ.</li>
              <li className="flex gap-2"><span className="text-[#ffc425] font-black">03.</span> Save a "baseline" scenario first, then adjust to measure incremental change.</li>
            </ul>
          </div>
        </div>

        <div className="mb-6 bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
          <div className="px-5 py-3 bg-gray-900 text-white flex items-center gap-2">
            <SafeIcon icon={FiCheckCircle} className="text-[#ffc425]" />
            <h2 className="text-sm font-black uppercase tracking-widest">Step-by-Step Instructions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-gray-100">
            {STEPS.map((step) => (
              <div key={step.title} className="p-4">
                <div className="w-9 h-9 rounded-xl bg-[#ffc425]/20 text-[#095339] flex items-center justify-center mb-2">
                  <SafeIcon icon={step.icon} />
                </div>
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-900 mb-1.5">{step.title}</h3>
                <p className="text-[11px] text-gray-600 font-medium leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <EconomicImpactCalculator />

        <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-md overflow-hidden">
          <div className="px-5 py-3 bg-gray-900 text-white flex items-center gap-2">
            <SafeIcon icon={FiBarChart2} className="text-[#ffc425]" />
            <h2 className="text-sm font-black uppercase tracking-widest">Methodology & Formulas</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-[10px] font-black uppercase tracking-widest text-gray-500">
                <tr>
                  <th className="px-4 py-2.5">Metric</th>
                  <th className="px-4 py-2.5">Formula</th>
                  <th className="px-4 py-2.5">What It Means</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {METRICS.map((m) => (
                  <tr key={m.label} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-black text-gray-900 whitespace-nowrap">{m.label}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[#095339] whitespace-nowrap">{m.formula}</td>
                    <td className="px-4 py-3 text-gray-600 font-medium leading-relaxed">{m.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 text-[10px] text-gray-500 font-medium italic">
            Multipliers derived from BEA RIMS II regional input-output modeling, adjusted for rural Upper Peninsula
            spending leakage. Job multiplier of 1.48 and spending multiplier of 1.32 are conservative estimates for
            nonprofit-heavy sectors in non-metro Michigan.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mt-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-2">
              <SafeIcon icon={FiTarget} className="text-lg" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1.5">Local Sourcing</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Nonprofits are sticky economic anchors, spending a higher share of revenue on local vendors and workforce
              than comparable for-profit firms. This keeps more money circulating within the UP instead of leaving the region.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <div className="w-10 h-10 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center mb-2">
              <SafeIcon icon={FiTrendingUp} className="text-lg" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1.5">Indirect Job Creation</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Every nonprofit job generates demand for business services, accounting, and hospitality across UP counties.
              The ripple multiplier captures these secondary positions that would not exist without the nonprofit workforce.
            </p>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-md">
            <div className="w-10 h-10 bg-yellow-100 text-yellow-600 rounded-xl flex items-center justify-center mb-2">
              <SafeIcon icon={FiActivity} className="text-lg" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 mb-1.5">Social Value Multiplier</h3>
            <p className="text-xs text-gray-500 leading-relaxed font-medium">
              Beyond dollars and jobs, nonprofits reduce downstream public costs through preventative services and
              community health outcomes — effects not fully captured in these economic figures but worth weighing.
            </p>
          </div>
        </div>

        <div className="mt-6 p-4 bg-[#ffc425]/10 border border-[#ffc425]/40 rounded-2xl text-center">
          <p className="text-[11px] font-black uppercase tracking-widest text-[#095339] italic">
            Tip: pair this tool with the Advocacy Portal to export findings into briefing materials for policymakers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImpactCalculator;
