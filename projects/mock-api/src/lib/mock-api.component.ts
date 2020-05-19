import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-mock-api',
  template: `
    <p>
      mock-api works!
    </p>
  `,
  styles: [],
})
export class MockApiComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
