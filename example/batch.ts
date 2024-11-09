import {Simple2DCatmullRomSpline, IPoint2D, BatchRunner} from '../dist/index'


const points:IPoint2D[] = [
    {x:1, y:1},
    {x:2, y:6},
    {x:3, y:3},
    {x:4, y:3.5},
    {x:5, y:10},
    {x:6, y:11},
]

const runner = new BatchRunner(new Simple2DCatmullRomSpline(), 0.5, 5)
console.log(runner.run(points))