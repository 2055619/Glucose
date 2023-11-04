import {useEffect, useState} from "react"
import Cv from "../student/Cv"
import {useNavigate} from "react-router-dom"
import JobOfferList from "../student/JobOfferList";
import {axiosInstance} from "../../App";
import JobOffer from "../../model/JobOffer";
import {toast} from "react-toastify";
import MyApplications from "../student/MyApplications";
import {useTranslation} from "react-i18next";
import {useSession} from "../util/SessionContext";
import ContractList from "../user/ContractList";
import Contract from "../../model/Contract";
import Dashboard from "../user/Dashboard";
import CircleNotification from "../user/CircleNotification";
import NotificationBadge from '../notification/NotificationBadge';

const StudentPage = ({user, setUser}) => {
  const {selectedSessionIndex} = useSession();
  const {t} = useTranslation();
  const [tab, setTab] = useState('dashboard');
  const [jobOffers, setJobOffers] = useState([new JobOffer()]);
  const tabs = [
	  { id: 'dashboard', label: 'dashboard' },
	  { id: 'stages', label: 'jobOffers' },
	  { id: 'my_applications', label: 'myApplications' },
	  { id: 'cv', label: 'CV' },
	  { id: 'contract', label: 'contracts' }
  ];
  const navigate = useNavigate();
  const [contracts, setContracts] = useState([new Contract()]);
	const [notifications, setNotifications] = useState({
		home: { green: 1, yellow: 1, red: 1 },
		stages: { green: 0, yellow: 0, red: 0 },
		my_applications: { green: 0, yellow: 0, red: 0 },
		cv: { green: 0, yellow: 0, red: 0 },
		contract: { green: 0, yellow: 0, red: 0 },
	});

	async function fetchStudentJobOffers() {
		if (!user?.id) return;
		await axiosInstance.get(`/student/jobOffers/open/${user.department}`)
			.then((response) => {
				setJobOffers(response.data)
			}).catch((error) => {
				if (error.response?.status === 401) return;

				toast.error(t('fetchError') + t(error.response?.data.message))
			});
	}

	async function getContracts() {
		if (!user?.id) return;
		await axiosInstance.get(`student/contracts/${user.id}`)
			.then((response) => {
				setContracts(response.data);
			})
			.catch((error) => {
				toast.error(t(error.response?.data?.message))
			});
	}

	useEffect(() => {
		if (!user?.isLoggedIn) navigate('/');
		fetchStudentJobOffers();
	}, [user]);

	useEffect(() => {
		handleSessionChange();
	}, [selectedSessionIndex]);

	const handleSessionChange = () => {
	  setJobOffers([]);
	  fetchStudentJobOffers();
	}

	const setCv = (cv) => {
		user.cvFile = cv
		setUser(user)
	}

	const updateNotifications = (tabId, { green, yellow, red }) => {
		setNotifications(prevNotifications => ({
			...prevNotifications,
			[tabId]: { green, yellow, red }
		}));
	};

	return (
		<div className="container-fluid px-lg-5 px-2 py-2">
			<div>
				<div className="tabs btn-group my-2 mx-auto col-12">
					{tabs.map(tabItem => (
						<button
							key={tabItem.id}
							className={`col-md-3 btn btn-outline-ose ${tab === tabItem.id ? 'active' : ''}`}
							onClick={() => {
								setTab(tabItem.id)
								if (tabItem.id === 'contract') getContracts();
							}}
							style={{ position: 'relative' }}
						>
							{t(tabItem.label)}
							<NotificationBadge count={notifications[tabItem.id].red} color="red" index={0} />
							<NotificationBadge count={notifications[tabItem.id].yellow} color="yellow" index={1} />
							<NotificationBadge count={notifications[tabItem.id].green} color="green" index={2} />
							<CircleNotification tab={tabItem.id} user={user}/>
						</button>
					))}
				</div>
				{tab === 'dashboard' && <Dashboard />}
				{tab === 'stages' && <JobOfferList user={user} jobOffers={jobOffers} setJobOffers={setJobOffers}/>}
				{tab === 'my_applications' && <MyApplications user={user}/>}
				{tab === 'cv' && <Cv user={user} setCv={setCv}/>}
				{tab === 'contract' && <ContractList contracts={contracts} user={user} />}
			</div>
		</div>
	)
}

export default StudentPage