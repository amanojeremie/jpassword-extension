/**
 * Uses fetch and returns a Promise of a JSON object
 * 
 * @param {string} endpoint The HTTP endpoint
 * @param {object} object The object to POST as a JSON
 * @param {string} method The HTTP method to use, default POST
 */
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