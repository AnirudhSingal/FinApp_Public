import { NgModule } from "@angular/core";
import {
    MatAutocompleteModule,
    MatCardModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule
} from '@angular/material';

@NgModule({
    exports: [
        MatCardModule,
        MatSortModule,
        MatTableModule,
        MatButtonModule,
        MatPaginatorModule,
        MatAutocompleteModule,
    ],
})
export class MaterialModule {
    constructor() { }
}