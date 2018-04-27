import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {RenderComponent} from './render/render.component';
import {AlertComponent} from './alert/alert.component';
import {RouterModule} from '@angular/router';
import {Route} from './router';
import {CustomTemplateComponent} from './custom-template/custom-template.component';


@NgModule({
  declarations: [
    AppComponent,
    RenderComponent,
    AlertComponent,
    CustomTemplateComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(Route, {enableTracing: true}),
  ],
  entryComponents: [AlertComponent, CustomTemplateComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
