import { Action, State } from "./auth";
import { LOGOUT, SETAUTHENTICATED } from "./types";

const initialState: State = {
    authenticated: false
}

export const authReducer = (state = initialState, action: Action) => {
    switch (action.type) {
        case SETAUTHENTICATED:
            return {authenticated: true}
            break;
        case LOGOUT:
            localStorage.clear()
            return {authenticated: false}
            break;
        default:
            return state;
            break;
    }
}