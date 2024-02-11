// Function to toggle menu open/close
function Menu(btn) {
  let list = document.querySelector('.ul')
  let isMenu = btn.getAttribute('name') === 'menu'
  btn.setAttribute('name', isMenu ? 'close' : 'menu')
  list.classList.toggle('menu-open', isMenu)
  btn.querySelector('.fa-bars').style.display = isMenu ? 'none' : 'inline-block'
  btn.querySelector('.fa-xmark').style.display = isMenu
    ? 'inline-block'
    : 'none'
}

// Selecting dropdown buttons and dropdown menus
const dropdownBtn = document.querySelectorAll('.dropdown-btn')
const dropdown = document.querySelectorAll('.dropdown')
const links = document.querySelectorAll('.dropdown a')

// Function to set aria-expanded attribute to false
function setAriaExpandedFalse() {
  dropdownBtn.forEach(btn => btn.setAttribute('aria-expanded', 'false'))
}

// Function to close dropdown menus
function closeDropdownMenu() {
  dropdown.forEach(drop => {
    drop.classList.remove('active')
    drop.addEventListener('click', e => e.stopPropagation())
  })
}

// Adding event listeners to dropdown buttons
dropdownBtn.forEach(btn => {
  btn.addEventListener('click', function (e) {
    const dropdownIndex = e.currentTarget.dataset.dropdown
    const dropdownElement = document.getElementById(dropdownIndex)

    dropdownElement.classList.toggle('active') // Toggle active class on dropdown
    dropdown.forEach(drop => {
      if (drop.id !== btn.dataset['dropdown']) {
        drop.classList.remove('active') // Remove active class from other dropdowns
      }
    })
    e.stopPropagation()
    btn.setAttribute(
      'aria-expanded',
      btn.getAttribute('aria-expanded') === 'false' ? 'true' : 'false'
    )
  })
})

// close dropdown menu when the dropdown links are clicked
links.forEach(link =>
  link.addEventListener('click', () => {
    closeDropdownMenu()
    setAriaExpandedFalse()
  })
)

// close dropdown menu when you click on the document body
document.documentElement.addEventListener('click', () => {
  closeDropdownMenu()
  setAriaExpandedFalse()
})

// close dropdown when the escape key is pressed
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeDropdownMenu()
    setAriaExpandedFalse()
  }
})
