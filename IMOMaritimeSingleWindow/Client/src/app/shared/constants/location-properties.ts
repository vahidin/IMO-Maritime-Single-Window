import { DataProperty } from 'app/shared/interfaces/property.interface';
import { LocationModel } from '../models/location-model';

export class LocationProperties {
  static PROPERTIES = {
    COUNTRY: { description: 'Country', data: null },
    LOCATION_NAME: { description: 'Name', data: null },
    LOCATION_CODE: { description: 'Location Code', data: null },
    LOCATION_TYPE: { description: 'Type', data: null }
  };

  static COUNTRY = 'Country';
  static LOCATION_NAME = 'Location Name';
  static LOCATION_CODE = 'Location Code';
  static LOCATION_TYPE = 'Location Type';
  static FLAGS_FOLDER = 'assets/images/flags/';

  propertyList: DataProperty[] = [
    { description: LocationProperties.COUNTRY, data: null, imageUrl: null },
    { description: LocationProperties.LOCATION_NAME, data: null, imageUrl: null },
    { description: LocationProperties.LOCATION_CODE, data: null, imageUrl: null },
    { description: LocationProperties.LOCATION_TYPE, data: null, imageUrl: null },
  ];

  static setLocationData(propertyList, locationModel: LocationModel) {
    if (locationModel.country) {
      LocationProperties.setCountry(propertyList, locationModel.country.name);
    }
    LocationProperties.setLocationName(propertyList, locationModel.name);
    LocationProperties.setLocationCode(propertyList, locationModel.locationCode);
    if (locationModel.locationType) {
      LocationProperties.setLocationType(propertyList, locationModel.locationType.name);
    }
  }

  static setCountry(propertyList, data, image = null) {
    propertyList.find(e => e.description === LocationProperties.COUNTRY).data = data;
    if (image) {
      propertyList.find(e => e.description === LocationProperties.COUNTRY).imageUrl = (LocationProperties.FLAGS_FOLDER + image);
    }
  }

  static setLocationName(propertyList, data, imageUrl = null) {
    propertyList.find(e => e.description === LocationProperties.LOCATION_NAME).data = data;
  }

  static setLocationCode(propertyList, data, imageUrl = null) {
    propertyList.find(e => e.description === LocationProperties.LOCATION_CODE).data = data;
  }

  static setLocationType(propertyList, data, imageUrl = null) {
    propertyList.find(e => e.description === LocationProperties.LOCATION_TYPE).data = data;
  }

  getPropertyList() {
    return this.propertyList;
  }

}
