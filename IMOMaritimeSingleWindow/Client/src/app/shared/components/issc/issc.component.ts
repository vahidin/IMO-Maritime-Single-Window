import { Component, OnInit, Input } from '@angular/core';
import { InternationalShipSecurityCertificateModel } from '../../models/international-ship-security-certificate-model';
import { NgbDate } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { CountryModel } from '../../models/country-model';
import { OrganizationModel } from '../../models/organization-model';

@Component({
  selector: 'app-issc',
  templateUrl: './issc.component.html',
  styleUrls: ['./issc.component.css']
})
export class IsscComponent implements OnInit {
  @Input() isscModel: InternationalShipSecurityCertificateModel;
  expiryDateModel: NgbDate;
  issuerTypeList = [
    {
      name: 'Government',
      isGovernmentType: true
    },
    {
      name: 'Recognized Security Organization (RSO)',
      isGovernmentType: false
    }
  ];

  constructor() { }

  ngOnInit() {
    if (this.isscModel.expiryDate) {
      this.setNgbDate();
    }
  }

  setNgbDate() {
    this.expiryDateModel = new NgbDate(this.isscModel.expiryDate.getFullYear(), this.isscModel.expiryDate.getMonth() + 1, this.isscModel.expiryDate.getDate());
  }

  onExpiryDateSelection(date: NgbDate) {
    this.isscModel.expiryDate = new Date(Date.UTC(date.year, date.month - 1, date.day));
  }

  onIssuerTypeSelection(issuerType) {
    if (this.isscModel.issuedByGovernment) {
      this.isscModel.rsoIssuerId = null;
    } else {
      this.isscModel.governmentIssuerId = null;
    }
  }

  onCountrySelection(country: CountryModel) {
    this.isscModel.governmentIssuerId = country.countryId;
  }

  onOrganizationSelection(organization: OrganizationModel) {
    this.isscModel.rsoIssuerId = organization.organizationId;
  }

}
