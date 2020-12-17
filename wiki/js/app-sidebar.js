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
                min-height: 300px;
                color: #383838;
            }
            
            #side-nav {
                list-style-type: none;
                padding-left: 0px;
                color: #383838;
            }

            #side-nav-sub > a{
                text-decoration: none;
                color: #383838;
                padding-bottom: 10px;
            }
            

            #side-nav-sub {
                padding-left: 40px;
            } 
            .head-item{
                margin: 10px 0px;
                font-size: 20px;
                font-weight: bold;
            }
            .sub-item > *{
                text-decoration: none;
                list-style-type: square;
                font-size: 16px;
                color: #383838;
            }
            .sub-item{
                margin-bottom: 5px;
                height: 20px;
            }
            
            .sub-item :hover{
                color: whitesmoke;
                background-color: darkgray;
            }
        `;
    }

    render() {
        return html`
            <link rel="stylesheet" href="/css/style.css">
            <h2>Menu</h2>
            <ul id="side-nav">
                ${this._categories.map((hoofdcat) => html`
                    <li class="head-item">${hoofdcat.headcatagory}</li>
                    <ul class="side-nav-sub">${hoofdcat.subcatagories.map(sub => html`
                       <li class="sub-item"><a href=${sub.title}>${sub.title}</a></li>`)}
                    </ul>
                `)}
            </ul>
        `;
    }
}

customElements.define('app-sidebar', appSidebar);
