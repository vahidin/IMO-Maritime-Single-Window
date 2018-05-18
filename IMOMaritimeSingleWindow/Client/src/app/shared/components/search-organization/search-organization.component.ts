import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { catchError, debounceTime, distinctUntilChanged, merge, switchMap, tap } from 'rxjs/operators';
import { OrganizationService } from '../../services/organization.service';



@Component({
  selector: 'app-search-organization',
  templateUrl: './search-organization.component.html',
  styleUrls: ['./search-organization.component.css'],
})
export class SearchOrganizationComponent implements OnInit {

  organizationModel: any;
  organizationSelected = false;

  searching = false;
  searchFailed = false;
  hideSearchingWhenUnsubscribed = new Observable(() => () => this.searching = false);

  constructor(private organizationService: OrganizationService) { }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(150),
      distinctUntilChanged(),
      tap((term) => {
        this.searchFailed = false;
        this.searching = (term.length >= 2)
      }),
      switchMap(term =>
        this.organizationService.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap((res) => {
        this.searching = false;
        this.searchFailed = (this.organizationModel.length >= 2 && res.length === 0);
      }),
      merge(this.hideSearchingWhenUnsubscribed)
    );

  formatter = (x: { organizationId: string }) => x.organizationId;

  selectOrganization($event) {
    this.organizationSelected = true;
    this.organizationModel = $event.item;
    this.organizationService.setOrganizationData(this.organizationModel);
  }

  deselectOrganization() {
    this.organizationSelected = false;
    this.organizationService.setOrganizationData(null);
  }

  ngOnInit() {
    this.organizationService.setOrganizationData(null);
  }
}