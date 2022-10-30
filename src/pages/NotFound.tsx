import { useNavigate } from "react-router-dom"

const NotFound = () => {

    const navigate = useNavigate()

    return (
        <div className='d-flex flex-center h-100 gap-20' data-testid="notfound">
            <h1>Ooh..You came from the future</h1>
            <p>We haven’t yet created the page you are looking for. Please try our homepage, we sure you will find the details there</p>
            <button onClick={() => navigate("/login")}>Back</button>
        </div>
    )
}

export default NotFound