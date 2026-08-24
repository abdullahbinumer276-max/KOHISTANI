import React from 'react';
import { useCMS } from '../context/CMSContext';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Toast: React.FC = () => {
  const { toast } = useCMS();

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl border bg-[#111116] border-[#d4af37]/40 text-white gold-glow"
        >
          {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-[#d4af37]" />}
          {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400" />}
          {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400" />}
          <span className="text-sm font-medium text-[#f0ede6]">{toast.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
