<template>
    <div>
        <h1>Home</h1>
            <singleDropdown 
            :forLabel="lineLabel"
            :labelText="lineText"
            :initialValue="linePlaceholder"
            :options="lines"
            @onSelect="changeLine"
            @itemChanged="lineId = $event"
            ></singleDropdown>
            <button @click="changeLine">Change line</button>
        <p> the line id currently is {{ currentLineId }} </p>
    </div>
</template>

<script>
    import { getTubeLines } from "../requests.js";
    import singleDropdown from '../components/SingleDropdown.vue';

    export default {
        name: "Home",
        data () {
            return {
                lineLabel: "lines",
                lineText: "Line: ",
                linePlaceholder: "Choose a line",
                lines: [],
                lineId: ""
            }
        },
        computed: {
            currentLineId () {
                return this.$store.state.lineId
            }
        },
        components: {
            'singleDropdown': singleDropdown
        },
        methods: {
            changeLine() {
                this.$store.dispatch('changeLine', this.lineId)
            },
            setLineData: function(event) {
                this.lineId = event.target.value
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