import { Component, input, numberAttribute } from '@angular/core';

@Component({
  selector: 'app-overview',
  template: `
    <h2>Your Miles Details</h2>

    <p>Flight Details for Booking ID {{ id() }}</p>
  `
})
export class Detail {
  id = input.required<number, unknown>({ transform: numberAttribute });
}
