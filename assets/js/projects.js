// Projects page functionality

// Filter functionality
const filterButtons = document.querySelectorAll(".filter-btn")
const projectItems = document.querySelectorAll(".project-item, .project-card")

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.getAttribute("data-filter")

    // Update active filter button
    filterButtons.forEach((btn) => btn.classList.remove("active"))
    button.classList.add("active")

    // Filter projects
    projectItems.forEach((item) => {
      const category = item.getAttribute("data-category")

      if (filter === "all" || category === filter) {
        item.classList.remove("hidden")
      } else {
        item.classList.add("hidden")
      }
    })

    // Animate filtered items
    setTimeout(() => {
      const visibleItems = document.querySelectorAll(".project-item:not(.hidden), .project-card:not(.hidden)")
      visibleItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`
        item.style.animation = "none"
        setTimeout(() => {
          item.style.animation = "fadeInUp 0.6s ease-out"
        }, 10)
      })
    }, 100)
  })
})

// Animate stats on scroll
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const statNumbers = entry.target.querySelectorAll(".stat-number")
        statNumbers.forEach((stat) => {
          const target = stat.textContent.replace(/[^\d]/g, "")
          animateCounter(stat, Number.parseInt(target))
        })
        statsObserver.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.5 },
)

const statsSection = document.querySelector(".project-stats")
if (statsSection) {
  statsObserver.observe(statsSection)
}

function animateCounter(element, target) {
  let current = 0
  const increment = target / 100
  const suffix = element.textContent.replace(/[\d,]/g, "")

  const timer = setInterval(() => {
    current += increment
    if (current >= target) {
      current = target
      clearInterval(timer)
    }

    if (target >= 1000) {
      element.textContent = Math.floor(current).toLocaleString() + suffix
    } else {
      element.textContent = Math.floor(current) + suffix
    }
  }, 20)
}

// Project item hover effects
document.querySelectorAll(".project-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-8px) scale(1.02)"
  })

  item.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Testimonial cards animation
const testimonialObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  },
  { threshold: 0.2 },
)

document.querySelectorAll(".testimonial-card").forEach((card, index) => {
  card.style.opacity = "0"
  card.style.transform = "translateY(30px)"
  card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`
  testimonialObserver.observe(card)
})

// Project cards parallax effect
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card, index) => {
    const rate = scrolled * -0.1 * (index % 2 === 0 ? 1 : -1)
    card.style.transform = `translateY(${rate}px)`
  })
})

// Lazy loading for project images
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        if (img.dataset.src) {
          img.src = img.dataset.src
          img.classList.remove("lazy")
          imageObserver.unobserve(img)
        }
      }
    })
  })

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img)
  })
}

// Project modal functionality (for future enhancement)
function openProjectModal(projectId) {
  // Implementation for project detail modal
  console.log("Opening project modal for:", projectId)
}

// Search functionality for projects
function searchProjects(query) {
  const searchTerm = query.toLowerCase()
  const allProjects = document.querySelectorAll(".project-item, .project-card")

  allProjects.forEach((project) => {
    const title = project.querySelector("h3, h4").textContent.toLowerCase()
    const description = project.querySelector("p").textContent.toLowerCase()

    if (title.includes(searchTerm) || description.includes(searchTerm)) {
      project.style.display = "block"
      project.classList.remove("hidden")
    } else {
      project.style.display = "none"
      project.classList.add("hidden")
    }
  })
}

// Smooth scrolling for project navigation
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      const navHeight = document.querySelector(".project-filters").offsetHeight + 70
      const targetPosition = target.offsetTop - navHeight

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      })
    }
  })
})

// Add loading states for project interactions
document.querySelectorAll(".project-item, .project-card").forEach((item) => {
  item.addEventListener("click", function () {
    // Add loading state or navigation logic here
    this.style.opacity = "0.7"
    setTimeout(() => {
      this.style.opacity = "1"
    }, 300)
  })
})
