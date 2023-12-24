<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import type { Confetti } from 'vue-confetti'
import { displays, users, usernames } from './data'
import { delay, display, input, mkprint, randomQuote } from './util'
const confetti: Confetti = inject('confetti') as Confetti

const main = ref(undefined as any as HTMLPreElement)

const query = new URLSearchParams(location.search)

const skip = query.has('skip')
const forceUser = query.get('user')

async function login(): Promise<number> {
  if (forceUser !== null) {
    return parseInt(forceUser)
  }
  const el = main.value
  const print = mkprint(el, '\n')
  for (;;) {
    await print('MERRY-XMAS login: ', '')
    const username = (await input(el)).toLowerCase()
    await delay(500)
    await print()
    for (const name in users) {
      if (username.includes(name)) {
        return users[name as keyof typeof users]
      }
    }
    await delay(1500)
    await print('Login incorrect (input your first and/or last name!)')
  }
}

onMounted(async () => {
  const el = main.value
  const print = mkprint(el, '\n')
  // await print('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum efficitur ipsum enim, a vestibulum eros aliquet quis. Fusce in egestas est. Donec interdum aliquet lorem eget pellentesque. Etiam vitae pharetra ligula, eget accumsan dui. Donec maximus sagittis dolor bibendum commodo. Mauris sed dictum sem, sit amet tristique nunc. Vivamus hendrerit orci eget urna sodales, in finibus dolor aliquet. Suspendisse potenti. Etiam eget erat eu tortor mollis ullamcorper. Cras tellus nulla, aliquam vel ligula non, porta varius urna. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nullam bibendum tincidunt leo at vulputate. Cras sed leo non lectus gravida sagittis. Nullam iaculis ut tellus eget rhoncus. Suspendisse facilisis odio ut lacus ullamcorper aliquet. Mauris ac scelerisque felis. ','\n',5)
  if (!skip) {
    await print('Starting MERRY-XMAS virtual machine...')
    await delay(500)
    await print('Connecting to /dev/tty1...')
    await delay(2000)
    el.innerHTML = ''
  }
  const uid = await login()
  await print(`Logged in as ${usernames[uid]}`)
  if (!skip) {
    await print(
      'Welcome to XMas Machine 23.10 (Notlinux 1.4-34-generic x68_46, compiled by david-why)'
    )
    await print()
    await print(' * Source code:  https://github.com/david-why/xmas-2023')
    await print(' * Support:      https://t.ly/9nJnN')
    await print()
    await print(`${usernames[uid]}@MERRY-XMAS:~$`, ' ')
    await delay(1000)
    await print('run-merry-xmas')
    await delay(2000)
    await print('\n')
  }
  await displays[uid](el, confetti)
  await randomQuote(
    el,
    'Tell me a random number between 1 and 100: ',
    'Nice choice! Here is your random quote:'
  )
  await randomQuote(
    el,
    "Alright, let's do another one! Another random number between 1 and 100, please: ",
    'OK! This time, your quote is:'
  )
  await print('Nice! Thank you for bearing with me on this digital christmas card.')
  confetti.start()
  await print('Once again, I wish you a very merry Christmas, and a very happy New Year!')
  confetti.stop()
  await print('Goodbye!')
  // await print('Press any key to close...')
})
</script>

<template>
  <pre class="main" ref="main"></pre>
</template>

<style scoped>
.main {
  padding: 1em;
  color: var(--vt-c-text-dark-1);
  font-family: 'Courier New', Courier, monospace;
}
</style>

<style>
input {
  background-color: inherit;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  border-width: 0;
  border-bottom: 2px solid var(--vt-c-divider-dark-2);
  padding: 0;
  margin: 0;
}
</style>
