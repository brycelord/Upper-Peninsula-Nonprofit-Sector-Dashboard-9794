import React from 'react';
import { Link } from 'react-router-dom';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';

const { FiMail, FiPhone, FiExternalLink, FiDatabase, FiMapPin } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-[#095339] text-white">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">

          <div className="md:col-span-4">
            <div className="flex items-start gap-4 mb-4">
              <img
                src="/assets/images/NMU_Stack_Transparent.png"
                alt="Northern Michigan University"
                className="h-16 w-auto brightness-0 invert"
              />
            </div>
            <div className="w-10 h-[3px] bg-[#ffc425] mb-3" />
            <p className="text-[11px] font-black uppercase tracking-[0.25em] text-[#ffc425] mb-2">
              UP Nonprofit Economic Intelligence
            </p>
            <p className="text-sm text-white/75 leading-relaxed">
              A research platform analyzing the nonprofit sector's economic impact, employment trends,
              and organizational landscape across Michigan's 15 Upper Peninsula counties.
            </p>
            <div className="flex items-center gap-2 mt-3 text-xs text-white/50 font-medium">
              <SafeIcon icon={FiDatabase} className="w-3.5 h-3.5 shrink-0" />
              <span>Data updated annually · Last update: 2023</span>
            </div>
          </div>

          <div className="md:col-span-3 md:col-start-6">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ffc425] mb-4 border-b border-white/10 pb-2">
              Data Sources
            </h4>
            <ul className="space-y-2.5 text-white/70">
              {[
                'ProPublica Nonprofit Explorer',
                'QCEW Employment Data',
                'IRS Business Master File',
                'Michigan Geographic Data Library',
              ].map((src) => (
                <li key={src} className="flex items-center gap-2 text-sm hover:text-[#ffc425] transition-colors">
                  <SafeIcon icon={FiExternalLink} className="w-3 h-3 shrink-0" />
                  <span>{src}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3 md:col-start-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#ffc425] mb-4 border-b border-white/10 pb-2">
              Contact
            </h4>
            <div className="space-y-3 text-white/70 text-sm">
              <div className="flex items-start gap-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 shrink-0 mt-0.5 text-[#ffc425]" />
                <address className="not-italic leading-relaxed">
                  Northern Michigan University<br />
                  1401 Presque Isle Avenue<br />
                  Marquette, MI 49855
                </address>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiMail} className="w-4 h-4 shrink-0 text-[#ffc425]" />
                <span>research@nmu.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4 shrink-0 text-[#ffc425]" />
                <span>906-227-1000</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-[#ffc425]/30 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/50 text-center sm:text-left">
            &copy; {new Date().getFullYear()} Northern Michigan University. All rights reserved.
            Data visualization for research and public policy purposes.
          </p>
          <img
            src="/assets/images/NMU_Stack_Transparent.png"
            alt=""
            aria-hidden="true"
            className="h-8 w-auto opacity-20 brightness-0 invert"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
