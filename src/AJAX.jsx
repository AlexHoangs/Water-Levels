// send a POST request
async function sendPostRequest(url, data) {
    let params = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    };

    console.log("about to send POST request");
    console.log(params);

    let response = await fetch(url, params);
    if (response.ok) {
        console.log("received response");
        let data = await response.json();
        return data;
    } else {
        throw Error(response.status);
    }
}

// send a get request
async function sendGetRequest(url) {
    let params = {
        method: 'GET',
    };

    console.log("about to send GET request");
    console.log(params);

    let response = await fetch(url, params);
    if (response.ok) {
        console.log("received response");
        let data = await response.json();
        return data;
    } else {
        throw Error(response.status);
    }
}

export { sendGetRequest, sendPostRequest };