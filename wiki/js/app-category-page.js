import {css, LitElement, html} from 'lit-element';

export class appCategoryPage extends LitElement {
    static get properties() {
        return {
            _id: {type: String},
            _articles: {type: Array},
            location: Object,
            src: {type: Number},
            _subcategoryName: {type: String},
            _headcategoryName: {type: String}
        };
    }

    constructor() {
        super();
        this._articles = [];
    }

    render() {
        //language=HTML;
        return html`<h2>${this._headcategoryName}</h2>
        <h3>${this._subcategoryName}</h3>
        <div class="articlecontainer">
            ${this._articles.map((artikel) => html`<a class="article" router-link href="/article/${artikel.id}">
                <h4>${artikel.title}</h4></a>`)}
        </div>`
    }

    static get styles() {
        // language=css
        return css`
            .articlecontainer{
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
            
            .article{
                background-color: #fff;
                width: auto;
                height: auto;
                box-sizing: border-box;
                box-shadow: 0 2px 5px rgba(0,0,0,0.3);
                margin: 0 36px 36px 0;
                align-items: center;
            }
            .article > *{
                text-align: center;
            }
        `}

    onBeforeEnter(location, commands, router) {
        this.src = location.params.categoryID
        fetch(`/api/getCategory/${location.params.categoryID}`).then(response => response.json()).then(response => {
            this._subcategoryName = response.name;
            this._headcategoryName = response.headcatagory;
            console.log(this._headcategoryName);
        })

    }

    set src(val) {
        fetch(`/api/getArticlesByCategory/${val}`).then(response => response.json()).then(response => {
            this._articles = response;
            console.log(this._articles);
        })
    }
}

customElements.define('app-category-page', appCategoryPage)
