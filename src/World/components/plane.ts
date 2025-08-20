import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three"

function createPlane() {
    const geometry = new PlaneGeometry(1, 1)
    const material = new MeshBasicMaterial({ color: 'blue' })
    const plane = new Mesh(geometry, material)
    plane.position.x = 3
    return plane
}

export { createPlane }
