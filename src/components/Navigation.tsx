import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { LOGOUT } from "redux/auth/types"

const Navigation = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
        dispatch({type:LOGOUT})
        navigate("/login")
    }

    return (
        <header data-testid="dashboard-navbar">
            <div className="d-flex container">
                <div className="logo">Learning Test Cases</div>
                <div className="navbar">
                    <ul>
                        <li><Link to="/">Country listing</Link></li>
                        <li><button onClick={logout}>Logout</button></li>
                    </ul>
                </div>
            </div>
        </header>
    )
}

export default Navigation