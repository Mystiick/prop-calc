import {
    Component,
    forwardRef,
    Input
} from '@angular/core';
import {
    ControlValueAccessor,
    FormsModule,
    NG_VALUE_ACCESSOR,
    ReactiveFormsModule
} from '@angular/forms';

@Component({
    selector: 'app-currency-input',
    standalone: true,
    templateUrl: './currency-input.component.html',
    styleUrls: ['./currency-input.component.scss'],
    imports: [
        ReactiveFormsModule,
        FormsModule
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CurrencyInputComponent),
            multi: true
        }
    ]
})
export class CurrencyInputComponent implements ControlValueAccessor {
    @Input() isChild: boolean = false;

    displayValue: string = '';
    value: number | null = null;
    onChange: (value: number | null) => void = () => {
    };
    onTouched: () => void = () => {
    };

    writeValue(value: number | null): void {
        this.value = value;
        this.displayValue = this.formatValue(value);
    }

    registerOnChange(fn: (value: number | null) => void): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouched = fn;
    }

    onInputChange(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.displayValue = input.value; // Keep raw input during typing
        const numericValue = parseFloat(input.value.replace(/,/g, ''));
        this.value = isNaN(numericValue) ? null : numericValue;
        this.onChange(this.value);
    }

    onBlur(): void {
        this.onTouched();
        // Format only when input loses focus
        this.displayValue = this.formatValue(this.value);
    }

    formatValue(value: number | null): string {
        if (value === null || value === undefined) {
            return '';
        }
        return new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        }).format(value);
    }
}
