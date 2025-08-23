import { BoxGeometry, Group, Mesh, MeshStandardMaterial } from "three";

function createGraves() {
    const graves = new Group()
    const graveGeometry = new BoxGeometry(0.6, 0.8, 0.2)
    const graveMaterial = new MeshStandardMaterial({ color: 'grey' })

    for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2
        const radius = 3 + Math.random() * 6
        const x = Math.sin(angle) * radius
        const z = Math.cos(angle) * radius

        const grave = new Mesh(graveGeometry, graveMaterial)
        grave.position.set(x, 0.3, z)
        grave.rotation.y = (Math.random() - 0.5) * 0.4
        grave.rotation.z = (Math.random() - 0.5) * 0.4
        grave.castShadow = true
        graves.add(grave)
    }
    return graves
}

export { createGraves }
