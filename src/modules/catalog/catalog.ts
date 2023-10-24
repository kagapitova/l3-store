import { Component } from '../component';
import html from './catalog.tpl.html';

import { ProductList } from '../productList/productList';
import {SearchTips, tipsList} from "../searchTips/searchTips";

class Catalog extends Component {
  productList: ProductList;
  searchTips: SearchTips;


  constructor(props: any) {
    super(props);

    this.productList = new ProductList();
    this.productList.attach(this.view.products);
    this.searchTips = new SearchTips(tipsList);
    this.searchTips.attach(this.view.searchTips);
  }

  async render() {
    const productsResp = await fetch('/api/getProducts');
    const products = await productsResp.json();
    this.productList.update(products);
    this.searchTips.render();
  }
}

export const catalogComp = new Catalog(html);
