import {convertToSimplePoint} from "../src/catmull-rom-spline"
import {IPoint2D, interporate, } from "../src/abstract/basic-catmull-rom-spline"

export interface IObserver<T> {
    next(value:T):void
    error(err:unknown):void
    complete():void
}

export interface IObservable<T> {
    subscribe(observer: IObserver<T> | ((value:T) => void)):void
}

class Observer<T> implements IObserver<T>{
    constructor(private nextFunc: ((value:T) => void)){}

    next(value: T): void {
        this.nextFunc(value)
    }
    error(err: unknown): void {
        throw err
    }
    complete(): void {
        this.nextFunc = () => {}
    }

}

export class InterporateSubject implements IObservable<IPoint2D[]>, IObserver<IPoint2D> {
    private observer: IObserver<IPoint2D[]> | undefined

    // 最大4つをキープする
    private points: IPoint2D[] = []
    private count = 0

    constructor(private readonly alpha = 0.5, private readonly interporatePoints = 10){
        this.points = []
    }

    next(value: IPoint2D): void {
        this.points.push(value)
        this.count++
        const arr: IPoint2D[] = []
        switch(this.count){
            case 1: return
            case 2: return
            case 3: return
            case 4:
                
                arr.push(this.points[0], this.points[1], ...interporate(
                    this.points[0], 
                    this.points[1], 
                    this.points[2], 
                    this.points[3],
                    this.alpha,
                    this.interporatePoints
                ), this.points[2])

                // p0, p1, ..... 
                this.observer?.next(arr)
                this.points = this.points.slice(1)
                break
            default:
                // if count === 5
                // p1, p2, .......,
                //
                // if count === i
                // p(i-4), p(i-3), .....,
                arr.push(...interporate(
                    this.points[0], 
                    this.points[1], 
                    this.points[2], 
                    this.points[3],
                    this.alpha,
                    this.interporatePoints
                ), this.points[2])
                this.observer?.next(arr)
                // if count === i
                // this.points = p(i-3), p(i-2), p(i-1)
                this.points = this.points.slice(1)
        }
    }
    error(err: unknown): void {
        this.observer?.error(err)
    }
    complete(): void {
        // this.points = p(i-3), p(i-2), p(i-1)
        // のうち、p(i-1) = 最後の点を出力する
        this.observer?.next(this.points.slice(2))
        this.observer?.complete()
    }

    subscribe(observer: IObserver<IPoint2D[]> | ((value:IPoint2D[]) => void)){
        this.observer = typeof observer === 'function' ? new Observer(observer) : observer
    }
}


const subject = new InterporateSubject(0.5, 5)
subject.subscribe(ps =>  {
    console.log(ps)
})

subject.next(convertToSimplePoint(1, 1))
subject.next(convertToSimplePoint(2, 6))
subject.next(convertToSimplePoint(3, 3))
subject.next(convertToSimplePoint(4, 3.5))
subject.next(convertToSimplePoint(5, 10))
subject.next(convertToSimplePoint(6, 11))
subject.complete()
