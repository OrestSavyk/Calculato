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
  action: string = '';
  storage: any = 0;
  constructor() {}

  ngOnInit(): void {}

  private digitFunc(button: any) {
    if (this.buffer && this.user && !this.action) {
      this.storage = 0;
      this.buffer = 0;
      this.user = '';
      this.action = '';
    }
    if (!this.buffer && this.action) {
      this.buffer += +this.user;
    }
    this.user = '';
    this.storage += button.value;
    this.user = +this.storage;
    console.log(this.user);
  }
  private actionFunc(button: any) {
    switch (button.value) {
      case '+':
        this.funcParent('+');
        break;
      case '-':
        if (this.buffer) {
          switch (this.action) {
            case '+':
              this.buffer = this.buffer + +this.user;
              this.user = this.buffer;
              this.action = '+';
              this.storage = '';
              console.log(this.buffer);
              break;
            case '-':
              this.buffer = this.buffer - +this.user;
              this.user = this.buffer;
              this.action = '-';
              this.storage = '';
              console.log(this.buffer);
              break;
            case '*':
              this.buffer = this.buffer * +this.user;
              this.user = this.buffer;
              this.storage = '';
              this.action = '-';
              console.log(this.buffer);
              break;
            case '/':
              this.buffer = this.buffer / +this.user;
              this.user = this.buffer;
              this.storage = '';
              this.action = '-';
              console.log(this.buffer);
              break;
          }
          this.action = '-';
        } else {
          if (!this.storage) {
            this.storage = '';
            this.storage += '-';
          } else {
            this.storage = '';
            this.action = '-';
          }
          console.log(this.buffer);
          console.log(this.action);
        }
        // this.storage = '';
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
        if (!this.buffer) {
          this.user = +this.storage;
          this.buffer = this.user;
        } else {
          this.user = this.buffer;
          this.action = '';
          this.storage = 0;
        }
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
          this.storage = '';
          console.log(this.buffer);
          break;
        case '-':
          this.buffer = this.buffer - +this.user;
          this.user = this.buffer;
          this.action = value;
          this.storage = '';
          console.log(this.buffer);
          break;
        case '*':
          this.buffer = this.buffer * +this.user;
          this.user = this.buffer;
          this.storage = '';
          this.action = value;
          console.log(this.buffer);
          break;
        case '/':
          this.buffer = this.buffer / +this.user;
          this.user = this.buffer;
          this.storage = '';
          this.action = value;
          console.log(this.buffer);
          break;
      }
      this.action = value;
    } else {
      this.storage = '';
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
        this.isDot(button);
        break;
    }
  }
  private isDot(button: any) {
    this.user = '';
    if (this.user.split('').some((value: any) => value === '.')) {
      return;
    } else {
      if ((this.user = '0' || !this.user)) {
        this.user += '.';
        console.log(this.user);
      } else {
        this.storage += button.value;
      }
      this.storage += button.value;
      this.user = this.storage;
    }
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
