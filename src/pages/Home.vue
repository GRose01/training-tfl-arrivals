<template>
    <div>
        <h1>Home</h1>
            <grid
            title="Pick the Line"
            :grid="lines"
            @itemChanged="setSelectedItem"
            ></grid>
    </div>
</template>

<script>
    import { getTubeLines } from "../requests.js";
    import grid from '../components/Grid.vue';
    // import { mapState, mapActions } from 'vuex';

    export default {
        name: "Home",
        data () {
            return {
                lines: []
            }
        },
        computed: {
            // ...mapState(['lineId']),
        },
        components: {
            grid
        },
        methods: {
            // ...mapActions(['changeLine']),
            // accept the emit and add in the router
            setSelectedItem(line) {
                this.$router.push({ name: 'Stations', params: {lineId: line} })
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