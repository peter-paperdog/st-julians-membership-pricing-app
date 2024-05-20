import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Membership} from "../../models/membership";
import {TitleService} from "../../services/title.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-application-form',
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent {
  membership: Membership | undefined;
  membershipApplicationForm: FormGroup;

  constructor(private route: ActivatedRoute, private titleService: TitleService) {
    this.membershipApplicationForm = new FormGroup({});
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.titleService.changeTitle(data['title']);
    });

    this.route.queryParams.subscribe(params => {
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
    });
  }
  getMemberArray(num: number): number[] {
    return Array.from({ length: num }, (_, index) => index + 1);
  }
  onSubmit() {

  }
}
