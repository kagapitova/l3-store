import {View} from "../../utils/view";
import {ViewTemplate} from "../../utils/viewTemplate";
import html from "../searchTips/searchTips.tpl.html";

export class SearchTips {
    view: View;

    constructor() {
        this.view = new ViewTemplate(html).cloneView();
    }

    attach($root: HTMLElement) {
        $root.appendChild(this.view.root);
    }

    getData() {
        return [
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
            },
        ];
    }

    render() {
        const data = this.getData();
        this.view.root.innerHTML = data.reduce(
          (html,{link, name} , i) => {
              let tpl = `<a href="${link}">${name}</a>`
              if(i !== data.length - 1) tpl += (i < data.length - 2) ? ', ' : '  или  '
              return html + tpl
          },
          'Например, '
        )
    }
}

