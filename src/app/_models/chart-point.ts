import { Adapter } from './adapter';
import { throwError } from 'rxjs';

export class ChartPoint{
    constructor(
        public date :Date,
        public open :number,
        public close :number,
        public volume :number,
    ){}
}​

export class ChartPointAdapter implements Adapter<ChartPoint>{
    adapt(item: any): ChartPoint {
        let date = new Date(item.date);
        return new ChartPoint(
            date, 
            item.open, 
            item.close, 
            item.volume
        );
    }
}