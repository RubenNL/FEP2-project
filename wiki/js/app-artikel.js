import { css,LitElement, html } from 'lit-element';
import '@intcreator/markdown-element';
import './app-404.js';
import 'fa-icons';
export class appArtikel extends LitElement {
	static get properties() {
		return {
			src: {type:String},
			_src: {type:String},
			_title: {type:String},
			_content: {type:String},
			location: Object,
			_404: {type:Boolean},
			_bookmarked: {type:Boolean}
		};
	}
	constructor() {
		super();
		this._content='';
		this._title='';
		this._404=false;
		this._bookmarked=false;
	}
	render() {
		//language=HTML
		if(this._404) return html`<app-404></app-404>`
		return html`
			${window.localStorage.getItem('user') ? html`
				<a @click="${this.delete}" title="Delete article">🗑️️</a>
				<a href="/creator/${this.src}" title="Edit article">✏️</a>
				<a @click="${this.bookmark}">
					${this._bookmarked
						?html`<fa-icon class="fas fa-bookmark" path-prefix="/node_modules"/>`
						:html`<fa-icon class="far fa-bookmark" path-prefix="/node_modules"/>`
					}</a>
			` : html``}
		<h1>${this._title}</h1>
		<markdown-element markdown="${this._content}"></markdown-element>`
	}
	bookmark() {
		this._bookmarked=!this._bookmarked;
		let bookmarks=JSON.parse(window.localStorage.getItem('bookmarks')||'[]')
		if(this._bookmarked) bookmarks.push(this._src)
		else bookmarks.splice(bookmarks.indexOf(this._src), 1)
		window.localStorage.setItem('bookmarks',JSON.stringify(bookmarks))
		sendAuthenticated('/api/setBookmarks',bookmarks)
		this.requestUpdate();
	}
	delete() {
		if(!confirm('Weet u zeker dat u dit artikel wilt verwijderen?')) return
		const data={
            "categoryId":1688148667
        }
        sendAuthenticated('/api/saveArticle/'+this._src,data).then(()=>window.location.pathname=`/`)
	}
	onBeforeEnter(location, commands, router){
		this.src=location.params.article
		this._bookmarked=JSON.parse(window.localStorage.getItem('bookmarks')||'[]').includes(this.src)
	}

	static get styles(){
		//language=CSS
		return css`:host > a {
            margin: auto;
            display: flex;
            float: right;
			margin-right: 40px;
			font-size: 30px;
            text-decoration: inherit;
        }
`
	}

	set src(val) {
		this._src=val;
		fetch(`/api/getArticle/${val}`).then(response => response.json()).then(response => {
			this._404=!response;
			this._content = response.data;
			this._title = response.title;
		})
	}
	get src() {
		return this._src;
	}
}
customElements.define('app-artikel', appArtikel)
