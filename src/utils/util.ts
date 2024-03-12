/**
 * @description 获取两个数之间的随机整数（包含最大值和最小值）
 * @param {number} min 最小值
 * @param {number} max 最大值
 * @return {number}
 */
export const getRandomIntInclusive = (min: number, max: number): number => {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}
