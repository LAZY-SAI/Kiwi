import gasp from "gsap.core.gasp";

const left = document.querySelector(".left")
const right = document.querySelector(".right")

gsap.fromTo(left,{
    duration:4,
    x:100
})