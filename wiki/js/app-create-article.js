import {css, LitElement, html} from 'lit-element';
import '@lrnwebcomponents/lrn-markdown-editor/lrn-markdown-editor.js';
import {connect} from "pwa-helpers/connect-mixin";
import store from "../redux";

export class appCreateArticle extends connect(store)(LitElement) {
    static get properties() {
        return {
            _categories: {type: Array},
            _title: {type: String},
            _chosenCategory: {type: Object},
            location: Object,
            src: {type: String},
            _content: {type: String},
            _category: {type: String}
        }
    }

    constructor() {
        super();
        this._src = '';
        this._categories = [];
        this._chosenCategory = {subcatagories: [], headcatagory: ''};
        this._categoryFetch = fetch(`/api/getCategories`).then(response => response.json()).then(response => {
            this._categories = response
            return response;
        })
        this._title = '';
        this._content = '';
        this._category = '';
    }

    stateChanged(state) {
        if (!state.userStore.jwt) window.dispatchEvent(new CustomEvent('vaadin-router-go', {detail: {pathname: '/login'}}));
    }

    onBeforeEnter(location, commands, router) {
        this.src = location.params.article

    }

    set src(val) {
        this._src = val;
        if (!val) this._src = '';
        if (this._src) fetch(`/api/getArticle/${val}`).then(response => response.json()).then(response => {
            this._content = response.data;
            this._title = response.title;
            this._category = response.categoryId
            return this._categoryFetch.then(categories => categories.filter(category => category.subcatagories.filter(sub => sub.id === response.categoryId).length)[0])
        }).then(topCategory => this._chosenCategory = topCategory)
    }

    render() {
        return html` <h2>Artikel maken</h2>
        <form @submit="${this._sendArticle}">
        <div id="superdiv">
        <div class="inputdiv">
			<h5 for="head-category" class="topcat"><b>Hoofdcategorie:</b></h5>
			<select name="head-category" class="topcat" id="head-category" @change="${this._onHeadCategoryChange}" required>
				<option disabled selected></option>
				${this._categories.map((hoofdcat) => html`<option value="${hoofdcat.headcatagory}" ?selected="${hoofdcat.headcatagory == this._chosenCategory.headcatagory}">${hoofdcat.headcatagory}</option>`)}
			</select>
        </div>
        <div class="inputdiv">
			<h5 for="sub-category" class="subcat"><b>Subcategorie:</b></h5>
			<select name="sub-category" class="subcat" id="sub-category" required>
			    <option disabled selected></option>
				${this._chosenCategory.subcatagories.map((subcatagorie) => html`<option value="${subcatagorie.id}" ?selected="${subcatagorie.id == parseInt(this._category)}">${subcatagorie.title}</option>`)}
			</select>
	    </div>
	    <div class="inputdiv">
			<h5 for="Titel" class="titel"><b>Titel:</b></h5>
			<input aria-labelledby="titel" type="text" class="titel" id="title" value="${this._title}" maxlength="30" required>
		</div>
		<div id="knopdiv">
			<input type="submit" value="Opslaan" class="button">
		</div>
		</div>
			<lrn-markdown-editor content="${this._content}"></lrn-markdown-editor>
			`
    }

    static get styles() {
        //language=CSS
        return css`
            div > input, div > select {
                text-align: left;
                width: 200px;
                border-radius: 4px;
                padding: 5px;
                border: 1px solid #ccc;
                box-sizing: border-box;
                float: contour;
            }
            #title {
                width: 400px;
            }
            #superdiv {
                display: flex;                
            }
            #superdiv h5{
                margin-bottom: 0px;
                margin-top: 10px;
            }
            #knopdiv {
                display: flex;
                width: 100%;
                justify-content: flex-end;
            }
            .inputdiv {
                padding-right: 10px;
            }

            .button {
                display: inline-block;
                width: 100px;
            background: #0066c4;
            color: #ffffff;
            cursor: pointer;
            border: 0;
            transition: all 0.5s;
            border-radius: 3px;
            align-self: flex-end;
            grid-column: 1;
            text-align: center;
            padding: 5px 20px;
            margin-bottom: 3px;
            text-decoration: inherit; /* no underline */
            float: right;
            }
            lrn-markdown-editor{
                margin-top: 10px;
            }
        `
    }

    _onHeadCategoryChange(event) {
        this._categories.forEach(cat => {
			if (cat.headcatagory === event.target.value) this._chosenCategory = cat
		})
    }

    _sendArticle(e) {
        e.preventDefault();
        if (!this.shadowRoot.querySelector('lrn-markdown-editor').content) {
            alert('Geen content!')
            return
        }
        const data = {
            "title": this.shadowRoot.querySelector('#title').value,
            "data": this.shadowRoot.querySelector('lrn-markdown-editor').content,
            "categoryId": this.shadowRoot.querySelector('#sub-category').value,
        }
        sendAuthenticated('/api/saveArticle/' + this._src, data).then(data => this._src ? this._src : data.id).then(id => window.location.pathname = `/article/${id}`)
		e.submitter.disabled=true
    }
}

customElements.define('app-create-article', appCreateArticle)
