import { createStore } from 'redux'
import { State } from './auth/auth'
import { authReducer } from './auth/reducer'

const loadFromLocalStorage = () => {
    const token = localStorage.getItem("token");
    if(token){
        return {authenticated: true}
    }
}

export default function configureStore() {
    const persistState = loadFromLocalStorage();
    const store = createStore(authReducer, persistState as State)
    return store
}