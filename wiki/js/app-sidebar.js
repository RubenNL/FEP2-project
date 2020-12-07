import { LitElement,html,css} from 'lit-element';

export class appSidebar extends LitElement{
	static get properties(){
		return {
			logo : {type:String},
			links : {type:Array}
		}
	}

	connectedCallback() {
		super.connectedCallback();
		this.logo = '';
		this.links = [];
	}

	static get styles(){
		// language=css
		return css`
			.sidebar{
				background-color:lightgrey;
				height:100%;
				border-radius:5px;
				padding: 10px;
			}
		`;
	}

	render(){
		return html`
			<div class="sidebar">
				Sidebar
			</div>
		`;
	}
}
customElements.define('app-sidebar', appSidebar);