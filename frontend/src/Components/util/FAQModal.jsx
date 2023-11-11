import React, {forwardRef, useEffect, useRef, useState} from 'react'
import {useTranslation} from "react-i18next"
import './FAQModal.css'
import {t} from "i18next"
import FAQStudent from "../student/FAQStudent"
import FAQManager from "../manager/FAQManager"
import FAQEmployer from "../employer/FAQEmployer"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";

const FAQModal = forwardRef(({role}, ref) => {
	const {i18n} = useTranslation()
	const [faqs, setFaqs] = useState([])
	const faqRef = useRef(null)
	const [isModalOpen, setIsModalOpen] = useState(false)

	useEffect(() => {
		if(isModalOpen){
			faqRef.current?.scrollIntoView({behavior: 'smooth'})
		}
		setFaqs(selectFaqData())
	}, [isModalOpen])

	const handleCloseClick = (e) => {
		e.stopPropagation()
		closeModal()
	}

	const toggleFAQ = index => {
		setFaqs(faqs.map((faq, i) => ({...faq, open: i === index ? !faq.open : false})))
	}

	const closeModal = () => setIsModalOpen(false)

	const openModal = () => setIsModalOpen(true)

	const currentLang = i18n.language

	function selectFaqData(){
		switch(role){
			case 'ROLE_STUDENT':
				return FAQStudent
			case 'ROLE_MANAGER':
				return FAQManager
			case 'ROLE_EMPLOYER':
				return FAQEmployer
			default:
				return []
		}
	}

	return (
		<>
			<button className="faq-button" onClick={openModal}>{i18n.t("CONSULT_FAQ")}</button>
			<div className={`modal-overlay ${isModalOpen ? '' : 'hidden'}`} ref={faqRef}>
				{isModalOpen &&
					<div className="modal-container">
						<FontAwesomeIcon icon={faX} className="close-button btn-outline-danger" onClick={handleCloseClick} />
						<div className="modal-content">
							<div className="faq-section">
								<h2>{i18n.t("FAQ_TITLE")}</h2>
								{
									faqs.length > 0 ?
										faqs.map((faq, index) => (
											<div className={`faq ${faq.open ? 'open' : ''}`} key={index}>
												<div className="faq-question" onClick={() => toggleFAQ(index)}>
													{faq.question[currentLang] ?? t('QUESTION_UNAVAILABLE')}
												</div>
												<div className="faq-answer">
													{faq.open && <p>{faq.answer[currentLang] ?? t('ANSWER_UNAVAILABLE')}</p>}
												</div>
											</div>
										))
										:
										<div className="faq">
											<div className="faq-question">{i18n.t("NO_FAQ")}</div>
										</div>
								}
							</div>
						</div>
					</div>
				}
			</div>
		</>
	)

})

export default FAQModal
