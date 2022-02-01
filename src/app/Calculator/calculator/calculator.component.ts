import { Component, OnInit } from '@angular/core';
import { BUTTONS } from './calculator.constant';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  buttons = BUTTONS;
  buffer: number = 0;
  currentNum: number = 0;
  actionValue: any;
  changeP = -320;
  calc = false;
  constructor() {}

  ngOnInit(): void {}
  isCalc() {
    this.calc = !this.calc;
    if (this.calc === true) {
      this.changeP = 15;
    } else {
      this.changeP = -100;
    }
  }
  onButton(button: any) {}
}
