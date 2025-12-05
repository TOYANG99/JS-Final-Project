// Grab elements on the page
const eventName = document.querySelector('#event-name')
const eventDate = document.querySelector('#event-date')
const eventTime = document.querySelector('#event-time')
const eventLocation = document.querySelector('#event-location')

// Get the eventId value from the query string
const getEventIdFromQuery = () => {
    const params = new URLSearchParams(window.location.search)
    return params.get('eventId')
}

// Call the API to get a single event
const getEvent = async id => {
    const response = await fetch(`/api/v1/events/${id}`)
    return await response.json()
}

// Show the event data on the page
const showEvent = event => {
    if (!eventName) return

    // If the API sends back an error object
    if (event.error) {
        eventName.textContent = 'Event not found.'
        eventDate.textContent = ''
        eventTime.textContent = ''
        eventLocation.textContent = ''
        return
    }

    eventName.textContent = event.name
    eventDate.textContent = `Date: ${event.date}`
    eventTime.textContent = `Time: ${event.time}`
    eventLocation.textContent = `Location: ${event.location}`
}

// Run when the page loads
;(async () => {
    const eventId = getEventIdFromQuery()

    // If there is no eventId in the URL
    if (!eventId) {
        if (eventName) {
            eventName.textContent = 'Event not found.'
        }
        return
    }

    try {
        const event = await getEvent(eventId)
        showEvent(event)
    } catch (error) {
        console.error('Error loading event:', error)
        if (eventName) {
            eventName.textContent = 'There was a problem loading this event.'
        }
    }
})()
