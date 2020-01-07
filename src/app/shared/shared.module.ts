import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        //formularios
        ReactiveFormsModule,
        FormsModule
    ],
    exports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        //formularios
        ReactiveFormsModule,
        FormsModule],
    providers: [],
})
export class SharedModule { }