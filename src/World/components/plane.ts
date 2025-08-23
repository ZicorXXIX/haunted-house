import { Mesh, MeshBasicMaterial, MeshStandardMaterial, PlaneGeometry, RepeatWrapping } from "three"
import { grassAoTexture, grassNormalTexture, grassRoughnessTexture, grassTexture } from "./textures"

function createPlane() {
    const geometry = new PlaneGeometry(20, 20)
    const material = new MeshStandardMaterial({
        map: grassTexture,
        roughnessMap: grassRoughnessTexture,
        normalMap: grassNormalTexture,
        aoMap: grassAoTexture
    })
    grassTexture.repeat.set(8, 8)
    grassRoughnessTexture.repeat.set(8, 8)
    grassNormalTexture.repeat.set(8, 8)
    grassAoTexture.repeat.set(8, 8)

    grassTexture.wrapS = RepeatWrapping
    grassRoughnessTexture.wrapS = RepeatWrapping
    grassNormalTexture.wrapS = RepeatWrapping
    grassAoTexture.wrapS = RepeatWrapping

    grassTexture.wrapT = RepeatWrapping
    grassRoughnessTexture.wrapT = RepeatWrapping
    grassNormalTexture.wrapT = RepeatWrapping
    grassAoTexture.wrapT = RepeatWrapping

    const plane = new Mesh(geometry, material)
    plane.position.y = 0
    plane.rotation.x = - Math.PI / 2
    plane.receiveShadow = true
    return plane
}

export { createPlane }
