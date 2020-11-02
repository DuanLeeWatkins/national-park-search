const apiKey =
    "GILWT7qwqSKp9t0UPEPzGrIelNb7Zrm5GUMnpMwt";

const searchUrl =
    'https://developer.nps.gov/api/v1/parks'

function formatQueryParams(params) {
    const queryItems = Object.keys(params)
        .map(key => `${encodeURIComponent(key)}
        =${encodeURIComponent(params[key])}`)
    return queryItems;
}

function displayResults(responseJson, maxResults) {
    console.log(responseJson);

    $(`#results-list`).empty();

    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {

        $('#results-list').append(
            `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
            </li>`
        );
    }
    $('#results').removeClass('hidden');
};

function getParks(query, maxResults = 10) {
    const params = {
        stateCode: query,
        

    };

    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;

    console.log(url);

    const options = {
        headers: new Headers({
            "X-Api-Key": apiKey
        })
    };



    fetch(url, options)
        .then(Response => {
            if (Response.ok) {
                return Response.json();
            }
            throw new Error(response.statusText);
        })
        .then(responseJson => displayResults(responseJson, maxResults))
        .catch(err => {
            $('#error-message').text(`Something went wrong: ${err.message}`)
        });

}

function watchFrom() {
    $('form').submit(event => {
        event.preventDefault();

        const searchState = $('#state').val();
        const maxResults = $('#max-results').val();
        
        getParks(searchState, maxResults);

    });
}

$(watchFrom);