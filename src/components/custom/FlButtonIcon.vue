<template>
    <span class="fl-button-icon">
        <i :class="icon"></i>
    </span>
</template>

<script>
export default {
    name: 'FlButtonIcon',
    props: {
        icon: {
            type: String,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.fl-button-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    text-align: center;
    vertical-align: middle;
    cursor: pointer;
    border-radius: 5px;
    padding: 4px;

    i {
        font-size: 20px;
    }
}

.fl-button-icon:hover {
    background-color: #ecf6fe;

    i:hover {
        color: #1b9aee;
    }
}
</style>
