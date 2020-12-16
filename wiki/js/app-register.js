import {css, LitElement, html} from 'lit-element';

export class appRegister extends LitElement {
	static get properties() {
		return {
			_data: {type:Object},
			location: {type:Object}
		}
	}
	constructor() {
		super();
		this._data={};
	}
	render() {
		return html`
			<div id="inlogform">
				<input aria-labelledby="email" type="email" name="email" placeholder="Voer uw email in." @input="${this._change}"/>
				<input aria-labelledby="password" type="password" name="password" placeholder="Voer uw wachtwoord in." @input="${this._change}"/>
				<input aria-labelledby="naam" type="text" name="fullName" placeholder="Voer uw naam in." @input="${this._change}"/>
				<input aria-labelledby="functie" type="text" name="functie" placeholder="Voer uw functie in." @input="${this._change}"/>
				<input aria-labelledby="organisatie" type="text" name="orgName" placeholder="Voer uw organisatie in." @input="${this._change}"/>
				<button @click="${this._onclick}">register</button>
			</div>`
	}
	_change(e) {
		this._data[e.target.name]=e.target.value;
	}
	_onclick() {
		console.log(this._data);
		fetch('/api/register',{
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(this._data)
		}).then(response=>response.json()).then(response=>{
			if(response.err) {
				alert(response.err);
				return;
			}
			alert('Account aangemaakt, log nu in.')
			window.location.pathname="/login"
		});
	}
}
customElements.define('app-register', appRegister)