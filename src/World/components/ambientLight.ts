import { AmbientLight, DirectionalLight, Group } from "three"

function createLights() {
    const lights = new Group()
    const ambientLight = new AmbientLight('#ffffff', 0.5)
    ambientLight.name = "Ambient Light"
    lights.add(ambientLight)

    const moonLight = new DirectionalLight('#ffffff', 0.5)
    moonLight.name = "Moon Light(DirectionalLight)"
    moonLight.position.set(4, 5, - 2)
    lights.add(moonLight)
    return lights
}

export { createLights }
