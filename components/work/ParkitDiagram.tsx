/**
 * ParkIT has no hosted demo, so its plate is a diagram of the real pipeline (from the repository's
 * parkinglotsystem-cpp branch), drawn as parking bays on asphalt. Numbers are used because this is a sequence.
 */
const steps = [
  { title: 'Camera', detail: 'Webcam frames through OpenCV' },
  { title: 'Find the plate', detail: 'YOLOv8 with custom weights' },
  { title: 'Read it', detail: 'EasyOCR, fitted to 8 Indian plate formats' },
  { title: 'Agree on it', detail: 'Accepted only after matching frames' },
  { title: 'Allocate and bill', detail: 'C++17 core: peak-hour fees (and slots in CSV mode)' },
  { title: 'Record', detail: 'CSV, or MySQL procedures with row-locked slot claims' },
]

const compactSteps = ['Camera', 'YOLOv8', 'EasyOCR', 'Streamlit', 'CSV or MySQL']

export default function ParkitDiagram({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="parkit flex h-full flex-col justify-center gap-2 p-4 sm:gap-3 sm:p-6">
        <p className="text-fine font-semibold text-white/70">ParkIT pipeline</p>
        <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-2 sm:gap-x-2">
          {compactSteps.map((step, i) => (
            <li key={step} className="flex items-center gap-1.5 sm:gap-2">
              <span className="parkit-bay px-2 py-1 font-display text-[1.0625rem] font-semibold leading-none text-white sm:px-3 sm:py-1.5 sm:text-[1.25rem]">
                {step}
              </span>
              {i < compactSteps.length - 1 ? <span aria-hidden="true" className="parkit-lane w-3 sm:w-5" /> : null}
            </li>
          ))}
        </ol>
      </div>
    )
  }

  return (
    <figure>
      <div className="parkit rounded-plate p-5 sm:p-8" data-reveal="plate">
        <ol className="grid grid-cols-2 gap-x-2.5 gap-y-3 sm:gap-x-3 sm:gap-y-4 xl:grid-cols-3">
          {steps.map((step, i) => (
            <li
              key={step.title}
              data-reveal="step"
              style={{ '--i': i } as React.CSSProperties}
              className="parkit-bay flex min-h-28 flex-col p-3 sm:min-h-32 sm:p-4"
            >
              <span className="tabular text-fine font-semibold text-signal">{i + 1}</span>
              <span className="mt-auto pt-3 font-display text-[1.375rem] font-semibold leading-none text-white sm:text-[1.75rem]">
                {step.title}
              </span>
              <span className="mt-2 text-fine text-white/70">{step.detail}</span>
            </li>
          ))}
        </ol>
      </div>
      <figcaption className="mt-3 text-fine text-muted">
        How a car is recorded, from camera frame to database row. No hosted demo: the system runs locally with a webcam.
      </figcaption>
    </figure>
  )
}
