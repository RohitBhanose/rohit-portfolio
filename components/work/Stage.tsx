'use client'

import { lazy, Suspense, useEffect, useMemo, useRef, useState, type ComponentType, type ReactNode } from 'react'
import type { ProjectSlug } from '@/content/types'

type DemoProps = { onRetry?: () => void }
type DemoModule = { default: ComponentType<DemoProps> }

const note = 'flex min-h-[26rem] flex-col items-center justify-center gap-4 px-6 text-center text-small text-muted'

function DemoFailed({ onRetry }: DemoProps) {
  return (
    <div className={note}>
      <p>The demo couldn’t load. Check your connection and try again.</p>
      <button type="button" onClick={onRetry} className="btn btn-secondary">
        Try again
      </button>
    </div>
  )
}

// Only ParkIT has a demo. It is its own chunk, fetched when a visitor opens it (or starts to: see `warm`).
// A project with `demo` set in content/projects.ts needs an entry here.
const loaders: Partial<Record<ProjectSlug, () => Promise<DemoModule>>> = {
  parkit: () => import('@/components/demos/ParkitPlateDemo'),
}
const failedModule: DemoModule = { default: DemoFailed }
const load = (slug: ProjectSlug) => loaders[slug]?.() ?? Promise.reject(new Error(`No demo for ${slug}`))

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady])
  return null
}

type Props = {
  slug: ProjectSlug
  name: string
  /** "Screenshots" or "Pipeline". */
  previewLabel: string
  /** The verb that names the demo, e.g. "Follow a number plate". */
  demoName: string
  /** Server-rendered screenshots or diagram. */
  preview: ReactNode
}

/**
 * ParkIT's stage: its pipeline diagram, or its demo once a visitor asks for it. Both stay mounted once shown and are
 * toggled with `hidden`, so the demo keeps its state. A failed chunk can be retried without reloading the page.
 */
export default function Stage({ slug, name, previewLabel, demoName, preview }: Props) {
  const [view, setView] = useState<'preview' | 'demo'>('preview')
  const [opened, setOpened] = useState(false)
  const [attempt, setAttempt] = useState(0)
  const [status, setStatus] = useState('')
  const failed = useRef(false)

  // A fresh lazy component per attempt: React.lazy caches a failed import forever.
  const Demo = useMemo(
    () =>
      lazy(() =>
        load(slug).then(
          (mod) => ((failed.current = false), mod),
          (): DemoModule => ((failed.current = true), failedModule),
        ),
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [slug, attempt],
  )
  const warm = () => void load(slug).catch(() => {})
  const showDemo = () => {
    if (!opened) setStatus('Loading the demo…')
    setOpened(true)
    setView('demo')
  }
  const retry = () => {
    setStatus('Loading the demo…')
    setAttempt((n) => n + 1)
  }

  return (
    <div>
      <div className="mb-4">
        <div className="segmented" role="group" aria-label={`${name}: choose a view`}>
          <button type="button" aria-pressed={view === 'preview'} onClick={() => setView('preview')} className="m-press">
            {previewLabel}
          </button>
          <button
            type="button"
            aria-pressed={view === 'demo'}
            onClick={showDemo}
            onPointerEnter={warm}
            onFocus={warm}
            className="m-press"
          >
            Try it: {demoName}
          </button>
        </div>
      </div>
      <div hidden={view !== 'preview'} className="m-fade">
        {preview}
      </div>
      {opened ? (
        <section
          hidden={view !== 'demo'}
          aria-label={`${name} demo: ${demoName}`}
          className="m-fade rounded-plate bg-surface shadow-[inset_0_0_0_1px_rgb(var(--line))]"
        >
          <Suspense fallback={<p className={note}>Loading the demo…</p>}>
            <Demo onRetry={retry} />
            <Ready
              onReady={() => setStatus(failed.current ? 'The demo couldn’t load. Try again below.' : `Demo ready below: ${demoName}.`)}
            />
          </Suspense>
        </section>
      ) : null}
      <p role="status" className="sr-only">
        {status}
      </p>
    </div>
  )
}
