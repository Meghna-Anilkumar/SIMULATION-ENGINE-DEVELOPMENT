import { RotateCcw, AlertTriangle, X } from 'lucide-react';

interface Props {
  onConfirm: () => void;
  onCancel: () => void;
  isResetting: boolean;
}

export default function ResetConfirmModal({ onConfirm, onCancel, isResetting }: Props) {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={!isResetting ? onCancel : undefined}
      />
      {/* Modal */}
      <div className="relative w-full max-w-sm rounded-2xl bg-[#0e1a2b] border border-white/10 shadow-2xl shadow-black/60 p-6 flex flex-col gap-5">
        {/* Close button */}
        {!isResetting && (
          <button
            onClick={onCancel}
            className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-lg text-gray-500 hover:text-gray-300 hover:bg-white/10 transition-all"
          >
            <X size={15} />
          </button>
        )}
        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
            <AlertTriangle size={22} className="text-rose-400" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-white">Reset Simulation?</h2>
            <p className="text-sm text-gray-400 mt-1 leading-relaxed">
              This will permanently erase all simulated days and plant history. This action cannot be undone.
            </p>
          </div>
        </div>
        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            disabled={isResetting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-medium text-gray-300 hover:text-white transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={isResetting}
            className="flex-1 px-4 py-2.5 rounded-xl bg-rose-500/90 hover:bg-rose-500 border border-rose-400/20 text-sm font-semibold text-white transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isResetting ? (
              <>
                <RotateCcw size={14} className="animate-spin" />
                Resetting…
              </>
            ) : (
              'Reset'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}