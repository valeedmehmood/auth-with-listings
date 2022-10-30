import App from 'App';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux/store';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'tests/__mocks__/axios';
import useFetch from 'tests/__mocks__/custom-hooks/useFetch';

const performLogin = () => {
    const email = screen.getByTestId("email") 
    const password = screen.getByTestId("password") 
    userEvent.type(email, 'eve.holt@reqres.in')
    userEvent.type(password, 'cityslicka')
    const btn = screen.getByTestId("form-btn")
    userEvent.click(btn)
    axios.post.mockResolvedValueOnce({data: {token: 123123123213}})
}

interface MockResp {
    name: {
        common: string,
        official: string
    },
    capital: string[],
    cca3: string,
    cca2: string
}

const mockResponse: MockResp[] = [{
    name: {
        common: "Test",
        official: "Official name"
    },
    capital: ['captial1'],
    cca3: "test cca3",
    cca2: "sla"
}]

global.alert = jest.fn();

describe("Login component testing",  () => {
    beforeEach(() => {
        render(
            <BrowserRouter>
                <Provider store={configureStore()}>
                    <App />
                </Provider>
            </BrowserRouter>
        );
        performLogin()
    })

    afterEach(cleanup)

    test('Initial loading state', async () => {
        useFetch.mockImplementation(() => ({
            isLoading: true,
            data: undefined,
            isError: false
        }))
        await waitFor(() => expect(screen.getByTestId("dashboard-loader")).toBeInTheDocument())
    });
    
    test("Show error component incase of API break",  async () => {
        useFetch.mockImplementation(() => ({
            isLoading: false,
            data: undefined,
            isError: true
        }))
        await waitFor(() => {
            expect(screen.getByTestId('error')).toBeInTheDocument()  
        })
    })
    test('After data fetching state', async () => {
        useFetch.mockImplementation(() => ({
            isLoading: false,
            data: mockResponse,
            isError: false   
        }))
        await waitFor(() => {
            expect(screen.getByTestId("listings")).toBeInTheDocument()
        })
    });
    test("Alert should appear on click of name", async () => {
        useFetch.mockImplementation(() => ({
            isLoading: false,
            data: mockResponse,
            isError: false   
        }))
        expect(await screen.findByTestId("listings")).toBeInTheDocument()  
        await waitFor(() => {
            userEvent.click(screen.getByTestId(mockResponse[0].cca2))
        })
        expect(global.alert).toHaveBeenCalledTimes(1)
    })
})
