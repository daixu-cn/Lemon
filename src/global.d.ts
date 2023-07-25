declare module "element-plus/dist/locale/zh-cn.mjs"

interface Window {
  mozRequestAnimationFrame: (callback: FrameRequestCallback) => number
  webkitRequestAnimationFrame: (callback: FrameRequestCallback) => number
  msRequestAnimationFrame: (callback: FrameRequestCallback) => number
}
