package cal.projeteq3.glucose.validation;

import cal.projeteq3.glucose.dto.JobOfferDTO;
import cal.projeteq3.glucose.dto.auth.LoginDTO;
import cal.projeteq3.glucose.dto.auth.RegisterDTO;
import cal.projeteq3.glucose.dto.auth.RegisterEmployerDTO;
import cal.projeteq3.glucose.dto.auth.RegisterStudentDTO;
import cal.projeteq3.glucose.dto.user.EmployerDTO;
import cal.projeteq3.glucose.dto.user.StudentDTO;
import cal.projeteq3.glucose.exception.request.ValidationException;
import cal.projeteq3.glucose.model.auth.Role;
import cal.projeteq3.glucose.model.user.Employer;
import cal.projeteq3.glucose.model.user.Student;

import java.time.LocalDate;
import static cal.projeteq3.glucose.validation.ValidationPattern.*;

public final class Validation{
	private static final int MIN_AGE = 18;
	private static final int MAX_AGE = 100;

//	Validation of exceptions

	private static void exception(String message){
		throw new ValidationException(message);
	}

//	Validation of attributes

	public static void validateEmail(String email){
		if(email.matches(EMAIL_PATTERN.toString()))
			return;
		exception(ValidationMessage.EMAIL_MESSAGE.toString());
	}

	public static void validatePassword(String password){
		if(password.matches(PASSWORD_PATTERN.toString()))
			return;
		exception(ValidationMessage.PASSWORD_MESSAGE.toString());
	}

	public static void validateName(String name){
		if(name.matches(NAME_PATTERN.toString()))
			return;
		exception(ValidationMessage.NAME_MESSAGE.toString());
	}

	public static void validateBirthDate(LocalDate birthDate){
		if(
			birthDate.isBefore(LocalDate.now().minusYears(MAX_AGE)) &&
			birthDate.isAfter(LocalDate.now().minusYears(MIN_AGE))
		)
			return;
		exception(ValidationMessage.AGE_MESSAGE.toString());
	}

	public static void validateStreet(String street){
		if(street.matches(STREET_PATTERN.toString()))
			return;
		exception(ValidationMessage.STREET_MESSAGE.toString());
	}

	public static void validateCity(String city){
		if(city.matches(CITY_PATTERN.toString()))
			return;
		exception(ValidationMessage.CITY_MESSAGE.toString());
	}

	public static void validateProvince(String province){
		if(province.matches(PROVINCE_PATTERN.toString()))
			return;
		exception(ValidationMessage.PROVINCE_MESSAGE.toString());
	}

	public static void validatePostalCode(String postalCode){
		if(postalCode.matches(POSTAL_CODE_PATTERN.toString()))
			return;
		exception(ValidationMessage.POSTAL_CODE_MESSAGE.toString());
	}

	public static void validateCountry(String country){
		if(country.matches(COUNTRY_PATTERN.toString()))
			return;
		exception(ValidationMessage.COUNTRY_MESSAGE.toString());
	}

	public static void validatePhoneNumber(String phoneNumber){
		if(phoneNumber.matches(PHONE_NUMBER_PATTERN.toString()))
			return;
		exception(ValidationMessage.PHONE_NUMBER_MESSAGE.toString());
	}

	public static void validateUrl(String website){
		if(website.matches(WEBSITE_PATTERN.toString()))
			return;
    exception(ValidationMessage.WEBSITE_MESSAGE.toString());
	}

	public static void validateCvFileName(String fileName){
		if(fileName.matches(CV_FILE_NAME_PATTERN.toString()))
			return;
		exception(ValidationMessage.CV_FILE_NAME_MESSAGE.toString());
	}

	public static void validateSerial(String serial){
		if(!serial.matches(SERIAL_PATTERN.toString()))
			exception(ValidationMessage.SERIAL_MESSAGE.toString());
	}

	private static void validateOrgName(String organisationName) {
		if(organisationName.matches(ORGANISATION_NAME_PATTERN.toString()))
			return;
		exception(ValidationMessage.ORGANISATION_NAME_MESSAGE.toString());
	}

	private static void validateMatricule(String matricule) {
		if(matricule.matches(MATRICULE_PATTERN.toString()))
			return;
		exception(ValidationMessage.MATRICULE_MESSAGE.toString());
	}


//	Validation of objects

	public static void validateEmployer(RegisterEmployerDTO employer) {
		validateName(employer.getEmployerDTO().getFirstName());
		validateName(employer.getEmployerDTO().getLastName());
		validateEmail(employer.getRegisterDTO().getEmail());
		validatePassword(employer.getRegisterDTO().getPassword());
		validateOrgName(employer.getEmployerDTO().getOrganisationName());
		validatePhoneNumber(employer.getEmployerDTO().getOrganisationPhone());
	}

	public static void validateStudent(RegisterStudentDTO student) {
		validateName(student.getStudentDTO().getFirstName());
		validateName(student.getStudentDTO().getLastName());
		validateEmail(student.getRegisterDTO().getEmail());
		validatePassword(student.getRegisterDTO().getPassword());
		validateMatricule(student.getStudentDTO().getMatricule());
	}

	public static void validateLogin(LoginDTO loginDTO) {
		validateEmail(loginDTO.getEmail());
		validatePassword(loginDTO.getPassword());
	}

	public static void validateRole(String role){
		if(role.matches(Role.getAllRolesString()))
			return;
		exception(ValidationMessage.ROLE_MESSAGE.toString());
	}

	public static void validateJobOffer(JobOfferDTO jobOffer){
		if(!jobOffer.getTitle().matches(TITLE_PATTERN.toString()))
			exception(ValidationMessage.TITLE_MESSAGE.toString());
		if(!jobOffer.getDepartment().matches(DEPARTMENT_PATTERN.toString()))
			exception(ValidationMessage.DEPARTMENT_MESSAGE.toString());
		if(jobOffer.getLocation().matches(LOCATION_PATTERN.toString()))
			return;
		exception(ValidationMessage.LOCATION_MESSAGE.toString());
		if(!jobOffer.getDescription().matches(DESCRIPTION_PATTERN.toString()))
			return;
		exception(ValidationMessage.DESCRIPTION_MESSAGE.toString());
		if(jobOffer.getSalary() < 0)
			return;
		exception(ValidationMessage.SALARY_MESSAGE.toString());
		if(!jobOffer.getStartDate().isAfter(jobOffer.getExpirationDate()))
			return;
		exception(ValidationMessage.START_DATE_MESSAGE.toString());
		if(jobOffer.getDuration() < 0)
			return;
		exception(ValidationMessage.DURATION_MESSAGE.toString());
		if(jobOffer.getHoursPerWeek() < 0)
			return;
		exception(ValidationMessage.HOURS_PER_WEEK_MESSAGE.toString());
		if(!jobOffer.getExpirationDate().isAfter(jobOffer.getStartDate()))
			return;
		exception(ValidationMessage.EXPIRATION_DATE_MESSAGE.toString());
		if(!jobOffer.getJobOfferState().toString().matches(JOB_OFFER_STATE_PATTERN.toString()))
			return;
		exception(ValidationMessage.JOB_OFFER_STATE_MESSAGE.toString());
		if(!jobOffer.getJobOfferState().toString().matches(JOB_OFFER_STATE_PATTERN.toString()))
			return;
		exception(ValidationMessage.JOB_OFFER_STATE_MESSAGE.toString());

	}

}
