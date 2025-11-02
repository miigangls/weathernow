import { type PropsWithChildren, useEffect } from 'react';
import clsx from 'clsx';

interface Props {
  open: boolean;
  title?: string;
  onClose: () => void;
  widthClass?: string; // tailwind width, default w-full max-w-md
}

export default function Drawer({ open, title, onClose, widthClass, children }: PropsWithChildren<Props>) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div className={clsx('fixed inset-0 z-50', open ? '' : 'pointer-events-none')}
      aria-hidden={!open}
    >
      <div className={clsx('absolute inset-0 bg-black/30 transition-opacity', open ? 'opacity-100' : 'opacity-0')} onClick={onClose} />
      <div className={clsx('absolute right-0 top-0 h-full bg-white shadow-xl transition-transform', widthClass ?? 'w-full max-w-md', open ? 'translate-x-0' : 'translate-x-full')}>
        <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
          <h2 className="text-base font-semibold">{title}</h2>
          <button className="rounded-md px-2 py-1 text-sm hover:bg-gray-100" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>
        <div className="h-[calc(100%-48px)] overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  );
}


