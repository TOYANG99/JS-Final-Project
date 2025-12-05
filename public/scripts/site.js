// getting menu and event list spots
const menuList = document.querySelector('#menu-list')
const eventList = document.querySelector('#event-list')

// get menu from API
const getMenu = async () => {
    const response = await fetch('/api/v1/menu')
    return await response.json()
}

// get events from API
const getEvents = async () => {
    const response = await fetch('/api/v1/events')
    return await response.json()
}

// show menu on the page
const showMenuList = (menu) => {
    if (!menuList) return
    menuList.innerHTML = ''  // clear placeholders
    menu.forEach(item => {
        const card = document.createElement('article')
        card.className = 'card'

        card.innerHTML = 
        `
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <p class="price">$${Number(item.price).toFixed(2)}</p>
        `

        menuList.appendChild(card)
    })
}

// show events on the page
const showEventList = (events) => {
    if (!eventList) return
    eventList.innerHTML = ''  // clear placeholders
    events.forEach(event => {
        const card = document.createElement('article')
        card.className = 'card card-event'

        const id = event._id || event.id

        card.innerHTML = 
        `
            <h3>
                <a href="events.html?eventId=${id}">
                    ${event.name}
                </a>
            </h3>
            <p class="event-date">${event.date}</p>
            <p class="event-location">${event.location}</p>
        `

        eventList.appendChild(card)
    })
}

// load everything when the page starts
;(async () => {
    const menu = await getMenu()
    showMenuList(menu)
    const events = await getEvents()
    showEventList(events)
})()
S