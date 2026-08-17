import React from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMap, FiFilter, FiTag, FiDatabase, FiAlertCircle, FiRefreshCw, FiCalendar } = FiIcons;

const Section = ({ icon, title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-[32px] shadow-md border border-gray-100 p-8"
  >
    <div className="flex items-center gap-4 mb-5">
      <div className="p-3 bg-gray-900 text-yellow-400 rounded-2xl shadow">
        <SafeIcon icon={icon} className="text-xl" />
      </div>
      <h2 className="text-xl font-black uppercase tracking-tighter text-gray-900">{title}</h2>
    </div>
    <div className="text-sm text-gray-700 leading-relaxed space-y-3">
      {children}
    </div>
  </motion.div>
);

const Methodology = () => (
  <div className="min-h-screen bg-gray-50 py-12">
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

      {/* Page header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-yellow-400 text-black rounded-full text-[10px] font-black uppercase tracking-widest mb-4">
          <SafeIcon icon={FiDatabase} /> Methodology &amp; Data Sources
        </div>
        <h1 className="text-5xl font-black tracking-tighter italic uppercase text-gray-900 leading-none mb-3">
          How We Build <br /><span className="text-yellow-500">This Dashboard</span>
        </h1>
        <p className="text-gray-500 font-medium text-base max-w-2xl leading-relaxed">
          This page explains the geographic scope, data sources, nonprofit inclusion criteria, sector taxonomies, refresh schedule, and known limitations underpinning every metric on the dashboard.
        </p>
      </motion.div>

      <div className="space-y-6">

        {/* Geographic Boundaries */}
        <Section icon={FiMap} title="Geographic Boundaries">
          <p>
            The dashboard covers the <strong>15 counties of Michigan's Upper Peninsula (UP)</strong>: Alger, Baraga, Chippewa, Delta, Dickinson, Gogebic, Houghton, Iron, Keweenaw, Luce, Mackinac, Marquette, Menominee, Ontonagon, and Schoolcraft.
          </p>
          <p>
            An organization is attributed to a county based on its <strong>principal office address</strong> as listed in IRS records. Organizations with a Lower Peninsula or out-of-state primary address are excluded even if they operate programs in the UP.
          </p>
          <p>
            Multi-county or statewide organizations headquartered within the UP are counted once, in the county of their principal office, with no revenue or employment proration across service areas.
          </p>
        </Section>

        {/* Nonprofit Inclusion Criteria */}
        <Section icon={FiFilter} title="Nonprofit Inclusion Criteria">
          <p>
            The dataset includes all organizations that meet <strong>all</strong> of the following conditions:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Recognized by the IRS as tax-exempt under <strong>IRC § 501(c)(3)</strong> (charitable, educational, religious, or scientific purpose).</li>
            <li>Listed as <strong>active</strong> in the IRS Business Master File (BMF) and not flagged for automatic revocation.</li>
            <li>Filed at least one Form 990, 990-EZ, or 990-N in the <strong>preceding 36 months</strong>.</li>
            <li>Principal address located within one of the 15 UP counties.</li>
          </ul>
          <p>
            Government entities, government-controlled foundations, and organizations filing solely as churches (which are not required to file with the IRS) are <strong>not included</strong> unless they independently hold a 501(c)(3) designation.
          </p>
        </Section>

        {/* Sector Taxonomies */}
        <Section icon={FiTag} title="Sector Taxonomies">
          <p>
            Organizations are classified using the <strong>National Taxonomy of Exempt Entities (NTEE)</strong> developed by the National Center for Charitable Statistics (NCCS). NTEE codes are sourced from IRS BMF records and supplemented with ProPublica Nonprofit Explorer classifications where the BMF code is missing or outdated.
          </p>
          <p>The ten broad sector groupings used throughout the dashboard map to NTEE major groups as follows:</p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li><strong>Arts &amp; Culture</strong> — NTEE A</li>
            <li><strong>Education</strong> — NTEE B</li>
            <li><strong>Environment &amp; Animals</strong> — NTEE C, D</li>
            <li><strong>Health Services</strong> — NTEE E, F, G, H</li>
            <li><strong>Human Services</strong> — NTEE I, J, K, L, M, N, O, P</li>
            <li><strong>International Affairs</strong> — NTEE Q</li>
            <li><strong>Public &amp; Societal Benefit</strong> — NTEE R, S, T, U, V, W</li>
            <li><strong>Religion Related</strong> — NTEE X</li>
            <li><strong>Mutual Benefit</strong> — NTEE Y</li>
            <li><strong>Other / Unknown</strong> — NTEE Z or no code assigned</li>
          </ul>
          <p>
            91 % of records carry validated NTEE secondary codes; the remaining 9 % are placed in "Other / Unknown" pending annual re-classification.
          </p>
        </Section>

        {/* Data Sources */}
        <Section icon={FiDatabase} title="Data Sources">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li><strong>IRS Business Master File (BMF)</strong> — Primary registry of active exempt organizations; downloaded monthly from IRS.gov.</li>
            <li><strong>IRS Form 990 Statistics</strong> — Aggregated financial and employment statistics extracted from digitized 990 filings.</li>
            <li><strong>ProPublica Nonprofit Explorer API (v2)</strong> — Used to cross-validate revenue, asset, and employee figures and to fill gaps in NTEE classification.</li>
            <li><strong>U.S. Bureau of Labor Statistics (BLS) QCEW</strong> — County-level wage benchmarks used in compensation analysis.</li>
            <li><strong>U.S. Census Bureau / American Community Survey (ACS)</strong> — Population denominators for per-capita calculations.</li>
          </ul>
          <p>
            Where figures differ between sources, the IRS BMF is treated as authoritative for organizational counts and the most recent 990 filing is authoritative for financial figures.
          </p>
        </Section>

        {/* Refresh Frequency */}
        <Section icon={FiRefreshCw} title="Refresh Frequency">
          <p>
            Data is re-validated against the IRS BMF on a <strong>30-day cycle</strong>. Full financial re-ingestion from 990 filings occurs <strong>quarterly</strong>. ProPublica cross-validation runs <strong>monthly</strong>. The "Last updated" timestamp on the dashboard home reflects the most recent full ingestion cycle.
          </p>
          <p>
            Because IRS processing of 990 filings typically lags submission by 12–18 months, the most recent complete financial year available in the dashboard may be one to two fiscal years behind the current calendar year.
          </p>
        </Section>

        {/* Known Limitations */}
        <Section icon={FiAlertCircle} title="Known Limitations">
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>
              <strong>Rural under-reporting:</strong> Keweenaw and Luce counties have confidence scores below 75 % due to small organization counts (&lt; 60 entities) and elevated rates of 990-N (e-Postcard) filers, which report no financial detail.
            </li>
            <li>
              <strong>Employment estimation:</strong> Organizations filing Form 990-EZ or 990-N do not report full-time equivalent employee counts. Employment figures for these filers are modeled using sector-average ratios derived from full 990 filers in comparable revenue bands.
            </li>
            <li>
              <strong>Revenue volatility:</strong> Large one-time grants or capital campaigns can cause apparent spikes in a single year. Year-over-year comparisons should be interpreted with caution for counties with fewer than 100 organizations.
            </li>
            <li>
              <strong>Church exclusion:</strong> The dataset likely undercounts the full faith-based nonprofit ecosystem because churches that choose not to apply for IRS recognition are not captured.
            </li>
            <li>
              <strong>Address accuracy:</strong> A small share of organizations list a P.O. Box or registered-agent address in a county different from their primary operating location; this may cause minor geographic misattribution.
            </li>
          </ul>
        </Section>

        {/* Coverage Dates */}
        <Section icon={FiCalendar} title="Coverage Dates">
          <p>
            Historical trend data is available from <strong>fiscal year 2010</strong> through the most recently completed ingestion cycle. Pre-2010 filings are not included due to inconsistent digitization of older paper 990 forms.
          </p>
          <p>
            County-level data is available for all 15 UP counties for fiscal years 2015–present. For 2010–2014, three rural counties (Keweenaw, Luce, Ontonagon) have partial coverage only.
          </p>
        </Section>

      </div>
    </div>
  </div>
);

export default Methodology;
