import {Costs} from "./costs";

export class Membership {
  get nanny(): boolean | undefined {
    return this._nanny;
  }

  set nanny(value: boolean | undefined) {
    this._nanny = value;
  }

  get past_member(): boolean {
    return this._past_member;
  }

  public set past_member(value: boolean) {
    this._past_member = value;
  }

  name: string | undefined;
  membership_type: string;
  category: 'individual' | 'couple' | 'family' | undefined;
  distance: number | undefined;
  adults: number;
  seniors: number;
  children: number;
  postcode: string;
  private _nanny: boolean | undefined;
  private _past_member: boolean;

  constructor(postcode: string, distance: number, membership_type: string, adults: number, seniors: number, children: number, past_member: boolean) {
    this.postcode = postcode;
    this.adults = adults;
    this.seniors = seniors;
    this.children = children;
    this.membership_type = membership_type;
    this._past_member = past_member;
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
      annual_cost: 0,
      monthly_cost_original: 0,
      annual_cost_original: 0
    }
    if (!this._past_member) {
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
    let membership_type_prices = memberships[membership_type];
    costs.annual_cost = 0;

    switch (this.category) {
      case 'individual':
        if (this.adults) {
          costs.annual_cost = membership_type_prices.individual.adult;
        } else if (this.seniors) {
          costs.annual_cost = membership_type_prices.individual.senior;
        }

        //calculate discounted price
        if (membership_type === 'country') {
          if (this.adults) {
            costs.annual_cost_original = memberships.full.individual.adult;
          } else if (this.seniors) {
            costs.annual_cost_original = memberships.full.individual.senior;
          }
        }
        break;
      case 'couple':
        costs.annual_cost = (this.adults + this.children) * membership_type_prices.individual.adult + this.seniors * membership_type_prices.individual.senior;

        //calculate discounted price
        if (membership_type === 'country') {
          costs.annual_cost_original = (this.adults + this.children) * memberships.full.individual.adult + this.seniors * memberships.full.individual.senior;
        }
        break;
      case 'family':
        costs.annual_cost = membership_type_prices.family[this.adults + this.seniors + this.children];

        //calculate discounted price
        if (membership_type === 'country') {
          // @ts-ignore
          costs.annual_cost_original = memberships.full.family[this.adults + this.seniors + this.children];
        }
        break;
    }
    costs.monthly_cost = costs.annual_cost / 12;
    if (costs.annual_cost_original > 0) {
      costs.monthly_cost_original = costs.annual_cost_original / 12;
    }
    return costs;
  }

  public getOrdinalSuffix(i: number): string {
    const j = i % 10, k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }
}
