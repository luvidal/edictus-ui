import { createRoot, Root } from 'react-dom/client'
import { act, type ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { ComputedField, NumberField, TextField } from '../src'

let root: Root | null = null
let container: HTMLDivElement | null = null

globalThis.IS_REACT_ACT_ENVIRONMENT = true

function render(ui: ReactElement) {
  container = document.createElement('div')
  document.body.appendChild(container)
  root = createRoot(container)
  act(() => {
    root!.render(ui)
  })
  return container
}

function setInputValue(input: HTMLInputElement, value: string) {
  const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set
  setter?.call(input, value)
}

afterEach(() => {
  if (root) {
    act(() => {
      root!.unmount()
    })
  }
  container?.remove()
  root = null
  container = null
})

describe('form fields', () => {
  it('renders TextField suffix with reserved input padding', () => {
    const node = render(<TextField aria-label="ratio" value="25" suffix="%" onChange={() => undefined} />)
    const input = node.querySelector('input')!
    const suffix = node.querySelector('span[aria-hidden="true"]')!

    expect(input.className).toContain('!pr-9')
    expect(suffix.textContent).toBe('%')
    expect(suffix.className).toContain('right-3')
  })

  it('keeps TextField blur-commit behavior when a suffix is present', () => {
    const onChange = vi.fn()
    const node = render(<TextField aria-label="ratio" value="25" suffix="%" onChange={onChange} />)
    const input = node.querySelector('input')!

    act(() => {
      setInputValue(input, '30%')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(onChange).not.toHaveBeenCalled()

    act(() => {
      input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith('30%')
  })

  it('reserves suffix padding in numeric and computed fields', () => {
    const node = render(
      <>
        <NumberField label="Tasa" value={3.2} suffix="%" onChange={() => undefined} />
        <ComputedField label="Total" value="80" suffix="%" />
      </>
    )
    const numberInput = node.querySelector('input')!
    const paddedElements = Array.from(node.querySelectorAll('input, div')).filter(el => el.className.includes('!pr-9'))

    expect(numberInput.className).toContain('!pr-9')
    expect(paddedElements).toHaveLength(2)
  })
})
