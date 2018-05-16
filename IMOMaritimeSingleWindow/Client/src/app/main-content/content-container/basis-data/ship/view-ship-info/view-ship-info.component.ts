import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../../../../shared/services/constants.service';
import { ContentService } from '../../../../../shared/services/content.service';
import { ShipService } from '../../../../../shared/services/ship.service';
import { CONTENT_NAMES } from '../../../../../shared/constants/content-names';

const SHIP_NAME = "Ship Name:";
const CALL_SIGN = "Call Sign:";
const IMO_NO = "IMO no:";
const MMSI_NO = "MMSI no:";
const GROSS_TONNAGE = "Gross Tonnage:";
const LENGTH = "Length:";
const SHIP_TYPE = "Ship Type:";
const SHIP_STATUS = "Ship Status:"

@Component({
  selector: 'app-view-ship-info',
  templateUrl: './view-ship-info.component.html',
  styleUrls: ['./view-ship-info.component.css'],
  providers: [ConstantsService]
})
export class ViewShipInfoComponent implements OnInit {

  shipFlag: string;
  contactMediumList: any;
  shipHasContactInfo: boolean = false;
  shipContactInfo: any[] = [];

  shipModel: any;
  shipFound: boolean = false;

  shipInfo: any[] = [
    { description: SHIP_NAME, data: null },
    { description: CALL_SIGN, data: null },
    { description: IMO_NO, data: null },
    { description: MMSI_NO, data: null },
    { description: GROSS_TONNAGE, data: null },
    { description: LENGTH, data: null },
    { description: SHIP_TYPE, data: null },
    { description: SHIP_STATUS, data: null }
  ];

  deselectShip() {
    this.shipFound = false;
    this.shipService.setShipOverviewData(null);
  }

  registerNewShip() {
    this.contentService.setContent(CONTENT_NAMES.REGISTER_SHIP);
  }

  constructor(private shipService: ShipService, private constantsService: ConstantsService, private contentService: ContentService) { }

  ngOnInit() {
    this.shipService.shipOverviewData$.subscribe(
      shipData => {
        if (shipData) {
          this.shipFound = true;
          this.shipModel = shipData;
          if (shipData.country) this.shipFlag = shipData.country.twoCharCode.toLowerCase();
          if (shipData.shipType) this.shipInfo.find(p => p.description == SHIP_TYPE).data = shipData.shipType.name;
          if (shipData.shipStatus) this.shipInfo.find(p => p.description == SHIP_STATUS).data = shipData.shipStatus.name;
          this.shipInfo.find(p => p.description == SHIP_NAME).data = shipData.ship.name;
          this.shipInfo.find(p => p.description == CALL_SIGN).data = shipData.ship.callSign;
          this.shipInfo.find(p => p.description == IMO_NO).data = shipData.ship.imoNo;
          this.shipInfo.find(p => p.description == MMSI_NO).data = shipData.ship.mmsiNo;
          this.shipInfo.find(p => p.description == GROSS_TONNAGE).data = shipData.ship.grossTonnage;
          this.shipInfo.find(p => p.description == LENGTH).data = shipData.ship.length;
          this.constantsService.getContactMediumList().subscribe(
            results => {
              if (results) {
                this.contactMediumList = results;
                if (shipData && shipData.contactList != null && shipData.contactList.length > 0) {
                  this.shipHasContactInfo = true;
                  this.contactMediumList.forEach(contactMedium => {
                    let value = shipData.contactList.find(shipCM => shipCM.contactMediumId == contactMedium.contactMediumId);
                    if (value) {
                      this.shipContactInfo.push({ description: contactMedium.contactMediumType + ":", data: value.contactValue, isPreferred: value.isPreferred })
                    }
                  });
                }
              }
            }
          );
        } else {
          this.shipFound = false;
        }
      }
    );
  }

}
