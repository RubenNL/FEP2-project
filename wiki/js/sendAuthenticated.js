function sendAuthenticated(url,data) {
	const jwt=window.localStorage.getItem('JWT')
	if(!jwt) alert('Niet ingelogd!');
	else return fetch(url,{
		headers:{
			'Authorization':'Bearer '+jwt
		},
		method:data?'POST':'GET',
		body: JSON.stringify(data)
	})
		.then(response=>response.text())
		.then(response=>alert(response));
}