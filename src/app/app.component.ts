import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


enum TypeSelect {
  isPrime = "isPrime",
  IsFibonacci = "IsFibonacci"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  typeSelect = TypeSelect
  title = 'test-recrut';
  selectedTxt = TypeSelect.isPrime;
  myControl = new FormControl();
  searchControl = new FormControl();
  isMatchWithType = false;
  catList: any;
  suggestList = [];

  constructor() {


  }

  ngOnInit() {

    fetch('https://api.publicapis.org/categories').then(res => res.json()).then((response) => {
      this.catList = response;
    });

    this.buildForm();
  }

  buildForm() {
    this.myControl.valueChanges.subscribe(x => {
       
      if (x < 0) {
        this.myControl.setValue("1")
      }else if(x.includes('.')){
        this.myControl.setValue(x.split('.')[0])
      }
      
        this.checkType(x)
      

    })

    this.searchControl.valueChanges.subscribe(x => {this.suggestWord(x)});

}

  suggestWord(txt:string){
    const list = this.catList.categories;
    this.suggestList = list.filter((data:string) => 
    {
    
      let dataTxt = data.toLowerCase();
     return dataTxt.includes(txt.toLowerCase())});


}

  



  checkType(value: any) {
    if (this.selectedTxt == TypeSelect.IsFibonacci) {
      this.isMatchWithType = this.isFibonacci(value)
    } else {
      this.isMatchWithType = this.isPrime(value)
    }
  }





  // ref: https://www.geeksforgeeks.org/check-number-fibonacci-number/

  isPerfectSquare(x: number) {
    let s = parseInt(Math.sqrt(x).toString());
    return (s * s == x);
  }

  // Returns true if n is a Fibonacci Number, else false
  isFibonacci(n: number) {

    // n is Fibonacci if one of 5*n*n + 4 or 5*n*n - 4 or both
    // is a perfect square
    return this.isPerfectSquare(5 * n * n + 4) ||
      this.isPerfectSquare(5 * n * n - 4);
  }

  isPrime(num: number) {
    for (var i = 2; i < num; i++)
      if (num % i === 0) return false;
    return num > 1;
  }


  selectValue(txt: TypeSelect) {

    this.selectedTxt = txt;
    this.checkType(this.myControl.value)
  }



}
