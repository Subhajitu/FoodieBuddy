package com.foodiebuddy.user.controller;

import com.foodiebuddy.user.model.User;
import com.foodiebuddy.user.repository.UserRepository;
import com.foodiebuddy.user.security.JwtUtil;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public UserController(
            UserRepository userRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        validateRegisterRequest(request);

        String username = request.username().trim();
        String role = request.role().trim();

        if (userRepository.existsByUsername(username)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Username already exists");
        }

        User user = new User(
                username,
                passwordEncoder.encode(request.password()),
                role);

        User savedUser = userRepository.save(user);
        String token = jwtUtil.generateToken(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        validateLoginRequest(request);

        User user = userRepository.findByUsername(request.username())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials"));

        if (!passwordEncoder.matches(request.password(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid credentials");
        }

        String token = jwtUtil.generateToken(user);
        return ResponseEntity.ok(new AuthResponse(token));
    }

    private void validateRegisterRequest(RegisterRequest request) {
        if (request == null
                || !StringUtils.hasText(request.username())
                || !StringUtils.hasText(request.password())
                || !StringUtils.hasText(request.role())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username, password, and role are required");
        }
    }

    private void validateLoginRequest(LoginRequest request) {
        if (request == null
                || !StringUtils.hasText(request.username())
                || !StringUtils.hasText(request.password())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Username and password are required");
        }
    }

    public record RegisterRequest(String username, String password, String role) {
    }

    public record LoginRequest(String username, String password) {
    }

    public record AuthResponse(String token) {
    }
}
