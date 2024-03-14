import { calculateAge } from "@/utils/util"

function renderTip(template, context) {
  const tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g
  return template.replace(tokenReg, function (word, slash1, token, slash2) {
    if (slash1 || slash2) {
      return word.replace("\\", "")
    }
    const variables = token.replace(/\s/g, "").split(".")
    let currentObject = context
    let i
    let length
    let variable
    for (i = 0, length = variables.length; i < length; ++i) {
      variable = variables[i]
      currentObject = currentObject[variable]
      if (currentObject === undefined || currentObject === null) return ""
    }
    return currentObject
  })
}

String.prototype.renderTip = function (context) {
  return renderTip(this, context)
}

function initTips() {
  $("#landlord #live2d").click(function () {
    const messages = [
      "你想干嘛？",
      "不要动手动脚的！快把手拿开~~",
      "真…真的是不知羞耻！",
      "再摸的话我可要报警了！⌇●﹏●⌇",
      "吾家柠檬初长成\n活泼可爱惹人疼",
      "110吗?这里有个变态一直在摸我(ó﹏ò｡)",
      "我有柠檬，你没有！",
      `柠檬年龄:${calculateAge("2023-06-21")}`,
      `上次驱虫:2024-03-02(${calculateAge("2024-03-02")})`
    ]
    let text = messages[Math.floor(Math.random() * messages.length + 1) - 1]
    text = text.renderTip({ text: $(this).text() })
    showMessage(text, 3000)
  })
}

function showMessage(text, timeout) {
  if (Array.isArray(text)) {
    text = text[Math.floor(Math.random() * text.length + 1) - 1]
  }

  $(".message").stop()
  $(".message").html(text).fadeTo(200, 1)
  if (timeout === null) timeout = 5000
  hideMessage(timeout)
}

function hideMessage(timeout) {
  $(".message").stop().css("opacity", 1)
  if (timeout === null) timeout = 5000
  $(".message").delay(timeout).fadeTo(200, 0)
}

function showHitokoto() {
  $.getJSON("https://v1.hitokoto.cn/", function (result) {
    showMessage(result.hitokoto, 5000)
  })
}

export default function initMessage() {
  initTips()
  showMessage("吾家柠檬初长成\n活泼可爱惹人疼", 5000)
  setInterval(showHitokoto, 6000)
}
