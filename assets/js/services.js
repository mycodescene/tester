// Services page functionality

// Tab filtering functionality
const tabButtons = document.querySelectorAll(".tab-btn")
const serviceCategories = document.querySelectorAll(".service-category")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.getAttribute("data-category")

    // Update active tab
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter categories
    serviceCategories.forEach((section) => {
      if (category === "all") {
        section.classList.remove("hidden")
      } else {
        if (section.classList.contains(category)) {
          section.classList.remove("hidden")
        } else {
          section.classList.add("hidden")
        }
      }
    })

    // Smooth scroll to first visible category
    setTimeout(() => {
      const firstVisible = document.querySelector(".service-category:not(.hidden)")
      if (firstVisible && category !== "all") {
        firstVisible.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        })
      }
    }, 100)
  })
})

// Animate service items on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const serviceObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1"
      entry.target.style.transform = "translateY(0)"
    }
  })
}, observerOptions)

// Observe all service items
document.querySelectorAll(".service-item").forEach((item, index) => {
  item.style.opacity = "0"
  item.style.transform = "translateY(30px)"
  item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
  serviceObserver.observe(item)
})

// Category headers animation
document.querySelectorAll(".category-header").forEach((header) => {
  header.style.opacity = "0"
  header.style.transform = "translateX(-50px)"
  header.style.transition = "opacity 0.8s ease, transform 0.8s ease"

  const headerObserver = new IntersectionObserver(
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

  headerObserver.observe(header)
})

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navHeight = document.querySelector(".services-nav").offsetHeight + 70
      const targetPosition = target.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add hover effects for service items
document.querySelectorAll(".service-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(-5px) scale(1)"
  })
})

// Search functionality (if needed)
function searchServices(query) {
  const serviceItems = document.querySelectorAll(".service-item")
  const searchTerm = query.toLowerCase()

  serviceItems.forEach((item) => {
    const title = item.querySelector("h3").textContent.toLowerCase()
    const description = item.querySelector("p").textContent.toLowerCase()
    const features = Array.from(item.querySelectorAll(".service-features li"))
      .map((li) => li.textContent.toLowerCase())
      .join(" ")

    const isMatch = title.includes(searchTerm) || description.includes(searchTerm) || features.includes(searchTerm)

    if (isMatch) {
      item.style.display = "block"
      item.style.opacity = "1"
    } else {
      item.style.display = "none"
      item.style.opacity = "0"
    }
  })
}

// Sticky navigation behavior
let lastScrollTop = 0
const servicesNav = document.querySelector(".services-nav")

window.addEventListener("scroll", () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop

  if (scrollTop > lastScrollTop && scrollTop > 200) {
    // Scrolling down
    servicesNav.style.transform = "translateY(-100%)"
  } else {
    // Scrolling up
    servicesNav.style.transform = "translateY(0)"
  }

  lastScrollTop = scrollTop
})

// Add loading animation for service features
document.querySelectorAll(".service-features").forEach((list) => {
  const items = list.querySelectorAll("li")
  items.forEach((item, index) => {
    item.style.opacity = "0"
    item.style.transform = "translateX(-20px)"
    item.style.transition = `opacity 0.4s ease ${index * 0.1}s, transform 0.4s ease ${index * 0.1}s`
  })

  const listObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const items = entry.target.querySelectorAll("li")
          items.forEach((item) => {
            item.style.opacity = "1"
            item.style.transform = "translateX(0)"
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  listObserver.observe(list)
})
