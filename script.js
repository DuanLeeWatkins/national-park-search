const apiKey = "GILWT7qwqSKp9t0UPEPzGrIelNb7Zrm5GUMnpMwt";

const searchUrl = "https://developer.nps.gov/api/v1/parks";

// This function formats the query parameters as a part of the url.
function formatQueryParams(params) {
  const queryItems = Object.keys(params).map(
    (key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
  );
  return queryItems;
}

// This function displays the response data on the web page.
function displayResults(responseJson, maxResults) {
  console.log(responseJson);

  $(`#results-list`).empty();

  for (let i = 0; (i < responseJson.data.length) & (i < maxResults); i++) {
    $("#results-list").append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
            <p>${responseJson.data[i].description}</p>
            <a href="${responseJson.data[i].url}">${responseJson.data[i].url}</a>
            </li>`
    );
  }
  $("#results").removeClass("hidden");
}

// This function gets the park data from the api.
function getParks(query, maxResults = 10) {
  const params = {
    stateCode: query,
  };

  const q = query
    .split(",")
    .map((s) => s.trim())
    .map(encodeURIComponent)
    .map((code) => `stateCode=${code}`)
    .concat(`limit=${maxResults}`)
    .join("&");

  //const queryString = formatQueryParams(params);
  const url = searchUrl + "?" + q;

  console.log(url);
  // Displays the api key in the request header.
  const options = {
    headers: new Headers({
      "X-Api-Key": apiKey,
    }),
  };

  fetch(url, options)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((responseJson) => displayResults(responseJson, maxResults))
    .catch((error) => {
      $("#error-message").text(`Something went wrong: ${error.message}`);
    });
}
// This function watches the form for user interaction.
function watchForm() {
  $("form").submit((event) => {
    event.preventDefault();

    const searchState = $("#search-state").val();
    const maxResults = $("#max-results").val();
    $("#state").val("");

    getParks(searchState, maxResults);
  });
}

$(watchForm);
