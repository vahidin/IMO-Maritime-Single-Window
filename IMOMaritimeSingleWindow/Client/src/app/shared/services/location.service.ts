import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject, Observable } from "rxjs";
import { LocationModel } from "../models/location-model";
import { SearchService } from "./search.service";

@Injectable()
export class LocationService {

    private searchService: SearchService;
    private searchUrl: string;
    private registerLocationUrl: string;
    private getLocationTypesUrl: string;
    private getCountriesUrl: string;

    constructor(private http: Http) {
        this.searchService = new SearchService(http);
        this.searchUrl = 'api/location/search';
        this.registerLocationUrl = 'api/location/register';
        this.getLocationTypesUrl = 'api/locationtype/getall';
        this.getCountriesUrl = 'api/country/getall';
    }

    private locationDataSource = new BehaviorSubject<any>(null);
    locationData$ = this.locationDataSource.asObservable();

    setLocationData(data) {
        this.locationDataSource.next(data);
    }

    public search(term: string) {
        if (term.length < 2) {
            return Observable.of([]);
        }
        return this.searchService.search(this.searchUrl, term);
    }

    public registerLocation(newLocation: LocationModel) {
        return this.http.post(this.registerLocationUrl, newLocation).map(res => res.json());
    }

    public getLocationTypes() {
        return this.http.get(this.getLocationTypesUrl)
            .map(res => res.json());
    }

    public getCountries() {
        return this.http.get(this.getCountriesUrl)
            .map(res => res.json());
    }
}