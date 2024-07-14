import './App.css'
import Header from "./Components/layout/Header"
import axios from "axios"
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import {useEffect, useState} from "react";
import User from "./model/User";
import Footer from "./Components/layout/Footer";
import Main from "./Components/layout/Main";
import {BrowserRouter} from "react-router-dom";
import {TranslationProvider} from "./Components/util/TranslationContext";
import {SessionProvider} from "./Components/util/SessionContext";
import {useTranslation} from "react-i18next";
import {DarkModeProvider} from "./context/DarkModeContext";

function App(){
	const [t] = useTranslation();
	const [user, setUser] = useState(new User())
	let _token = sessionStorage.getItem('token')

	useEffect( () => {
		if (_token) {
			axiosInstance.defaults.headers.common['Authorization'] = _token
			axiosInstance.get('/user/me')
				.then(res => {
					let newUser = new User()
					newUser.init(res.data)
					newUser.isLoggedIn = true
					setUser(newUser)
				})
				.catch(err => {
					toast.error(t(err.response?.data.message))
				})
		}
	}, [_token])

	useEffect(() => {
		if (user.role === 'ROLE_MANAGER' || user.role === 'ROLE_STUDENT') {
			axiosInstance.defaults.params['department'] = user.department
		}
	}, [user])

	return (
		<DarkModeProvider>
			<TranslationProvider>
				<ToastContainer
					position="top-center"
					autoClose={5000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss
					pauseOnHover
					theme="colored"
				/>
				<SessionProvider user={user}>
					<div className="p-0">
						<BrowserRouter>
							<div className="d-flex flex-column min-vh-100 p-0 m-0 position-relative">
								<Header user={user}/>
								<Main user={user} setUser={setUser}/>
								<Footer role={user?.role?? ''}/>
							</div>
						</BrowserRouter>
					</div>
				</SessionProvider>
			</TranslationProvider>
		</DarkModeProvider>
	)
}

export default App

// export const baseURL = "http://localhost:8080"
export const baseURL = "https://glucoseapi.quixotic.date"

export const axiosInstance = axios.create({
	baseURL: baseURL,
	headers: {
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	},
	params: {}
})
