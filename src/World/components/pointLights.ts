import { PointLight, Scene } from "three"
import type { AnimatedObject3d } from "./types"

function createRandomlyMovingPointLights(scene: Scene) {
    const ghost1 = new PointLight('#ff00ff', 3, 3)
    ghost1.castShadow = true
    ghost1.shadow.mapSize.width = 256
    ghost1.shadow.mapSize.height = 256
    ghost1.shadow.camera.far = 7
    scene.add(ghost1)

    const ghost2 = new PointLight('#00ffff', 3, 3)
    ghost2.castShadow = true
    ghost2.shadow.mapSize.width = 256
    ghost2.shadow.mapSize.height = 256
    ghost2.shadow.camera.far = 7
    scene.add(ghost2)

    const ghost3 = new PointLight('#ff7800', 3, 3)
    ghost3.castShadow = true
    ghost3.shadow.mapSize.width = 256
    ghost3.shadow.mapSize.height = 256
    ghost3.shadow.camera.far = 7
    scene.add(ghost3);

    (ghost1 as unknown as AnimatedObject3d).tick = (elapsedTime: number) => {
        const ghost1Angle = elapsedTime * 0.5
        ghost1.position.x = Math.cos(ghost1Angle) * 4
        ghost1.position.z = Math.sin(ghost1Angle) * 4
        ghost1.position.y = Math.sin(elapsedTime * 3)

        const ghost2Angle = - elapsedTime * 0.32
        ghost2.position.x = Math.cos(ghost2Angle) * 5
        ghost2.position.z = Math.sin(ghost2Angle) * 5
        ghost2.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)

        const ghost3Angle = - elapsedTime * 0.18
        ghost3.position.x = Math.cos(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.32))
        ghost3.position.z = Math.sin(ghost3Angle) * (7 + Math.sin(elapsedTime * 0.5))
        ghost3.position.y = Math.sin(elapsedTime * 4) + Math.sin(elapsedTime * 2.5)
    }

    return ghost1
}

export { createRandomlyMovingPointLights }
