import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SettingsFormPageComponent } from "./components/settings-form-page/settings-form-page.component";

const routes: Routes = [
    {
        path: '',
        component: SettingsFormPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SettingsFormRoutingModule {}