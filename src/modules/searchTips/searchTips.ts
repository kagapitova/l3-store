import {View} from "../../utils/view";
import {ViewTemplate} from "../../utils/viewTemplate";
import html from "../searchTips/searchTips.tpl.html";
import { Link } from 'types';

export const tipsList: Link[] = [
    {
        name: "чехол iphone 13 pro",
        link: "https://www.wildberries.ru/catalog/0/search.aspx?search=%D1%87%D0%B5%D1%85%D0%BE%D0%BB%20iphone%2013%20pro"
    },
    {
        name: "коляски agex",
        link: "https://www.wildberries.ru/catalog/0/search.aspx?search=%D0%BA%D0%BE%D0%BB%D1%8F%D1%81%D0%BA%D0%B8%20agex"
    },
    {
        name: "яндекс станция 2",
        link: "https://www.wildberries.ru/catalog/0/search.aspx?search=%D1%8F%D0%BD%D0%B4%D0%B5%D0%BA%D1%81%20%D1%81%D1%82%D0%B0%D0%BD%D1%86%D0%B8%D1%8F%202"
    }
];

export class SearchTips {
    view: View;
    links: Link[];


    constructor(links: Link[]) {
        this.links = links;
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    render () {
        let html = 'Например, ';
        for(let i = 0; i <= this.links.length -1; i++){
            if(i === this.links.length - 2){
                html += `<div class="search__container"><a href=${this.links[i].link}>${this.links[i].name}</a></div>  или  `;
            } else if (i === this.links.length - 1){
                html += `<div class="search__container"><a href=${this.links[i].link}>${this.links[i].name}</a></div>`;
            } else {
                html += `<div class="search__container"><a href=${this.links[i].link}>${this.links[i].name}</a></div>,`;
            }
        }

        this.view.root.innerHTML = html;
    }
}

