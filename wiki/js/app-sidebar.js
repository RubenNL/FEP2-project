import { LitElement,html,css} from 'lit-element';

export class appSidebar extends LitElement{
	static get properties(){
		return {
			logo : {type:String},
			links : {type:Array}
		}
	}

	constructor() {
		super();
		this.logo = '';
		this.links = [
			{'text' : 'Google', 'href' : 'https://www.google.com/'},
			{'text' : 'Reddit', 'href' : 'https://www.reddit.com/'},
			{'text' : 'Youtube', 'href' : 'https://www.youtube.com/'}
		];
	}

	static get styles(){
		// language=css
		return css`
			:host{
				display:block;
                background-color:#fff;
                border-radius:5px;
                padding:10px;
                height:100%;
                box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
			}
			#side-nav{
				list-style-type:none;
				padding-left:0px;
			}
            #side-nav > li{
				margin: 10px 0px;
				font-size: 13px;
			}
		`;
	}

	render(){
		return html`
			<link rel="stylesheet" href="css/style.css">
			<h2>Menu</h2>
			<ul id="side-nav">
			${this.links.map((link) => html`
				<li><a href="${link.href}">${link.text}</a></li>
			`)}
			</ul>
		`;
	}
}
customElements.define('app-sidebar', appSidebar);