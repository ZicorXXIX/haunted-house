import { Fog } from "three";

function createFog() {
    const fog = new Fog('#262837', 1, 15)
    return fog
}

export { createFog }
