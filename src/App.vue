<script setup lang="ts">
import { data, users, usernames, displays } from './data'
import { display, input, delay } from './util'
import { ref, onMounted } from 'vue'

const main = ref(undefined as any as HTMLPreElement)

async function login(): Promise<number> {
  const el = main.value
  for (;;) {
    await display(el, 'MERRY-XMAS login (First & Last name): ', undefined, undefined, '')
    const username = (await input(el)).toLowerCase()
    await delay(500)
    for (const name in users) {
      if (username.includes(name)) {
        return users[name as keyof typeof users]
      }
    }
    await delay(4500)
    await display(el, 'Login incorrect')
  }
}

async function print(text: string, wait: number = 50, endwait: number = 100, end: string = '\n') {
  await display(main.value, text, wait, endwait, end)
}

onMounted(async () => {
  const el = main.value
  const uid = await login()
  await print('Welcome to Ubuntu 23.10 (GNU/Linux 6.5.0-14-generic x86_64, compiled by david-why)')
  await print('')
  await print(' * Source code: ')
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
  padding: 0;
  margin: 0;
}
</style>
