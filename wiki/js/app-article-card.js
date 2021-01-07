import {css, LitElement, html} from 'lit-element';

export class AppArticleCard extends LitElement {
    static get properties() {
        return {
            id: {type:String},
			title:{type: String},
			preview:{type: String}
        };
    }

    constructor() {
        super();
		this.title='';
		this.preview='';
    }
    firstUpdated() {
		fetch(`/api/getArticlePreview/${this.id}`).then(response=>response.json()).then(article=>{
			this.id=article.id;
			this.title=article.title;
			this.preview=article.preview;
		})
	}

    static get styles(){
        //language=CSS
        return css`
			:host{
                background-color: #fff;
                width: auto;
                height: auto;
                box-sizing: border-box;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
                margin: 0 36px 36px 0;
                align-items: center;
                padding:15px;
                border-radius:3px;
				transition: all 0.1s ease-in-out;
            }
            a {
				text-decoration:none;
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
            }`
    }

    render(){
        //language=HTML
        return html`
            <a class="article" router-link href="/article/${this.id}">
				<h4>${this.title}</h4>
				<p>${this.preview}</p>
			</a>
        `;
    }
}
customElements.define('app-article-card', AppArticleCard)
 

