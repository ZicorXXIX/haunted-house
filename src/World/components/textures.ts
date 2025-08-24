import { textureManager } from '../systems/TextureManager'

const base = import.meta.env.BASE_URL;


export const wallTexture = textureManager.load(`${base}/assets/textures/color.jpg`);
export const wallAoTexture = textureManager.load(`${base}/assets/textures/ambientOcclusion.jpg`);
export const wallNormalTexture = textureManager.load(`${base}/assets/textures/normal.jpg`);
export const wallRoughnessTexture = textureManager.load(`${base}/assets/textures/roughness.jpg`);

export const doorTexture = textureManager.load(`${base}/assets/textures/door/color.jpg`);
export const doorAoTexture = textureManager.load(`${base}/assets/textures/door/ambientOcclusion.jpg`);
export const doorNormalTexture = textureManager.load(`${base}/assets/textures/door/normal.jpg`);
export const doorRoughnessTexture = textureManager.load(`${base}/assets/textures/door/roughness.jpg`);
export const doorAlphaTexture = textureManager.load(`${base}/assets/textures/door/alpha.jpg`);
export const doorHeightTexture = textureManager.load(`${base}/assets/textures/door/height.jpg`);
export const doorMetalnessTexture = textureManager.load(`${base}/assets/textures/door/metalness.jpg`);

export const grassTexture = textureManager.load(`${base}/assets/textures/grass/color.jpg`);
export const grassAoTexture = textureManager.load(`${base}/assets/textures/grass/ambientOcclusion.jpg`);
export const grassNormalTexture = textureManager.load(`${base}/assets/textures/grass/normal.jpg`);
export const grassRoughnessTexture = textureManager.load(`${base}/assets/textures/grass/roughness.jpg`);

