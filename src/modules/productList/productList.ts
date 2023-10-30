import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import html from './productList.tpl.html';
import { ProductData } from 'types';
import { Product } from '../product/product';
import { EventService } from "../../services/event.service";

export class ProductList {
  view: View;
  products: ProductData[];
  productComponents: Product[];

  constructor() {
    this.products = [];
    this.productComponents = [];
    this.view = new ViewTemplate(html).cloneView();
  }

  attach($root: HTMLElement) {
    $root.innerHTML = '';
    $root.appendChild(this.view.root);
  }

  update(products: ProductData[]) {
    this.products = products;
    this.render();
  }

  sendProductsEvent() {
    const eventService = new EventService();
    this.productComponents.forEach(product => {
      if (!product.getWasInView() && product.isInView()) {
        fetch(`/api/getProductSecretKey?id=${product.product.id}`)
            .then((res) => res.json())
            .then((secretKey) => {
                eventService.send({
                  type: product.product?.log !== '' ? 'viewCardPromo': 'viewCard',
                  payload: {...product.product, secretKey},
                  timestamp: Date.now()
                });
            });
      }
    })
  }

  render() {
    this.view.root.innerHTML = '';

    this.products.forEach((product) => {
      const productComp = new Product(product);
      this.productComponents.push(productComp);
      productComp.render();
      productComp.attach(this.view.root);
    });

    this.sendProductsEvent();
    document.addEventListener('scroll', this.sendProductsEvent.bind(this))
  }
}
