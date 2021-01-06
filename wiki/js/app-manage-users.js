import {LitElement, html, css} from 'lit-element';
import 'fa-icons';

export class appManageUsers extends LitElement {
    static get properties() {
        return {
            _students: {type: Array},
            _autors: {type: Array},
            _admins: {type: Array}
        }
    }

    constructor() {
        super();
        this._students = [];
        this._autors = [];
        this._admins = [];
        fetch(`/api/getUsers`).then(response => response.json()).then(response => {
            response.map((user) => {
                console.log("user.functie returnt " + user.functie)
                switch (user.functie) {
                    case 'auteur':
                        this._autors.push(user);
                        break
                    case 'admin':
                        this._admins.push(user);
                        break
                    case 'student':
                        this._students.push(user);
                        break
                }
            })
        }).then(()=>this.requestUpdate());
    }

    static get styles() {
        // language=css
        return css`
            :host {
                min-height: 100%;
                color: #383838;
            }

            #flex-container {
                display: flex;
                grid-template-columns: 3fr 1fr;
            }

            .usercontainer {
                padding: 0px;
                width: 40%;
                margin-right: 12px;
            }

            ul {
                list-style-type: none;
                padding: 0;
            }

            li {
                border-bottom: 1px solid gray;
                padding: 4px 0;
            }

            li:hover {
                background-color: #f2f2f2;
            }

            .sub-item {
                padding-left: 10px;
            }

            #icon-holder {
                float: right;
            }
            
            .autor{
                color: green;
                transform: scale(1.1);
            }
            
            .blocked{
                color: red;
                transform: scale(1.1);
            }

            fa-icon {
                color: #808080;
                width: 1em;
                height: 1em;
                padding: 0 3px;
            }

            fa-icon:hover {
                transform: scale(1.3);
                color: red;
            }
        `;
    }

    //todo HAAL FLOAT WEG KSSSS

    render() {
        return html`
            <h2>Gebruikers beheren</h2>
            <div id="flex-container">
                <ul class="usercontainer">
                    <h2>Studenten</h2>
                    ${this._students.map((user) => html`
                        <li>${user.fullName}<span id="icon-holder">
                           <fa-icon class="fas fa-pencil-alt"></fa-icon>
                           <fa-icon class="fas fa-ban"></fa-icon>
                            <fa-icon class="fas fa-trash-alt"></fa-icon>
                            </span></li>
                    `)}
                </ul>
                <ul class="usercontainer">
                    <h2>Auteurs</h2>
                    ${this._autors.map((user) => html`
                        <li>${user.fullName}<span id="icon-holder">
                           <fa-icon class="fas fa-pencil-alt autor"></fa-icon>
                            <fa-icon class="fas fa-ban"></fa-icon>
                            <fa-icon class="fas user-shield"></fa-icon>
                            <fa-icon class="fas fa-trash-alt"></fa-icon>
                            </span></li>
                    `)}
                </ul>
            </div>
        `;
    }
}

customElements.define('app-manage-users', appManageUsers);