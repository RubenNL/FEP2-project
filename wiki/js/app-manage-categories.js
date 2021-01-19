import {LitElement, html, css} from 'lit-element';
import 'fa-icons';
import {connect} from "pwa-helpers/connect-mixin";
import store from "../redux";

export class appManageCategories extends connect(store)(LitElement) {
	static get properties() {
		return {
			_categories: {type: Array}
		}
	}

	constructor() {
		super();
		this._categories = [];
		sendAuthenticated(`/api/getCategories`).then(response => {
			response.map((category) => {
				this._categories.push(category)
			})
		}).then(() => this.requestUpdate());
	}


	render() {
		return html`
            <h2>Categorieën beheren</h2>
            <div id="flex-container">
                <div class="categorycontainer">
                    <h2>Categories</h2>
                    ${this._categories.map((hoofdcat) => html`
					<div id="headcat">
                        ${hoofdcat.headcatagory}
                        <li>
							<ul class="side-nav-sub">${hoofdcat.subcatagories.map(sub => html`
								<li class="sub-item">${sub.title})<span id="icon-holder">
									<span id="icon-holder">
										<fa-icon title="Pas naam aan" @click="${() => alert('Category naam is aangepast')}"
										class="fas fa-pencil-alt autor"></fa-icon>
							 
										<fa-icon title="Verwijder subcategory" @click="${() => alert('Category is verwijderd!')}" 
										class="fas fa-trash-alt"></fa-icon>
									</span>
								</li>`)}
							</ul>
                        </li>
                    `)}
                    </div>
                </div>
            </div>
            		
		`;
	}

	static get styles() {
		// language=css
		return css`
            :host {
                min-height: 100%;
                color: var(--text-color);
				
            }
			
			#headcat {
                font-weight: bold;
			}

            #flex-container {
                display: flex;
                
            }

            .categorycontainer {
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
                background-color: var(--menu-hover);
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
        `;
	}
}

customElements.define('app-manage-categories', appManageCategories);
