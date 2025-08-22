import { AxesHelper, PointLight, type Object3D } from "three";
import { GLTFLoader } from "three/examples/jsm/Addons.js";

function createGhost(aura: PointLight): Promise<Object3D> {
    let gastly: Object3D;
    const loader = new GLTFLoader()
    return new Promise((resolve, reject) => {
        loader.load('./assets/gastly.glb', (gltf) => {
            gastly = gltf.scene;
            gastly.scale.set(0.5, 0.5, 0.5);
            // gastly.children[0].rotation.y = Math.PI; // flip forward direction
            // gastly.add(new AxesHelper(2));
            gastly.tick = (delta: number) => {
                const prevX = gastly.position.x;
                const prevZ = gastly.position.z;

                gastly.position.x = Math.cos(delta) * 3;
                gastly.position.z = Math.sin(delta) * 3;
                gastly.position.y = Math.sin(delta) * 0.5;

                const dirX = gastly.position.x - prevX;
                const dirZ = gastly.position.z - prevZ;

                // Only update rotation if there's significant movement
                if (Math.abs(dirX) > 0.01 || Math.abs(dirZ) > 0.01) {
                    // Look in the OPPOSITE direction (reverse the direction vector)
                    const targetX = gastly.position.x - dirX; // Note the minus sign
                    const targetZ = gastly.position.z - dirZ; // Note the minus sign
                    gastly.lookAt(targetX, gastly.position.y, targetZ);
                }

                aura.position.copy(gastly.position);
            }
            // gastly.tick = (delta: number) => {
            //
            //     gastly.position.x = Math.cos(delta) * 3
            //     gastly.position.z = Math.sin(delta) * 3
            //     gastly.position.y = Math.sin(delta) * 0.5
            //     aura.position.x = Math.cos(delta) * 3
            //     aura.position.z = Math.sin(delta) * 3
            //     aura.position.y = Math.sin(delta) * 0.5
            //     // console.log(`x:${gastly.position.x} z: ${gastly.position.z}`)
            // }
            resolve(gastly)
        },
            undefined,
            (error) => reject(error)
        );

    })
}

export { createGhost }
