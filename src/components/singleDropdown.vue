<template>
    <div class="dropdown">
      <label for="forLabel" class="label">{{ labelText }}</label>
      <select v-model="selectedItem" v-on:change="selectItem">
        <option value="">{{ initialValue }}</option>
        <option v-for="option in options" :key="option.value" :value="option.value">{{ option.name }}</option>
      </select>
    </div>
</template>

<script>

export default {
    props: {
        forLabel: {
            type: String,
            required: true 
        },
        labelText: {
            type: String,
            required: true 
        },
        initialValue: {
            type: String,
            required: true 
        },
        options: {
            type: Array,
            required: true 
        }
    }, 
    data () {
        return {
            selectedItem: ''
        }
    },
    methods: {
        selectItem() {
            this.$emit('itemChanged', this.selectedItem)
        }
    }
}

</script>