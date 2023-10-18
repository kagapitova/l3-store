import { Component } from '../component';
import { Product } from '../product/product';
import html from './favourites.tpl.html';
import { ProductData } from 'types';
import {favService} from "../../services/favourite.service";

class Favourites extends Component {
    products!: ProductData[];

    async render() {
        this.products = await favService.get();

        if (this.products.length === 0) {
            this.view.favText.classList.remove('empty');
            return;
        }

        this.view.favText.classList.add('empty');
        this.products.forEach((product) => {
            const productComp = new Product(product, { isHorizontal: false });
            productComp.render();
            productComp.attach(this.view.favourite);
        });
    }
}

export const favComp = new Favourites(html);
