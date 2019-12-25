import { BrowserModule, HammerGestureConfig, HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxGalleryModule } from 'ngx-gallery';
import { FileUploadModule } from 'ng2-file-upload';
import {TimeAgoPipe} from 'time-ago-pipe';

// Components
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { MemberListComponent } from './members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { appRoutes } from './routes';
import { AuthGuard } from './_guards/auth.guard';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { PhotoEditorComponent } from './members/photo-editor/photo-editor.component';
import { MemberMessagesComponent } from './members/member-messages/member-messages.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { HasRoleDirective } from './_directives/hasRole.directive';
import { UserManagementComponent } from './admin/user-management/user-management.component';
import { PhotoManagementComponent } from './admin/photo-management/photo-management.component';
import { RolesModalComponent } from './admin/roles-modal/roles-modal.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientSkeletonComponent } from './clients/client-skeleton/client-skeleton.component';
import { ClientAssetsListComponent } from './clients/client-assets-list/client-assets-list.component';
import { ClientAssetDetailComponent } from './clients/client-asset-detail/client-asset-detail.component';
import { ClientAddComponent } from './clients/client-add/client-add.component';
import { ProductListComponent } from './catalog/product-list/product-list.component';
import { ProductAddComponent } from './catalog/product-add/product-add.component';
import { ProductDetailComponent } from './catalog/product-detail/product-detail.component';
import { ProductSkeletonComponent } from './catalog/product-skeleton/product-skeleton.component';

// Services
import { UserService } from './_services/user.service';
import { AlertifyService } from './_services/alertify.service';
import { AdminService } from './_services/admin.service';
import { AssetService } from './_services/asset.service';
// Resolvers
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { ClientListResolver } from './_resolvers/client-list.resolver';
import { ClientDetailResolver } from './_resolvers/client-detail.resolver';
import { AssetListResolver } from './_resolvers/asset-list.resolver';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { ProductDetailResolver } from './_resolvers/product-detail.resolver';
import { AssetDetailResolver } from './_resolvers/asset-detail.resolver';
import { ClientAssetDetailModalComponent } from './clients/client-asset-detail-modal/client-asset-detail-modal.component';
import { AssetListComponent } from './assets/asset-list/asset-list.component';
import { AssetSkeletonComponent } from './assets/asset-skeleton/asset-skeleton.component';
import { AssetDetailComponent } from './assets/asset-detail/asset-detail.component';
import { AssetMaintScheduleListComponent } from './assets/asset-maint-schedule-list/asset-maint-schedule-list.component';
import { MaintScheduleAssetListResolver } from './_resolvers/maint-schedule-asset-list.resolver';
import { MaintScheduleAssetDetailModalComponent } from './assets/maint-schedule-asset-detail-modal/maint-schedule-asset-detail-modal.component';
import { MaintScheduleAssetService } from './_services/maintScheduleAsset.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

export class CustomHammerConfig extends HammerGestureConfig  {
  overrides = {
      pinch: { enable: false },
      rotate: { enable: false }
  };
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    RegisterComponent,
    MemberListComponent,
    ListsComponent,
    MessagesComponent,
    MemberCardComponent,
    MemberDetailComponent,
    MemberEditComponent,
    PhotoEditorComponent,
    TimeAgoPipe,
    MemberMessagesComponent,
    AdminPanelComponent,
    HasRoleDirective,
    UserManagementComponent,
    PhotoManagementComponent,
    RolesModalComponent,
    ClientListComponent,
    ClientDetailComponent,
    ClientSkeletonComponent,
    ClientAssetsListComponent,
    ClientAssetDetailComponent,
    ClientAddComponent,
    ProductListComponent,
    ProductAddComponent,
    ProductDetailComponent,
    ProductSkeletonComponent,
    ClientAssetDetailModalComponent,
    AssetListComponent,
    AssetSkeletonComponent,
    AssetDetailComponent,
    AssetMaintScheduleListComponent,
    MaintScheduleAssetDetailModalComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    ModalModule.forRoot(),
    NgxGalleryModule,
    FileUploadModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:5000'],
        blacklistedRoutes: ['localhost:5000/api/auth']
      }
    }),
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
      AuthService,
      ErrorInterceptorProvider,
      AlertifyService,
      AuthGuard,
      UserService,
      MemberDetailResolver,
      MemberListResolver,
      MemberEditResolver,
      PreventUnsavedChanges,
      ListsResolver,
      MessagesResolver,
      AdminService,
      ClientListResolver,
      ClientDetailResolver,
      AssetListResolver,
      AssetService,
      ProductListResolver,
      ProductDetailResolver,
      AssetDetailResolver,
      MaintScheduleAssetListResolver,
      MaintScheduleAssetService,
      { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }
    ],
  entryComponents: [
    RolesModalComponent,
    ClientAssetDetailModalComponent,
    ClientDetailComponent,
    ClientAddComponent,
    ProductAddComponent,
    MaintScheduleAssetDetailModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
