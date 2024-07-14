package cal.projeteq3.glucose;

import cal.projeteq3.glucose.model.Department;
import cal.projeteq3.glucose.model.user.Manager;
import cal.projeteq3.glucose.repository.EmployerRepository;
import cal.projeteq3.glucose.repository.ManagerRepository;
import cal.projeteq3.glucose.repository.StudentRepository;
import cal.projeteq3.glucose.service.EmployerService;
import cal.projeteq3.glucose.service.ManagerService;
import cal.projeteq3.glucose.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;

@SpringBootApplication
public class GlucoseApplication implements CommandLineRunner {
    @Autowired
    private ManagerRepository managerRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public static void main(String[] args) {
        SpringApplication.run(GlucoseApplication.class, args);
    }

    @Override
    public void run(String... args) throws Exception {
        managerRepository.save(
                Manager.builder()
                        .firstName("Daphnée")
                        .lastName("Tessier")
                        .email("buzzwares@gmail.com")
                        .password(passwordEncoder.encode("Glucose123"))
                        .matricule("0000001")
                        .phoneNumber("123-456-7890")
                        .department(Department._420B0)
                        .build()
        );
//        managerRepository.saveAll(createManager());
    }

    private List<Manager> createManager() {
        return
                List.of(
                        Manager.builder()
                                .firstName("Édouard")
                                .lastName("Langlois-Légaré")
                                .email("edouard.langlois@claurendeau.qc.ca")
                                .password(passwordEncoder.encode("Ose12345"))
                                .matricule("0000000")
                                .phoneNumber("111-111-1111")
                                .department(Department._420B0)
                                .build(),
                        Manager.builder()
                                .firstName("Zaka")
                                .lastName("Gn")
                                .email("m@zaka.se")
                                .password(passwordEncoder.encode("aaaAAA111"))
                                .matricule("0000001")
                                .phoneNumber("123-456-7890")
                                .department(Department._310A0)
                                .build(),
                        Manager.builder()
                                .firstName("Michel")
                                .lastName("Michaud")
                                .email("michel@michaud.com")
                                .password(passwordEncoder.encode("Ose12345"))
                                .matricule("0000002")
                                .phoneNumber("123-456-7890")
                                .department(Department._420B0)
                                .build(),
                        Manager.builder()
                                .firstName("Emailer")
                                .lastName("Tester")
                                .email("buzzwares@gmail.com")
                                .password(passwordEncoder.encode("Ose12345"))
                                .matricule("0000111")
                                .phoneNumber("123-456-7890")
                                .department(Department._420B0)
                                .build()
                );
    }
}