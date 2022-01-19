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
  constructor() {}

  ngOnInit(): void {}
  onButton(button: any) {}
}
