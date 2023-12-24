import type { App } from "vue"

declare module '@vue/runtime-core' {
    export interface ComponentCustomProperties {
        $confetti: VueConfetti
    }
}

declare module 'vue-confetti' {
    interface ParticleOptions {
        type?: string
        size?: number
        dropRate?: number
        colors?: Array<string>
    }

    interface ConfettiOptions {
        particles?: Array<ParticleOptions>
        defaultType?: string
        defaultSize?: number
        defaultDropRate?: number
        defaultColors?: Array<string>
        canvasId?: string
        particlesPerFrame?: number
    }

    export default class VueConfetti {
        static install(app: App, options?: ConfettiOptions): void
    }

    export class Confetti {
        start(opts?: ConfettiOptions): void
        stop(): void
    }
}
