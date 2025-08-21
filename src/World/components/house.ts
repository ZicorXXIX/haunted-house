import { BoxGeometry, ConeGeometry, Group, Mesh, MeshStandardMaterial, PlaneGeometry, SphereGeometry } from "three";

function createHouse() {
    const house = new Group()

    //walls
    const walls = new Mesh(
        new BoxGeometry(4, 2.5, 4),
        new MeshStandardMaterial({ color: 'brown' })
    )
    walls.name = 'walls'
    walls.position.y = 2.5 / 2
    house.add(walls)

    //roof
    const roof = new Mesh(
        new ConeGeometry(3.5, 1, 4),
        new MeshStandardMaterial({ color: 'orange' })
    )
    roof.name = 'roof'
    roof.position.y = 2.5 + 0.5
    roof.rotation.y = Math.PI / 4
    house.add(roof)

    //door
    const door = new Mesh(
        new PlaneGeometry(2, 2),
        new MeshStandardMaterial({ color: '#aa7b7b' })
    )
    door.name = 'door'
    door.position.y = 2 / 2
    door.position.z = 4 / 2 + 0.01
    house.add(door)

    //bushes
    const bushGeometry = new SphereGeometry(1, 16, 16)
    const bushMaterial = new MeshStandardMaterial({ color: 'green' })

    const bush1 = new Mesh(bushGeometry, bushMaterial)
    bush1.scale.set(0.5, 0.5, 0.5)
    bush1.position.set(0.8, 0.2, 2.2)


    const bush2 = new Mesh(bushGeometry, bushMaterial)
    bush2.scale.set(0.25, 0.25, 0.25)
    bush2.position.set(1.4, 0.1, 2.1)


    const bush3 = new Mesh(bushGeometry, bushMaterial)
    bush3.scale.set(0.4, 0.4, 0.4)
    bush3.position.set(-0.8, 0.1, 2.2)

    const bush4 = new Mesh(bushGeometry, bushMaterial)
    bush4.scale.set(0.15, 0.15, 0.15)
    bush4.position.set(-1, 0.05, 2.6)
    house.add(bush1, bush2, bush3, bush4)


    return house
}

export { createHouse }
