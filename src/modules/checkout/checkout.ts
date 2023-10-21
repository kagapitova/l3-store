import { Component } from '../component';
import { Product } from '../product/product';
import html from './checkout.tpl.html';
import { formatPrice } from '../../utils/helpers';
import { cartService } from '../../services/cart.service';
import { ProductData } from 'types';
import {EventService} from "../../services/event.service";

class Checkout extends Component {
  products!: ProductData[];

  async render() {
    this.products = await cartService.get();

    if (this.products.length < 1) {
      this.view.root.classList.add('is__empty');
      return;
    }

    this.products.forEach((product) => {
      const productComp = new Product(product, { isHorizontal: true });
      productComp.render();
      productComp.attach(this.view.cart);
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    this.view.price.innerText = formatPrice(totalPrice);

    this.view.btnOrder.onclick = this._makeOrder.bind(this);
  }

  private async _makeOrder() {
    await cartService.clear();
    fetch('/api/makeOrder', {
      method: 'POST',
      body: JSON.stringify(this.products)
    });

    const totalPrice = this.products.reduce((acc, product) => (acc += product.salePriceU), 0);
    const idArr: number[] = [];
    this.products.forEach(el => idArr.push(el.id));

    const eventService = new EventService();
    eventService.send({
      type: 'purchase',
      payload:
        {
          orderId: cartService.getOrderId(),
          totalPrice: totalPrice,
          productIds: idArr
        },
      timestamp: Date.now()
    });

    window.location.href = '/?isSuccessOrder';
  }
}

export const checkoutComp = new Checkout(html);
