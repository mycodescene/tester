// Contact page functionality

// Form handling
const contactForm = document.getElementById("contactForm")
const submitBtn = contactForm.querySelector(".submit-btn")
const modal = document.getElementById("successModal")

// Form validation
function validateForm() {
  let isValid = true
  const requiredFields = contactForm.querySelectorAll("[required]")

  requiredFields.forEach((field) => {
    const formGroup = field.closest(".form-group")
    const errorMessage = formGroup.querySelector(".error-message")

    // Remove existing error state
    formGroup.classList.remove("error")
    if (errorMessage) {
      errorMessage.remove()
    }

    // Check if field is empty
    if (!field.value.trim()) {
      showFieldError(formGroup, "This field is required")
      isValid = false
      return
    }

    // Email validation
    if (field.type === "email" && !validateEmail(field.value)) {
      showFieldError(formGroup, "Please enter a valid email address")
      isValid = false
      return
    }

    // Phone validation (if provided)
    if (field.type === "tel" && field.value && !validatePhone(field.value)) {
      showFieldError(formGroup, "Please enter a valid phone number")
      isValid = false
      return
    }
  })

  return isValid
}

function showFieldError(formGroup, message) {
  formGroup.classList.add("error")
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message
  formGroup.appendChild(errorDiv)
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

function validatePhone(phone) {
  const re = /^[+]?[1-9][\d]{0,15}$/
  return re.test(phone.replace(/[\s\-$$$$]/g, ""))
}

// Form submission
contactForm.addEventListener("submit", async (e) => {
  e.preventDefault()

  if (!validateForm()) {
    return
  }

  // Show loading state
  submitBtn.classList.add("loading")
  submitBtn.disabled = true

  // Simulate form submission (replace with actual API call)
  try {
    await simulateFormSubmission()
    showSuccessModal()
    contactForm.reset()
  } catch (error) {
    showErrorMessage("Failed to send message. Please try again.")
  } finally {
    submitBtn.classList.remove("loading")
    submitBtn.disabled = false
  }
})

async function simulateFormSubmission() {
  // Simulate API call delay
  return new Promise((resolve) => {
    setTimeout(resolve, 2000)
  })
}

function showSuccessModal() {
  modal.style.display = "block"
  document.body.style.overflow = "hidden"
}

function closeModal() {
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

function showErrorMessage(message) {
  // Create and show error notification
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-notification"
  errorDiv.textContent = message
  errorDiv.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: #e74c3c;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    z-index: 1001;
    animation: slideInRight 0.3s ease;
  `

  document.body.appendChild(errorDiv)

  setTimeout(() => {
    errorDiv.remove()
  }, 5000)
}

// Modal event listeners
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal()
  }
})

document.querySelector(".close").addEventListener("click", closeModal)

// FAQ functionality
const faqItems = document.querySelectorAll(".faq-item")

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question")

  question.addEventListener("click", () => {
    const isActive = item.classList.contains("active")

    // Close all FAQ items
    faqItems.forEach((faq) => {
      faq.classList.remove("active")
    })

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add("active")
    }
  })
})

// Form field animations
const formInputs = document.querySelectorAll("input, select, textarea")

formInputs.forEach((input) => {
  input.addEventListener("focus", function () {
    this.parentElement.classList.add("focused")
  })

  input.addEventListener("blur", function () {
    if (!this.value) {
      this.parentElement.classList.remove("focused")
    }
  })

  // Check if field has value on page load
  if (input.value) {
    input.parentElement.classList.add("focused")
  }
})

// Auto-resize textarea
const messageTextarea = document.getElementById("message")
if (messageTextarea) {
  messageTextarea.addEventListener("input", function () {
    this.style.height = "auto"
    this.style.height = this.scrollHeight + "px"
  })
}

// Country selection enhancement
const countrySelect = document.getElementById("country")
if (countrySelect) {
  // Add flag icons or enhanced styling here if needed
  countrySelect.addEventListener("change", function () {
    if (this.value) {
      this.style.color = "var(--text-primary)"
    }
  })
}

// Service selection enhancement
const serviceSelect = document.getElementById("service")
if (serviceSelect) {
  serviceSelect.addEventListener("change", function () {
    const messageField = document.getElementById("message")
    const selectedService = this.options[this.selectedIndex].text

    if (this.value && this.value !== "other") {
      const currentMessage = messageField.value
      if (!currentMessage.includes(selectedService)) {
        const serviceText = `I am interested in ${selectedService}. `
        messageField.value = serviceText + currentMessage
      }
    }
  })
}

// Real-time form validation
formInputs.forEach((input) => {
  input.addEventListener("blur", function () {
    const formGroup = this.closest(".form-group")
    const existingError = formGroup.querySelector(".error-message")

    if (existingError) {
      existingError.remove()
      formGroup.classList.remove("error")
    }

    if (this.hasAttribute("required") && !this.value.trim()) {
      showFieldError(formGroup, "This field is required")
    } else if (this.type === "email" && this.value && !validateEmail(this.value)) {
      showFieldError(formGroup, "Please enter a valid email address")
    } else if (this.type === "tel" && this.value && !validatePhone(this.value)) {
      showFieldError(formGroup, "Please enter a valid phone number")
    }
  })
})

// Character counter for message field
const messageField = document.getElementById("message")
if (messageField) {
  const maxLength = 1000
  const counter = document.createElement("div")
  counter.className = "char-counter"
  counter.style.cssText = `
    text-align: right;
    font-size: 0.85rem;
    color: var(--text-secondary);
    margin-top: 0.5rem;
  `

  messageField.parentElement.appendChild(counter)

  function updateCounter() {
    const remaining = maxLength - messageField.value.length
    counter.textContent = `${remaining} characters remaining`

    if (remaining < 50) {
      counter.style.color = "#e74c3c"
    } else {
      counter.style.color = "var(--text-secondary)"
    }
  }

  messageField.addEventListener("input", updateCounter)
  messageField.setAttribute("maxlength", maxLength)
  updateCounter()
}

// Keyboard navigation for modal
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal()
  }
})

// Form auto-save to localStorage (optional)
function saveFormData() {
  const formData = new FormData(contactForm)
  const data = {}

  for (const [key, value] of formData.entries()) {
    if (key !== "privacy" && key !== "newsletter") {
      data[key] = value
    }
  }

  localStorage.setItem("contactFormData", JSON.stringify(data))
}

function loadFormData() {
  const savedData = localStorage.getItem("contactFormData")
  if (savedData) {
    const data = JSON.parse(savedData)
    Object.keys(data).forEach((key) => {
      const field = contactForm.querySelector(`[name="${key}"]`)
      if (field && data[key]) {
        field.value = data[key]
      }
    })
  }
}

// Load saved form data on page load
document.addEventListener("DOMContentLoaded", loadFormData)

// Save form data on input
formInputs.forEach((input) => {
  input.addEventListener("input", saveFormData)
})

// Clear saved data on successful submission
function clearSavedFormData() {
  localStorage.removeItem("contactFormData")
}

// Add to success modal function
const originalShowSuccessModal = showSuccessModal
showSuccessModal = () => {
  clearSavedFormData()
  originalShowSuccessModal()
}
