const eventsStore = [
    {
      title: "INFJ Personality Type - Coffee Shop Meet & Greet",
      description: "Being an INFJ",
      date: new Date(2024, 2, 23, 15),
      image:
        "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1037&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D%201037w ",
      type: "offline",
      attendees: 99,
      category: "Hobbies and Passions",
      distance: 50,
    },
    {
      title: "NYC AI Users - AI Tech Talks, Demo & Social: RAG Search and Customer Experience",
      description: "New York AI Users",
      date: new Date(2024, 2, 23, 11, 30),
      image:
        "https://images.unsplash.com/photo-1696258686454-60082b2c33e2?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D ",
      type: "offline",
      attendees: 43,
      category: "Technology",
      distance: 25,
    },
    {
      title: "Book 40+ Appointments Per Month Using AI and Automation",
      description: "New Jersey Business Network",
      date: new Date(2024, 2, 16, 14),
      image:
        "https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "online",
      category: "Technology",
      distance: 10,
    },
    {
      title: "Dump writing group weekly meetup",
      description: "Dump writing group",
      date: new Date(2024, 2, 13, 11),
      image:
        "https://plus.unsplash.com/premium_photo-1678453146992-b80d66df9152?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "online",
      attendees: 77,
      category: "Business",
      distance: 100,
    },
    {
      title: "Over 40s, 50s, & 60s Senior Singles Chat, Meet & Dating Community",
      description: "Over 40s, 50s, 60s Singles Chat, Meet & Dating Community",
      date: new Date(2024, 2, 14, 11),
      image:
        "https://plus.unsplash.com/premium_photo-1706005542509-a460d6efecb0?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "online",
      attendees: 140,
      category: "Social Activities",
      distance: 75,
    },
    {
      title: "All Nations - Manhattan Missions Church Bible Study",
      description: "Manhattan Bible Study Meetup Group",
      date: new Date(2024, 2, 14, 11),
      image:
        "https://plus.unsplash.com/premium_photo-1679488248784-65a638a3d3fc?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      type: "offline",
      category: "Health and Wellbeing",
      distance: 15,
    },
  ];
  

const selectType = document.getElementById('type-event')
const selectDist = document.getElementById('distance')
const selectCat = document.getElementById('categories')
const eventBlock = document.querySelector('.events-block')

const createEl = ({ tag, className, text, ...attrs }) => {
    const element = document.createElement(tag)
    element.className = className
    element.textContent = text
    Object.keys(attrs).forEach((attr) => {
      element.setAttribute(attr, attrs[attr])
    })
    return element
}

function formatDate(dateString) {
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', timeZone: 'UTC' }
    const date = new Date(dateString)
    const formattedDate = date.toLocaleString('en-US', options)
    return formattedDate
}


function getEvents() {
    const eventType = selectType.value
    let eventDistance;
    if (selectDist.value !== 'any-type') {
    eventDistance = parseInt(selectDist.value)
    }
    let eventCategory = ''
    if (selectCat.value !== 'any-category') {
        eventCategory = selectCat.value
    }
    
    document.querySelectorAll('.card2').forEach((element) => {
        element.remove()
    })

    eventsStore.forEach((e) => {
        if (
            (eventType === 'any' || e.type === eventType) &&
            (!eventDistance || e.distance <= eventDistance) &&
            (!eventCategory || e.category.includes(eventCategory))
        ) {
            const card = createEl({tag: 'div', className: 'card2'})
            const cardImg = createEl({tag: 'img', className: 'card2-image', src: e.image})
            const cardText = createEl({tag: 'div', className: 'card-text'})
            const cardDate = createEl({tag: 'span', className: 'date2', text: formatDate(e.date)})
            const cardTitle = createEl({tag: 'span', className: 'card2-title', text: e.title})
            const cardCat = createEl({tag: 'span', className: 'card-cat', text: e.category})
            const cardDistance = createEl({tag: 'span', className: 'card2-distance', text: ` (${e.distance} km)`})
            cardDistance.prepend(cardCat)
            cardText.append(cardDate, cardTitle, cardDistance)
            card.append(cardImg, cardText)
            if (e.attendees) {
                const attendees = createEl({tag: 'span', className: 'attendees', text: e.attendees + ' attendees'})
                cardText.append(attendees)
            }
            eventBlock.append(card)
        }
    })
}

selectType.addEventListener('change', getEvents)
selectDist.addEventListener('change', getEvents)
selectCat.addEventListener('change', getEvents)

getEvents();