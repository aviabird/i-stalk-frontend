import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Store } from '@ngrx/store';
import { AppState, getAllFeeds } from '../../reducers';
import { FeedsActions } from '../../actions/feeds.actions';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'ist-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {
  feeds: Observable<any>;
  constructor(private store: Store<AppState>,
              private feedActions: FeedsActions,
              private router: Router) { 
    this.feeds = this.store.select(getAllFeeds);
  }

  ngOnInit() {
    this.store.dispatch(this.feedActions.getAllFeeds());
  }
}
