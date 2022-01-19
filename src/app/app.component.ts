import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  // title = 'hello';
  // anyArr: any[] = ['hello', 22, 'go', 'independent', true, 'crowded', 837];
  // strArr: string[] = ['hello', 'go', 'independent', 'crowded', 'raddit'];
  // numArr: number[] = [35, 398784, 928, 11, -22, -104, 261];
  // end: any[] = [];
  // isPalindrom = 'annna';
  constructor() {}

  ngOnInit(): void {
    // this.end = this.numArr.map((value) => (value += 100)).sort((a, b) => a - b);
    // this.end = [...this.anyArr, ...this.numArr, ...this.strArr];
    // // sort
    // this.anyArr.sort((a, b) => a - b);
    // // map
    // this.end = this.numArr.map((elem) => {
    //   return (elem += elem);
    // }, 0);
    //  // filter
    // this.end = this.strArr.filter((a) => a.length == 5 || a.length > 8);
    // // ForEach
    // this.anyArr.forEach((elem) => console.log(elem));
    // // Concat
    // console.log(this.anyArr.concat(this.numArr));
    // // Includes
    // console.log(this.strArr.includes('go'));
    // this.isPalindrom.split('').reverse().join('');
    // // Palindrom
    // console.log(this.isPalindrom === this.isPalindrom.split('').reverse().join(''));
    // // Reduce
    // console.log(
    //   this.numArr.reduce((acc, value) => {
    //     return acc * value;
    //   })
    // );
    // //Fill
    // this.numArr.fill(10, 3, 5);
    // console.log('this.numArr.fill(10, 3, 5);: ', this.numArr.fill(10, 3, 5));
    // // Slice
    // console.log('this.anyArr.slice(2, 4): ', this.anyArr.slice(2, 4));
  }
}
