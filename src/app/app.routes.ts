import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HrComponent } from './pages/hr/hr.component';
import { VisionMissionComponent } from './pages/vision-mission/vision-mission.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ServicesComponent } from './pages/services/services.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  {
    path: ':lang',
    children: [
      {
        path: '', // This will be the home page for each language
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'hr',
        component: HrComponent,
      },
      {
        path: 'vision-mission',
        component: VisionMissionComponent,
      },
      {
        path: 'contact',
        component: ContactComponent,
      },
      {
        path: 'services',
        component: ServicesComponent,
      },
      {
        path: 'blog',
        component: BlogComponent,
      },
      {
        path: 'blog/:id',
        component: BlogPostComponent,
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tr',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/tr',
  },
];
