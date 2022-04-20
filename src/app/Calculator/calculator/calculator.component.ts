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

  storage: any = 0;

  buffer: any = 0;

  displayValue: any = 0;

  action: string = '';

  leftPx = -320;

  isCalculator = false;

  constructor() {}

  ngOnInit(): void {}

  isShowCalculator() {
    this.isCalculator = !this.isCalculator;

    if (this.isCalculator === true) {
      this.leftPx = 15;
    } else {
      this.leftPx = -100;
    }
  }

  private digitFunc(button: any) {
    if (this.buffer && this.displayValue && !this.action) {
      this.storage = 0;
      this.buffer = 0;
      this.displayValue = '';
      this.action = '';
    }

    if (!this.buffer && this.action) {
      this.buffer += +this.displayValue;
    }

    this.displayValue = '';
    this.storage += button.value;
    this.displayValue = this.storage;
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
              this.buffer = this.buffer + +this.displayValue;
              this.displayValue = this.buffer;
              this.action = '+';
              this.storage = '';
              break;

            case '-':
              this.buffer = this.buffer - +this.displayValue;
              this.displayValue = this.buffer;
              this.action = '-';
              this.storage = '';
              break;

            case '*':
              this.buffer = this.buffer * +this.displayValue;
              this.displayValue = this.buffer;
              this.storage = '';
              this.action = '-';
              break;

            case '/':
              this.buffer = this.buffer / +this.displayValue;
              this.displayValue = this.buffer;
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
            this.buffer = this.buffer + +this.displayValue;
            this.displayValue = this.buffer;
            this.action = '';

            break;

          case '-':
            this.buffer = this.buffer - +this.displayValue;
            this.displayValue = this.buffer;
            this.storage = 0;
            this.action = '';

            break;

          case '*':
            this.buffer = this.buffer * +this.displayValue;
            this.displayValue = this.buffer;
            this.storage = 0;
            this.action = '';

            break;

          case '/':
            if (+this.displayValue !== 0) {
              this.buffer = this.buffer / +this.displayValue;
              this.displayValue = this.buffer;
              this.storage = 0;
              this.action = '';
            } else {
              this.buffer = '0';
              this.displayValue = this.buffer;
              this.action = '';
              this.storage = 0;
            }

            break;
        }

        if (!this.buffer) {
          this.displayValue = +this.storage;
          this.buffer = this.displayValue;
        } else {
          this.displayValue = this.buffer;
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
          this.buffer = this.buffer + +this.displayValue;
          this.displayValue = this.buffer;
          this.action = '+';
          this.storage = '';

          break;

        case '-':
          this.buffer = this.buffer - +this.displayValue;
          this.displayValue = this.buffer;
          this.action = value;
          this.storage = '';

          break;

        case '*':
          this.buffer = this.buffer * +this.displayValue;
          this.displayValue = this.buffer;
          this.storage = '';
          this.action = value;

          break;

        case '/':
          if (this.displayValue != 0) {
            this.buffer = this.buffer / +this.displayValue;
            this.displayValue = this.buffer;
            this.storage = 0;
            this.action = value;
          } else {
            this.buffer = '0';
            this.displayValue = this.buffer;
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
        this.displayValue = 0;
        this.action = '';

        break;

      case '+/-':
        this.buffer *= -1;
        this.displayValue *= -1;

        break;

      case '%':
        this.displayValue /= 100;
        this.buffer = this.displayValue;

        break;

      case '.':
        this.isDot(button);

        break;
    }
  }

  private isDot(button: any) {
    this.displayValue = '';

    if (
      this.storage
        ? this.storage.split('').some((value: any) => value === '.')
        : ''
    ) {
      this.displayValue = this.storage;
    } else {
      if ((this.displayValue = '0' || !this.displayValue)) {
        this.displayValue += '.';
      } else {
        this.storage += button.value;
      }

      this.storage += button.value;
      this.displayValue = this.storage;
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
