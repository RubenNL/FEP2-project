import {LitElement, html, css} from 'lit-element';
import 'fa-icons';

export class appCategoryEditor extends LitElement {
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
            console.log(response)
        })
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

            #categoriecontainer {
                padding: 0px;
                width: 40%
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
            <h2>Categorieën bewerken</h2>
            <div id="flex-container">
                <ul id="categoriecontainer">
                    ${this._categories.map((hoofdcat) => html`
                        <li><b>${hoofdcat.headcatagory}</b><span id="icon-holder">
                                <a href="https://www.youtube.com/watch?v=RO75ZzqUOJw&ab_channel=SigurdBarrett-Topic"><fa-icon class="fas fa-pencil-alt"></fa-icon></a>
                                <fa-icon class="fas fa-trash-alt"></fa-icon>
                            </span></li>
                        <ul class="side-nav-sub">${hoofdcat.subcatagories.map(sub => html`
                            <li class="sub-item">
                                ${sub.title}
                                <span id="icon-holder">
                                        <fa-icon class="fas fa-pencil-alt"></fa-icon>
                                        <fa-icon class="fas fa-trash-alt"></fa-icon>
                                    </span></li>`)}
                        </ul>
                    `)}
                </ul>
            </div>
            <div>
                <p>Are you sure?</p>
            </div>
            </div>
            <button>Bevestigen</button>
            </nav>
        `;
    }
}

customElements.define('app-category-editor', appCategoryEditor);