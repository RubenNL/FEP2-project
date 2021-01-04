import {css, LitElement, html} from 'lit-element';

export class appRegister extends LitElement {
    static get properties() {
        return {
            _data: {type: Object}
        }
    }

    static get styles() {
        //language=CSS
        return css`
            :host {
                margin: auto;
                display: flex;
				align-content: left;
            }

            #registerform {
                text-align: left;
				align-items: left;
            }

            #registerform > label > input {
                text-align: left;
                margin-top: 10px;
				margin-bottom: 10px;
                width: 400px;
                display: block;
                border-radius: 4px;
                padding: 20px;
                border: 1px solid #ccc;
            }
			#registerform > button {
				text-align: center;
				margin-top: 10px;
				margin-bottom: 10px;
				width: 440px;
				display: block;
				border-radius: 4px;
				padding: 20px;
				border: 1px solid #ccc;
			}
            label > *:invalid{
                box-shadow: 0px 0px 0px 3px red;
            }`
    }

    constructor() {
        super();
        this._data = {};
    }

    render() {
        return html`
			<div id="registerform">
				<label for="email">E-mail: 
				<input type="email" name="email" id="email" placeholder="Voer uw email in." @input="${this._change}" required/>
				</label>
				<label for="password">Wachtwoord: 
				<input type="password" name="password" id="password" placeholder="Voer uw wachtwoord in." @input="${this._change}" required/>
				</label>
				<label for="name">Naam:
		        <input type="text" name="fullName" id="name" placeholder="Voer uw naam in." @input="${this._change}" required/>
				</label>
				<label for="functie">Functie: 
				<input type="text" name="functie" id="functie" placeholder="Voer uw functie in." @input="${this._change}" required/>
				</label>
				<label for="organisation">Organisatie:
				<input type="text" name="orgName" id="organisation" placeholder="Voer uw organisatie in." @input="${this._change}" required/>
				</label>
				<button @click="${this._onclick}">registreren</button>
			</div>`
    }


    _change(e) {
        this._data[e.target.name]=e.target.value;
    }
    _onclick(){
        if(Object.values(this._data).filter(item=>item.length>0).length<5) {
            alert('niet alles ingevuld!')
            return;
        }
        if(this.shadowRoot.querySelector('#email:invalid')){
            alert('Het email adres is ongeldig!')
            return;
        }
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