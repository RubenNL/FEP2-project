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
            }

            .informationBlock > h3 {
                display: block;
                
            }
            
            .informationBlock {
                padding-left: 100px;
            }

             label > input, label > select {
                text-align: left;
                margin-top: 10px;
                margin-bottom: 10px;
                width: 400px;
                display: block;
                border-radius: 4px;
                 padding: 15px;
                border: 1px solid #ccc;
                 box-sizing: border-box;
            }

            #registerformContainer > button {
                text-align: center;
                margin-top: 5px;
                margin-bottom: 5px;
                width: 100px;
                display: block;
                border-radius: 4px;
                padding: 20px;
                border: 1px solid #ccc;
            }

            #button {
                display: flex;
                color: inherit; /* blue colors for links too */
                text-decoration: inherit; /* no underline */
                display: inline-block; padding: 5px 15px;
                border-style: solid; border-width: 2px;
                border: 0;
                border-color: ButtonHighlight ButtonShadow ButtonShadow ButtonHighlight;
                border-radius: 5px;
                background: #0066c4;
                color: #ffffff;
            }
            
            #registerform {
                display: flex;
            }`
    }

    constructor() {
        super();
        this._data = {};
    }

    render() {
        return html`
            <h2>Registreren</h2>
        <form id="registerform" @submit="${this._onclick}">
			<div id="registerformContainer" class="informationBlock">
			    <h3>Account information</h3>
				<label for="email">E-mail: 
				    <input type="email" name="email" id="email" tabindex="1" placeholder="Voer uw email in." @input="${this._change}" required/>
				</label>
				<label for="password">Wachtwoord: 
				    <input type="password" name="password" id="password" tabindex="2" placeholder="Voer uw wachtwoord in." @input="${this._change}" required/>
				</label>
				<label for="confirmpassword">Confirm wachtwoord: 
				    <input type="password" name="password" id="confirmpassword" tabindex="3" placeholder="Voer uw wachtwoord in." @input="${this._change}" required/>
				</label>
				<input type="submit" value="Registreren" id="button" tabindex="0">
			</div>
			<div id="information" class="informationBlock">
				<h3>Personal information</h3>
				<label for="name">Naam:
		            <input type="text" name="fullName" id="name" tabindex="4" placeholder="Voer uw naam in." @input="${this._change}" required/>
				</label>
				<label for="functie">Functie: 
				  <select name="functie" id="functie" @change="${this._change}" required tabindex="5"/>
					  <option disabled selected>Kies een optie</option>
					  <option value="admin">Admin</option>
					  <option value="student">Student</option>
					  <option value="auteur">Auteur</option>
          </select>
				</label>
				<label for="organisation">Organisatie:
				    <input type="text" name="orgName" id="organisation" tabindex="6" placeholder="Voer uw organisatie in." @input="${this._change}" required/>
				</label>
			</div>
        </form>`
    }


    _change(e) {
        this._data[e.target.name]=e.target.value;
    }
    _onclick(e){
        e.preventDefault()
        var password = this.shadowRoot.querySelector('#password').value
        var confirmPassword = this.shadowRoot.querySelector('#confirmpassword').value
        if(password !== confirmPassword){
            alert('De gegevens kloppen niet!')
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
