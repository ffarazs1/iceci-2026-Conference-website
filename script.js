
// DOM Ready
document.addEventListener('DOMContentLoaded', () => {
  initSlider()
  initCountdown()
  initBackToTop()
  initSearch()
})

// ======================
// SLIDER WITH THUMBNAILS
// ======================
function initSlider() {
  const slides = document.querySelectorAll('.slide')
  const thumbnailsContainer = document.querySelector('.slider-thumbnails')
  let currentSlide = 0
  const slideInterval = 5000
  let sliderTimer

  // Generate thumbnails dynamically
  thumbnailsContainer.innerHTML = ''
  slides.forEach((slide, index) => {
    const imgSrc = slide.querySelector('img').src
    const thumb = document.createElement('img')
    thumb.src = imgSrc
    if (index === 0) thumb.classList.add('active')
    thumbnailsContainer.appendChild(thumb)
  })

  const thumbnails = document.querySelectorAll('.slider-thumbnails img')

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index)
      thumbnails[i].classList.toggle('active', i === index)
    })
    currentSlide = index
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length
    showSlide(currentSlide)
  }

  // Autoplay
  sliderTimer = setInterval(nextSlide, slideInterval)

  // Thumbnail click events
  thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
      showSlide(index)
      clearInterval(sliderTimer)
      sliderTimer = setInterval(nextSlide, slideInterval)
    })
  })

  // Initialize first slide
  showSlide(0)
}

// ======================
// COUNTDOWN TIMER
// ======================
function initCountdown() {
  const targetDate = new Date('April 4, 2026 00:00:00').getTime()

  const daysEl = document.getElementById('days')
  const hoursEl = document.getElementById('hours')
  const minutesEl = document.getElementById('minutes')
  const secondsEl = document.getElementById('seconds')

  const daysCircle = document.getElementById('days-circle')
  const hoursCircle = document.getElementById('hours-circle')
  const minutesCircle = document.getElementById('minutes-circle')
  const secondsCircle = document.getElementById('seconds-circle')

  const totalDays = Math.ceil(
    (targetDate - new Date().getTime()) / (1000 * 60 * 60 * 24),
  )

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance <= 0) {
      daysEl.textContent = '0'
      hoursEl.textContent = '0'
      minutesEl.textContent = '0'
      secondsEl.textContent = '0'
      return
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    daysEl.textContent = days
    hoursEl.textContent = hours
    minutesEl.textContent = minutes
    secondsEl.textContent = seconds

    // Progress ring colors & fill (0-360 degrees)
    const daysDeg = (1 - days / totalDays) * 360
    const hoursDeg = (hours / 24) * 360
    const minutesDeg = (minutes / 60) * 360
    const secondsDeg = (seconds / 60) * 360

    daysCircle.style.background = `conic-gradient(#FFD700 ${daysDeg}deg, #e6e6e6 0deg)`
    hoursCircle.style.background = `conic-gradient(#00629B ${hoursDeg}deg, #e6e6e6 0deg)`
    minutesCircle.style.background = `conic-gradient(#4CAF50 ${minutesDeg}deg, #e6e6e6 0deg)`
    secondsCircle.style.background = `conic-gradient(#00BCD4 ${secondsDeg}deg, #e6e6e6 0deg)`
  }

  updateCountdown()
  setInterval(updateCountdown, 1000)
}

// ======================
// BACK TO TOP BUTTON
// ======================
function initBackToTop() {
  const backToTop = document.querySelector('.back-to-top')
  if (backToTop) {
    backToTop.addEventListener('click', function (e) {
      e.preventDefault()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    })
  }
}

// ======================
// SMOOTH SCROLL FOR ANCHORS
// ======================
document.addEventListener('click', function (e) {
  if (e.target.matches('a[href^="#"]')) {
    e.preventDefault()
    const targetId = e.target.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }
})
function initSearch() {
  const searchBtn = document.querySelector('.search-btn')
  const searchInput = document.querySelector('.search-input')

  searchBtn?.addEventListener('click', () => {
    if (searchInput.style.display === 'block') {
      // If already visible, treat as "submit"
      alert(`Searching for: ${searchInput.value}`) // Replace with actual search logic
    } else {
      searchInput.style.display = 'block'
      searchInput.focus()
    }
  })
}
