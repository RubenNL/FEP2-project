import {css, LitElement, html} from 'lit-element';
import './app-404.js';
export class appCategoryPage extends LitElement {
	static get properties() {
		return {
			_id: {type: String},
			_articles: {type: Array},
			location: Object,
			src: {type: Number},
			_subcategoryName: {type: String},
			_headcategoryName: {type: String},
			_404: {type:Boolean}
		};
	}

	constructor() {
		super();
		this._articles = [];
		this._404=false;
	}

	render() {
		//language=HTML;
		if(this._404) return html`<app-404></app-404>`
		return html`<h2>${this._headcategoryName}</h2>
		<h3>${this._subcategoryName}</h3>
		<div class="articlecontainer">
			${this._articles.map((artikel) => html`
					<a class="article" router-link href="/article/${artikel.id}">
						<h4>${artikel.title}</h4>
						<p>${artikel.preview}</p>
					</a>`
			)}
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
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                margin: 0 36px 36px 0;
                align-items: center;
                text-decoration:none;
                padding:15px;
                border-radius:3px;
				transition: all 0.1s ease-in-out;
            }
            .article:hover{
                -webkit-font-smoothing: subpixel-antialiased;
                transform: translate3d(0%, 0%, 0) scale(1.02, 1.02);
                box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
			}
            .article > h4{
                margin-top:0px;
                margin-bottom:10px;
            }

            .article > p{
                margin:0;
                font-size:13px;
            }

            .article > *{
                text-align: left;
                color:#000;
            }
		`}

	onBeforeEnter(location, commands, router) {
		this.src = location.params.categoryID
		fetch(`/api/getCategory/${location.params.categoryID}`).then(response => response.json()).then(response => {
			this._404=!response;
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
