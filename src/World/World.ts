import { createLights } from "./components/ambientLight";
import { createCamera } from "./components/camera";
import { createCube } from "./components/cube";
import { createHouse } from "./components/house";
import { createPlane } from "./components/plane";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Debugger } from "./systems/Debugger";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";

class World {
    private scene: ReturnType<typeof createScene>
    private camera: ReturnType<typeof createCamera>
    private renderer: ReturnType<typeof createRenderer>
    private loop: Loop
    constructor(container: Element) {
        this.scene = createScene()
        this.camera = createCamera()
        this.renderer = createRenderer()
        this.loop = new Loop(this.scene, this.camera, this.renderer)
        container.appendChild(this.renderer.domElement)

        const controls = createControls(this.camera, container as HTMLElement)
        this.loop.updatables.push(controls)

        const house = createHouse()
        const plane = createPlane()
        const lights = createLights()
        const debugUi = new Debugger({})
        debugUi.addGroup(house, "House")
        debugUi.addGroup(lights, "Lights")
        // debugUi.addMesh(house, "cube")
        this.scene.add(house, plane, lights)
        const resizer = new Resizer(container, this.camera, this.renderer)
    }

    //render on demand (produce a single frame)
    render() {
        this.renderer.render(this.scene, this.camera)
    }

    start() {
        this.loop.start()
    }

    stop() {
        this.loop.stop()
    }
}

export { World }
