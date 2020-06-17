<template>
    <el-input v-model="value" @input="handleInput" :style="{ width }" @blur="handleBlur"></el-input>
</template>

<script>
export default {
    name: 'FinInputNumber',
    props: {
        inputValue: {
            type: Number,
            default: 0
        },
        width: {
            type: String,
            default: ''
        },
        precision: {
            type: Number,
            default: 2
        },
        min: Number,
        max: Number
    },
    model: {
        prop: 'inputValue',
        event: 'change'
    },
    data() {
        return {
            value: null,
            minValue: null,
            maxValue: null
        }
    },
    methods: {
        handleInput(val) {
            if (val === '') {
                return;
            }
            if (val === '.') {
                this.value = '';
                return;
            }
            // 去掉除 .和数字之外的所有字符
            let value = val.replace(/[^\d.-]/g, '');
            if (value.indexOf('-') > 0) {
                // 如果 - 号不在最前面，那么直接去掉。
                value = value.replace('-', '');
            }
            let firstDotIndex = value.indexOf('.');
            if (firstDotIndex === 0) {
                // 如果第一个符号为 . ，那么直接去掉。
                value = value.substr(1);
            }
            firstDotIndex = value.indexOf('.');
            let lastDotIndex = value.lastIndexOf('.');
            if (firstDotIndex !== lastDotIndex) {
                // 如果存在两个 .，那么去掉最后一个 .
                value = value.substring(0, lastDotIndex) + value.substring(lastDotIndex + 1);
            }
            this.value = value;
        },
        handleBlur() {
            if (this.value === '') {
                this.value = '0.00';
            }
            // 转化数字，保留精度
            let num = Number(this.value);
            if (this.minValue !== null && num < this.minValue) {
                num = this.minValue;
            }
            if (this.maxValue !== null && num > this.maxValue) {
                num = this.maxValue;
            }
            this.value = num.toFixed(this.precision);
            this.$emit('change', Number(this.value));
        }
    },
    created() {
        if (this.inputValue) {
            this.value = this.inputValue.toFixed(this.precision);
        } else {
            this.value = '0.00';
        }
    },
    watch: {
        min(val) {
            if (val !== undefined && val !== null) {
                if (this.maxValue !== null && val > this.maxValue) {
                    this.minValue = this.maxValue;
                } else {
                    this.minValue = val;
                }
            } else {
                this.minValue = null;
            }
        },
        max(val) {
            if (val !== undefined && val !== null) {
                if (this.minValue !== null && val < this.minValue) {
                    this.maxValue = this.minValue;
                } else {
                    this.maxValue = val;
                }
            } else {
                this.maxValue = null;
            }
        }
    }
}
</script>
