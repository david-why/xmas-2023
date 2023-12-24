import { quotes } from './data'

const DEFAULT_WAIT = 50
const DEFAULT_ENDWAIT = 100

export function delay(time: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

export async function display(
  el: HTMLElement,
  text: string,
  wait: number = DEFAULT_WAIT,
  endwait: number = DEFAULT_ENDWAIT,
  end: string = '\n'
): Promise<void> {
  text += end
  el.innerHTML += '_'
  for (let i = 0; i < text.length; i++) {
    const ch = text.substring(i, i + 1)
    el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1) + ch + '_'
    if (i != text.length - 1) await delay(wait)
    window.scrollTo(0, document.body.scrollHeight)
  }
  await delay(endwait)
  el.innerHTML = el.innerHTML.substring(0, el.innerHTML.length - 1)
}

export function input(el: HTMLElement, wait?: number): Promise<string> {
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

export function mkprint(el: HTMLElement, defaultEnd: string = '\n\n') {
  async function print(
    text: string = '',
    end: string = defaultEnd,
    wait?: number,
    endwait?: number
  ) {
    await display(el, text, wait, endwait, end)
  }
  return print
}

export async function displayQuote(
  el: HTMLElement,
  id: string,
  wait?: number,
  author: boolean = false,
  quoter: boolean = false,
  context: boolean = true,
  timestamp: boolean = true
) {
  const print = mkprint(el)
  for (const quote of quotes) {
    if (quote.id === id) {
      let text = '  ' + quote.content
      if (author) text += ` -- ${quote.from}`
      if (timestamp) text += ' (' + new Date(quote.timestamp * 1000).toLocaleString() + ')'
      if (quoter && quote.quoter !== null) text += ` (quoted by ${quote.quoter})`
      if (context && quote.context !== null) text += `\n    Context: ${quote.context}`
      await print(text, undefined, wait)
      return
    }
  }
  await print('Oops, the quote has gone missing :-( It was definitely interesting though!')
}

export async function randomQuote(
  el: HTMLElement,
  prompt: string = `Please tell me a random number between 1 and ${quotes.length}: `,
  beforeQuote: string = 'Here is your quote:'
) {
  const print = mkprint(el)
  for (;;) {
    await print(prompt, '')
    const strnum = await input(el)
    const num = parseInt(strnum)
    if (isNaN(num) || num < 1 || num > quotes.length) {
      await print(`That is not a number between 1 and ${quotes.length}. Try again!`, '\n')
      continue
    }
    // const random = mkrandom(num)
    // const idx = Math.floor(random() * quotes.length)
    const quote = quotes[num]
    await print(beforeQuote)
    await displayQuote(el, quote.id, undefined, true, false, true, true)
    return
  }
}

// https://stackoverflow.com/a/47593316
export function mkrandom(a: number): () => number {
  return function () {
    let t = (a += 0x6d2b79f5)
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}
