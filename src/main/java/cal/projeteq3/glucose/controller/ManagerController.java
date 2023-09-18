package cal.projeteq3.glucose.controller;

import cal.projeteq3.glucose.dto.JobOfferDTO;
import cal.projeteq3.glucose.service.ManagerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/manager")
@CrossOrigin(origins = "http://localhost:3000")
public class ManagerController {

    private final ManagerService managerService;

    @Autowired
    public ManagerController(ManagerService managerService) {
        this.managerService = managerService;
    }

    @GetMapping("/jobOffer/all")
    public ResponseEntity<List<JobOfferDTO>> getAllJobOffer(){
        return ResponseEntity.ok(managerService.getAllJobOffer());
    }

    @GetMapping("jobOffer/{id}")
    public ResponseEntity<JobOfferDTO> getJobOfferById(@PathVariable Long id){
        return ResponseEntity.ok(managerService.getJobOfferByID(id));
    }

    @GetMapping("jobOffer/{employerId}")
    public ResponseEntity<List<JobOfferDTO>> getJobOfferByEmploye(@PathVariable Long employerId){
//        return ResponseEntity.ok(managerService.getJobOfferByEmployer(employerId));
        return ResponseEntity.status(HttpStatus.ALREADY_REPORTED).body(null);
    }

    @GetMapping("jobOffer/submitted")
    public ResponseEntity<List<JobOfferDTO>> getJobOfferSubmitted(){
        return ResponseEntity.ok(managerService.getSubmittedJobOffers());
    }

    @GetMapping("jobOffer/accepted")
    public ResponseEntity<List<JobOfferDTO>> getJobOfferAccepted(){
        return ResponseEntity.ok(managerService.getAcceptedJobOffers());
    }

    @GetMapping("jobOffer/refused")
    public ResponseEntity<List<JobOfferDTO>> getJobOfferRefused(){
        return ResponseEntity.ok(managerService.getRefusedJobOffers());
    }
}
