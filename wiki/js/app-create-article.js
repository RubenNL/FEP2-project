import {css, LitElement, html} from 'lit-element';
import '@lrnwebcomponents/lrn-markdown-editor/lrn-markdown-editor.js';

export class appCreateArticle extends LitElement {
    static get properties() {
        return {
            _categories: {type: Array},
            _title: {type: String},
            _chosenCategory: {type: Object},
			location: Object,
			src: {type: String},
			_content: {type: String},
			_category: {type:String}
        }
    }

    constructor() {
        super();
		this._src='';
        this._categories = [];
        this._chosenCategory = {subcatagories:[],headcatagory:''};
        this._categoryFetch=fetch(`/api/getCategories`).then(response => response.json()).then(response => {
            this._categories = response
            console.log(response)
			return response;
        })
        this._title = '';
		this._content='';
		this._category='';
    }
	onBeforeEnter(location, commands, router){
		this.src=location.params.article
		if(!window.localStorage.getItem('JWT')) return commands.redirect('/login');
	}
	set src(val) {
		this._src=val;
		if(!val) this._src='';
		if(this._src) fetch(`/api/getArticle/${val}`).then(response=>response.json()).then(response => {
			this._content = response.data;
			this._title = response.title;
			this._category=response.categoryId
			return this._categoryFetch.then(categories=>categories.filter(category=>category.subcatagories.filter(sub=>sub.id==response.categoryId).length)[0])
		}).then(topCategory=>this._chosenCategory=topCategory)
	}
    render() {
        return html` <h2>Artikeltje maken</h2>
        <label for="head-category">Kies je hoofdcategorie:</label>
        <select name="head-category" id="head-category" @change="${this._onHeadCategoryChange}">
			<option disabled selected></option>
            ${this._categories.map((hoofdcat) => html`<option value="${hoofdcat.headcatagory}" ?selected="${hoofdcat.headcatagory==this._chosenCategory.headcatagory}">${hoofdcat.headcatagory}</option>`)}
        </select>
        
        <label for="sub-category">Kies je subcategorie:</label>
        <select name="sub-category" id="sub-category">
            ${this._chosenCategory.subcatagories.map((subcatagorie) => html`<option value="${subcatagorie.id}" ?selected="${subcatagorie.id==parseInt(this._category)}">${subcatagorie.title}</option>`)}
        </select>
        <input aria-labelledby="titel" type="text" id="title" value="${this._title}" placeholder="Titel.....">
		<lrn-markdown-editor content="${this._content}"></lrn-markdown-editor>
		<button @click="${this._sendArticle}">Bevestigen</button>`
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
		const data={
            "title":this.shadowRoot.querySelector('#title').value,
            "data":this.shadowRoot.querySelector('lrn-markdown-editor').content,
            "categoryId":this.shadowRoot.querySelector('#sub-category').value,
        }
        sendAuthenticated('/api/saveArticle/'+this._src,data).then(data=>this._src?this._src:data.id).then(id=>window.location.pathname=`/article/${id}`)
    }
}

customElements.define('app-create-article', appCreateArticle)
