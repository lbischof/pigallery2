import {AfterViewInit, Component, ElementRef, Inject, LOCALE_ID, OnInit, QueryList, ViewChildren} from '@angular/core';
import {AuthenticationService} from '../../model/network/authentication.service';
import {UserRoles} from '../../../../common/entities/UserDTO';
import {NotificationService} from '../../model/notification.service';
import {NotificationType} from '../../../../common/entities/NotificationDTO';
import {NavigationService} from '../../model/navigation.service';
import {I18n} from '@ngx-translate/i18n-polyfill';
import {ISettingsComponent} from '../settings/_abstract/ISettingsComponent';
import {PageHelper} from '../../model/page.helper';
import {SettingsService} from '../settings/settings.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, AfterViewInit {
  simplifiedMode = true;
  @ViewChildren('setting') settingsComponents: QueryList<ISettingsComponent>;
  @ViewChildren('setting', {read: ElementRef}) settingsComponentsElemRef: QueryList<ElementRef>;
  contents: ISettingsComponent[] = [];

  constructor(private _authService: AuthenticationService,
              private _navigation: NavigationService,
              public notificationService: NotificationService,
              public settingsService: SettingsService,
              @Inject(LOCALE_ID) private locale: string,
              public i18n: I18n) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.contents = this.settingsComponents.toArray(), 0);
  }

  scrollTo(i: number) {
    PageHelper.ScrollY = this.settingsComponentsElemRef.toArray()[i].nativeElement.getBoundingClientRect().top +
      PageHelper.ScrollY;
  }

  ngOnInit() {
    if (!this._authService.isAuthenticated()
      || this._authService.user.value.role < UserRoles.Admin) {
      this._navigation.toLogin();
      return;
    }
  }


  public getCss(type: NotificationType) {
    switch (type) {
      case NotificationType.error:
        return 'danger';
      case NotificationType.warning:
        return 'warning';
      case NotificationType.info:
        return 'info';
    }
    return 'info';
  }

}



