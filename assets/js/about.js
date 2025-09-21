// About page specific JavaScript

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const animateOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Elements to animate
const animatedElements = document.querySelectorAll(".belief-item, .achievement-item, .vision-card, .mission-card")

animatedElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
  animateOnScroll.observe(el)
})

// CEO Quote Animation
const ceoQuote = document.querySelector(".ceo-quote")
if (ceoQuote) {
  const quoteObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animationDelay = "0.3s"
          entry.target.classList.add("animate")
        }
      })
    },
    { threshold: 0.3 },
  )

  quoteObserver.observe(ceoQuote)
}

// Achievement items stagger animation
const achievementItems = document.querySelectorAll(".achievement-item")
achievementItems.forEach((item, index) => {
  item.style.animationDelay = `${index * 0.1}s`
})

// Smooth reveal for text content
const textSections = document.querySelectorAll(".text-content, .ceo-bio")
textSections.forEach((section) => {
  const paragraphs = section.querySelectorAll("p")
  paragraphs.forEach((p, index) => {
    p.style.opacity = "0"
    p.style.transform = "translateY(20px)"
    p.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
  })

  const textObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const paragraphs = entry.target.querySelectorAll("p")
          paragraphs.forEach((p) => {
            p.style.opacity = "1"
            p.style.transform = "translateY(0)"
          })
        }
      })
    },
    { threshold: 0.2 },
  )

  textObserver.observe(section)
})

// Add hover effects for interactive elements
document.querySelectorAll(".belief-item, .achievement-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Timeline animation for achievements
const timelineItems = document.querySelectorAll(".achievement-item")
const timelineObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateX(0)"
      }
    })
  },
  { threshold: 0.3 },
)

timelineItems.forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transform = index % 2 === 0 ? "translateX(-50px)" : "translateX(50px)"
  item.style.transition = `opacity 0.8s ease ${index * 0.1}s, transform 0.8s ease ${index * 0.1}s`
  timelineObserver.observe(item)
})
