import { Component, OnInit } from '@angular/core';
import { BUTTONS } from './calculator.constant';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  buttons = BUTTONS;

  buffer: any = 0;
  user: any = 0;
  action: any;
  storage: any = 0;
  constructor() {}

  ngOnInit(): void {}

  private digitFunc(button: any) {
    if (!this.buffer) {
      this.buffer += +this.user;
    }
    this.user = '';
    this.storage += button.value;
    this.user = this.storage;
  }
  private actionFunc(button: any) {
    switch (button.value) {
      case '+':
        this.funcParent('+');
        break;
      case '-':
        this.funcParent('-');
        break;
      case 'x':
        this.funcParent('*');
        break;
      case '/':
        this.funcParent('/');
        break;
      case '=':
        switch (this.action) {
          case '+':
            this.buffer = this.buffer + +this.user;
            this.user = this.buffer;
            this.action = '';
            console.log(this.buffer);

            break;
          case '-':
            this.buffer = this.buffer - +this.user;
            this.user = this.buffer;
            this.storage = 0;
            this.action = '';
            console.log(this.buffer);
            break;
          case '*':
            this.buffer = this.buffer * +this.user;
            this.user = this.buffer;
            this.storage = 0;
            this.action = '';
            console.log(this.buffer);
            break;
          case '/':
            this.buffer = this.buffer / +this.user;
            this.user = this.buffer;
            this.storage = 0;
            this.action = '';
            console.log(this.buffer);
            break;
        }
        this.user = this.buffer;
        this.action = '';
        this.storage = 0;
        console.log(this.buffer);
        break;
    }
  }
  private funcParent(value: string): void {
    if (this.buffer) {
      switch (this.action) {
        case '+':
          this.buffer = this.buffer + +this.user;
          this.user = this.buffer;
          this.action = '+';
          this.storage = 0;
          console.log(this.buffer);
          break;
        case '-':
          this.buffer = this.buffer - +this.user;
          this.user = this.buffer;
          this.action = value;
          this.storage = 0;
          console.log(this.buffer);
          break;
        case '*':
          this.buffer = this.buffer * +this.user;
          this.user = this.buffer;
          this.storage = 0;
          this.action = value;
          console.log(this.buffer);
          break;
        case '/':
          this.buffer = this.buffer / +this.user;
          this.user = this.buffer;
          this.storage = 0;
          this.action = value;
          console.log(this.buffer);
          break;
      }
      this.action = value;
    } else {
      this.storage = 0;
      this.action = value;
      console.log(this.buffer);
      console.log(this.action);
    }
  }
  private otherFunc(button: any) {
    switch (button.value) {
      case 'AC':
        this.storage = 0;
        this.buffer = 0;
        this.user = 0;
        this.action = '';
        break;
      case '+/-':
        this.buffer *= -1;
        this.user *= -1;
        break;
      case '%':
        break;
      case '.':
        this.buffer ? this.isDot() : false;
        break;
    }
  }
  private isDot() {
    return (
      this.user.split('').some((value: any) => value === '.') || !this.buffer
        ? true
        : (this.storage += '.'),
      (this.user = this.storage)
    );
  }

  onButton(button: any) {
    switch (button.type) {
      case 'digit':
        this.digitFunc(button);
        break;
      case 'action':
        this.actionFunc(button);
        break;
      case 'other':
        this.otherFunc(button);
        break;
    }
  }
}
