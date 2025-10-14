import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Property} from '../../../models';

@Component({
    selector: 'app-property-form',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './property-form.component.html',
    styleUrls: ['../form.scss']
})
export class PropertyFormComponent {
    @Input({required: true}) property!: Property;
    @Output() changed = new EventEmitter<void>();
}
