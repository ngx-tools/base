# ngm-base
This is a base module for implementing angular apps.
It provides base features for making your web app **Responsive** (also Adaptive), **Multi-Language** and **Multi-Direction**.
And it is base for other modules like **ngm-dynamic-form** and **ngm-grid**

## Installation
First you need to install the npm module:
```sh
npm i ngm-base --save
```
## Usage
### Import the `NgmBaseModule`:
Finally, you can use ngm-base in your Angular project. You have to import `NgmBaseModule.forRoot()` in the root NgModule of your application.

The [`forRoot`](https://angular.io/api/router/RouterModule#forroot) static method is a convention that provides and configures services at the same time.
Make sure you only call this method in the root module of your application, most of the time called `AppModule`.
This method allows you to configure the `NgmBaseModule` by specifying default lang and layout options.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgmBaseModule} from 'ngm-base';

@NgModule({
    imports: [
        BrowserModule,
        NgmBaseModule.forRoot()
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
## Configuration
By default package has nice default configuration. But you can change it in `forRoot` static function in module load as below:
```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgmBaseModule} from 'ngm-base';

@NgModule({
    imports: [
        BrowserModule,
        NgmBaseModule.forRoot({
            default_lang: 'en',
            fxLayoutOption: new Map([
                                    [MediaQuery.xs, {cols: 4, margin: '5.6%', padding: '5.6%', gap: '6.4%'}],
                                    [MediaQuery.sm, {cols: 4, margin: '5.6%', padding: '5.6%', gap: '6.4%'}],
                                    [MediaQuery.md, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}],
                                    [MediaQuery.lg, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}],
                                    [MediaQuery.xl, {cols: 12, margin: '2.5%', padding: '2.5%', gap: '2.5%'}]
                                ])        
        })
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```
## Usage
`NgmBaseModule` has an abstract class `NgmBaseComponent` that your component class should extends it.

```ts
import {NgmBaseComponent} from 'ngm-base';

export class SampleComponent extends NgmBaseComponent {
}
```

### Constructor
If your controller has constructor you should call super constructor as below:

```ts
import { Component } from '@angular/core';
import {NgmBaseComponent} from 'ngm-base';
import {TranslateService} from '@ngx-translate/core';
import {BreakpointObserver} from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent extends NgmBaseComponent {

    constructor(translate: TranslateService, breakpointObserver: BreakpointObserver) {
        super(translate, breakpointObserver);
    }
}
```

### Variables and Function
By extending your component from `NgmBaseComponent` you can access to this parameters and functions
#### Variables
* `dir` Direction of app based on current language.
* `gap` Space between to column in angular flex.
* `margin` The margin.
* `padding` The padding.
* `mq` MediaQuery. Current screen size by angular.
* `cols` Default number of columns in current MediaQuery.
#### function
* `calc(num: number, cols: number = this.cols, gap: string = this.gap)`
return a percent number to use in `[fxFlex]` based on number of columns and space between them (gap).
For example `calc(2)` returns percent corresponding to 2 columns of number of columns in current MediaQuery.
By second parameter in `calc` you can override number of columns.

### Template files
This example shows how to use NgmBase with [`angular material`](https://material.angular.io/) in template files:
```html
<div [dir]="this.dir" [ngStyle]="{padding: this.padding, margin: this.margin}">
    <div fxLayout="row" [fxLayoutGap]="this.gap">
        <div [fxFlex]="calc(2)">sample text</div>
        <div [fxFlex]="calc(10)">sample text</div>
    </div>
</div>
```