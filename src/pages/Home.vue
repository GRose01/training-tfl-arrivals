<template>
    <div>
        <h1>Home</h1>
        <h3>Pick the line</h3>
        <div class=lineSelection>
            <singleDropdown 
        :forLabel="lineLabel"
        :labelText="lineText"
        :initialValue="linePlaceholder"
        :options="lines"
        @itemChanged="lineId = $event"
        ></singleDropdown>
        </div>
    </div>
</template>

<script>
    import { getTubeLines } from "../requests.js";
    import singleDropdown from '../components/singleDropdown.vue';

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
        components: {
            'singleDropdown': singleDropdown
        },
        methods: {
            
            setLineData: function(event) {
                this.lineId = event.target.value
            },
        },
        watch: {
            // lineId () {
            //     this.getStationsInfo()
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