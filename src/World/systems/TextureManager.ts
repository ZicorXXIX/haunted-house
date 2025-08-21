import { Texture, TextureLoader } from "three";

class TextureManager {
    private loader = new TextureLoader()
    private cache = new Map<string, Texture>

    /**
     * load
     */
    public load(path: string): Texture {
        if (this.cache.has(path)) {
            return this.cache.get(path)!
        }

        const texture = this.loader.load(path)
        this.cache.set(path, texture)
        return texture
    }

    /**
     * get
     */
    public get(path: string): Texture | undefined {
        return this.cache.get(path)
    }

    // Not needed for this static project but might need in future dynamic projects
    public dispose(path: string) {
        const texture = this.cache.get(path)
        if (texture) {
            texture.dispose()
            this.cache.delete(path)
        }
    }

    /** Dispose all cached textures */
    public disposeAll() {
        this.cache.forEach(texture => texture.dispose())
        this.cache.clear()
    }
}

const textureManager = new TextureManager()
export { textureManager }
