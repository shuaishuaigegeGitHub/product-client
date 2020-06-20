<template>
    <div class="fl-input">
        <input 
            v-model="value_" 
            class="fl-input__inner"
            @change="handleChange"
            :autocomplete="autocomplete" 
            :type="type" 
            :readonly="readonly"
            :placeholder="placeholder" 
            :style="inputStyle">
    </div>
</template>

<script>
export default {
    name: 'FlInput',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        autocomplete: {
            type: String,
            default: 'off'
        },
        readonly: Boolean,
        placeholder: String,
        type: {
            type: String,
            default: 'text'
        },
        inputStyle: {
            type: Object,
            default: () => {
                return {
                    width: '100%'
                }
            }
        },
        value: {
            type: String
        },
    },
    data() {
        return {
            value_: this.value
        }
    },
    methods: {
        handleChange() {
            this.$emit('change', this.value_);
        }
    }
}
</script>

<style lang="scss" scoped>
.fl-input {
    margin-bottom: 16px;

    .fl-input__inner {
        background-color: #FFFFFF;
        background-image: none;
        border-radius: 4px;
        border: none;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        color: #303134;
        display: inline-block;
        font-size: inherit;
        height: 40px;
        line-height: 40px;
        outline: none;
        padding: 0 15px;
        -webkit-transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    .fl-input__inner:hover, .fl-input__inner:focus {
        background-color: #f7f7f7;
    }
}
</style>
