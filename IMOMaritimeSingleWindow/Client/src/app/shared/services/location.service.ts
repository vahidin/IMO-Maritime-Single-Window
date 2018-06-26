import { Injectable } from '@angular/core';
import { Http, RequestOptions } from '@angular/http';
import { LocationModel } from 'app/shared/models/location-model';
import 'rxjs/add/observable/of';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AuthRequest } from './auth.request.service';

@Injectable()
export class LocationService {
  private locationUrl: string;
  private locationTypeUrl: string;
  private countryUrl: string;

  constructor(private http: Http, private authRequest: AuthRequest) {
    this.locationUrl = 'api/location';
    this.locationTypeUrl = 'api/locationtype';
    this.countryUrl = 'api/country';
  }

  private locationDataSource = new BehaviorSubject<any>(null);
  locationData$ = this.locationDataSource.asObservable();

  setLocationData(data) {
    this.locationDataSource.next(data);
  }

  public updateLocation(location: LocationModel) {
    const auth_headers = this.authRequest.GetHeaders();
    const options = new RequestOptions({ headers: auth_headers });
    return this.http
      .put(this.locationUrl, location, options)
      .map(res => res.json());
  }

  public registerLocation(newLocation: LocationModel) {
    const authHeaders = this.authRequest.GetHeaders();
    const options = new RequestOptions({ headers: authHeaders });
    return this.http
      .post(this.locationUrl, newLocation, options)
      .map(res => res.json());
  }

  public getLocationTypes() {
    return this.http.get(this.locationTypeUrl).map(res => res.json());
  }

  public getCountries() {
    return this.http.get(this.countryUrl).map(res => res.json());
  }
}
