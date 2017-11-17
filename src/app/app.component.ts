import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = '상품등록';
  product: any;

  constructor() {
    this.initProd();
  }

  initProd() {
    this.product = { name: '', listPrice: '', qty: 0, desc: '' };
  }

  onSubmit() {
    alert(`제출\n${JSON.stringify(this.product)}`);
  }

  onReset() {
    this.initProd();
  }
}
