import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState, getUserList, getUserState } from '../../reducers/index';
import { UserActions } from '../../actions/user.actions';
import { LoginActions } from '../../actions/login.actions';
import { User } from '../../models/';
import { UserListActions } from '../../actions/user-list.actions';
import { go } from '@ngrx/router-store';

@Component({
  selector: 'ist-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  lists;
  userList$: Observable<any>;
  user$: Observable<any>;
  constructor(private router: Router,
              private userActions: UserActions,
              private loginActions: LoginActions,
              private userListActions: UserListActions,
              private store: Store<AppState>) {
      this.userList$ = this.store.select(getUserList);
      this.user$ = this.store.select(getUserState);
    }

  signOutUser(){
    this.store.dispatch(this.loginActions.logout())
  }

  ngOnInit() {
    this.store.dispatch(this.userListActions.getUserLists());
    this.store.dispatch(this.userActions.loadProfile());
  }

  backToHome(){
    this.store.dispatch(go(['/dashboard/feeds']))
  }

  goToSuggestionPage(){
    this.store.dispatch(go('/dashboard/suggestions'))
  }
}
