import {Costs} from "./costs";
import {MembershipService} from "../services/membership.service";

export class Membership {
  name: string | undefined;
  membership_type: string;
  category: 'individual' | 'couple' | 'family' | undefined;
  distance: number | undefined;
  adults: number;
  seniors: number;
  children: number;
  postcode: string;
  past_member: boolean;

  constructor(postcode: string, distance: number, membership_type: string, adults: number, seniors: number, children: number, past_member: boolean) {
    this.postcode = postcode;
    this.adults = adults;
    this.seniors = seniors;
    this.children = children;
    this.membership_type = membership_type;
    this.past_member = past_member;
    this.initMembershipType(membership_type, distance);
    this.initCategory();
    this.initName();
  }

  private initCategory() {
    if ((this.adults + this.seniors + this.children) > 2) {
      this.category = 'family';
    } else if ((this.adults + this.seniors) === 2 || ((this.adults + this.seniors + this.children) === 2 && this.children === 1)) {
      this.category = 'couple';
    } else if ((this.adults + this.seniors + this.children) === 1) {
      this.category = 'individual';
    }
  }

  private initMembershipType(membership_type: string, distance: number) {
    this.distance = distance;

    if (membership_type === 'full' && distance > 12.5) {
      this.membership_type = 'country';
    } else {
      this.membership_type = membership_type;
    }
  }

  private initName() {
    this.name = `${this.membership_type} ${this.category}`;

    if (this.category === 'family') {
      this.name = `${this.name} of ${this.adults + this.seniors + this.children}`;
    }
  }

  public getCosts(): Costs {
    let prices = {
      entrance_fee: {
        individual: 200,
        couple: 400,
        family: 500
      },
      memberships: {
        full: {
          individual: {
            adult: 775,
            senior: 480
          },
          couple: {
            adult: 1550,
            senior: 960
          },
          family: {
            3: 1800,
            4: 2050,
            5: 2200,
            6: 2350
          }
        },
        country: {
          individual: {
            adult: 575,
            senior: 410
          },
          couple: {
            adult: 1150,
            senior: 820
          },
          family: {
            3: 1310,
            4: 1470,
            5: 1630,
            6: 1790
          }
        },
        social: {
          individual: {
            adult: 250,
            senior: 200
          },
          couple: {
            adult: 500,
            senior: 400
          },
          family: {
            3: 600,
            4: 700,
            5: 750,
            6: 800
          }
        }
      }
    };

    //MEMBERSHIP TYPE
    //  FULL
    //  SOCIAL
    //  COUNTRY
    //MEMBERSHIP CATEGORY
    //  individual
    //  couple
    //  family (of X)

    let costs = {
      entrance_fee: 0,
      monthly_cost: 0,
      annual_cost: 0
    }
    if (this.past_member === false) {
      if (this.category === 'individual') {
        costs.entrance_fee = prices.entrance_fee.individual;
      } else if (this.category === 'couple') {
        costs.entrance_fee = prices.entrance_fee.couple;
      } else if (this.category === 'family') {
        costs.entrance_fee = prices.entrance_fee.family;
      }
    }

    let memberships = prices.memberships;
    let membership_type = this.membership_type;

    // @ts-ignore
    console.log(memberships[membership_type][this.category]);

    costs.annual_cost = 12;

    costs.monthly_cost = costs.annual_cost / 12;
    return costs;
  }
}
