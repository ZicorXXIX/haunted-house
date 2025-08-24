import GUI from "lil-gui";
import { BoxGeometry, Color, Group, Light, type Mesh } from "three";

class Debugger {
    private gui: GUI
    private meshes: Map<string, Mesh> = new Map()
    constructor(options: any) {
        this.gui = new GUI({
            width: options.width || 300,
            title: options.title || "DebugUI",
            closeFolders: options.closeFolders ?? true
        })

        this.setKeyboardShortcuts()
        if (options.autoHide) {
            this.gui.close()
        }
    }

    private setKeyboardShortcuts() {
        window.addEventListener("keydown", (event) => {
            if (event.key == 'h') {
                this.toggle()
            }
            if (event.key == 'r') {
                //TODO: implement reset method
            }
        })
    }


    /**
     * Mesh Tweaks
     */

    private createMeshControls(mesh: Mesh, name: string) {
        const meshFolder = this.gui.addFolder(name)
        this.addGlobalMeshTweaks(meshFolder, mesh)
        this.addGeometryTweaks(meshFolder, mesh)
        this.addMaterialTweaks(meshFolder, mesh)
    }

    private addGlobalMeshTweaks(folder: GUI, mesh: Mesh) {
        const positionFolder = folder.addFolder("position")
        positionFolder.add(mesh.position, 'x', -10, 10, 0.1)
        positionFolder.add(mesh.position, 'y', -10, 10, 0.1)
        positionFolder.add(mesh.position, 'z', -10, 10, 0.1)

        const rotationFolder = folder.addFolder("rotation")
        rotationFolder.add(mesh.rotation, 'x', -Math.PI, Math.PI, 0.1)
        rotationFolder.add(mesh.rotation, 'y', -Math.PI, Math.PI, 0.1)
        rotationFolder.add(mesh.rotation, 'z', -Math.PI, Math.PI, 0.1)


        const scaleFolder = folder.addFolder("scale")
        scaleFolder.add(mesh.scale, 'x', 0.1, 5, 0.1)
        scaleFolder.add(mesh.scale, 'y', 0.1, 5, 0.1)
        scaleFolder.add(mesh.scale, 'z', 0.1, 5, 0.1)
    }

    private addGeometryTweaks(folder: GUI, mesh: Mesh) {
        // const debugOptions: { segments?: number } = {}
        if (mesh.geometry instanceof BoxGeometry) {
            const parameters = mesh.geometry.parameters;
            const debugOptions = {
                segments: parameters.widthSegments ?? 1
            };
            folder.add(debugOptions, 'segments', 1, 10, 1).onFinishChange(() => {
                this.updateGeometry(mesh, debugOptions, parameters)
            })
        }
    }

    private updateGeometry(mesh: Mesh, debugOptions: any, oldParams: any) {
        mesh.geometry.dispose()
        mesh.geometry = new BoxGeometry(
            oldParams.width,
            oldParams.height,
            oldParams.depth,
            debugOptions.segments,
            debugOptions.segments,
            debugOptions.segments
        )
    }

    private addMaterialTweaks(folder: GUI, mesh: Mesh) {
        if (!mesh.material) return;
        const material = mesh.material
        const materialFolder = folder.addFolder('material')

        if ('wireframe' in material) {
            materialFolder.add(material, 'wireframe')
        }
        if ('color' in material) {
            materialFolder.addColor(material, 'color')
        }
        if ('transparent' in material) {
            materialFolder.add(material, 'transparent')
        }
        if ('opacity' in material) {
            materialFolder.add(material, 'opacity')
                .min(0).max(1).step(0.1)
        }


    }


    /**
     * Lights Tweaks
     */
    private addLightTweaks(folder: GUI, light: Light) {
        const positionFolder = folder.addFolder('position')
        positionFolder.add(light.position, 'x', -10, 10, 0.1)
        positionFolder.add(light.position, 'y', -10, 10, 0.1)
        positionFolder.add(light.position, 'z', -10, 10, 0.1)

        if ('intensity' in light) {
            folder.add(light, 'intensity', 0, 10, 0.1);
        }

        if ('color' in light) {
            folder.addColor({ color: `#${light.color.getHexString()}` }, 'color')
                .onChange((value: string) => {
                    light.color = new Color(value);
                })
        }

    }



    /**
     * addMesh
     */
    public addMesh(mesh: Mesh, name?: string): this {
        const meshName = name || mesh.name || `Mesh_${this.meshes.size + 1}`
        this.meshes.set(meshName, mesh)
        this.createMeshControls(mesh, meshName)
        return this
    }

    /**
     * addLight
     */
    public addLight(light: Light, name: string): this {
        const lightName = name || light.name
        const lightFolder = this.gui.addFolder(lightName)
        this.addLightTweaks(lightFolder, light)
        return this
    }

    /**
     * addGroup
     */
    public addGroup(group: Group, name: string) {
        const groupName = name || group.name
        const groupFolder = this.gui.addFolder(groupName)

        this.addGlobalMeshTweaks(groupFolder, group as unknown as Mesh)

        group.children.forEach((child, index) => {
            const childName = child.name || `${child.type}_${index}`

            if ((child as Mesh).isMesh) {
                this.createMeshControls(child as Mesh, childName)
            } else if ((child as Light).isLight) {
                const lightFolder = groupFolder.addFolder(childName)
                this.addLightTweaks(lightFolder, child as Light)
            } else if ((child as Group).isGroup) {
                this.addGroup(child as Group, childName)
            }
        })

    }

    /**
     * toggle
     */
    public toggle(): this {
        this.gui.show(this.gui._hidden)
        return this
    }
}

export { Debugger }
