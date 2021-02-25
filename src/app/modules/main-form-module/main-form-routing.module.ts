import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MainFormPageComponent } from "./components/main-form-page/main-form-page.component";

const routes: Routes = [
    {
        path: '',
        component: MainFormPageComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MainFormRoutingModule {}