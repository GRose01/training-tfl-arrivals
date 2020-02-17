<template>
    <div>
        <h1>Stations</h1>
        <singleDropdown 
            :forLabel="stationLabel"
            :labelText="stationText"
            :initialValue="stationPlaceholder"
            :options="stations"
            @itemChanged="stopPoint = $event"
        ></singleDropdown>
    
    </div>
</template>

<script>
    import { getStations } from "../requests.js";
    import singleDropdown from '../components/SingleDropdown.vue';

    export default {
        name: "Stations",
        data () {
            return {
                stationLabel: "stations",
                stationText: "Station: ",
                stationPlaceholder: "Choose a station",
                stations: [],
                stopPoint: ""
            }
        },
        components: {
            'singleDropdown': singleDropdown
        },
        methods: {
            getStationsInfo() {
            // this gets the stoppoints from line ID and sets stoppoint when station is selected
                clearInterval(this.timer)
                if (this.lineId != null || this.lineId != undefined) {
                    getStations(this.lineId)
                    .then(response => { 
                        this.stations = response.map(i => {
                        return { name: i.commonName, value: i.id }
                        })
                    })
                    .catch(error => alert(error.name))
                }
            },
        },
        watch: {
            
        }
    }
</script>