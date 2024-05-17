import {Costs} from "./costs";

export class Membership {
  name: string | undefined;
  membership_type: string;
  category: 'individual' | 'couple' | 'family' | undefined;
  distance: number;
  adults: number;
  seniors: number;
  children: number;
  postcode: string;

  constructor(postcode: string, distance: number, membership_type: string, adults: number, seniors: number, children: number) {
    this.postcode = postcode;
    this.distance = distance;
    this.membership_type = membership_type;
    this.adults = adults;
    this.seniors = seniors;
    this.children = children;
  }

  public getCosts(): Costs {
    let costs = {
      entrance_fee: 1,
      monthly_cost: 1,
      annual_cost: 1
    }
    return costs;
  }
}
