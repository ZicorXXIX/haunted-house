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
            this.tick()
            this.renderer.render(this.scene, this.camera)
        })
    }
    stop() {
        this.renderer.setAnimationLoop(null)
    }
    tick() {
        const delta = clock.getDelta()
        for (let obj of this.updatables) {
            obj.tick(delta)
        }
    }
}

export { Loop }
