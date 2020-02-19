/* eslint-disable no-console */
<template>
    <div>
        <h1>Home</h1>
            <grid
            title="Pick the Line"
            :grid="lines"
            @itemChanged="setSelectedItem"
            ></grid>
        <p>Line: {{ lineId }}</p>
    </div>
</template>

<script>
    import { getTubeLines } from "../requests.js";
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
            grid
        },
        methods: {
            ...mapActions(['changeLine']),
            // accept the emit and add in the router
            setSelectedItem(line) {
                this.changeLine(line)
                this.$router.push({ name: 'Stations', params: {id: this.lineId} })
                
            }
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