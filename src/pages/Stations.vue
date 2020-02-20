<template>
    <div>
        <h1>Stations</h1>
        <div>this line via $route.params.lineId = {{ $route.params.lineId }}</div>
        <div>this station via $route.params.stopPoint = {{ $route.params.stopPoint }}</div>
        <grid
            title="Pick the Station"
            :grid="stations"
            @itemChanged="setSelectedItem"
            ></grid>
    </div>
</template>

<script>
    import { getStations } from "../requests.js";
    import grid from '../components/Grid.vue';
    import {  mapActions } from 'vuex'

    export default {
        name: "Stations",
        props: {
            lineId: {
                type: String
            }
        },
        data () {
            return {
                stations: [],
            }
        },
        computed: {
            // ...mapState(['lineId']),
            // ...mapState(['stopPoint']),
        },
        components: {
            grid
        },
        methods: {
            ...mapActions(['changeStation']),
            // accept the emit and add in the router
            setSelectedItem(station) {
                this.$router.push({ name: 'Platforms', params: {lineId: this.$route.params.lineId, stopPoint: station} })
            },
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