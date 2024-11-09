import {Simple2DCatmullRomSpline, IPoint2D} from '../src/index'

const batchExecute = (samples: IPoint2D[], interporatePoints: number, alpha: number) => {

    const spline = new Simple2DCatmullRomSpline()

    const len = samples.length
    if (samples.length < 4) {
        return samples
    }

    const ret: IPoint2D[] = [samples[0]] 

    for (let i = 0; i < len; i++) {
        const slice = samples.slice(i, i + 4)
        if (slice.length === 4) {
            const ipPoints = spline.interpolate(slice[0], slice[1], slice[2], slice[3], alpha, interporatePoints)
            ret.push(slice[1])
            ret.push(...ipPoints)
        }
    }

    const last = samples.slice(samples.length -2)
    ret.push(...last)
    return ret
}

const points:IPoint2D[] = [
    {x:1, y:1},
    {x:2, y:6},
    {x:3, y:3},
    {x:4, y:3.5},
    {x:5, y:10},
    {x:6, y:11},
]

console.log(batchExecute(points, 5, 0.5))