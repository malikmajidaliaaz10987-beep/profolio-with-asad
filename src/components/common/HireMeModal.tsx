import React from 'react';
import { X } from 'lucide-react';
import { useProfile } from '../../context/ProfileContext';
import { LeadForm } from './LeadForm';

export const HireMeModal: React.FC = () => {
  const { isHireModalOpen, closeHireModal, selectedServiceForInquiry } = useProfile();

  if (!isHireModalOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-2xl bg-[#17243A] border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 text-white max-h-[90vh] overflow-y-auto">
        
        {/* Header Close Button */}
        <div className="flex justify-end mb-2">
          <button
            onClick={closeHireModal}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="Close inquiry modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Generation Form */}
        <LeadForm
          initialService={selectedServiceForInquiry}
          onSuccess={() => {
            // keep success screen open until user chooses to close
          }}
        />

      </div>
    </div>
  );
};
