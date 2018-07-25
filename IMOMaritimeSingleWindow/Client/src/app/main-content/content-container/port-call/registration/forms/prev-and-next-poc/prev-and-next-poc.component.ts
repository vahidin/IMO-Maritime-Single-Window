import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { LocationProperties } from 'app/shared/constants/location-properties';
import { DateTime } from 'app/shared/interfaces/dateTime.interface';
import { LocationModel } from 'app/shared/models/location-model';
import { PrevAndNextPocService } from 'app/shared/services/prev-and-next-poc.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-prev-and-next-poc',
  templateUrl: './prev-and-next-poc.component.html',
  styleUrls: ['./prev-and-next-poc.component.css']
})
export class PrevAndNextPocComponent implements OnInit, OnDestroy {

  prevLocationModel: LocationModel = null;
  nextLocationModel: LocationModel = null;

  prevLocationFound = false;
  nextLocationFound = false;

  etdModel: DateTime;
  etaModel: DateTime;

  dateSequenceError = false;
  timeSequenceError = false;

  prevLocationData = new LocationProperties().getPropertyList();
  nextLocationData = new LocationProperties().getPropertyList();

  prevPortOfCallDataSubscription: Subscription;
  nextPortOfCallDataSubscription: Subscription;
  prevPortOfCallEtdDataSubscription: Subscription;
  nextPortOfCallEtaDataSubscription: Subscription;

  constructor(private prevAndNextPocService: PrevAndNextPocService) { }

  ngOnInit() {
    this.prevPortOfCallDataSubscription = this.prevAndNextPocService.prevPortOfCallData$.subscribe(
      data => {
        this.prevLocationModel = data;
        if (data) {
          console.log(data);
          this.prevLocationFound = true;
          LocationProperties.setLocationData(this.prevLocationData, this.prevLocationModel);
          if (this.prevLocationModel.country != null) {
            const twoCharCode = this.prevLocationModel.country.twoCharCode.toLowerCase() || 'xx';
            const countryFlag = twoCharCode + '.png';
            LocationProperties.setCountry(this.prevLocationData, this.prevLocationModel.country.name, countryFlag);
          }
        }
      }
    );

    this.nextPortOfCallDataSubscription = this.prevAndNextPocService.nextPortOfCallData$.subscribe(
      data => {
        this.nextLocationModel = data;
        if (data) {
          this.nextLocationFound = true;
          LocationProperties.setLocationData(this.nextLocationData, this.nextLocationModel);
          if (this.nextLocationModel.country != null) {
            const twoCharCode = this.nextLocationModel.country.twoCharCode.toLowerCase() || 'xx';
            const countryFlag = twoCharCode + '.png';
            LocationProperties.setCountry(this.nextLocationData, this.nextLocationModel.country.name, countryFlag);
          }
        }
      }
    );

    this.prevPortOfCallEtdDataSubscription = this.prevAndNextPocService.prevPortOfCallEtdData$.subscribe(
      data => {
        if (data) {
          const dateTime = new Date(data);
          this.etdModel = {
            date: new NgbDate(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate()),
            time: new NgbTime(dateTime.getHours(), dateTime.getMinutes(), 0)
          };
        } else {
          this.etdModel = {
            date: null,
            time: new NgbTime(0, 0, 0)
          };
        }
      }
    );

    this.nextPortOfCallEtaDataSubscription = this.prevAndNextPocService.nextPortOfCallEtaData$.subscribe(
      data => {
        if (data) {
          const dateTime = new Date(data);
          this.etaModel = {
            date: new NgbDate(dateTime.getFullYear(), dateTime.getMonth() + 1, dateTime.getDate()),
            time: new NgbTime(dateTime.getHours(), dateTime.getMinutes(), 0)
          };
        } else {
          this.etaModel = {
            date: null,
            time: new NgbTime(0, 0, 0)
          };
        }
      }
    );
  }

  ngOnDestroy() {
    this.prevPortOfCallDataSubscription.unsubscribe();
    this.nextPortOfCallDataSubscription.unsubscribe();
    this.prevPortOfCallEtdDataSubscription.unsubscribe();
    this.nextPortOfCallEtaDataSubscription.unsubscribe();
  }

  onPrevLocationResult(prevLocationResult) {
    this.prevAndNextPocService.setPrevPortOfCall(prevLocationResult);
  }

  onNextLocationResult(nextLocationResult) {
    this.prevAndNextPocService.setNextPortOfCall(nextLocationResult);
  }

  deselectPrevLocation() {
    this.prevLocationFound = false;
    this.prevAndNextPocService.setPrevPortOfCall(null);
  }

  deselectNextLocation() {
    this.nextLocationFound = false;
    this.prevAndNextPocService.setNextPortOfCall(null);
  }

  onEtdResult(etdResult) {
    if (etdResult) {
      const dateTime: DateTime = etdResult;
      const date: Date = new Date(dateTime.date.year, dateTime.date.month - 1, dateTime.date.day, dateTime.time.hour, dateTime.time.minute);
      this.prevAndNextPocService.setPrevPortOfCallEtd(date);
      this.validateDateTime();
    }
  }

  onEtaResult(etaResult) {
    if (etaResult) {
      const dateTime: DateTime = etaResult;
      const date: Date = new Date(dateTime.date.year, dateTime.date.month - 1, dateTime.date.day, dateTime.time.hour, dateTime.time.minute);
      this.prevAndNextPocService.setNextPortOfCallEta(date);
      this.validateDateTime();
    }
  }

  private validateDateTime() {
    if (this.etaModel.date && this.etdModel.date) {
      const etaDate = new NgbDate(this.etaModel.date.year, this.etaModel.date.month, this.etaModel.date.day);
      const etdDate = new NgbDate(this.etdModel.date.year, this.etdModel.date.month, this.etdModel.date.day);

      this.dateSequenceError = etdDate.after(etaDate);

      if (etdDate.equals(etaDate)) {
        this.timeSequenceError = this.etdModel.time.hour > this.etaModel.time.hour
          || (this.etdModel.time.hour === this.etaModel.time.hour
            && this.etdModel.time.minute >= this.etaModel.time.minute);
      } else {
        this.timeSequenceError = false;
      }
    } else {
      this.dateSequenceError = false;
      this.timeSequenceError = false;
    }
    this.persistDateTime();
  }

  private persistDateTime() {
    if (!this.dateSequenceError && !this.timeSequenceError) {
      if (this.etdModel.date) {
        const etdDateTime: Date = new Date(this.etdModel.date.year, this.etdModel.date.month - 1, this.etdModel.date.day, this.etdModel.time.hour, this.etdModel.time.minute);
        this.prevAndNextPocService.setPrevPortOfCallEtd(etdDateTime);
      } else {
        const etdDateTime: DateTime = {
          date: null,
          time: new NgbTime(0, 0, 0)
        };
        this.prevAndNextPocService.setPrevPortOfCallEtd(null);
      }
      if (this.etaModel.date) {
        const etaDateTime: Date = new Date(this.etaModel.date.year, this.etaModel.date.month - 1, this.etaModel.date.day, this.etaModel.time.hour, this.etaModel.time.minute);
        this.prevAndNextPocService.setNextPortOfCallEta(etaDateTime);
      } else {
        const etaDateTime: DateTime = {
          date: null,
          time: new NgbTime(0, 0, 0)
        };
        this.prevAndNextPocService.setNextPortOfCallEta(null);
      }
    }
  }
}
