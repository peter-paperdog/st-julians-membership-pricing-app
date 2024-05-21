import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Membership} from "../../models/membership";
import {TitleService} from "../../services/title.service";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent {
  membership: Membership | undefined;
  applicationForm: FormGroup;
  titles: string[] = ['Mr', 'Mrs', 'Miss'];

  constructor(private route: ActivatedRoute, private titleService: TitleService) {
    this.applicationForm = new FormGroup({
      members: new FormArray([]),
      contactDetails: new FormGroup({
        postcode: new FormControl('', [Validators.required]),
        telephone: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required])
      })
    });
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.titleService.changeTitle(data['title']);
    });


    this.route.queryParams.subscribe(params => {
      this.initializeFormGroups(params);
    });
  }

  getMemberArray(num: number): number[] {
    return Array.from({length: num}, (_, index) => index + 1);
  }

  onSubmit() {

  }

  private initializeFormGroups(params: any) {
    let
      postcode: string = params['postcode'],
      distance: number = parseFloat(params['distance']),
      membership_type = params['membership_type'],
      adults: number = parseInt(params['adults']),
      seniors: number = parseInt(params['seniors']),
      children: number = parseInt(params['children']),
      past_member: boolean = params['pastMember'];


    this.membership = new Membership(postcode, distance, membership_type, adults, seniors, children, past_member);
    this.membership.nanny = params['nanny'];

    this.addMemberFormGroup('adults', this.membership.adults);
  }

  addMemberFormGroup(memberType: string, count: number): void {
    const formArray = this.applicationForm.get(memberType) as FormArray;
    for (let i = 0; i < count; i++) {
      formArray.push(this.createMemberFormGroup(memberType));
    }
  }

  createMemberFormGroup(memberType: string): FormGroup {
    const controls: { [key: string]: FormControl } = {
      memberType: new FormControl(memberType),
      title: new FormControl('', [Validators.required]),
      firstname: new FormControl('', [Validators.required]),
      lastname: new FormControl('', [Validators.required]),
      birthdate: new FormControl('', [Validators.required])
    };

    if (memberType === 'adults' || memberType === 'seniors') {
      controls['mobile'] = new FormControl('', Validators.required);
      controls['email'] = new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
      ]);
    }

    return new FormGroup(controls);
  }
}
