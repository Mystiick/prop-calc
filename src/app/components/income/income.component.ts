import {
    Component,
    Input
} from '@angular/core';
import {Calculated} from '../../models';
import {DecimalPipe} from '@angular/common';

@Component({
    selector: 'app-income',
    standalone: true,
    imports: [
        DecimalPipe
    ],
    templateUrl: './income.component.html',
    styleUrls: ['../summary.scss']
})
export class IncomeComponent {
    @Input({required: true}) calc!: Calculated;
}
