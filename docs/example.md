example

# simple usage

Performs Catmull-Rom spline interpolation using a predefined class.

## 2D
```ts
import { Simple2DCatmullRomSpline } from "@syamaz/catmull-rom-spline"

const spline = new Simple2DCatmullRomSpline()
const curvePoints = spline.interpolate(
    {x: 1, y:10}, // control point 0
    {x: 2, y:20}, // control point 1
    {x: 3, y:15}, // control point 2
    {x: 4, y:17}, // control point 3
    0.5,          // alpha (0 ~ 1.0)
    4             // curvePoints num (>= 0)
)

// control points are not included
console.log(curvePoints)
```

## 3D
```ts
import { Simple3DCatmullRomSpline } from "@syamaz/catmull-rom-spline"
const spline = new Simple3DCatmullRomSpline()
const curvePoints = spline.interpolate(
    {x: 1, y:10, z: 5},     // control point 0
    {x: 2, y:20, z: 5.5},   // control point 1
    {x: 3, y:15, z: 2},     // control point 2
    {x: 4, y:17, z: 0},     // control point 3
    0.5,                    // alpha (0 ~ 1.0)
    4                       // curvePoints num (>= 0)
)

// control points are not included
console.log(curvePoints)
```

# use custom point type

Extends an abstract class to support custom point types.

```ts
import { BasicCatmullRomSpline } from '@syamaz/catmull-rom-spline'

export class YourCatmullRomSpline extends BasicCatmullRomSpline<YourPoint> {
    constructor(){
        super()
    }
    protected calcDistance(pi: YourPoint, pj: YourPoint): number {
        return /** Returns the distance between two points */
    }
    protected magnify(p: YourPoint, mul: number): YourPoint {
        return /** Returns the result after scalar multiplication. */
    }
    protected sum(pi: YourPoint, pj: YourPoint): YourPoint {
        return /** Adds vectors. */
    }
}

const spline = new YourCatmullRomSpline()
const curvePoints:YourPoint[] = spline.interpolate(
    createYourPoint(),
    createYourPoint(),
    createYourPoint(),
    createYourPoint(),
    0.5,
    5    
)
```