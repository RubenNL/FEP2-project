import {Router} from '@vaadin/router';

const outlet = document.querySelector('main');
const router = new Router(outlet);
router.setRoutes([
	{
		path: '/register',
		component: 'app-register',
		action: ()=>import('js/app-register.js')
	},
	{
		path: '/login',
		component: 'app-inlog',
		action: ()=>import('js/app-inlog.js')
	},
	{
		path: '/register',
		component: 'app-register',
		action: ()=>import('js/app-register.js')
	},
	{
		path: '/article/:article',
		component: 'app-artikel',
		action: ()=>import('js/app-artikel.js')
	},
	{path: '/', redirect: '/article/1'},
	{
		path: '/category/:categoryID',
		component: 'app-category-page',
		action: ()=>import('js/app-category-page.js')
	},
	{
		path: '/creator',
		component: 'app-create-article',
		action: ()=>import('js/app-create-article.js')
	}
]);
import "js/app-header.js"
import "js/app-sidebar.js"
import "js/app-search.js"
import "js/app-footer.js"

import 'css/bootstrap.min.css'
import 'css/style.css'