import { NgModule } from '@angular/core';
import { GetArrayPipe } from './_pipes/get-array.pipe';
import { GetRandomPipe } from './_pipes/get-random.pipe';
import { AddSymbolPipe } from './_pipes/add-symbol.pipe';
import { TwoDecimalPipe } from './_pipes/two-decimal.pipe';
import { TimeElapsedPipe } from './_pipes/time-elapsed.pipe';
import { TruncateTextPipe } from './_pipes/truncate-text.pipe';
import { GetSymbolNamePipe } from './_pipes/get-symbol-name.pipe';
import { AbrreviateNumberPipe } from './_pipes/abrreviate-number.pipe';
import { NullValueConverterPipe } from './_pipes/null-value-converter.pipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
    declarations: [
        GetArrayPipe,
        GetRandomPipe,
        AddSymbolPipe,
        TwoDecimalPipe,
        TimeElapsedPipe,
        GetSymbolNamePipe,
        AbrreviateNumberPipe,

        NullValueConverterPipe,
    ],
    exports: [
        GetArrayPipe,
        AddSymbolPipe,
        GetRandomPipe,
        TwoDecimalPipe,
        TimeElapsedPipe,
        GetSymbolNamePipe,
        AbrreviateNumberPipe,
        NullValueConverterPipe,

        FontAwesomeModule,
    ]
})
export class SharedModule {

    static forRoot() {
        return {
            ngModule: SharedModule,
            providers: [
                //services that are shares across modules
            ],
        }
    }





}