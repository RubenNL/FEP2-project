import {LitElement, html, css} from 'lit-element';
import 'fa-icons';

export class appManageUsers extends LitElement {
    static get properties() {
        return {
            _students: {type: Array},
            _autors: {type: Array}
        }
    }

    constructor() {
        super();
        this._students = [];
        this._autors = [];
        sendAuthenticated(`/api/getUsers`).then(response => {
            response.map((user) => {
                switch (user.functie) {
                    case 'auteur':
                        this._autors.push(user);
                        break
                    case 'admin':
                        this._autors.push(user);
                        break
                    case 'student':
                        this._students.push(user);
                        break
                }
            })
        }).then(() => this.requestUpdate());
    }

    checkBlocked(user) {
        if (user.blocked) {
            return html`
                <fa-icon title="Blokkeer gebruiker" @click="${(e) => this.toggleBlocked(user, e.target)}" class="fas fa-ban blocked"></fa-icon>`
        } else {
            return html`
                <fa-icon title="Blokkeer gebruiker" @click="${(e) => this.toggleBlocked(user, e.target)}" class="fas fa-ban"></fa-icon>`
        }
    }

    toggleBlocked(user, target) {
        sendAuthenticated(`/api/updateUser/${user.email}`, {blocked: !user.blocked}).then(
            () => {
                target.classList.toggle("blocked")
            })
    }

    checkAdmin(user) {
        if (user.functie === "admin") {
            return html`
                <fa-icon title="Maak gebruiker auteur" @click="${(e) => this.toggleAdmin(user, e.target)}" class="fas user-shield admin"></fa-icon>`
        } else {
            return html`
                <fa-icon title="Maak gebruiker administrator" @click="${(e) => this.toggleAdmin(user, e.target)}" class="fas user-shield"></fa-icon>`
        }
    }

    toggleAdmin(user, target) {
        const loggedIn = JSON.parse(window.localStorage.getItem('user'))
        if (user.email === loggedIn.email) {
            alert("Letop, u kunt uzelf niet ontzien als administrator.")
        } else {
            if (user.functie !== "admin") {
                user.functie = "admin"
                sendAuthenticated(`/api/updateUser/${user.email}`, {functie: "admin"}).then(
                    () => {
                        target.classList.toggle("admin")
                    })
            } else {
                user.functie = "auteur"
                sendAuthenticated(`/api/updateUser/${user.email}`, {functie: "auteur"}).then(
                    () => {
                        target.classList.toggle("admin")
                    })
            }
        }
    }

    checkAutor(user) {
        if (user.functie === "auteur") {
            return html`
                <fa-icon title="Maak gebruiker student" @click="${() => this.toggleToStudent(user).then(() => this.requestUpdate())}"
                         class="fas fa-pencil-alt autor"></fa-icon>`
        } else {
            return html`
                <fa-icon title="Maak gebruiker auteur" @click="${() => this.toggleToAutor(user).then(() => this.requestUpdate())}"
                         class="fas fa-pencil-alt"></fa-icon>`
        }
    }

    toggleToStudent(user) {
        delete this._autors[this._autors.indexOf(user)]
        user.functie = 'student'
        this._students.push(user)
        return sendAuthenticated(`/api/updateUser/${user.email}`, {functie: "student"})
    }

    toggleToAutor(user) {
        const loggedIn = JSON.parse(window.localStorage.getItem('user'))
        if (user.email === loggedIn.email) {
            alert("Letop, u kunt uzelf niet ontzien als administrator.")
        } else {
            if (user.functie === 'student') {
                delete this._students[this._students.indexOf(user)]
                this._autors.push(user)
            }
            user.functie = 'auteur'
            return sendAuthenticated(`/api/updateUser/${user.email}`, {functie: "auteur"})
        }
    }

    deleteUser(user) {
        if (user.functie === "admin") {
            alert("Het is niet mogelijk een administrator te verwijderen")
        } else {
            if (confirm("Weet u zeker dat u " + user.fullName + " wilt verwijderen? \n Dit kunt u niet ongedaan maken.")) {
                if (user.functie === "auteur") {
                    delete this._autors[this._autors.indexOf(user)]
                } else {
                    delete this._students[this._students.indexOf(user)]
                }
                sendAuthenticated(`/api/deleteUser/${user.email}`).then(() => this.requestUpdate());
            } else {
            }
        }
    }

    render() {
        return html`
            <h2>Gebruikers beheren</h2>
            <div id="flex-container">
                <ul class="usercontainer">
                    <h2>Studenten</h2>
                    ${this._students.map((user) => html`
                        <li>${user.fullName}<span id="icon-holder">
                            ${this.checkAutor(user)}
                            ${this.checkBlocked(user)}
                            <fa-icon title="Verwijder gebruiker" @click="${() => this.deleteUser(user)}" class="fas fa-trash-alt"></fa-icon>
                            </span>
                        </li>
                    `)}
                </ul>
                <ul class="usercontainer">
                    <h2>Auteurs</h2>
                    ${this._autors.map((user) => html`
                        <li>${user.fullName}
                            ${(user.email === JSON.parse(window.localStorage.getItem('user')).email)? html`` : html` //Can't edit the logged in user.
                            <span id="icon-holder">
                                ${this.checkAutor(user)}
                                ${this.checkBlocked(user)}
                                ${this.checkAdmin(user)}
                                <fa-icon title="Verwijder gebruiker" @click="${() => {this.deleteUser(user)}}" class="fas fa-trash-alt"></fa-icon>
                            </span>`}
                        </li>
                    `)}
                </ul>
            </div>
        `;
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

            li:hover #icon-holder{
                transition: 0.4s all ease-in-out;
                opacity: 1;
            }

            .sub-item {
                padding-left: 10px;
            }

            #icon-holder {
                float: right;
                opacity: 0.2;
            }

            .autor {
                color: green;
                transform: scale(1.1);
            }

            .blocked {
                color: red;
                transform: scale(1.1);
            }

            .admin {
                color: blue;
                transform: scale(1.1);
            }

            fa-icon {
                color: #808080;
                width: 1em;
                height: 1em;
                padding: 0 3px;
                cursor: pointer;
            }

            fa-icon:hover {
                transform: scale(1.3);
            }
            #test{
             display: none;   
            }
            
        `;
    }
}

customElements.define('app-manage-users', appManageUsers);
