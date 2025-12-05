// Menu form elements
const menuForm = document.querySelector('#menu-form')
const menuName = document.querySelector('#menu-name')
const menuDescription = document.querySelector('#menu-description')
const menuPrice = document.querySelector('#menu-price')
const menuImage = document.querySelector('#menu-image')

// Event form elements
const eventForm = document.querySelector('#event-form')
const eventNameInput = document.querySelector('#event-name')
const eventLocationInput = document.querySelector('#event-location')
const eventDateInput = document.querySelector('#event-date')
const eventTimeInput = document.querySelector('#event-time')

// Send menu item to API
const addMenuItem = async item => {
    const response = await fetch('/api/v1/menu', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    return await response.json()
}

// Send event to API
const addEvent = async item => {
    const response = await fetch('/api/v1/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item)
    })
    return await response.json()
}

// Handle menu form submit
if (menuForm) {
    menuForm.addEventListener('submit', async e => {
        e.preventDefault()

        const newItem = {
            name: menuName.value,
            description: menuDescription.value,
            price: Number(menuPrice.value),
            imageUrl: menuImage.value
        }

        try {
            await addMenuItem(newItem)
            alert('Menu item added.')

            menuName.value = ''
            menuDescription.value = ''
            menuPrice.value = ''
            menuImage.value = ''
        } catch (err) {
            alert('There was a problem adding the menu item.')
        }
    })
}

// Handle event form submit
if (eventForm) {
    eventForm.addEventListener('submit', async e => {
        e.preventDefault()

        const newEvent = {
            name: eventNameInput.value,
            location: eventLocationInput.value,
            date: eventDateInput.value,
            time: eventTimeInput.value
        }

        try {
            await addEvent(newEvent)
            alert('Event added.')

            eventNameInput.value = ''
            eventLocationInput.value = ''
            eventDateInput.value = ''
            eventTimeInput.value = ''
        } catch (err) {
            alert('There was a problem adding the event.')
        }
    })
}
