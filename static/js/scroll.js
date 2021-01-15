gsap.registerPlugin(ScrollTrigger);

ScrollTrigger.defaults({
    toggleClass: "active",
    markers: true,
})

ScrollTrigger.create({
    trigger: ".a",
    start: "top center",
    end: "top 100px",
})

ScrollTrigger.create({
    trigger: ".b",
    start: "top center",
    end: "top 100px",
})

ScrollTrigger.create({
    trigger: ".c",
    start: "top center",
    end: "top 100px",
})