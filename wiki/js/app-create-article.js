import {css, LitElement, html} from 'lit-element';
import '@lrnwebcomponents/lrn-markdown-editor/lrn-markdown-editor.js';

export class appCreateArticle extends LitElement {
    static get properties() {
        return {
            _categories: {type: Array},
            _title: {type: String},
            _chosenCategory: {type: Object}
        }
    }

    constructor() {
        super();
        this._categories = [];
        this._chosenCategory = {subcatagories:[]};
        fetch(`/api/getCategories`).then(response => response.json()).then(response => {
            this._categories = response
            console.log(response)
        })
        this._content = '';
        this._title = '';
    }

    render() {
        return html` <h2>Artikeltje maken</h2>
        <label for="head-category">Kies je hoofdcategorie:</label>
        <select name="head-category" id="head-category" @change="${this._onHeadCategoryChange}">
            ${this._categories.map((hoofdcat) => html`<option value="${hoofdcat.headcatagory}">${hoofdcat.headcatagory}</option>`)}
        </select>
        
        <label for="sub-category">Kies je subcategorie:</label>
        <select name="sub-category" id="sub-category">
            ${this._chosenCategory.subcatagories.map((subcatagorie) => html`<option value="${subcatagorie.id}">${subcatagorie.title}</option>`)}
        </select>
        <input aria-labelledby="titel" type="text" placeholder="Titel.....">
            <lrn-markdown-editor></lrn-markdown-editor>
            <button @click="_sendArticle()">Bevestigen</button>`
    }

    _onHeadCategoryChange(event) {
        this._categories.forEach(cat => {
            console.log(event.target.value)
            if (cat.headcatagory === event.target.value) {
                this._chosenCategory = cat;
                console.log(this._chosenCategory)
            }
        })
    }

    _sendArticle(){
        sendAuthenticated('/api/saveArticle',{
            "title":"abc",
            "data":"def",
            "categoryId":3
        })
    }
}

customElements.define('app-create-article', appCreateArticle)
