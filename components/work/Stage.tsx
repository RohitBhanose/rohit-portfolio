'use client'

import { lazy, Suspense, useState, type ComponentType, type ReactNode } from 'react'
import type { ProjectSlug } from '@/content/types'

const note = 'flex min-h-[26rem] items-center justify-center px-6 text-center text-small text-muted'

function DemoFailed() {
  return <p className={note}>The demo couldn’t load. Check your connection and reload the page to try again.</p>
}

// Each demo is its own chunk, fetched only when a visitor opens "Try it". React.lazy rather than next/dynamic:
// demos never render on the server (they mount after a click), and it saves next/dynamic's ~1.5 kB runtime.
const load = (get: () => Promise<{ default: ComponentType }>) => lazy(() => get().catch(() => ({ default: DemoFailed })))
const demos: Record<ProjectSlug, ComponentType> = {
  swiftdineos: load(() => import('@/components/demos/SwiftDineFlowDemo')),
  levelup: load(() => import('@/components/demos/LevelUpLedgerDemo')),
  parkit: load(() => import('@/components/demos/ParkitPlateDemo')),
  indiaguessr: load(() => import('@/components/demos/GuessrScoreDemo')),
  leftovera: load(() => import('@/components/demos/LeftoveraFilterDemo')),
}

type Props = {
  slug: ProjectSlug
  name: string
  /** "Screenshots" or "Pipeline". */
  previewLabel: string
  demoName: string
  /** Server-rendered screenshots or diagram. */
  preview: ReactNode
}

/**
 * A project's stage: its preview, or its demo once a visitor asks for it. Both stay mounted once shown and are
 * toggled with `hidden`: the demo keeps its state, and the preview keeps its revealed diagram and chosen screenshot
 * (a remounted [data-reveal] node would never be seen by the reveal observer). Showing either replays its fade.
 */
export default function Stage({ slug, name, previewLabel, demoName, preview }: Props) {
  const [view, setView] = useState<'preview' | 'demo'>('preview')
  const [opened, setOpened] = useState(false)
  const Demo = demos[slug]
  const showDemo = () => {
    setOpened(true)
    setView('demo')
  }
  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className="segmented" role="group" aria-label={`${name}: choose a view`}>
          <button type="button" aria-pressed={view === 'preview'} onClick={() => setView('preview')} className="m-press">
            {previewLabel}
          </button>
          <button type="button" aria-pressed={view === 'demo'} onClick={showDemo} className="m-press">
            <span aria-hidden="true" className="try-dot" />
            Try it
          </button>
        </div>
        {view === 'demo' ? <p className="text-small text-muted">{demoName}</p> : null}
      </div>
      <div hidden={view !== 'preview'} className="m-fade">
        {preview}
      </div>
      {opened ? (
        <div hidden={view !== 'demo'} className="m-fade rounded-plate bg-surface shadow-[inset_0_0_0_1px_rgb(var(--line))]">
          <Suspense fallback={<p className={note}>Loading the demo…</p>}>
            <Demo />
          </Suspense>
        </div>
      ) : null}
    </div>
  )
}
