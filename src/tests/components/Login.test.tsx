import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom'
import { Provider } from 'react-redux';
import configureStore from 'redux/store';
import userEvent from '@testing-library/user-event';
import App from 'App';
import axios from 'tests/__mocks__/axios';
import useFetch from 'tests/__mocks__/custom-hooks/useFetch';

describe("Login component testing",  () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={configureStore()}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
    })
    afterEach(cleanup)
    test('In login screen', () => {
        const text = screen.getByTestId("login-heading")
        expect(text).toBeInTheDocument()
    });
    test('Form can not be submit incase of empty fields', () => {
        const btn = screen.getByTestId("form-btn")
        userEvent.click(btn)
        const emailError = screen.getByTestId("error-email")
        const passError = screen.getByTestId("error-password")
        expect(emailError).toBeInTheDocument()
        expect(passError).toBeInTheDocument()
    })
    test('Toaster error incase of invalid credentials', async () => {
        axios.post.mockRejectedValueOnce({data: {error: "user not found"}})
        const email = screen.getByTestId("email") 
        const password = screen.getByTestId("password") 
        userEvent.type(email, 'johndoe@test.com')
        userEvent.type(password, 'johndoe')
        const btn = screen.getByTestId("form-btn")
        userEvent.click(btn)
        await waitFor(() => {
            expect(screen.getByRole("alert")).toBeInTheDocument()
        })
    })
    test('Redirect to dashboard incase of valid credentials', async () => {
        const email = screen.getByTestId("email") 
        const password = screen.getByTestId("password") 
        userEvent.type(email, 'eve.holt@reqres.in')
        userEvent.type(password, 'cityslicka')
        const btn = screen.getByTestId("form-btn")
        userEvent.click(btn)
        axios.post.mockResolvedValueOnce({data: {token: 123123123213}})
        useFetch.mockImplementation(() => ({
            isLoading: true,
            data: undefined, 
            error: null
        }))
        await waitFor(() => expect(screen.getByTestId("dashboard-navbar")).toBeInTheDocument())
    })
})
