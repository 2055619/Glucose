import {useEffect, useState} from "react"
import Cv from "../student/Cv"
import {useNavigate} from "react-router-dom"
import JobOfferList from "../jobOffer/JobOfferList";
import {axiosInstance} from "../../App";
import JobOffer from "../../model/JobOffer";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";
import MyApplications from "../student/MyApplications";
import {useTranslation} from "react-i18next";

const StudentPage = ({user, setUser}) => {
  const {t} = useTranslation();
  const [tab, setTab] = useState('home');
  const [jobOffers, setJobOffers] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
	  if(!user?.isLoggedIn){
		  navigate('/');
	  }

	  async function fetchStudentJobOffers() {
		  await axiosInstance.get(`/student/jobOffers/open/${user.department}`)
			  .then((response) => {
				  response.data.forEach((jobOffer) => {
					  const newJobOffer = new JobOffer();
					  newJobOffer.init(jobOffer)
					  setJobOffers(jobOffers => [...jobOffers, newJobOffer]);
				  });
			  }).catch((error) => {
				  toast.error(t('fetchError') + error);
				  console.log(t('fetchError') + error);
			  });
	  }

	  fetchStudentJobOffers();
  }, [user, navigate]);

	const setCv = (cv) => {
		user.cvFile = cv
		setUser(user)
	}

	const applyForJobOffer = (jobOffer) => {
		axiosInstance.post(`/student/jobOffers/apply/${user.id}/${jobOffer.id}`)
			.then((response) => {
				toast.success(t('appliedJobOffer'))
			}).catch((error) => {
				toast.error(t('pushingError') + error.response.data.message)
			})
	}

	return (
		<div className="container-fluid px-lg-5 px-2 py-2">
			<div>
				<div className="tabs btn-group my-2 mx-auto col-12">
					<button
						className={`btn btn-outline-ose ${tab === 'home' ? 'active' : ''}`}
						onClick={() => setTab('home')}
					>
						{t('home')}
					</button>
					<button
						className={`btn btn-outline-ose ${tab === 'stages' ? 'active' : ''}`}
						onClick={() => setTab('stages')}
					>
						{t('jobOffers')}
					</button>
					<button
						className={`btn btn-outline-ose ${tab === 'cv' ? 'active' : ''}`}
						onClick={() => setTab('cv')}
					>
						{t('CV')}
					</button>
					<button
						className={`btn btn-outline-ose ${tab === 'my_applications' ? 'active' : ''}`}
						onClick={() => setTab('my_applications')}
					>
						{t('myApplications')}
					</button>
				</div>
				{tab === 'home' && <h3>{t('home')}</h3>}
				{tab === 'stages' && <JobOfferList user={user} jobOffers={jobOffers} setJobOffers={setJobOffers} applyForJobOffer={applyForJobOffer}/>}
				{tab === 'cv' && <Cv user={user} setCv={setCv}/>}
				{tab === 'my_applications' && <MyApplications user={user}/>}
			</div>
		</div>
	)
}

export default StudentPage