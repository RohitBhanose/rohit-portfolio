'use client'

import { useState, type ReactNode } from 'react'
import { Plus } from 'lucide-react'

/** "How it's built": closed by default, opened in place. Without JavaScript the body is simply shown. */
export default function Disclosure({ id, label, children }: { id: string; label: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="mt-8 border-t border-line">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="dd-toggle flex min-h-14 w-full items-center justify-between gap-4 text-left font-semibold"
      >
        {label}
        <Plus aria-hidden="true" size={20} strokeWidth={2.25} className="dd-icon shrink-0" />
      </button>
      <div id={id} className="dd-body" data-open={open ? '' : undefined}>
        <div className="dd-inner">{children}</div>
      </div>
    </div>
  )
}
