export const listformat = () : Intl.ListFormat => new Intl.ListFormat('en', { style: 'long', type: 'conjunction' })

export const validateEmail = (email: string) => {
    const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;
    return email.match(emailRegex)?.[0] ? true : false;
}

export const validate = (email: string, password: string) => {
    return !!(validateEmail(email) && password) ? true : false 
}