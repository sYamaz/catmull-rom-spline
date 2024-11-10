export interface ICatmullRomSpline<T> {
    /**
     * 
     * @param p0 control point 0
     * @param p1 control point 1
     * @param p2 control point 2
     * @param p3 control point 3
     * @param alpha tension parameter（range: 0.0 ~ 1.0)
     * @param points desired curve points
     */
    interpolate(p0: T, p1: T, p2:T, p3:T, alpha: number, points: number): T[]
}

export abstract class BasicCatmullRomSpline<TPoint> implements ICatmullRomSpline<TPoint> {
    /**
     * 2点間の距離を返します
     * @param pi 点i
     * @param pj 点j
     */
    protected abstract calcDistance (pi:TPoint, pj:TPoint):number
    /**
     * 原点を基準に座標を定数倍した座標を生成し、返します
     * @param p 
     * @param mul 
     */
    protected abstract magnify (p:TPoint, mul:number): TPoint
    /**
     * ２点を加えた座標を生成し、返します
     * @param pi 
     * @param pj 
     */
    protected abstract sum(pi:TPoint, pj:TPoint):TPoint

    protected calcTj = (ti:number, pi:TPoint, pj:TPoint, alpha:number):number => {
        return Math.pow(this.calcDistance(pi, pj), alpha) + ti
    }

    protected calcTjArray = (p0: TPoint, p1: TPoint, p2: TPoint, p3: TPoint, alpha: number): [t0: number, t1: number, t2: number, t3: number] => {
        const t0 = 0
        const t1 = this.calcTj(t0, p0, p1, alpha)
        const t2 = this.calcTj(t1, p1, p2, alpha)
        const t3 = this.calcTj(t2, p2, p3, alpha)
    
        return [t0, t1, t2, t3]
    }

    /**
     * 等差数列を作成し、中間値の配列を返します。
     * @param start 開始値
     * @param end 終了値
     * @param count 中間値の数. 0以上の整数であること
     * @returns 中間値の配列
     */
    private generateLinspaceMidValues = (start: number, end: number, count: number) => {
        /** 中間値の数が0以下の時は空の配列を返す */
        if (count <= 0) return []

        const step = (end - start) / (count + 1); // 等差を計算。中間値の数が1の時は区間を2で割る
        const sequence = [];

        for (let i = 0; i < count; i++) {
            sequence.push(start + step * (i + 1));
        }

        return sequence;
    }

    public interpolate = (p0: TPoint, p1: TPoint, p2:TPoint, p3:TPoint, alpha: number, points: number): TPoint[] => {
        // t0~t3を算出する
        const [t0, t1, t2, t3] = this.calcTjArray(p0, p1, p2, p3, alpha)

        // t1とt2の等差数列
        const fromT1toT2 = this.generateLinspaceMidValues(t1, t2, points)

        const ret: TPoint[] = []
        for (const t of fromT1toT2) {
            const t0_t = t0 - t
            const t1_t = t1 - t
            const t2_t = t2 - t
            const t3_t = t3 - t
            const t1_t0 = t1 - t0
            const t2_t0 = t2 - t0
            const t2_t1 = t2 - t1
            const t3_t1 = t3 - t1
            const t3_t2 = t3 - t2

            const a1 = this.sum(this.magnify(p0, t1_t / t1_t0), this.magnify(p1, -t0_t / t1_t0))
            const a2 = this.sum(this.magnify(p1, t2_t / t2_t1), this.magnify(p2, -t1_t / t2_t1))
            const a3 = this.sum(this.magnify(p2, t3_t / t3_t2), this.magnify(p3, -t2_t / t3_t2))
            const b1 = this.sum(this.magnify(a1, t2_t / t2_t0), this.magnify(a2, -t0_t / t2_t0))
            const b2 = this.sum(this.magnify(a2, t3_t / t3_t1), this.magnify(a3, -t1_t / t3_t1))
            const p =  this.sum(this.magnify(b1, t2_t / t2_t1), this.magnify(b2, -t1_t / t2_t1))
            ret.push(p)
        }
        return ret
    }
}

export interface IPoint2D {
    x:number
    y:number
}

export class Simple2DCatmullRomSpline extends BasicCatmullRomSpline<IPoint2D> {
    constructor(){
        super()
    }
    protected calcDistance(pi: IPoint2D, pj: IPoint2D): number {
        const dx = pi.x - pj.x
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


export interface IPoint3D {
    x:number
    y:number
    z:number
}

export class Simple3DCatmullRomSpline extends BasicCatmullRomSpline<IPoint3D> {
    constructor(){
        super()
    }
    protected calcDistance(pi: IPoint3D, pj: IPoint3D): number {
        const dx = pi.x - pj.x
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

export * from './usecase/index'