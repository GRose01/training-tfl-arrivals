import axios from "axios"

function getTubeLines() {
    return axios
        .get('https://api.tfl.gov.uk/Line/Mode/tube')
        .then(response => { 
            return response.data 
        });
    }

function getStations(lineId) {
    return axios
    .get('https://api.tfl.gov.uk/Line/'  + lineId + '/StopPoints') 
    .then(response => {
      return response.data;
    })
}

function getPlatforms(stoppoint) {
    return axios
    .get('https://api.tfl.gov.uk/StopPoint/' + stoppoint + '/Arrivals') 
    .then(response => {
      return response.data;
    })
}
export { getTubeLines, getStations, getPlatforms }