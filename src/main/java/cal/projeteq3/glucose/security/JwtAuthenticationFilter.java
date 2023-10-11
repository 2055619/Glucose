package cal.projeteq3.glucose.security;

import cal.projeteq3.glucose.exception.badRequestException.UserNotFoundException;
import cal.projeteq3.glucose.model.user.User;
import cal.projeteq3.glucose.repository.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.constraints.NotNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

public class JwtAuthenticationFilter extends OncePerRequestFilter{
	private final JwtTokenProvider tokenProvider;
	private final UserRepository userRepository;

	public JwtAuthenticationFilter(JwtTokenProvider tokenProvider, UserRepository userRepository){
		this.tokenProvider = tokenProvider;
		this.userRepository = userRepository;
	}

	@Override
	protected void doFilterInternal(
		@NotNull HttpServletRequest request,
		@NotNull HttpServletResponse response,
		@NotNull FilterChain filterChain
	)throws ServletException, IOException{
		String token = getJWTFromRequest(request);
		if(StringUtils.hasText(token)){
			try{
				tokenProvider.validateToken(token);
				String email = tokenProvider.getEmailFromJWT(token);
				User user = userRepository.findUserByCredentialsEmail(email).orElseThrow(UserNotFoundException::new);
				UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
						user.getEmail(), null, user.getAuthorities()
				);
				authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authenticationToken);
			}catch(Exception e){
				logger.error("Could not set user authentication in security context", e);
			}
		}
		filterChain.doFilter(request, response);
	}

	private String getJWTFromRequest(HttpServletRequest request){
		return request.getHeader("Authorization");
	}

}
