/**
 * Created by wh1709040 on 2018/4/27.
 */
import {Routes} from '@angular/router';
import {RenderComponent} from './render/render.component';
import {AppComponent} from './app.component';

export const Route: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/render'},
  {path: 'render', component: RenderComponent},
];
