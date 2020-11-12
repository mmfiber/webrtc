const videoInput = document.getElementById("video_input")
const videoOutput = document.getElementById("video_output")
const canvas = document.getElementById("canvas")

const btn = document.getElementById("btn")
btn.addEventListener("click", onclickBtn)

const cosntraints ={
  video: true,
  audio: true
}

function onclickBtn() {
  const inputStream = navigator.mediaDevices.getUserMedia(cosntraints)
    .then(playAndGetVideoInputStream)
  const canvasStream = drawAndGetCanvasStream(inputStream)
  playOutput(canvasStream)
}

function playAndGetVideoInputStream(stream) {
  videoInput.srcObject = stream
  return stream
}

function drawAndGetCanvasStream(stream) {
  const ctx = canvas.getContext("2d")
  // todo 
  // 160 * 90 の canvas obj を作る（黒塗り）
  // video_input の内容をcanvas objに貼り付ける
  //   比率を計算(4:x)
  //     x > 3  : 縦に合わせる
  //     x <= 3 : 横に合わせる
  const handler = setInterval(() => ctx.drawImage(video_input, 0, 0, 160, 90))
  return canvas.captureStream(30)
} 

function playOutput(stream) {
  videoOutput.srcObject = stream
  return stream
}


