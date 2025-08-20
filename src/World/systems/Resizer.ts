import type { PerspectiveCamera, WebGLRenderer } from "three"


class Resizer {
    private container: Element
    private camera: PerspectiveCamera
    private renderer: WebGLRenderer
    constructor(container: Element, camera: PerspectiveCamera, renderer: WebGLRenderer) {
        this.container = container
        this.camera = camera
        this.renderer = renderer
        this.setSize()
        window.addEventListener('resize', () => {
            this.setSize()
            this.onResize()
        })
    }
    private setSize() {
        this.camera.aspect = this.container.clientWidth / this.container.clientHeight
        this.camera.updateProjectionMatrix()

        this.renderer.setSize(this.container.clientWidth, this.container.clientHeight)
        this.renderer.setPixelRatio(window.devicePixelRatio)
    }

    //to perform custom action on resize
    onResize() { }
}

export { Resizer }
