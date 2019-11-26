import {Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { MessagesComponent } from './messages/messages.component';
import { ListsComponent } from './lists/lists.component';
import { AuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MemberDetailResolver } from './_resolvers/member-detail.resolver';
import { MemberListResolver } from './_resolvers/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberEditResolver } from './_resolvers/member-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';
import { ListsResolver } from './_resolvers/lists.resolver';
import { MessagesResolver } from './_resolvers/messages.resolver';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { ClientListComponent } from './clients/client-list/client-list.component';
import { ClientListResolver } from './_resolvers/client-list.resolver';
import { ClientDetailComponent } from './clients/client-detail/client-detail.component';
import { ClientDetailResolver } from './_resolvers/client-detail.resolver';
import { ClientSkeletonComponent } from './clients/client-skeleton/client-skeleton.component';
import { AssetListResolver } from './_resolvers/asset-list.resolver';
import { ClientMaintListComponent } from './clients/client-maint-list/client-maint-list.component';
import { MaintListResolver } from './_resolvers/maint-list.resolver';
import { ProductListComponent } from './catalog/product-list/product-list.component';
import { ProductListResolver } from './_resolvers/product-list.resolver';
import { ProductDetailComponent } from './catalog/product-detail/product-detail.component';
import { ProductSkeletonComponent } from './catalog/product-skeleton/product-skeleton.component';
import { ProductDetailResolver } from './_resolvers/product-detail.resolver';

export const appRoutes: Routes = [
    {path: '', component: HomeComponent},
    {
        path: '',
        runGuardsAndResolvers: 'always',
        canActivate: [AuthGuard],
        children: [
            {path: 'clients', component: ClientListComponent,
                resolve: {clients: ClientListResolver}},
            {path: 'clients/:id', component: ClientSkeletonComponent,
                resolve: {client: ClientDetailResolver,
                            assets: AssetListResolver,
                            }},
            {path: 'members', component: MemberListComponent,
                resolve: {users: MemberListResolver}},
            {path: 'members/:id', component: MemberDetailComponent,
                resolve: {user: MemberDetailResolver}},
            {path: 'member/edit', component: MemberEditComponent,
                resolve: {user: MemberEditResolver}, canDeactivate: [PreventUnsavedChanges]},
            {path: 'messages', component: MessagesComponent, resolve: {messages: MessagesResolver}},
            {path: 'lists', component: ListsComponent, resolve: {users: ListsResolver}},
            {path: 'admin', component: AdminPanelComponent, data: {roles: ['Admin', 'Moderator']}},
            {path: 'products', component: ProductListComponent,
                resolve: {products: ProductListResolver}},
            {path: 'products/:id', component: ProductSkeletonComponent,
                resolve: {product: ProductDetailResolver}},
            ]
    },
    {path: '**', redirectTo: '', pathMatch: 'full'},
];
