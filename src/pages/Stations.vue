<template>
    <div>
        <h1>Stations</h1>
        <!-- <singleDropdown 
            :forLabel="stationLabel"
            :labelText="stationText"
            :initialValue="stationPlaceholder"
            :options="stations"
            @itemChanged="stopPoint = $event"
        ></singleDropdown> -->
        <grid
            title="Pick the Station"
            :grid="stations"
            @itemChanged="setSelectedItem"
            ></grid>
        <p>current line: {{ lineId }} </p>
        <p>current stoppoint: {{ stopPoint }} </p>  
    </div>
</template>

<script>
    import { getStations } from "../requests.js";
    import grid from '../components/Grid.vue';
    import { mapState, mapActions } from 'vuex'

    export default {
        name: "Stations",
        data () {
            return {
                stationLabel: "stations",
                stationText: "Station: ",
                stationPlaceholder: "Choose a station",
                stations: [],
            }
        },
        computed: {
            ...mapState(['lineId']),
            ...mapState(['stopPoint']),
        },
        components: {
            grid
        },
        methods: {
            ...mapActions(['changeStation']),
            // accept the emit and add in the router
            setSelectedItem(station) {
                this.changeStation(station)
                this.$router.push({ name: 'Platforms', params: {id: this.stopPoint} })  
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