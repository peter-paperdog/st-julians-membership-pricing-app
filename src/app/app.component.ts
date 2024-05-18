import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ukPostcodeValidator} from './validators';
import {PostcodeService} from "./services/postcode.service";
import {DistanceService} from "./services/distance.service";
import {Costs} from "./models/costs";
import {AppConfig} from "./app-config";
import {MembershipService} from "./services/membership.service";
import {Membership} from "./models/membership";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  costs: Costs | undefined;
  membership: Membership | undefined;
  membershipForm: FormGroup;
  childrenCounts = [0, 1, 2, 3, 4]; // Array to store the number of children options

  constructor(private postcodeSrv: PostcodeService, private distanceService: DistanceService, private MembershipSrv: MembershipService) {
    this.membershipForm = new FormGroup({
      membership_type: new FormControl(undefined, Validators.required),
      adults: new FormControl(undefined, Validators.required),
      seniors: new FormControl(undefined, Validators.required),
      children: new FormControl(undefined, Validators.required),
      nanny: new FormControl(undefined, Validators.required),
      pastMember: new FormControl(undefined, Validators.required),
      postcode: new FormControl(undefined, [Validators.required, ukPostcodeValidator]),
      distance: new FormControl(undefined, Validators.required)
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



    let formData =
      {
        membership_type: 'full',
        past_member: false,
        adults: 1,
        seniors: 0,
        children: 3,
        nanny: false,
        pastMember: false,
        postcode: 'SE14PR',
        distance: 33.3
      }
    this.membershipForm.patchValue(formData);
  }

  setChildren(number: number) {
    this.membershipForm.get('children')?.setValue(number);
  }

  setAdults(number: number) {
    this.membershipForm.get('adults')?.setValue(number);
  }

  setSeniors(number: number) {
    this.membershipForm.get('seniors')?.setValue(number);
  }

  setNanny(b: boolean) {
    this.membershipForm.get('nanny')?.setValue(b);
  }

  pastMember(b: boolean) {
    this.membershipForm.get('pastMember')?.setValue(b);
  }

  selectMembership(membership: 'full' | 'social') {
    this.membershipForm.get('membership_type')?.setValue(membership);
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
    let formData = this.membershipForm.getRawValue();
    this.membership = new Membership(formData.postcode, formData.distance, formData.membership_type, formData.adults, formData.seniors, formData.children, formData.pastMember);
    this.costs = this.membership.getCosts();
  }

  private handleValidPostcode(postcode: string) {
    this.postcodeSrv.getPostcode(postcode).subscribe((data) => {
      const {latitude, longitude} = AppConfig.baseCoordinates; // Use base coordinates from config

      try {
        let distance = this.distanceService.haversineDistance(latitude, longitude, data.result.latitude, data.result.longitude);
        this.membershipForm.get('distance')?.setValue(Number(distance.toFixed(2)));
      } catch (error) {
        this.membershipForm.get('distance')?.setValue(undefined);
        console.error('Error calculating distance');
      }
    }, (error) => {
      this.membershipForm.get('distance')?.setValue(undefined);
      console.error(error);
    })
  }

  protected readonly Membership = Membership;
}
