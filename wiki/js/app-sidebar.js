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
		this.links = [];
	}

	static get styles(){
		// language=css
		return css`
			:host{
				display:block;
                background-color:lightgrey;
                border-radius:5px;
                padding:10px;
                height:100%;
			}
		`;
	}

	render(){
		return html`
			Sidebar
		`;
	}
}
customElements.define('app-sidebar', appSidebar);