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
            @itemChanged="stopPoint = $event"
            ></grid>
        <p>current line: {{ lineId }} </p>
        <p>current stoppoint: {{ stopPoint }} </p>  
    </div>
</template>

<script>
    import { getStations } from "../requests.js";
    import grid from '../components/Grid.vue';
    import { mapState } from 'vuex'

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
            ...mapState(['stopPoint'])
        },
        components: {
            grid
        },
        methods: {
            // changeStation() {
            //     this.$store.dispatch('changeStation', this.stopPoint)
            // }
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