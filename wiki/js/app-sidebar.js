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
            console.log(response)
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


            #side-nav-sub {
                padding-left: 40px;
            }

            .head-item {
                margin: 10px 0px;
                font-size: 20px;
                font-weight: bold;
            }

            .sub-item > * {
                text-decoration: none;
                list-style-type: square;
                font-size: 16px;
                color: #383838;
            }

            .sub-item {
                margin-bottom: 5px;
                height: 20px;
            }

            /*.button {*/
            /*    display: flex;*/
            /*    color: inherit; !* blue colors for links too *!*/
            /*    text-decoration: inherit; !* no underline *!*/
            /*    display: inline-block;*/
            /*    padding: 1px 5px 2px;*/
            /*    background: ButtonFace;*/
            /*    color: ButtonText;*/
            /*    border-style: solid;*/
            /*    border-width: 2px;*/
            /*    border-color: ButtonHighlight ButtonShadow ButtonShadow ButtonHighlight;*/
            /*    border-radius: 5px;*/
            /*}*/

            .sub-item :hover {
                color: whitesmoke;
                background-color: darkgray;
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
            }
            
            .dontdisplay{
                display: none;
            }
        `;
    }

    render() {
        return html`
            <link rel="stylesheet" href="/bundle.css">
            <h2>Menu</h2>
            <nav>
            <a router-link href="/creator" id="menuButton">Nieuw artikel</a>
            <a router-link href="/404" class="button">Categoriën bewerken</a>
            <a router-link href="/404" class="button">Users bewerken</a>
            <ul id="side-nav">
                ${this._categories.map((hoofdcat) => html`
                    <li><span class="head-item">${hoofdcat.headcatagory}</span>
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
