import React, {useState} from "react";
import {axiosInstance} from "../../App";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import Loading from "../util/Loading";
import {useTranslation} from "react-i18next";


const RegisterEmployerForm = () => {
    const {t} = useTranslation();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        lastName: '',
        firstName: '',
        organisationName: '',
        organisationPhone: '',
        email: '',
        password: '',
        passwordConfirm: '',
    });
    const [warnings, setWarnings] = useState({
        firstName: "",
        lastName: "",
        organisationName: "",
        organisationPhone: "",
        email: "",
        password: "",
        passwordConfirm: "",
    });

    const registerEmployer = async () => {
        setIsLoading(true)
        axiosInstance.post('/employer/register',
            {
                    registerDTO: {
                        email: formData.email.toLowerCase(),
                        password: formData.password,
                        role: "EMPLOYER"
                    },
                    employerDTO: {
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        organisationName: formData.organisationName,
                        organisationPhone: formData.organisationPhone
                    }
            }
        ).then(() => {
            setIsLoading(false)
            toast.success('Votre compte a été créé avec succès');
            navigate('/auth/login')
        }).catch(() =>
                setIsLoading(false)
        )
    }

    const handleChanges = (e) => {
        const {name, value} = e.target;
        setWarnings({...warnings, [name]: ""});
        setFormData({...formData, [name]: value.trim()});
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const validationErrors = {};

        if(formData.firstName === ''){
            validationErrors.firstName = t('firstNameRequired');
        }
        else if (!/^[a-zA-Z-]+$/.test(formData.firstName)) {
            validationErrors.firstName = t('firstNameInvalid');
        }

        if(formData.lastName === ''){
            validationErrors.lastName = t('lastNameRequired');
        }
        else if(formData.lastName && !/^[a-zA-Z-]+$/.test(formData.lastName)){
            validationErrors.lastName = t('lastNameInvalid');
        }

        if(formData.email === ''){
            validationErrors.email = t('emailRequired');
        }
        else if(formData.email && !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z]{2,4}$/.test(formData.email)){
            validationErrors.email = t('emailInvalid');
        }

        if(formData.organisationName === ''){
            validationErrors.organisationName = t('organisationNameRequired');
        }
        else if(!/^[a-zA-Z0-9-. ]+$/.test(formData.organisationName)){
            validationErrors.organisationName = t('organisationNameInvalid');
        }

        if(formData.organisationPhone === ''){
            validationErrors.organisationPhone = t('organisationPhoneRequired');
        }
        else if(!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/.test(formData.organisationPhone)){
            validationErrors.organisationPhone = t('organisationPhoneInvalid');
        }

        if(formData.password === ''){
            validationErrors.password = t('passwordRequired');
        }
        else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(formData.password)) {
            validationErrors.password = t('passwordInvalid');
        }
        else if (formData.password !== formData.passwordConfirm) {
            validationErrors.passwordConfirm = t('passwordConfirmInvalid');
        }

        setWarnings(validationErrors);

        if (Object.keys(validationErrors).length === 0) {
            registerEmployer().then((r) => console.log(r));
        }
    }

    return (
        <div className="row">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="col-9 mx-auto">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="firstName" className="mt-3">{t('firstName')}</label>
                            <input type="text" className={`form-control ${warnings.firstName ? "is-invalid" : ""}`}
                                   id="firstName" placeholder={t('placeHolderFirstName')} name="firstName" onChange={handleChanges}/>
                            <div className="text-danger">{warnings.firstName}</div>
                            <label htmlFor="lastName" className="mt-3">{t('lastName')}</label>
                            <input type="text" className={`form-control ${warnings.lastName ? "is-invalid" : ""}`}
                                   id="lastName" placeholder={t('placeHolderLastName')} name="lastName" onChange={handleChanges}/>
                            <div className="text-danger">{warnings.lastName}</div>
                            <label htmlFor="email" className="mt-3">{t('email')}</label>
                            <input type="email" className={`form-control ${warnings.email ? "is-invalid" : ""}`}
                                   id="email" placeholder={t('placeHolderEmail')} name="email" onChange={handleChanges}/>
                            <div className="text-danger">{warnings.email}</div>
                            <label htmlFor="organisationName" className="mt-3">{t('organisationName')}</label>
                            <input type="text" className={`form-control ${warnings.organisationName ? "is-invalid":""}`}
                                   id="organisationName" placeholder={t('placeHolderOrganisationName')} name="organisationName"
                                   onChange={handleChanges}/>
                            <div className="text-danger">{warnings.organisationName}</div>
                            <label htmlFor="organisationPhone" className="mt-3">{t('organisationPhone')}</label>
                            <input type="text" className={`form-control ${warnings.organisationPhone ? "is-invalid":""}`}
                                   id="organisationPhone" placeholder={t('placeHolderOrganisationPhone')} name="organisationPhone"
                                   onChange={handleChanges}/>
                            <div className="text-danger">{warnings.organisationPhone}</div>
                            <label htmlFor="password" className="mt-3">{t('password')}</label>
                            <input type="password" className={`form-control ${warnings.password ? "is-invalid" : ""}`}
                                   id="password" placeholder={t('placeHolderPassword')} name="password" onChange={handleChanges}/>
                            <div className="text-danger">{warnings.password}</div>
                            <label htmlFor="passwordConfirm" className="mt-3">{t('passwordConfirm')}</label>
                            <input type="password" className={`form-control ${warnings.passwordConfirm ? "is-invalid":""}`}
                                   id="passwordConfirm" placeholder={t('placeHolderPasswordConfirm')} name="passwordConfirm"
                                   onChange={handleChanges}/>
                            <div className="text-danger">{warnings.passwordConfirm}</div>
                        </div>
                        <div className="row my-4">
                            <div className="col-12 col-md-4 mx-auto">
                                <button type="submit" className="btn btn-outline-ose col-12">{t('registerSubmit')}</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );

}

export default RegisterEmployerForm