import { ChangeEvent, FormEvent, useRef, useState } from "react"
import { validate, validateEmail } from "utils"
import { ErrorState, LoginApi, State } from "./login"
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { SETAUTHENTICATED } from "redux/auth/types";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const token = localStorage.getItem("token");

  const checkRef = useRef<HTMLInputElement>(null)

  const [loading, setLoading] = useState(false)

  const [data, setData] = useState<State>({
    email: "",
    password: ""
  })

  const [error, setError] = useState<ErrorState>({
    email: false,
    password: false
  })

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value, name} = e.target
    setData({...data, [name]: value})
    setError({
      ...error,
      ...(name === "email" && {email: !validateEmail(value)}),
      ...(name === "password" && {password: !value})
    })
  }

  const processAuth = async () => {
    if(loading) return
    setLoading(true)
    try {
      const response = await axios.post<LoginApi>("https://reqres.in/api/login", data)
      const rememberMe = checkRef.current?.checked;
      dispatch({type: SETAUTHENTICATED})
      if(rememberMe){
        localStorage.setItem("token", response.data.token!)
      }
      navigate("/") 
    } catch (error: any) {
      console.log("asd", error.message)
      toast.error("Something went wrong")
    }finally{
      setLoading(false)
      setData({
        ...data,
        password: ""
      })
    }
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(!validate(data.email, data.password)){
      setError({
        email: !validateEmail(data.email),
        password: !data.password
      })
      return;
    }
    processAuth()
  }

  if(token){
    return <Navigate to="/" />
  }

  return (
    <>
      <ToastContainer data-testid="toaster" />
      <div className="d-flex h-100 flex-center">
        <div className='form'>
          <h1 className='mb-20' data-testid="login-heading">Login here</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email</label>
              <input 
                type="text" 
                onChange={handleChange} 
                value={data.email} 
                name="email" 
                id="email" 
                placeholder='Enter email' 
                data-testid="email"
              />
              {error.email && <p className='error' data-testid="error-email">Valid email is required</p>}
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                onChange={handleChange} 
                value={data.password} 
                name="password" 
                id="password" 
                placeholder='Enter password' 
                data-testid="password"
              />
              {error.password && <p className='error' data-testid="error-password">Password can not be empty</p>}
            </div>
            <div className="form-group remember-box">
              <input 
                type="checkbox" 
                name="remember" 
                id="remember" 
                data-testid="remember"
                ref={checkRef}
              />
              <label htmlFor="remember">Remember me</label>
            </div>
            <button type='submit' data-testid="form-btn">
              {loading ? <span className="loader xs"></span> : "Submit"}
            </button>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login