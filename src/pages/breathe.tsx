import React from "react"

import { mapN } from "../utils"

// https://codepen.io/supah/pen/OJXJgZq
const body = {
  margin: 0,
  padding: 0,
  background: "#172442",
}

const before = {
  content: "",
  position: "absolute",
  zIndex: 1,
  background: "linear-gradient(0deg, #191842, transparent 95%)",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "320px",
  height: "400px",
  boxShadow: "-5px 35px 30px -20px rgba(0, 0, 0, 0.5)",
}

const after = {
  position: "absolute",
  zIndex: 2,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  letterSpacing: "1.4em",
  margin: "0 0 0 0.6em",
  textTransform: "uppercase",
  content: "BREATHE",
  color: "violet",
  mixBlendMode: "lighten",
  fontSize: "12px",
  fontFamily: "serif",
  opacity: 0.8,
}

const canvas = {
  position: "relative",
  zIndex: 2,
  background: "transparent",
}

const mapRange = (a, b, c, d, e) => ((a - b) * (e - d)) / (c - b) + d

// const lerp = (v0, v1, t) => v0 * (1 - t) + v1 * t
// const random = (min, max) => min + Math.random() * (max - min)

const sin = (t) => Math.sin(t)
const cos = (t) => Math.cos(t)
const { PI } = Math
const TAO = PI * 2
const LOOP = 4

class Raf {
  constructor() {
    this.raf()
  }

  raf() {
    if (this.onRaf) {
      window.requestAnimationFrame(() => {
        const o = {}
        o.time = window.performance.now() / 1000
        o.playhead = (o.time % LOOP) / LOOP
        this.raf()
        this.onRaf(o)
      })
    }
  }
}

const raf = ({ onRaf }) => {
  if (onRaf) {
    window.requestAnimationFrame(() => {
      const o = {}
      o.time = window.performance.now() / 1000
      o.playhead = (o.time % LOOP) / LOOP
      this.onRaf(o)
    })
  }
}

class Canvas extends Raf {
  constructor(obj) {
    super()
    this.canvas = document.getElementById(obj.id)
    this.ctx = this.canvas.getContext("2d")
    this.resize()
    this.events()
  }

  resize() {
    this.dpr = window.devicePixelRatio
    this.canvas.style.width = `${window.innerWidth}px`
    this.canvas.style.height = `${window.innerHeight}px`
    this.canvas.width = window.innerWidth * this.dpr
    this.canvas.height = window.innerHeight * this.dpr
  }

  events() {
    window.addEventListener("resize", this.resize)
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      window.innerWidth * this.dpr,
      window.innerHeight * this.dpr
    )
  }

  onRaf() {
    this.clear()
  }
}

class Circle extends Raf {
  constructor(obj) {
    super()
    Object.assign(this, obj)
    this.draw()
  }

  draw(playhead, time) {
    const breathe = sin(playhead * TAO)
    this.ctx.globalCompositeOperation = "screen"
    this.ctx.save()
    this.ctx.translate(
      (window.innerWidth / 2) * this.dpr,
      (window.innerHeight / 2) * this.dpr - 30 * this.dpr
    )
    this.ctx.rotate(PI)

    this.ctx.strokeStyle = this.color
    this.ctx.fillStyle = "rgba(0, 100, 0, 0)"
    this.ctx.lineWidth = this.lineWidth
    this.ctx.beginPath()

    mapN((i) => {
      const p = i / this.points

      const times = 7

      const phase = mapRange(
        cos(p * TAO),
        -1,
        1,
        1,
        mapRange(
          sin(((this.offset + time * this.speed) * 0.2 + p) * times * TAO),
          -1,
          1,
          0.5,
          0.58
        )
      )

      let x = phase * this.radius * sin(p * TAO)
      let y = phase * this.radius * cos(p * TAO)

      const type = i === 0 ? "moveTo" : "lineTo"
      this.ctx[type](x, y)
    }, this.points)

    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.beginPath()
    this.ctx.fillStyle = this.color
    this.ctx.fill()
    this.ctx.restore()
  }

  onRaf({ playhead, time }) {
    this.draw(playhead, time)
  }
}

const canvas = new Canvas({
  id: "canvas",
})

mapN((i) => {
  new Circle({
    ctx: canvas.ctx,
    dpr: canvas.dpr,
    lineWidth: 1 * canvas.dpr,
    points: 200,
    offset: i * 1.5,
    speed: 0.7,
    radius: (150 - i * 4) * canvas.dpr,
    color: `hsl(${220 + i * 10}, 60%, 70%)`,
  })
}, 8)

const Breathe: React.ReactNode = () => (
  <div style={body}>
    <div style={canvas} />
  </div>
)

export default Breathe
