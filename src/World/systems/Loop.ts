import { Camera, Clock, Scene, WebGLRenderer } from "three";
const clock = new Clock()

class Loop {
    private scene: Scene
    private camera: Camera
    private renderer: WebGLRenderer
    public updatables: Array<any>

    constructor(scene: Scene, camera: Camera, renderer: WebGLRenderer) {
        this.scene = scene
        this.camera = camera
        this.renderer = renderer
        this.updatables = []
    }

    start() {
        this.renderer.setAnimationLoop(() => {
            const delta = clock.getElapsedTime()
            this.tick(delta)
            this.renderer.render(this.scene, this.camera)
        })
    }
    stop() {
        this.renderer.setAnimationLoop(null)
    }
    tick(delta: number) {
        for (let obj of this.updatables) {
            obj.tick(delta)
        }
    }
}

export { Loop }
