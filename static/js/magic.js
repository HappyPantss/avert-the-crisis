gsap.registerPlugin(ScrollTrigger);

var slides = document.querySelectorAll(".rowWrap");

var action = gsap.timeline({
        scrollTrigger: {
            trigger: "#sec01",
            endTrigger: "#sec02",
            pin: true,
            scrub: 0.3,
            start: "top top",
            end: "+=3000"
        }
    })
    .to(slides, { xPercent: -100, duration: 2, ease: "none", stagger: 3 })
    .to({}, { duration: 1 }) // an empty tween to generate a pause at the end