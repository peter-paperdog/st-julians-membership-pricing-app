import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor() { }

  haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const toRadians = (degree: number) => degree * (Math.PI / 180);

    const R = 3959; // Earth's radius in miles

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const distance = R * c; // Distance in miles

    return distance;
  }
}
