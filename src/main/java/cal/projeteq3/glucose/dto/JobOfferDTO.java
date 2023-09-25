package cal.projeteq3.glucose.dto;

import cal.projeteq3.glucose.model.Department;
import cal.projeteq3.glucose.model.jobOffer.JobOffer;
import cal.projeteq3.glucose.model.jobOffer.JobOfferState;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JobOfferDTO{
	private Long id;
	private String title;
	private Department department;
	private String location;
	private String description;
	private float salary;
	private LocalDateTime startDate;
	private int duration;
	private LocalDateTime expirationDate;
	private JobOfferState jobOfferState;
	private int hoursPerWeek;
	private String refusReason;

	public JobOfferDTO(JobOffer jobOffer){
		this.id = jobOffer.getId();
		this.title = jobOffer.getTitle();
		this.department = jobOffer.getDepartment();
		this.location = jobOffer.getLocation();
		this.description = jobOffer.getDescription();
		this.salary = jobOffer.getSalary();
		this.startDate = jobOffer.getStartDate();
		this.duration = jobOffer.getDuration();
		this.expirationDate = jobOffer.getExpirationDate();
		this.jobOfferState = jobOffer.getJobOfferState();
		this.hoursPerWeek = jobOffer.getHoursPerWeek();
	}

	public JobOffer toEntity(){
		return JobOffer.builder()
				.id(this.id)
				.jobOfferState(this.jobOfferState)
				.title(this.title)
				.description(this.description)
				.location(this.location)
				.department(this.department)
				.salary(this.salary)
				.startDate(this.startDate)
				.duration(this.duration)
				.hoursPerWeek(this.hoursPerWeek)
				.expirationDate(this.expirationDate)
				.refusReason(this.refusReason)
				.build();
	}

}