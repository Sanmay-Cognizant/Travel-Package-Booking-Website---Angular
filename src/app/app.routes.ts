import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HerosectionComponent } from './Components/herosection/herosection.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BookingsComponent } from './Components/bookings/bookings.component';
import { AssistanceComponent } from './Components/assistance/assistance.component';
import { BooknowComponent } from './Components/booknow/booknow.component';
import { PackagesComponent } from './Components/packages/packages.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdmincomponentComponent } from './Components/admincomponent/admincomponent.component';
import { AgentComponent } from './Components/agent/agent.component';
import { UpdatePackageComponent } from './Components/update-package/update-package.component';
import { DeletePackageComponent } from './Components/delete-package/delete-package.component';
import { AdminRegisterComponent } from './Components/admin-register/admin-register.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { CreateAssistanceComponent } from './Components/create-assistance/create-assistance.component';
import { ReviewsComponent } from './Components/reviews/reviews.component';
import { TravelAgentComponent } from './Components/travel-agent/travel-agent.component';
import { AddComponent } from './Components/add/add.component';
import { UsersComponent } from './Components/users/users.component';
import { AdminBookingsComponent } from './Components/admin-bookings/admin-bookings.component';
import { AuthGuard } from './Services/auth.guard';
import { NotfoundComponent } from './Components/notfound/notfound.component';
import { AdminGuard } from './Services/admin.guard';


export const routes: Routes = [
    {
        path:'app-herosection',
        component:HerosectionComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-profile',
        component:ProfileComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-bookings',
        component:BookingsComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-assistance',
        component:AssistanceComponent,
        canActivate:[AdminGuard]

    },
    {
    path:'',
    component:LoginComponent
    },
    {
        path:'app-booknow',
        component:BooknowComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-packages',
        component:PackagesComponent,
        canActivate:[AuthGuard]

    },
    {
        path:'app-register',
        component:RegisterComponent
    },
    {
        path:'app-admincomponent',
        component:AdmincomponentComponent,
        canActivate: [AdminGuard] 
    },
   
    {
        path:'app-agent',
        component:AgentComponent,
        canActivate:[AuthGuard]

    },
    {
        path:'app-update-package',
        component:UpdatePackageComponent,
        canActivate:[AuthGuard]

    },
    {
        path:'app-delete-package',
        component:DeletePackageComponent,        
        canActivate:[AuthGuard]
    },
    {
        path:'app-admin-register',
        component:AdminRegisterComponent,
        canActivate: [AdminGuard] // Add the AuthGuard here
    },
    {
        path:'app-edit-profile',
        component:EditProfileComponent,        
        canActivate:[AuthGuard]
    },
    {
        path:'app-create-assistance',
        component:CreateAssistanceComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-reviews',
        component:ReviewsComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-travel-agent',
        component:TravelAgentComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-add',
        component:AddComponent,
        canActivate:[AuthGuard]
    },
    {
        path:'app-users',
        component:UsersComponent,
        canActivate: [AdminGuard] 

    },
    {
        path:'app-admin-bookings',
        component:AdminBookingsComponent,
        canActivate: [AdminGuard] 

    },
    {
        path:'app-login-component',
        component:LoginComponent
    },
    {
        path:'**',
        component:NotfoundComponent
    }
];
