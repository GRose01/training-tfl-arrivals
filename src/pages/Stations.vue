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
        <button @click="changeStation">Change Station</button>
        <p>current line: {{ lineId }} </p>
        <p>current stoppoint: {{ currentStopPoint }} </p>  
        

    </div>
</template>

<script>
    import { getStations } from "../requests.js";
    import singleDropdown from '../components/SingleDropdown.vue';
    import { mapState } from 'vuex'

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
            ...mapState(['lineId']),
            currentStopPoint() {
                return this.$store.state.stopPoint
            }
        },
        components: {
            'singleDropdown': singleDropdown
        },
        methods: {
            changeStation() {
                this.$store.dispatch('changeStation', this.stopPoint)
            }
        },
        created: function() {
            getStations(this.lineId)
            .then(response => { 
                this.stations = response.map(i => {
                return { name: i.commonName, value: i.id }
                })
            })
            .catch(error => alert(error.name))
        }
    }
</script>