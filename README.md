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
            rtlLangs: ['fa', 'ar'],
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
Remember that all parameters are optional. 
## Usage
`NgmBaseModule` has a service `NgmBaseService` that you can inject it in any component.

```ts
import {NgmBaseService} from 'ngm-base';

export class SampleComponent {
    constructor(public baseService: NgmBaseService) {}
}
```
### Variables and Function
By injecting `NgmBaseService` you can access to this parameters and functions
#### Variables
* `dir` Direction of app based on current language.
* `gap` Space between two column in angular flex.
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
<div [dir]="this.dir" [ngStyle]="{padding: baseService.padding, margin: baseService.margin}">
    <div fxLayout="row" [fxLayoutGap]="baseService.gap">
        <div [fxFlex]="baseService.calc(2)">sample text</div>
        <div [fxFlex]="baseService.calc(10)">sample text</div>
    </div>
</div>
```