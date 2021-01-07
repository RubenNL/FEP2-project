import {LitElement, html, css} from 'lit-element';

export class appButton extends LitElement {
	static get properties() {
		return {
			href : {type: String, reflect:true},
			width: {type: String, reflect:true},
			padding: {type: String, reflect:true}
		};
	}

	render() {
		let customWidth = this.width ? this.width : 'unset';

		//language=html;
		return html`
			<style>
				:host{
					display:inline-block;
				}
				a{
					width:${customWidth};
				}
			</style>
			<a>
				<slot></slot>
			</a>
		`;
	}
}
customElements.define('app-button', appButton);