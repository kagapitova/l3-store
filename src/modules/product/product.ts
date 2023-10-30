import { ViewTemplate } from '../../utils/viewTemplate';
import { View } from '../../utils/view';
import { formatPrice } from '../../utils/helpers'
import html from './product.tpl.html';
import { ProductData } from 'types';

type ProductComponentParams = { [key: string]: any };

export class Product {
  view: View;
  product: ProductData;
  params: ProductComponentParams;
  wasInView: boolean;

  constructor(product: ProductData, params: ProductComponentParams = {}) {
    this.product = product;
    this.params = params;
    this.view = new ViewTemplate(html).cloneView();
    this.wasInView = false;
  }

  attach($root: HTMLElement) {
    $root.appendChild(this.view.root);
  }

  getWasInView() {
    return this.wasInView;
  }

  isInView() {
    const {top, left, bottom, right} = this.view.root.getBoundingClientRect();
    const {innerHeight, innerWidth} = window;
    const result = top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
    if (result) {
      this.wasInView = true;
    }

    return result;
  }

  render() {
    const { id, name, src, salePriceU } = this.product;

    this.view.root.setAttribute('href', `/product?id=${id}`);
    this.view.img.setAttribute('src', src);
    this.view.title.innerText = name;
    this.view.price.innerText = formatPrice(salePriceU);

    if (this.params.isHorizontal) this.view.root.classList.add('is__horizontal')
  }
}