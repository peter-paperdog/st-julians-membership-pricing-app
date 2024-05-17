import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ukPostcodeValidator} from './validators';
import {PostcodeService} from "./services/postcode.service";
import {DistanceService} from "./services/distance.service";


interface Costs {
  entrance_fee: number;
  monthly_cost: number;
  annual_cost: number;
  entrance_fee_discounted: number | undefined;
  monthly_cost_discounted: number | undefined;
  annual_cost_discounted: number | undefined;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  costs: Costs | undefined;
  membershipForm: FormGroup;
  childrenCounts = [0, 1, 2, 3, 4]; // Array to store the number of children options
  distance: number | undefined;

  constructor(private postcodeSrv: PostcodeService, private distanceService: DistanceService) {
    this.membershipForm = new FormGroup({
      selectedMembership: new FormControl(undefined, Validators.required),
      adults: new FormControl(undefined, Validators.required),
      children: new FormControl(undefined, Validators.required),
      nanny: new FormControl(undefined, Validators.required),
      pastMember: new FormControl(undefined, Validators.required),
      postcode: new FormControl(undefined, [Validators.required, ukPostcodeValidator])
    });
  }

  ngOnInit() {
    this.membershipForm.valueChanges.subscribe(() => {
      this.handleValueChanges();
    });

    this.membershipForm.get('postcode')?.valueChanges.subscribe((postcode) => {
      if (postcode) {
        const uppercasePostcode = postcode.toUpperCase();
        this.membershipForm.get('postcode')?.setValue(uppercasePostcode, {emitEvent: false});
      }

      if (this.membershipForm.get('postcode')?.valid) {
        this.handleValidPostcode(postcode.toUpperCase());
      }
    })
  }

  setChildren(number: number) {
    this.membershipForm.get('children')?.setValue(number);
  }

  setAdults(number: number) {
    this.membershipForm.get('adults')?.setValue(number);
  }

  setNanny(b: boolean) {
    this.membershipForm.get('nanny')?.setValue(b);
  }

  pastMember(b: boolean) {
    this.membershipForm.get('pastMember')?.setValue(b);
  }

  selectMembership(membership: string) {
    this.membershipForm.get('selectedMembership')?.setValue(membership);
  }

  private handleValueChanges() {
    if (!this.membershipForm.valid) {
      this.costs = undefined;
      return;
    }
    this.calculate();
  }

  onSubmit() {
    if (this.membershipForm.valid) {
      console.log(this.membershipForm.value);
    } else {
      console.log('Form is invalid');
      const controls = this.membershipForm.controls;
      for (const name in controls) {
        if (controls[name].invalid) {
          console.log(controls[name]);
        }
      }
    }
  }

  private calculate() {
    this.costs = {
      entrance_fee: 200,
      entrance_fee_discounted: undefined,
      monthly_cost: 120,
      monthly_cost_discounted: undefined,
      annual_cost: 1100,
      annual_cost_discounted: undefined
    }
  }

  private handleValidPostcode(postcode: string) {
    this.postcodeSrv.getPostcode(postcode).subscribe((data) => {
      const lat1 = 51.251452;   //St Julians coordinates
      const lon1 = 0.182492;    //St Julians coordinates
      let lat2 = data.result.latitude;
      let lon2 = data.result.longitude;
      try {
        let distance = this.distanceService.haversineDistance(lat1, lon1, lat2, lon2);
        this.distance = Number(distance.toFixed(2)); // Round to 2 decimal places
      } catch (error) {
        this.distance = undefined;
        console.error('Error calculating distance');
      }
    }, (error) => {
      this.distance = undefined;
      console.error(error);
    })
  }
}
