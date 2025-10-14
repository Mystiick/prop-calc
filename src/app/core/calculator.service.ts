import {Injectable} from '@angular/core';
import {
    Calculated,
    Property
} from '../models';

@Injectable({providedIn: 'root'})
export class CalculatorService {
    calculate(property: Property): Calculated {
        return new Calculated(property);
    }
}
