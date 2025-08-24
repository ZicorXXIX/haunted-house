import { Object3D } from "three";

interface AnimatedObject3d extends Object3D {
    tick: (delta: number) => void
}

export type { AnimatedObject3d }
