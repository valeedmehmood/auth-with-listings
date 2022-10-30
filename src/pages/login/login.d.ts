export interface State{
    email: string,
    password: string
}

export interface ErrorState{
    email: boolean,
    password: boolean
}

export interface LoginApi{
    token?: string,
    error?: string
}