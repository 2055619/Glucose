import {axiosInstance} from "../../App"
import {toast} from "react-toastify"
import React, {useEffect} from "react"
import {useTranslation} from "react-i18next";

const FullJobOffer = ({user, jobOffer, updatedOffer}) => {
	const {t} = useTranslation()

	useEffect(() => {
	}, [])

	const applyForJobOffer = (jobOfferID, studentId) => {
		axiosInstance
			.post(`/student/applyJobOffer/${studentId}/${jobOfferID}`)
			.then((response) => {
				updatedOffer(response.data)
				toast.success(t('appliedJobOffer'))}
			)
			.catch((error) => {
				toast.error(t('pushingError') + t(error.response.data.message))
			})
	}

	return (
		<div className="row my-2">
			<div className="col-12 bg-white rounded py-3">
				<div className="row justify-content-between">
					<div className="col-9">
						<h2 className="text-dark fw-light pt-1">{jobOffer.title}</h2>
					</div>
					<div className="col-3 my-auto text-center">
						<button data-testid="apply-button" className={"btn btn-outline-ose"} onClick={
							() => applyForJobOffer(jobOffer.id, user.id)}>{t('apply')}</button>
					</div>
				</div>
				<div className="row">
					<div className="col-12">
						<h5 className="text-dark fw-light mb-3">{t(jobOffer.department)}</h5>
						<h5 className="text-dark fw-light mb-3">{jobOffer.location}</h5>
						<h6 className="text-dark fw-light mb-3">{t('startDate') + jobOffer.startDate}</h6>
						<h6 className="text-dark fw-light mb-3">{t('duration') + jobOffer.duration + t('week')}</h6>
						<p className="fst-italic fw-light text-dark">{t('estimateEndDate')} {new Date(new Date(jobOffer.startDate).getTime() + jobOffer.duration * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]}</p>
						<h6 className="text-dark fw-light mb-3">{jobOffer.salary}$/h</h6>
						<h6 className="text-dark fw-light mb-3">{jobOffer.hoursPerWeek}h/{t('week')}</h6>
						<p className="text-dark fw-light mb-3">{jobOffer.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FullJobOffer;