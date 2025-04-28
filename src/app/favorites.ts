import { ProductsService } from './products.service';
import { FavoritesService } from './favorites.service';

export function favoritesFactory(isFavorites: boolean) {
    return () => {
        if (isFavorites) {
            return new FavoritesService();
        } else {
            return new ProductsService();
        }
    }
}