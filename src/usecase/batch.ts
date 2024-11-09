import type { ICatmullRomSpline } from "../index";


export class BatchRunner<TPoint> {
    constructor(private readonly spline: ICatmullRomSpline<TPoint>, private readonly alpha: number, private readonly points: number) { }

    run = (samples: TPoint[]) => {
        const len = samples.length
        if (samples.length < 4) {
            return samples
        }

        const ret: TPoint[] = [samples[0]]

        for (let i = 0; i < len; i++) {
            const slice = samples.slice(i, i + 4)
            if (slice.length === 4) {
                const ipPoints = this.spline.interpolate(slice[0], slice[1], slice[2], slice[3], this.alpha, this.points)
                ret.push(slice[1])
                ret.push(...ipPoints)
            }
        }

        const last = samples.slice(samples.length - 2)
        ret.push(...last)
        return ret
    }
}