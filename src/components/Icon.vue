<!-- Icon组建，可以传入阿里 iconfont 图标，使用 Symbol 类型图标，再传入对应的 Font Class / Symbol 即可-->

<template>
  <svg id="Icon" class="icon">
    <use :xlink:href="`#${props.class}`" :fill="props.color" />
  </svg>
</template>

<script lang="ts" setup>
const props = defineProps({
  class: {
    type: String,
    require: true
  },
  color: {
    type: String,
    default: "currentColor"
  },
  size: {
    type: String,
    default: "1em"
  }
})
</script>

<style lang="scss">
#Icon {
  width: v-bind("props.size");
  height: v-bind("props.size");
  fill: v-bind("props.color");
}
</style>
