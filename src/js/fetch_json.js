export default (endpoint, object, method='POST') => {
    console.log(endpoint);
    console.log(JSON.stringify(object));
    return fetch(endpoint, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(object)
    }).then((response) => {console.log(response); return response.json()});
}