<template>
    <div>
        <h1>Stations</h1>
        <singleDropdown 
            :forLabel="stationLabel"
            :labelText="stationText"
            :initialValue="stationPlaceholder"
            :options="stations"
            @itemChanged="stopPoint = $event"
            @click="getStationsInfo"
        ></singleDropdown>
        <p>current line: {{ currentLine }} </p> 
        

    </div>
</template>

<script>
    // import { getStations } from "../requests.js";
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
        computed: {
            currentLine () {
                return this.$store.state.lineId
            }
        },
        components: {
            'singleDropdown': singleDropdown
        },
        methods: {
            
        },
        // created: function(){
        //     getStationsInfo() {
        //     // this gets the stoppoints from line ID and sets stoppoint when station is selected
        //         clearInterval(this.timer)
        //         if (this.lineId != null || this.lineId != undefined) {
        //             getStations(this.currentLine)
        //             .then(response => { 
        //                 this.stations = response.map(i => {
        //                 return { name: i.commonName, value: i.id }
        //                 })
        //             })
        //             .catch(error => alert(error.name))
        //         }
        //     }
        // }
    }
</script>