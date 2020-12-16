import { Router } from "@vaadin/router"

export default function createRouter(outlet) {
	const router = createRouter(outlet)

	router.setRoutes([
		{path: '/register', component: 'app-register'},
		{path: '/login', component: 'app-inlog'},
		{path: '/article', component: 'app-content'}

	])

	return router;
}
