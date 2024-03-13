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
  $.ajax({
    cache: true,
    url: new URL(`./message.json`, import.meta.url).href,
    dataType: "json",
    success(result) {
      $.each(result.mouseover, function (index, tips) {
        $(tips.selector).mouseover(function () {
          let { text } = tips
          if (Array.isArray(tips.text)) {
            text =
              tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
          }
          text = text.renderTip({ text: $(this).text() })
          showMessage(text, 3000)
        })
      })
      $.each(result.click, function (index, tips) {
        $(tips.selector).click(function () {
          let { text } = tips
          if (Array.isArray(tips.text)) {
            text =
              tips.text[Math.floor(Math.random() * tips.text.length + 1) - 1]
          }
          text = text.renderTip({ text: $(this).text() })
          showMessage(text, 3000)
        })
      })
    }
  })
}
initTips()

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
  showMessage("吾家柠檬初长成\n活泼可爱惹人疼", 5000)
  setInterval(showHitokoto, 6000)
}
