import { Particle } from "./particle";
import "./styles.css"

import { PlayerId } from "dusk-games-sdk/multiplayer"
import { Vector } from "./vector";

const canvas = document.getElementById("canvas")! as HTMLCanvasElement;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext("2d")!;

let particle = new Particle(new Vector(2, 3));
particle.velocity = new Vector(0.2, 0.4);

const timeBetweenUpdates = 1000/8; // update roughly 8 times per second
let lastUpdateTime = 0;

let previousFrame = Date.now();
let intervalID = setInterval(() => {
  let currentFrame = Date.now();
  let dt = currentFrame-previousFrame;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particle.update(dt);
  particle.draw(ctx);

  if (Dusk.gameTime() - lastUpdateTime > timeBetweenUpdates) {
    // TODO: trigger an update somehow

    lastUpdateTime = Dusk.gameTime();
  }

  previousFrame = currentFrame;
}, 1000/30);

Dusk.initClient({
  onChange: ({ game, yourPlayerId, action }) => {
    console.log("hi");
  },
})
