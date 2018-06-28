import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { SearchLocationComponent } from 'app/shared/components/search-location/search-location.component';
import { LocationProperties } from 'app/shared/constants/location-properties';
import { PortCallService } from 'app/shared/services/port-call.service';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app-find-location',
    templateUrl: './find-location.component.html',
    styleUrls: ['./find-location.component.css']
})
export class FindLocationComponent implements AfterViewInit {

    @ViewChild(SearchLocationComponent) searchLocationComponent: SearchLocationComponent;

    locationFound = false;

    locationFlag: string;
    locationProperties = LocationProperties.PROPERTIES;
    locationInfo: any[];
    constructor(private portCallService: PortCallService) { }

    deselectLocation() {
        this.locationFound = false;
    }

    ngAfterViewInit() {
        this.searchLocationComponent.getService().locationData$.subscribe(
            locationResult => {
                if (locationResult) {
                    this.locationFlag = (locationResult.country) ? locationResult.country.twoCharCode.toLowerCase() : null;
                    this.locationProperties.COUNTRY.data = (locationResult.country) ? locationResult.country.name : null;
                    this.locationProperties.LOCATION_TYPE.data = locationResult.locationType.name;
                    this.locationProperties.LOCATION_NAME.data = locationResult.name;
                    this.locationProperties.LOCATION_CODE.data = locationResult.locationCode;

                    this.locationFound = true;
                    this.portCallService.setLocationData(locationResult);
                } else {
                    this.locationFound = false;
                    this.portCallService.setLocationData(null);
                }
                this.locationInfo = Object.values(this.locationProperties);
            }
        );
    }
}
