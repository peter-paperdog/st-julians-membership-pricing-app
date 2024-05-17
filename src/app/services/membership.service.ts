import {Injectable} from '@angular/core';
import {PrecalculationFormData} from "../models/precalculation-form-data";
import {Costs} from "../models/costs";
import {Membership} from "../models/membership";

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  constructor() {

  }

  preCalculateCosts(formData: PrecalculationFormData): Costs {
    console.log(formData);
    let costs = {
      entrance_fee: 0,
      monthly_cost: 0,
      annual_cost: 0
    };
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

    let membership = new Membership(
      formData.postcode,
      formData.distance,
      formData.membership_type,
      formData.adults,
      formData.seniors,
      formData.children
    );

    return costs;
  }
}
