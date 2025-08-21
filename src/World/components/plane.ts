import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three"

function createPlane() {
    const geometry = new PlaneGeometry(20, 20)
    const material = new MeshBasicMaterial({ color: '#a9c388' })
    const plane = new Mesh(geometry, material)
    plane.position.y = 0
    plane.rotation.x = - Math.PI / 2
    return plane
}

export { createPlane }
