import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatCard} from "@angular/material/card";
import {MatFormField, MatHint, MatLabel} from "@angular/material/form-field";
import {MatRadioButton, MatRadioGroup} from "@angular/material/radio";
import {MatOption} from "@angular/material/autocomplete";
import {MatSelect} from "@angular/material/select";
import {MatButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        MatCard,
        MatLabel,
        MatFormField,
        MatRadioButton,
        MatRadioGroup,
        MatOption,
        MatSelect,
        BrowserModule,
        AppRoutingModule,
        MatButton,
        MatInput,
        MatHint,
        ReactiveFormsModule
    ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
