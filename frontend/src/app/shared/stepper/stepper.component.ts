import { Component, OnInit, Input } from '@angular/core';
import { CdkStepper, CdkStepperModule, CdkStep } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CdkStepperModule,
    CommonModule
  ],
  templateUrl: './stepper.component.html',
  styleUrl: './stepper.component.css',
  providers: [{provide: CdkStepper, useExisting: StepperComponent}]
})
export class StepperComponent extends CdkStepper  implements OnInit {
  @Input() linearModeSelected = true;
  ngOnInit(): void{
    this.linear = this.linearModeSelected ;
  }
  onClick(index: number){
    this.selectedIndex = index;
  }
  override get selected(): CdkStep {
    return this.steps?.toArray()[this.selectedIndex];
  }
}
