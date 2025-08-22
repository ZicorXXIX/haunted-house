import { createLights } from "./components/ambientLight";
import { createCamera } from "./components/camera";
import { createFog } from "./components/fog";
import { createGraves } from "./components/graves";
import { createHouse } from "./components/house";
import { createPlane } from "./components/plane";
import { createScene } from "./components/scene";
import { createControls } from "./systems/controls";
import { Debugger } from "./systems/Debugger";
import { Loop } from "./systems/Loop";
import { createRenderer } from "./systems/renderer";
import { Resizer } from "./systems/Resizer";
import { PointLight, type Object3D } from "three";
import { createGhost } from "./components/gastly";

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

        const aura = new PointLight('#ff00ff', 2, 3)
        const gastly = createGhost(aura).then((gastly: Object3D) => {
            this.scene.add(gastly)
            this.loop.updatables.push(gastly)
        })
        const house = createHouse()
        const graves = createGraves()
        const plane = createPlane()
        const lights = createLights()
        const fog = createFog()
        const debugUi = new Debugger({})
        debugUi.addGroup(house, "House")
        debugUi.addGroup(lights, "Lights")
        // debugUi.addMesh(house, "cube")
        this.scene.add(aura, house, plane, lights, graves)
        this.scene.fog = fog
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
