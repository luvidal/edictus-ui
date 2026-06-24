import { createRoot, Root } from 'react-dom/client'
import { act, type ReactElement } from 'react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { Button, ComputedField, NumberField, TextField } from '../src'

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
  it('renders Button with semantic brand chrome (default primary) and caller-provided casing', () => {
    const node = render(<Button icon="Play" text="Enviar" />)
    const button = node.querySelector('button')!
    const label = button.querySelector('span')!
    const icon = button.querySelector('svg')!

    expect(button.className).toContain('bg-brand')
    expect(button.className).toContain('text-brand-on') // per-tenant CTA contrast (white on saturated brand in light, pale-safe)
    expect(button.className).toContain('shadow-token-sm')
    expect(button.className).not.toContain('bg-theme-700')
    expect(label.textContent).toBe('Enviar')
    expect(label.className).not.toContain('uppercase')
    expect(label.className).not.toContain('text-shadow')
    expect(icon.getAttribute('class')).not.toContain('text-shadow')
  })

  it('maps variant + size to token chrome (primary default, secondary, danger, sm)', () => {
    const primary = render(<Button text="A" />).querySelector('button')!
    expect(primary.className).toContain('bg-brand')
    expect(primary.className).toContain('text-brand-on')
    expect(primary.className).toContain('h-10') // md default

    const secondary = render(<Button text="B" variant="secondary" />).querySelector('button')!
    expect(secondary.className).toContain('bg-surface-2')
    expect(secondary.className).toContain('text-ink-primary')
    expect(secondary.className).not.toContain('bg-brand')

    const danger = render(<Button text="C" variant="danger" />).querySelector('button')!
    expect(danger.className).toContain('bg-status-danger')
    expect(danger.className).not.toContain('bg-status-pending') // true red, never rose

    const small = render(<Button text="D" size="sm" />).querySelector('button')!
    expect(small.className).toContain('h-8')
    expect(small.className).not.toContain('h-10')
  })

  it('holds the disabled DIRECTIVE across every variant (chrome stable, content dims)', () => {
    for (const variant of ['primary', 'secondary', 'ghost', 'danger', 'link'] as const) {
      const button = render(<Button text="x" variant={variant} disabled />).querySelector('button')!
      expect(button.className, variant).toContain('disabled:cursor-not-allowed')
      expect(button.className, variant).not.toContain('disabled:opacity')
      expect(button.querySelector('span')!.className, variant).toContain('opacity-70')
    }
  })

  it('keeps Button disabled chrome stable while dimming inner content', () => {
    const node = render(<Button icon="Play" text="Enviar" disabled />)
    const button = node.querySelector('button')!
    const label = button.querySelector('span')!
    const icon = button.querySelector('svg')!

    expect(button.disabled).toBe(true)
    expect(button.className).toContain('disabled:cursor-not-allowed')
    expect(button.className).not.toContain('disabled:opacity')
    expect(button.className).not.toContain('grayscale')
    expect(button.className).not.toContain('blur')
    expect(label.className).toContain('opacity-70')
    expect(icon.getAttribute('class')).toContain('opacity-70')
  })

  it('renders TextField suffix with reserved input padding', () => {
    const node = render(<TextField aria-label="ratio" value="25" suffix="%" onChange={() => undefined} />)
    const input = node.querySelector('input')!
    const suffix = node.querySelector('span[aria-hidden="true"]')!

    expect(input.className).toContain('!pr-6')
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

  it('commits the current DOM value on blur even without a React input event', () => {
    const onChange = vi.fn()
    const node = render(<TextField aria-label="ratio" value="25" suffix="%" onChange={onChange} />)
    const input = node.querySelector('input')!

    act(() => {
      setInputValue(input, '30%')
      input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    })

    expect(onChange).toHaveBeenCalledWith('30%')
  })

  it('normalizes editable text before display and commit when normalizeInput is provided', () => {
    const onChange = vi.fn()
    const node = render(
      <TextField
        aria-label="ratio"
        value="25"
        suffix="%"
        normalizeInput={value => value.replace(/%/g, '')}
        onChange={onChange}
      />
    )
    const input = node.querySelector('input')!

    act(() => {
      setInputValue(input, '30%')
      input.dispatchEvent(new Event('input', { bubbles: true }))
    })
    expect(input.value).toBe('30')

    act(() => {
      input.dispatchEvent(new FocusEvent('focusout', { bubbles: true }))
    })
    expect(onChange).toHaveBeenCalledWith('30')
  })

  it('reserves suffix padding in numeric and computed fields', () => {
    const node = render(
      <>
        <NumberField label="Tasa" value={3.2} suffix="%" onChange={() => undefined} />
        <ComputedField label="Total" value="80" suffix="%" />
      </>
    )
    const numberInput = node.querySelector('input')!
    const paddedElements = Array.from(node.querySelectorAll('input, div')).filter(el => el.className.includes('!pr-6'))

    expect(numberInput.className).toContain('!pr-6')
    expect(paddedElements).toHaveLength(2)
  })
})
