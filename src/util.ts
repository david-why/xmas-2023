export function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export async function display(
  el: HTMLElement,
  text: string,
  wait: number = 50,
  endwait: number = 100,
  end: string = '\n'
): Promise<void> {
  text += end
  if (el.textContent === null) el.textContent = ''
  el.textContent += '_'
  for (let i = 0; i < text.length; i++) {
    const ch = text.substring(i, i + 1)
    el.textContent = el.textContent.substring(0, el.textContent.length - 1) + ch + '_'
    if (i != text.length - 1) await delay(wait)
  }
  await delay(endwait)
  el.textContent = el.textContent.substring(0, el.textContent.length - 1)
}

export function input(el: HTMLElement, wait: number = 50): Promise<string> {
  const chd = document.createElement('input')
  chd.type = 'text'
  el.append(chd)
  chd.focus()
  return new Promise((resolve) => {
    const listener = (ev: KeyboardEvent) => {
      if (ev.key == 'Enter') {
        ev.preventDefault()
        chd.removeEventListener('keypress', listener)
        const text = chd.value
        chd.remove()
        display(el, text, wait, 0).then(() => resolve(text))
      }
    }
    chd.addEventListener('keypress', listener)
  })
}
