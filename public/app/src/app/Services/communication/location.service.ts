import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ILocation} from "../../../interfaces/Iocation";
import {Observable} from "rxjs";
import {ILocationfrombackend, ILocationfrombackendWithId} from "../../../interfaces/locationfrombackend";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) {
  }

  getLocationById(id: string): Observable<ILocationfrombackend> {
    return this.http.get<ILocationfrombackend>("http://localhost:3000/api/locations/" + id);
  }

  postLocation(location: ILocationfrombackend) {
    return this.http.post<ILocationfrombackendWithId>('http://localhost:3000/api/locations', location);
  }

  mapLocation(location: ILocationfrombackend): ILocation {
    return {
      coordinates: {
        x: location.lat,
        y: location.lon
      },
      country: location.country,
      place: location.place
    }
  }
}
