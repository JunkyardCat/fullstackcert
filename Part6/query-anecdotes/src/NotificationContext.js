import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.payload
        case 'RESET':
            return null
        default:
            return state
    }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (prop) => {
    const [notification, notificationDispatch] = useReducer(notificationReducer, '')
    
    return(
        <NotificationContext.Provider value={[notification, notificationDispatch]}>
            {prop.children}
        </NotificationContext.Provider>
        
    )
}

export const useNotificationValue = () => {
    const notificationNDispatch = useContext(NotificationContext)
    return notificationNDispatch[0]
}

export const useNotificationDispatch = () => {
    const notificationNDispatch = useContext(NotificationContext)
    return notificationNDispatch[1]
}

export default NotificationContext
