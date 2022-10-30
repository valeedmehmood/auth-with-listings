const useFetch = jest.fn().mockImplementation(() => ({
    isLoading: true,
    data: undefined,
    isError: false
}))

export default useFetch