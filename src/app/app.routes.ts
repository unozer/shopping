import { Routes } from '@angular/router';
import { ProductListComponent } from './product-list/product-list.component';
import { CartComponent } from './cart/cart.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { authGuard } from './auth/auth.guard';
import { checkoutGuard } from './guards/checkout.guard';
import { productsResolver } from './resolvers/products.resolver';

export const routes: Routes = [
    { path: 'products/new', component: ProductCreateComponent },
    { path: 'products/:id', component: ProductDetailComponent },
    { path: 'products', 
        component: ProductListComponent,
        resolve: { products: productsResolver } 
    },
    { path: 'cart', 
        component: CartComponent, 
        canActivate: [authGuard],
        canDeactivate: [checkoutGuard]
    },
    { path: 'user', 
        loadComponent: () => import('./user/user.component').then(m => m.UserComponent),
        canMatch: [authGuard],
    },
    { path: '', redirectTo: 'products', pathMatch: 'full' },
    { path: '**', redirectTo: 'products' } // Wildcard route for a 404 page
];
