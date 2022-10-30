export interface State{
    authenticated: boolean
}

export type Action = {type:"SETAUTHENTICATED"} | {type: "LOGOUT"}