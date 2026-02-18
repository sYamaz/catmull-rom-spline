import {BasicCatmullRomSpline} from "../src/index.js"

interface SamplePoint {
    x:number
    y:number
}

class SampleClass extends BasicCatmullRomSpline<SamplePoint> {
    protected calcDistance = (pi: SamplePoint, pj: SamplePoint): number => {
        const dx = pi.x - pj.x
        const dy = pi.y - pj.y
        return Math.sqrt(dx**2 + dy**2)
    }
    protected magnify = (p: SamplePoint, mul: number): SamplePoint => {
        return {
            x:p.x * mul,
            y:p.y * mul
        }
    }
    protected sum = (pi: SamplePoint, pj: SamplePoint): SamplePoint => {
        return {
            x:pi.x + pj.x,
            y:pi.y + pj.y
        }
    }
}

describe("index.ts", () => {
    it("interpolate", () => {
        const c = new SampleClass()

        const got = c.interpolate(
            {x:1, y:1},
            {x:2, y:6},
            {x:3, y:3},
            {x:4, y:3.5},
            0.5,
            5
        )

        const want: SamplePoint[] = [
            { x: 2.145934344710981, y: 5.797996835941762 },
            { x: 2.28779317935643, y: 5.274383318308023 },
            { x: 2.434852833072199, y: 4.5809681614978786 },
            { x: 2.5963896349941473, y: 3.8695600799104293 },
            { x: 2.781679914258129, y: 3.29196778794477 }
        ]

        expect(got).toEqual(want)
    })
})