import { PointLight, type Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function createGhost(aura: PointLight): Promise<Object3D> {
    let gastly: Object3D;
    const loader = new GLTFLoader()
    return new Promise((resolve, reject) => {
        loader.load('./assets/gastly.glb', (gltf) => {
            gastly = gltf.scene;
            gastly.scale.set(0.5, 0.5, 0.5);
            gastly.tick = (delta: number) => {

                gastly.position.x = Math.cos(delta) * 3
                gastly.position.z = Math.sin(delta) * 3
                gastly.position.y = Math.sin(delta) * 0.5
                aura.position.x = Math.cos(delta) * 3
                aura.position.z = Math.sin(delta) * 3
                aura.position.y = Math.sin(delta) * 0.5
                // console.log(`x:${gastly.position.x} z: ${gastly.position.z}`)
            }
            resolve(gastly)
        },
            undefined,
            (error) => reject(error)
        );

    })
}

export { createGhost }
