/* eslint-disable no-console */
<template>
    <div>
        <h1>Home</h1>
            <!-- <singleDropdown 
            :forLabel="lineLabel"
            :labelText="lineText"
            :initialValue="linePlaceholder"
            :options="lines"
            @onSelect="changeLine"
            @itemChanged="lineId = $event"
            ></singleDropdown> -->

            <grid
            title="Pick the Line"
            :grid="lines"
            @itemChanged="setSelectedItem"
            ></grid>
        <p> the line id currently is {{ lineId }} </p>
    </div>
</template>

<script>
    import { getTubeLines } from "../requests.js";
    // import singleDropdown from '../components/SingleDropdown.vue';
    import grid from '../components/Grid.vue';
    import { mapState, mapActions } from 'vuex';

    export default {
        name: "Home",
        data () {
            return {
                lineLabel: "lines",
                lineText: "Line: ",
                linePlaceholder: "Choose a line",
                lines: [],
            }
        },
        computed: {
            ...mapState(['lineId'])
        },
        components: {
            // 'singleDropdown': singleDropdown,
            grid
        },
        methods: {
            ...mapActions(['changeLine']),
            // accept the emit and add in the router
            setSelectedItem(line) {
                this.changeLine(line)
                this.$router.push({ name: 'Stations', params: {id: this.lineId} })
                
            }
            
            // changeLine() {
            //     this.$store.dispatch('changeLine', this.lineId)
            // },
            // setLineData: function(event) {
            //     this.lineId = event.target.value
            // }
        },
        created: function(){
            getTubeLines()
                .then(response => { 
                    this.lines = response.map(i => {
                        return { name: i.name, value: i.id }
                    })
                })
                .catch(error => alert(error.name))
        }
    }
</script>