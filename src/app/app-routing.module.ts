import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BrotherListComponent } from './brother-list/brother-list.component';
import { BrotherDetailsComponent } from './brother-details/brother-details.component';
import { EditDetailsComponent } from './edit-details/edit-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/brothers',
    pathMatch: 'full'
  },
  {
    path: 'index.html',
    component: BrotherListComponent
  },
  {
    path: 'brothers',
    component: BrotherListComponent
  },
  {
    path: 'details/:id',
    component: BrotherDetailsComponent
  },
  {
    path: 'edit-details/:id',
    component: EditDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
