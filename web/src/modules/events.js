import createAction from '../utils/createAction'

export const FETCH_EVENTS = 'FETCH_EVENTS'
export const FETCH_EVENTS_SUCCESS = 'FETCH_EVENTS_SUCCESS'
export const FETCH_EVENTS_FAIL = 'FETCH_EVENTS_FAIL'

export const fetchEvents = createAction(FETCH_EVENTS)
export const fetchEventsSuccess = createAction(FETCH_EVENTS_SUCCESS, true)
export const fetchEventsFail = createAction(FETCH_EVENTS_FAIL, true)

function create(){
	const initialState = []

	return (state = initialState, action) => {
		const { payload } = action
		switch(action.type){
			case FETCH_EVENTS_SUCCESS:
				return state = payload
			default:
				return state
		}
	}
}

export default create()