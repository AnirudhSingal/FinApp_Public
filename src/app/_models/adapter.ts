import { Observable } from 'rxjs';

export interface Adapter<T>{
    adapt(item: any) :T;
} 