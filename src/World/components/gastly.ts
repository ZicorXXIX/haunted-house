import { PointLight, Scene, type Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import type { AnimatedObject3d } from "./types";


interface GhostModel {
    path: string;
    name: string;
    scale: number;
    flip?: boolean;
}

const GHOST_MODELS: GhostModel[] = [
    { path: './assets/models/gastly.glb', name: 'Gastly', scale: 0.5, flip: true },
    { path: './assets/models/haunter.glb', name: 'Haunter', scale: 0.2 },
];

async function spawnGhosts(scene: Scene, ghostsCount: { [key: string]: number }) {
    const ghosts: AnimatedObject3d[] = []

    for (const [ghostName, count] of Object.entries(ghostsCount)) {
        const model = GHOST_MODELS.find(m => m.name.toLowerCase() === ghostName.toLowerCase());
        if (!model) return null
        for (let i = 0; i < count; i++) {
            //Offsets
            const offsetX = (Math.random() - 0.5) * 15
            const offsetZ = (Math.random() - 0.5) * 15

            const radius = 2 + Math.random() * 3
            const speed = 0.5 + Math.random()

            const aura = new PointLight('#ff00ff', 2, 3)

            try {
                const ghost = await createGhost(model?.path, model?.scale, aura, offsetX, offsetZ, radius, speed, model.flip as boolean)
                scene.add(ghost)
                scene.add(aura)
                ghosts.push(ghost as AnimatedObject3d)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return ghosts

}


function createGhost(path: string, scale: number, aura: PointLight, offsetX = 0, offsetZ = 0, radius = 3, speed = 1, flip: boolean): Promise<Object3D> {
    let gastly: Object3D;
    const loader = new GLTFLoader()
    return new Promise((resolve, reject) => {
        loader.load(path, (gltf) => {
            gastly = gltf.scene
            gastly.scale.set(scale, scale, scale);
            (gastly as AnimatedObject3d).tick = (delta: number) => {
                const prevX = gastly.position.x
                const prevZ = gastly.position.z

                gastly.position.x = offsetX + Math.cos(delta * speed) * radius
                gastly.position.z = offsetZ + Math.sin(delta * speed) * radius
                gastly.position.y = Math.sin(delta * speed) + 0.5

                const dirX = gastly.position.x - prevX
                const dirZ = gastly.position.z - prevZ

                // Only update rotation if there's significant movement
                if (Math.abs(dirX) > 0.01 || Math.abs(dirZ) > 0.01) {
                    const targetX = flip
                        ? gastly.position.x - dirX
                        : gastly.position.x + dirX;
                    const targetZ = flip
                        ? gastly.position.z - dirZ
                        : gastly.position.z + dirZ;
                    gastly.lookAt(targetX, gastly.position.y, targetZ)
                }

                aura.position.copy(gastly.position)
            }
            resolve(gastly)
        },
            undefined,
            (error) => reject(error)
        );

    })
}



export { createGhost, spawnGhosts }
