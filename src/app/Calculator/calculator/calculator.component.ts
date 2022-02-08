import { Component, HostListener, OnInit } from '@angular/core';
import { BUTTONS } from './calculator.constant';
@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.scss'],
})
export class CalculatorComponent implements OnInit {
  @HostListener('window:keypress', ['$event'])
  keyEvent(keyEvent: KeyboardEvent) {
    const button = this.buttons.find(
      (btn) => btn.value.toString() === keyEvent.key
    );
    if (!button) {
      return;
    }
    this.onButton(button);
  }
  buttons = BUTTONS;
  buffer: any = 0;
  user: any = 0;
  action: string = '';
  storage: any = 0;
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
    this.user = this.storage;
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
              break;
            case '-':
              this.buffer = this.buffer - +this.user;
              this.user = this.buffer;
              this.action = '-';
              this.storage = '';
              break;
            case '*':
              this.buffer = this.buffer * +this.user;
              this.user = this.buffer;
              this.storage = '';
              this.action = '-';
              break;
            case '/':
              this.buffer = this.buffer / +this.user;
              this.user = this.buffer;
              this.storage = '';
              this.action = '-';
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
        }
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

            break;
          case '-':
            this.buffer = this.buffer - +this.user;
            this.user = this.buffer;
            this.storage = 0;
            this.action = '';

            break;
          case '*':
            this.buffer = this.buffer * +this.user;
            this.user = this.buffer;
            this.storage = 0;
            this.action = '';

            break;
          case '/':
            if (+this.user !== 0) {
              this.buffer = this.buffer / +this.user;
              this.user = this.buffer;
              this.storage = 0;
              this.action = '';
            } else {
              this.buffer = '0';
              this.user = this.buffer;
              this.action = '';
              this.storage = 0;
            }
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
          break;
        case '-':
          this.buffer = this.buffer - +this.user;
          this.user = this.buffer;
          this.action = value;
          this.storage = '';
          break;
        case '*':
          this.buffer = this.buffer * +this.user;
          this.user = this.buffer;
          this.storage = '';
          this.action = value;
          break;
        case '/':
          if (this.user != 0) {
            this.buffer = this.buffer / +this.user;
            this.user = this.buffer;
            this.storage = 0;
            this.action = value;
          } else {
            this.buffer = '0';
            this.user = this.buffer;
            this.action = value;
            this.storage = 0;
          }
          break;
      }
      this.action = value;
    } else {
      this.storage = '';
      this.action = value;
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
        this.user /= 100;
        this.buffer = this.user;
        break;
      case '.':
        this.isDot(button);
        break;
    }
  }
  private isDot(button: any) {
    this.user = ''; 
    if (
      this.storage
        ? this.storage.split('').some((value: any) => value === '.')
        : ''
    ) {
      this.user = this.storage;
    } else {
      if ((this.user = '0' || !this.user)) {
        this.user += '.';
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
