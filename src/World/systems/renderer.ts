import { WebGLRenderer } from "three";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setClearColor('#262837')
    return renderer
}

export { createRenderer }

