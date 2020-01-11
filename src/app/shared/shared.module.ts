import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DynamicPipe } from './pipe/dynamic.pipe';

@NgModule({
    declarations: [DynamicPipe],
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
        DynamicPipe,
        MaterialModule,
        HttpClientModule,
        //formularios
        ReactiveFormsModule,
        FormsModule],
    providers: []
})
export class SharedModule { }
