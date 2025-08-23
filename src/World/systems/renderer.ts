import { PCFSoftShadowMap, WebGLRenderer } from "three";

function createRenderer() {
    const renderer = new WebGLRenderer({ antialias: true })
    renderer.setClearColor('#262837')
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = PCFSoftShadowMap
    return renderer
}

export { createRenderer }

