package cal.projeteq3.glucose.service;

import cal.projeteq3.glucose.dto.CvFileDTO;
import cal.projeteq3.glucose.dto.JobOfferDTO;
import cal.projeteq3.glucose.exception.request.JobOffreNotFoundException;
import cal.projeteq3.glucose.model.cvFile.CvState;
import cal.projeteq3.glucose.model.jobOffre.JobOffer;
import cal.projeteq3.glucose.model.jobOffre.JobOfferState;
import cal.projeteq3.glucose.repository.CvRepository;
import cal.projeteq3.glucose.repository.JobOfferRepository;
import cal.projeteq3.glucose.repository.ManagerRepository;
import cal.projeteq3.glucose.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ManagerService{

	private final ManagerRepository managerRepository;
	private final StudentRepository studentRepository;
	private final JobOfferRepository jobOfferRepository;
	private final CvRepository cvRepository;

	@Autowired
	public ManagerService(
		ManagerRepository managerRepository, StudentRepository studentRepository,
		JobOfferRepository jobOfferRepository, CvRepository cvRepository
	){
		this.managerRepository = managerRepository;
		this.studentRepository = studentRepository;
		this.jobOfferRepository = jobOfferRepository;
		this.cvRepository = cvRepository;
	}

	// database operations here

   /* public ManagerDTO createGestionnaire(Manager manager) {//TODO: DTO
        return new ManagerDTO(managerRepository.save(manager));
    }*/

    /*public List<Manager> getAllGestionnaires() {//TODO: DTO
        return managerRepository.findAll();
    }*/

    /*public Optional<Manager> getGestionnaireByID(Long id) {//TODO: DTO
        return managerRepository.findById(id);
    }*/

    /*public Manager updateGestionnaire(Long id, Manager updatedManager) {//TODO: DTO
        Optional<Manager> existingGestionnaire = managerRepository.findById(id);
        if(existingGestionnaire.isPresent()) {
            Manager manager = existingGestionnaire.get();

            manager.setFirstName(updatedManager.getFirstName());
            manager.setLastName(updatedManager.getLastName());
            manager.setEmail(updatedManager.getEmail());
            manager.setPassword(updatedManager.getPassword());

            return managerRepository.save(manager);
        } else {
            throw new IllegalArgumentException("Manager with ID " + id + " does not exist.");
        }
    }*/

	public void deleteGestionnaire(Long id){
		managerRepository.deleteById(id);
	}

	public List<JobOfferDTO> getAllJobOffer(){
		return jobOfferRepository.findAll().stream().map(JobOfferDTO::new).toList();
	}

	public JobOfferDTO getJobOfferByID(Long id){
		return new JobOfferDTO(jobOfferRepository.findById(id).orElseThrow());
	}

	//    CV File
	public CvFileDTO getCvByID(Long id){
		return new CvFileDTO(cvRepository.findById(id).orElseThrow());
	}

	public List<CvFileDTO> getAllCv(){
		return cvRepository.findAll().stream().map(CvFileDTO::new).toList();
	}

	public List<CvFileDTO> getPendingCv(){
		return cvRepository.findAllByCvState(CvState.SUBMITTED).stream().map(CvFileDTO::new).toList();
	}

    /*public CvFileDTO createCvFile(CvFile cvFile){
        return new CvFileDTO(cvRepository.save(cvFile));
    }*/

   /* public CvFileDTO createCvFile(String fileName, byte[] fileData, Student student){
        return new CvFileDTO(cvRepository.save(
                new CvFile(fileName, fileData, student))
        );
    }*/

    /*public CvFileDTO createCvFile(String fileName, byte[] fileData, String matricule){
        return new CvFileDTO(cvRepository.save(
                new CvFile(fileName, fileData, studentRepository.findByMatricule(matricule)))
        );
    }*/

    /*public CvFileDTO updateCvFile(Long id, CvFile updatedCvFile){//TODO DTO
        Optional<CvFile> existingCvFile = cvRepository.findById(id);
        if(existingCvFile.isPresent()) {
            CvFile cvFile = existingCvFile.get();

            cvFile.setFileName(updatedCvFile.getFileName());
            cvFile.setFileData(updatedCvFile.getFileData());
            cvFile.setCvState(updatedCvFile.getCvState());

            return new CvFileDTO(cvRepository.save(cvFile));
        } else {
            throw new IllegalArgumentException("CvFile with ID " + id + " does not exist.");
        }
    }*/

	public List<CvFileDTO> getAllCvFileByStudent(Long id){
		return cvRepository.findAllByStudent(studentRepository.findById(id).orElseThrow()).stream().map(CvFileDTO::new).toList();
	}

	public List<CvFileDTO> getAllCvFileByStudentMatricule(String matricule){
		return cvRepository.findAllByStudent(studentRepository.findByMatricule(matricule)).stream().map(CvFileDTO::new).toList();
	}

	public CvFileDTO getCvFileByStudentAndFileName(String matricule, String fileName){
		return new CvFileDTO(cvRepository.findByStudentAndFileName(studentRepository.findByMatricule(matricule), fileName));
	}

	public void deleteCvFile(Long id){
		cvRepository.deleteById(id);
	}

	public void deleteAllCvFileByStudendMatricule(String matricule){
		cvRepository.deleteAllByStudent(studentRepository.findByMatricule(matricule));
	}

	//

	public List<JobOfferDTO> getSubmittedJobOffers() {
		List<JobOffer> jobOffers = jobOfferRepository.findSubmittedJobOffers();
		return jobOffers.stream().map(JobOfferDTO::new).collect(Collectors.toList());
	}

	public List<JobOfferDTO> getAcceptedJobOffers() {
		List<JobOffer> jobOffers = jobOfferRepository.findAcceptedJobOffers();
		return jobOffers.stream().map(JobOfferDTO::new).collect(Collectors.toList());
	}

	public List<JobOfferDTO> getRefusedJobOffers() {
		List<JobOffer> jobOffers = jobOfferRepository.findRefusedJobOffers();
		return jobOffers.stream().map(JobOfferDTO::new).collect(Collectors.toList());
	}

	public JobOfferDTO acceptJobOffer(Long id) {
		Optional<JobOffer> existingJobOffer = jobOfferRepository.findById(id);
		if(existingJobOffer.isPresent()) {
			JobOffer jobOffer = existingJobOffer.get();
			jobOffer.setJobOfferState(JobOfferState.ACCEPTED);
			return new JobOfferDTO(jobOfferRepository.save(jobOffer));
		}

		throw new JobOffreNotFoundException(id);
	}

	// TODO : En cas de refus, une justification est requise
	public JobOfferDTO refuseJobOffer(Long id) {
		Optional<JobOffer> existingJobOffer = jobOfferRepository.findById(id);
		if(existingJobOffer.isPresent()) {
			JobOffer jobOffer = existingJobOffer.get();
			jobOffer.setJobOfferState(JobOfferState.REFUSED);
			return new JobOfferDTO(jobOfferRepository.save(jobOffer));
		}

		throw new JobOffreNotFoundException(id);
	}

}
