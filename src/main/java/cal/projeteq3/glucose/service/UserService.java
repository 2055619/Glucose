package cal.projeteq3.glucose.service;

import cal.projeteq3.glucose.dto.user.EmployerDTO;
import cal.projeteq3.glucose.dto.user.ManagerDTO;
import cal.projeteq3.glucose.dto.user.StudentDTO;
import cal.projeteq3.glucose.dto.auth.LoginDTO;
import cal.projeteq3.glucose.dto.user.UserDTO;
import cal.projeteq3.glucose.exception.badRequestException.UserNotFoundException;
import cal.projeteq3.glucose.model.Semester;
import cal.projeteq3.glucose.model.user.*;
import cal.projeteq3.glucose.repository.*;
import cal.projeteq3.glucose.security.JwtTokenProvider;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
	private final StudentRepository studentRepository;
	private final EmployerRepository employerRepository;
	private final ManagerRepository managerRepository;
	private final CredentialRepository credentialRepository;
	private final UserRepository userRepository;
	private final AuthenticationManager authenticationManager;
	private final JwtTokenProvider jwtTokenProvider;

	public String authenticateUser(LoginDTO loginDto) {
		Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginDto.getEmail(), loginDto.getPassword()));

		return jwtTokenProvider.generateToken(authentication);
	}

	public UserDTO getMe(String token) {
		String email = jwtTokenProvider.getEmailFromJWT(token);
		User user = userRepository.findUserByCredentialsEmail(email)
				.orElseThrow(() -> new UserNotFoundException("No User found with this email: " + email));

		return switch (user.getRole()) {
			case STUDENT -> getStudentDto(user.getId());
			case EMPLOYER -> getEmployerDto(user.getId());
			case MANAGER -> getManagerDto(user.getId());
		};
	}

	private ManagerDTO getManagerDto(Long id) {
		return new ManagerDTO(managerRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("No Manager found with this ID: " + id)));
	}
	private EmployerDTO getEmployerDto(Long id) {
		return new EmployerDTO(employerRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("No Employer found with this ID: " + id)));
	}
	private StudentDTO getStudentDto(Long id) {
		return new StudentDTO(studentRepository.findById(id)
				.orElseThrow(() -> new UserNotFoundException("No Student found with this ID: " + id)));
	}

    public List<String> getSemesters() {
		int nbSessions = 4;
		List<String> semesters = new ArrayList<>();

		for (int i = 0; i < nbSessions; i++) {
			semesters.add(new Semester(LocalDate.now().minusYears(i)).toString());
		}

		return semesters;
    }
}