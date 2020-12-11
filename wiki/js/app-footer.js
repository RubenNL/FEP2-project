import {css, LitElement, html} from "lit-element";

export class appFooter extends LitElement {
    static get properties() {
        return {
            _hboiLink: {
                type: String
            },
            _githubImage: {
                type: String
            },
            _githubLink: {
                type: String
            },
            _huLink: {
                type: String
            },
            _avansLink: {
                type: String
            },
            _copyrightText: {
                type: String
            }
        };
    }
    static get styles(){
        //language=CSS
        return css`:host {
            height: 150px;
            background-color: #fff;
            padding: 10px;
            display: block;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
            text-align: center;
            align-content: center;
            place-content: center;
            margin: auto 0;
        }
        :host > a > img{
            display: block;
            margin: 0 auto;
        }
`
    }
    constructor() {
        super();
        this._avansLink = { src: "https://www.avans.nl/"};
        this._hboiLink = { src: "https://www.hbo-i.nl/"};
        this._githubImage = { src: " http://pngimg.com/uploads/github/github_PNG85.png"};
        this._githubLink = { src: "https://github.com/HU-SD-SV2PRFED-studenten-2021/prfed_2021-v2b-v"};
        this._huLink = { src: "https://hu/nl"};
        this._copyrightText = "© 2020 - Team V2B";
    }

    render() {
        return html`  
            <a href="${this._githubLink}"><img src="${this._githubImage.src}" alt="githubImage"  width="50" height ="50" class="align-content-center"/></a>
            <a href="${this._avansLink}">Avans</a>
            <a href="${this._huLink}">Hogeschool Utrecht</a>
            <a href="${this._hboiLink}">HBO-I</a>
            <p>${this._copyrightText}</p>
       `;
    }

}

customElements.define('app-footer', appFooter)