
import { ContainerComponent } from './container'
import { Component, html, IComponent } from '../utils'

@Component(
    'player-broadcaster',
    html`<div class="player-broadcaster">
        <div class="float-layer" hidden>
            <span class="subtitle"></span>
        </div>
    </div>`
)
export class BroadcasterComponent implements IComponent {
    parent: HTMLElement
    target: HTMLElement
    broadcaster: HTMLElement
    floatLayer: HTMLElement
    subtitle: HTMLElement
    c: ContainerComponent
    constructor(container: ContainerComponent) {
        this.c = container
        this.init()
    }

    private init() {
        this.broadcaster = this.c.container.querySelector('.player-broadcaster') as HTMLElement
        this.floatLayer = this.broadcaster.firstElementChild as HTMLElement
        this.subtitle = this.floatLayer.firstElementChild as HTMLElement
    }

    public updateText(text: string) {
        text = text.trim()
        if (this.subtitle.innerText.trim() === text) {
            return
        }

        this.subtitle.innerText = text
        this.floatLayer.toggleAttribute('hidden', !text)
    }

    public cleanText() {
        this.updateText('')
    }
}
