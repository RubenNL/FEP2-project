import {LitElement, html, css} from 'lit-element';

export class appSidebar extends LitElement {
	static get properties() {
		return {
			_categories: {type: Array}
		}
	}

	constructor() {
		super();
		this._categories = [];
		fetch(`/api/getCategories`).then(response => response.json()).then(response => {
			this._categories = response
		})
		this.classList.add('bg-container');
	}

	static get styles() {
		// language=css
		return css`
            :host {
                min-height: 100%;
                color: #383838;
            }

            #side-nav {
                list-style-type: none;
                padding-left: 0px;
                color: #383838;
            }
            #side-nav-sub > a {
                text-decoration: none;
                color: #383838;
                padding-bottom: 10px;
            }
            .side-nav-sub {
				display:none;
                padding-left: 0px;
                list-style-position: inside;
                list-style-type:none;
                margin-bottom:15px;
            }
            .head-item:target+.side-nav-sub, .side-nav-sub:target,
			.head-item:focus+.side-nav-sub, .side-nav-sub:focus,
			.head-item:active+.side-nav-sub, .side-nav-sub:active,
			.side-nav-sub.active {
				display:unset
			}

            .head-item {
                font-size: 16px;
                font-weight: bold;
				padding-top: 0px;
				padding-bottom: 5px;
				margin: 0px;
            }

            .sub-item > a {
                display:block;
                padding: 3px 5px;
                border-radius: 3px;
            }
            .sub-item > * {
                text-decoration: none;
                list-style-type: square;
                font-size: 13px;
                color: #383838;
            }
            .sub-item a:hover{
                background-color: #f2f2f2;
            }

            .button{
                display: block;
                background: #0066c4;
                color: #ffffff;
                cursor: pointer;
                border: 0;
                transition: all 0.5s;
                border-radius: 3px;
                align-self: end;
                grid-column: 1;
                text-align: center;
                padding: 5px 20px;
                margin-bottom: 3px;
                text-decoration: inherit; /* no underline */
            }
		`;
	}

	determineAcces(user){
		let role = JSON.parse(user).functie;
		switch(role){
			case "student":
				return html`
					<a router-link href="/bookmarks" class="button" id="menuButton">Bladwijzers</a>`;
			case "auteur":
				return html`
					<a router-link href="/bookmarks" class="button" id="menuButton">Bladwijzers</a>
					<a router-link href="/creator" class="button" id="menuButton">Nieuw artikel</a>`;
			case "admin":
				return html`
					<a router-link href="/bookmarks" class="button" id="menuButton">Bladwijzers</a>
					<a router-link href="/creator" class="button" id="menuButton">Nieuw artikel</a>
					<a router-link href="/users" class="button">Gebruikers beheren</a>`;
		}
	}

	render() {
		let user = window.localStorage.getItem('user');

		return html`
			<link rel="stylesheet" href="/bundle.css">
			<h2>Menu</h2>
			<nav>
				${user ? this.determineAcces(user) : html``}
				<ul id="side-nav">
					${this._categories.map((hoofdcat) => html`
						<li>
							<h3 class="head-item" tabindex="0">${hoofdcat.headcatagory}</h3>
							<ul class="side-nav-sub">${hoofdcat.subcatagories.map(sub => html`
								<li class="sub-item"><a router-link href="/category/${sub.id}">${sub.title}</a></li>`)}
							</ul>
						</li>
					`)}
				</ul>
			</nav>
		`;
	}
}

customElements.define('app-sidebar', appSidebar);
