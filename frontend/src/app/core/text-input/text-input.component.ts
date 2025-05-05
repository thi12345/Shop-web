import { CommonModule } from '@angular/common';
import { Component, Input, Optional, Self } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent implements ControlValueAccessor {
  @Input() type = 'text';
  @Input() label = '';

  constructor(@Self() public controlDir: NgControl) {
    this.controlDir.valueAccessor = this;
  }
  onChange = (value: string) => {};  // Placeholder function
  onTouched = () => {};
  writeValue(obj: any): void {
  }
  registerOnChange(fn: any): void {
  }
  registerOnTouched(fn: any): void {
  }

  handleChange(event: Event): void {
    const value = event.target as HTMLInputElement;
    if (value){
      this.onChange(value.value);
    }
      
  }
  get control(): FormControl {
    return this.controlDir.control as FormControl
  }
}
