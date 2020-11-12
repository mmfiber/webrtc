const videoInput = document.getElementById("video_input")
const videoOutput = document.getElementById("video_output")
const canvas = document.getElementById("canvas")

const btn = document.getElementById("btn")
btn.addEventListener("click", onclickBtn)

const cosntraints ={
  video: true,
  // video: {
  //     height: { ideal: 200 },
  //     width: { ideal: 900 }
  // },
  audio: true
}

async function onclickBtn() {
  const inputStream = await navigator.mediaDevices.getUserMedia(cosntraints)
    .then(playAndGetVideoInputStream)
  const canvasStream = drawAndGetCanvasStream(inputStream)
  playOutput(canvasStream)
}

function playAndGetVideoInputStream(stream) {
  videoInput.srcObject = stream
  return stream
}

function drawAndGetCanvasStream(stream) {
  const videoTrack = stream.getTracks().filter(t => t.kind === "video")[0]
  const {width, height} = videoTrack.getSettings()

  const shouldFitImageVertivcally = height / width > 90 / 160
  const ratio = shouldFitImageVertivcally ? 90 / height : 160 / width
  const scaledWidth = width * ratio
  const scaledHeight = height * ratio

  const dx = (160 - scaledWidth) / 2
  const dy = (90 - scaledHeight) / 2
  const ctx = canvas.getContext("2d")
  const handler = setInterval(() => {
    ctx.fillRect(0, 0 ,160, 90)
    // http://www.htmq.com/canvas/drawImage_s.shtml
    ctx.drawImage(
      video_input,
      0, 0,
      width, height,
      dx, dy,
      scaledWidth, scaledHeight
    )
  })
  return canvas.captureStream(30)
} 

function playOutput(stream) {
  videoOutput.srcObject = stream
  return stream
}


