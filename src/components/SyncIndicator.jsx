import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import { syncService } from '../services/syncService';
import * as FiIcons from 'react-icons/fi';

const { 
  FiRefreshCw, FiCheckCircle, FiAlertCircle, FiDatabase, 
  FiX, FiAlertTriangle, FiArrowRight 
} = FiIcons;

const SyncIndicator = () => {
  // Initialize state directly to prevent "idle" flash
  const [status, setStatus] = useState(() => {
    if (syncService.isSyncRequired() && !syncService.isSuppressed()) return 'required';
    return 'idle';
  });

  const [lastSync, setLastSync] = useState(syncService.getLastSyncTimestamp());
  const [syncCount, setSyncCount] = useState(0);

  const handleManualSync = async () => {
    setStatus('syncing');
    const result = await syncService.performSync();
    if (result.success) {
      setStatus('success');
      setLastSync(result.timestamp);
      setSyncCount(result.count);
      // Auto-revert to idle after success message
      setTimeout(() => setStatus('idle'), 4000);
    } else {
      setStatus('error');
    }
  };

  const dismissRequired = () => {
    syncService.suppressForSession();
    setStatus('idle');
  };

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-end gap-4 pointer-events-none">
      <AnimatePresence mode="wait">
        {status === 'required' && (
          <motion.div
            key="status-required"
            initial={{ opacity: 0, y: 50, scale: 0.9, rotate: -2 }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
            className="bg-white rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.2)] border-2 border-yellow-400 p-7 max-w-sm pointer-events-auto"
          >
            <div className="flex items-start gap-5">
              <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center text-black shadow-xl shadow-yellow-100 shrink-0">
                <SafeIcon icon={FiAlertTriangle} className="text-2xl" />
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h4 className="text-sm font-black uppercase tracking-tighter text-gray-900 leading-none">Integrity Sync Required</h4>
                  <button onClick={dismissRequired} className="text-gray-300 hover:text-gray-600 transition-colors">
                    <SafeIcon icon={FiX} />
                  </button>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed mt-2 uppercase tracking-tight">
                  Regional registry is out of sync with 2024-Q1 benchmarks. Verified data integrity score is currently degraded.
                </p>
                <div className="flex gap-2 mt-5">
                  <button 
                    onClick={handleManualSync}
                    className="flex-grow flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-900 text-white text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-black transition-all shadow-lg active:scale-95"
                  >
                    Run Verification <SafeIcon icon={FiArrowRight} />
                  </button>
                  <button 
                    onClick={dismissRequired}
                    className="px-4 py-2.5 bg-gray-100 text-gray-400 text-[9px] font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-all"
                  >
                    Later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {status === 'syncing' && (
          <motion.div
            key="status-syncing"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-gray-900 text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-5 border border-yellow-400/30 pointer-events-auto"
          >
            <div className="relative">
              <SafeIcon icon={FiRefreshCw} className="animate-spin text-yellow-400 text-2xl" />
              <div className="absolute inset-0 animate-ping opacity-20 bg-yellow-400 rounded-full" />
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-400">Auditing Registry</span>
              <span className="text-xs font-bold leading-none mt-1 uppercase tracking-tighter">Parsing 15 UP Jurisdictions...</span>
            </div>
          </motion.div>
        )}

        {status === 'success' && (
          <motion.div
            key="status-success"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-green-600 text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-5 shadow-green-200 pointer-events-auto"
          >
            <SafeIcon icon={FiCheckCircle} className="text-2xl" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-green-100">Audit Successful</span>
              <span className="text-xs font-bold uppercase tracking-tighter">{syncCount.toLocaleString()} Records Re-Verified</span>
            </div>
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            key="status-error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-600 text-white px-8 py-5 rounded-[24px] shadow-2xl flex items-center gap-5 pointer-events-auto"
          >
            <SafeIcon icon={FiAlertCircle} className="text-2xl" />
            <div className="flex flex-col">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-100">Verification Error</span>
              <button 
                onClick={handleManualSync}
                className="text-xs font-bold underline text-left hover:text-white"
              >
                Retry Deep Audit
              </button>
            </div>
            <button onClick={() => setStatus('idle')} className="ml-2">
              <SafeIcon icon={FiX} />
            </button>
          </motion.div>
        )}

        {status === 'idle' && (
          <motion.button
            key="status-idle"
            whileHover={{ scale: 1.05, y: -2 }}
            onClick={handleManualSync}
            className="group bg-white/95 backdrop-blur-md px-6 py-4 rounded-[22px] border border-gray-100 shadow-2xl flex items-center gap-5 transition-all hover:border-yellow-400 pointer-events-auto"
          >
            <div className="p-2.5 bg-gray-50 rounded-xl group-hover:bg-yellow-100 transition-colors">
              <SafeIcon icon={FiDatabase} className="text-gray-400 group-hover:text-yellow-600" />
            </div>
            <div className="text-left">
              <span className="block text-[9px] font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Regional Data Sync</span>
              <span className="block text-[10px] font-black text-gray-900 uppercase tracking-tighter">
                {lastSync ? `AUDITED: ${new Date(lastSync).toLocaleDateString()}` : 'NOT VERIFIED'}
              </span>
            </div>
            {syncService.isSyncRequired() && (
              <div className="w-2.5 h-2.5 bg-yellow-400 rounded-full animate-pulse border-2 border-white" />
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SyncIndicator;