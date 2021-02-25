import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs";
import { switchMap } from "rxjs/operators";
import { OptionService } from "src/app/services/option.service";
import { OptionModel } from "src/app/types/option.type";
import { EOptionActions, GetOptions, GetOptionsSuccess } from "../actions/option.actions";
import { AppState } from "../state/app.state";

@Injectable()
export class OptionEffects {
    constructor(
        private actions: Actions,
        private optionService: OptionService,
        private store: Store<AppState>
    ) {}

    getOptions = createEffect(() => this.actions.pipe(
        ofType<GetOptions>(EOptionActions.getOptions),
        switchMap(() => this.optionService.getOptions()),
        switchMap((options: OptionModel[]) => {
            return of(new GetOptionsSuccess(options))
        })
    ))
}