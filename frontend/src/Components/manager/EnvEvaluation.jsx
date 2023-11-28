import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDarkMode } from "../../context/DarkModeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import Loading from "../util/Loading";

function EnvEvaluation({ user }) {
    const [t] = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { darkMode } = useDarkMode();
    const location = useLocation();
    const { application } = location.state || {};

    const handleBack = () => {
        navigate(-1);
    };

    return (
        <div className="container">
            <button className="btn btn-outline-ose" onClick={handleBack}>
                <FontAwesomeIcon icon={faArrowLeft} className="fa-2 me-2" />
                {t('back')}
            </button>
            <h1 className="text-center fw-light">{t('envEvaluation')}</h1>
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-4">
                    <div className="card">
                        <div className={`card-body ${darkMode ? 'bg-light-dark' : ''}`}>
                            <h5 className={`card-title ${darkMode ? 'text-light' : ''}`}>{t('internshipInfo')}</h5>
                            <br/>
                            <p className={`card-text ${darkMode ? 'text-light' : ''}`}>{t('internshipName')} : {application.jobOffer.title}</p>
                            <p className={`card-text ${darkMode ? 'text-light' : ''}`}>{t('address')} : {application.jobOffer.location}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className={`card-body ${darkMode ? 'bg-light-dark' : ''}`}>
                            <h5 className={`card-title ${darkMode ? 'text-light' : ''}`}>{t('intern')}</h5>
                            <br/>
                            <p className={`card-text ${darkMode ? 'text-light' : ''}`}>{t('internName')} : {application.student.firstName} {application.student.lastName}</p>
                            <p className={`card-text ${darkMode ? 'text-light' : ''}`}>{t('startDate')} {application.jobOffer.startDate}</p>
                        </div>
                    </div>
                </div>
            </div>
            <br/>
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className={`card-body ${darkMode ? 'bg-light-dark' : ''}`}>
                            <h5 className={`card-title ${darkMode ? 'text-light' : ''}`}>{t('evaluation')}</h5>
                            <br/>
                            {/* TODO : evaluation */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EnvEvaluation;
