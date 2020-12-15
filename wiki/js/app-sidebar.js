import { LitElement,html,css} from 'lit-element';

export class appSidebar extends LitElement{
	static get properties(){
		return {
			hoofd_cats : {type:Array}
		}
	}

	constructor() {
		super();
		this.hoofd_cats = [
			{'text': 'Profile', 'sub_cats': [{'text': 'Profiel Instellingen'}, {'text': 'Bookmarks'}, {'text': 'andere onzin'}]},
			{'text': 'Analyseren', 'sub_cats': [{'text': 'Gebruiksinteractie'}, {'text': 'Organisatie'}, {'text': 'Software'}]},
			{'text': 'Adviseren', 'sub_cats': [{'text': 'Technische informatica'}, {'text': 'Software Development'}, {'text': 'Artificial Intelligence'}]},
			{'text': 'Ontwerpen', 'sub_cats': [{'text': 'Profiel Instellingen'}, {'text': 'Bookmarks'}, {'text': 'andere onzin'}]},
			{'text': 'Realiseren', 'sub_cats': [{'text': 'Profiel Instellingen'}, {'text': 'Bookmarks'}, {'text': 'andere onzin'}]},
			{'text': 'Realiseren', 'sub_cats': [{'text': 'Profiel Instellingen'}, {'text': 'Bookmarks'}, {'text': 'andere onzin'}]}
		];
		
		this.classList.add('bg-container');
	}

	static get styles(){
		// language=css
		return css`
			:host{
				min-height:300px;
			}
			#side-nav-head{
				list-style-type:none;
				padding-left:0px;
				background-color: #c0c0c0;
			}
            #side-nav-head> li{
				margin: 10px 0px;
				font-size: 13px;

			}
			#side-nav-head > li > a{
				text-decoration: none;
			}
			#side-nav-head > li > a:hover{
                 text-decoration: underline;
             }
			#side-nav-sub{
				list-style-type:none;
				padding-left:0px;
				background-color: #dddddd;
			}
			#side-nav-sub> li{
				margin: 10px 0px;
				font-size: 13px;
			}
		`;
	}

	render(){
		return html`
			<link rel="stylesheet" href="css/style.css">
			<h2>Menu</h2>
			<ul id="side-nav-head">
			${this.hoofd_cats.map((hoofdcat) => html`
				<li>${hoofdcat.text}</li>
				<ul id="side-nav-sub">${hoofdcat.sub_cats.map(sub => html`<li>${sub.text}</li>`)}</ul>
			`)}
			</ul>
		`;
	}
}
customElements.define('app-sidebar', appSidebar);