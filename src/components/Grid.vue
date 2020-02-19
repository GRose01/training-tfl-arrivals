<template>
    <div class="grid">
        <h3>{{ title }}</h3>
        <div class="card">
            <!-- <router-link :to="{ name: 'Stations', params: {id: lineId} }"> -->
                <div>
                    <h5 
                        v-for="card in grid" 
                        :key="card.value" 
                        :value="card.value"
                        @click="selectItem(card.value)"               
                        >
                        {{ card.name }}
                    </h5>
                </div>
            <!-- </router-link> -->
        </div>
        
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
    props: {
        grid: {
            type: Array,
            required: true
        },
        title: String,
        filterKey: String
    },
    data() {
        return {
            // selectedItem: ''
        }
    },
    computed: {
        ...mapState(['lineId']),
    },
    methods: {
        ...mapActions(['changeLine']),
        // send an emit to parent
        selectItem(selectedItem) {
            this.$emit('itemChanged', selectedItem)
        }
    }
}
</script>