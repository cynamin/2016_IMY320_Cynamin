import React, { createElement } from 'react'
import { connect } from 'react-redux'
import { routeNodeSelector } from 'redux-router5'
import Nav from './nav/nav.react'
import Home from './home/home.react'
import About from './about/about.react'
import Contact from './contact/contact.react'
import News from './news/news.react'
import Calendar from './calendar/calendar.react'
import Open from './open/open.react'
import styles from './app.css'

const components = {
	home: Home,
	about: About,
	contact: Contact,
	news: News,
	calendar: Calendar,
	open: Open
}

const app = ({ route }) => {
	const segment = route.name.split('.')[0]
	return(
		<div>
			<Nav/>
			{ createElement(components[segment]) }
		</div>
	)
}

export default connect(routeNodeSelector(''))(app)