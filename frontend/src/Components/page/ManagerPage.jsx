import JobOffers from "../manager/JobOffers";
import {useEffect, useState} from "react";
import Cvs from "../manager/Cvs";
import {axiosInstance} from "../../App";
import {useTranslation} from "react-i18next";
import {toast} from "react-toastify";

const ManagerPage = ({user}) => {
    const {t} = useTranslation();
    const [tab, setTab] = useState('stages');
    const [cvs, setCvs] = useState([{id: 1, fileName: "test"}]);
    const [offers, setOffers] = useState([{id: 1, title: "test", description: "test", date: "test", duration: "test", salary: "test", manager: "test", status: "test"}]);

    useEffect(() => {
        const getAllOffers = async () => {
            await axiosInstance.get('manager/jobOffers/all',
                // {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
            ).then((response) => {
                setOffers(response.data);
                return response.data;
            }).catch((error) => {
                toast.error(t('fetchError') + t(error));
            });
        }
        const getAllCvs = async () => {
            await axiosInstance.get('manager/cvs/all',
                // {headers: {Authorization: 'Bearer ' + localStorage.getItem('token')}}
            ).then((response) => {
                setCvs(response.data);
                return response.data;
            }).catch((error) => {
                toast.error(t('fetchError') + t(error));
            });
        }

        getAllCvs().then(r => r);
        getAllOffers().then(r => r);
    }, []);

    const updateJobOfferList = () => {
        setOffers(offers);
    }

    const updateCvList = () => {
        setCvs(cvs);
    }

    return (
        <div className="container">
            <div>
                <div className="tabs btn-group my-2 mx-auto col-12">
                    <button className={`col-6 btn btn-outline-ose ${tab === 'stages' ? 'active' : ''}`}
                            onClick={() => setTab('stages')}>{t('internship')}</button>
                    <button className={`col-6 btn btn-outline-ose ${tab === 'cvs' ? 'active' : ''}`}
                            onClick={() => setTab('cvs')}>CVs</button>
                </div>
                {tab === 'stages' && <JobOffers offers={offers} updateJobOfferList={updateJobOfferList}/>}
                {tab === 'cvs' && <Cvs cvs={cvs} updateCvList={updateCvList} />}
            </div>
        </div>
    )
}

export default ManagerPage
