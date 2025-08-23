import { AmbientLight, DirectionalLight, Group, PointLight } from "three"

function createLights() {
    const lights = new Group()
    const ambientLight = new AmbientLight('#b9d5ff', 0.12)
    ambientLight.name = "Ambient Light"
    lights.add(ambientLight)

    const moonLight = new DirectionalLight('#b9d5ff', 0.12)
    moonLight.name = "Moon Light(DirectionalLight)"
    moonLight.position.set(4, 5, - 2)
    moonLight.castShadow = true
    moonLight.shadow.mapSize.width = 256
    moonLight.shadow.mapSize.height = 256
    moonLight.shadow.camera.far = 15
    lights.add(moonLight)

    const doorLights = new PointLight('#ff7d46', 1, 7)
    doorLights.position.set(0, 2.2, 2.7)
    doorLights.castShadow = true
    doorLights.shadow.mapSize.width = 256
    doorLights.shadow.mapSize.height = 256
    doorLights.shadow.camera.far = 7
    lights.add(doorLights)
    return lights
}

export { createLights }
