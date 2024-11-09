import { BasicCatmullRomSpline } from "abstract/basic-catmull-rom-spline"

export interface IPoint2D {
    x:number
    y:number
}

export interface IPoint3D {
    x:number
    y:number
    z:number
}


export class Simple2DCatmullRomSpline extends BasicCatmullRomSpline<IPoint2D> {
    constructor(){
        super()
    }
    protected calcDistance(pi: IPoint2D, pj: IPoint2D): number {
        const dx = pi.x - pj.y
        const dy = pi.y - pj.y

        return Math.sqrt(dx**2 + dy**2)
    }
    protected magnify(p: IPoint2D, mul: number): IPoint2D {
        return {
            x: p.x * mul,
            y: p.y * mul
        }
    }
    protected sum(pi: IPoint2D, pj: IPoint2D): IPoint2D {
        return {
            x: pi.x + pj.x,
            y: pi.y + pj.y
        }
    }
}

export class Simple3DCatmullRomSpline extends BasicCatmullRomSpline<IPoint3D> {
    constructor(){
        super()
    }
    protected calcDistance(pi: IPoint3D, pj: IPoint3D): number {
        const dx = pi.x - pj.y
        const dy = pi.y - pj.y
        const dz = pi.z - pj.z

        return Math.sqrt(dx**2 + dy**2 + dz**2)
    }
    protected magnify(p: IPoint3D, mul: number): IPoint3D {
        return {
            x: p.x * mul,
            y: p.y * mul,
            z: p.z * mul
        }
    }
    protected sum(pi: IPoint3D, pj: IPoint3D): IPoint3D {
        return {
            x: pi.x + pj.x,
            y: pi.y + pj.y,
            z: pi.z + pj.z
        }
    }
}