<template>
  <div id="landlord">
    <div class="message" style="opacity: 0"></div>
    <canvas id="live2d" width="280" height="250" class="live2d"></canvas>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue"
import "@/assets/Live2d/js/live2d.js"
import initMessage from "@/assets/Live2d/js/message.js"

const props = defineProps({
  model: {
    type: String,
    default: "tia"
  }
})

onMounted(() => {
  loadlive2d(
    "live2d",
    new URL(`../assets/Live2d/model/${props.model}/model.json`, import.meta.url)
      .href
  )
  initMessage()
})
</script>

<style lang="scss">
#landlord {
  user-select: none;
  position: fixed;
  left: 30px;
  bottom: 0;
  width: 280px;
  height: 250px;
  z-index: 10000;
  font-size: 0;
  transition: all 0.3s ease-in-out;

  #live2d {
    position: relative;
  }

  .message {
    opacity: 0;
    width: 300px;
    height: auto;
    margin: auto;
    padding: 7px;
    top: -20px;
    left: -10px;
    text-align: center;
    color: #bdc1c8;
    font-size: 13px;
    font-weight: 400;
    text-overflow: ellipsis;
    text-transform: uppercase;
    overflow: hidden;
    position: absolute;
    animation-delay: 5s;
    animation-duration: 50s;
    animation-iteration-count: infinite;
    animation-name: shake;
    animation-timing-function: ease-in-out;
  }
}
@media (max-width: 768px) {
  #landlord {
    display: none;
  }
}
</style>
../assets/js/live2d.js../assets/js/message.js../assets/Live2d/js/live2d.js../assets/Live2d/js/message.js
