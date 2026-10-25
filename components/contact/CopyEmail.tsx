'use client'

import { useEffect, useRef, useState } from 'react'
import { Check, Copy } from 'lucide-react'

/** Clipboard API first, then the legacy path for insecure contexts and in-app browsers. */
async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    const area = document.createElement('textarea')
    area.value = text
    area.setAttribute('readonly', '')
    area.style.position = 'fixed'
    area.style.opacity = '0'
    document.body.appendChild(area)
    area.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    area.remove()
    return ok
  }
}

export default function CopyEmail({ email, targetId }: { email: string; targetId: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')
  const [message, setMessage] = useState('')
  const reset = useRef<number>()

  useEffect(() => () => window.clearTimeout(reset.current), [])

  const copy = async () => {
    window.clearTimeout(reset.current)
    setMessage('') // clear first so a repeat copy is announced again
    const ok = await copyText(email)
    if (ok) {
      setState('copied')
      setMessage('Email address copied.')
    } else {
      // Select the address on the page so the visitor can copy it with Ctrl or Cmd + C.
      const target = document.getElementById(targetId)
      const selection = window.getSelection()
      if (target && selection) {
        const range = document.createRange()
        range.selectNodeContents(target)
        selection.removeAllRanges()
        selection.addRange(range)
      }
      setState('failed')
      setMessage('Couldn’t copy automatically. The address is selected; press Control or Command plus C.')
    }
    reset.current = window.setTimeout(() => setState('idle'), 3000)
  }

  return (
    <>
      <button type="button" onClick={copy} className="btn btn-secondary min-w-[10rem]">
        {state === 'copied' ? (
          <Check aria-hidden="true" size={18} strokeWidth={2.25} />
        ) : state === 'failed' ? null : (
          <Copy aria-hidden="true" size={18} strokeWidth={2} />
        )}
        {state === 'copied' ? 'Copied' : state === 'failed' ? 'Copy failed' : 'Copy address'}
      </button>
      <span role="status" className="sr-only">
        {message}
      </span>
    </>
  )
}
