import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';
import {eventService, EventTypeValue} from "../../services/event.service";

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;
  wasInView: boolean;
  observer: IntersectionObserver;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1
    };

    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
    this.wasInView = false;
    this.observer  = new IntersectionObserver(this.handleIntersection, options);
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.filter(entry => entry.isIntersecting).forEach(() => {
      eventService.send({
        type: this.product.log !== '' ? EventTypeValue.viewCardPromo : EventTypeValue.viewCard,
        payload: this.product
      });
    });
  };

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal')
    this.observer.observe(this.view.root);
  }
}