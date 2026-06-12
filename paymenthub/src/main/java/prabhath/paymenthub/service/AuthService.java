package prabhath.paymenthub.service;

import prabhath.paymenthub.dto.AuthResponse;
import prabhath.paymenthub.dto.LoginRequest;
import prabhath.paymenthub.dto.RegisterRequest;

public interface AuthService {

    AuthResponse register(RegisterRequest request);

    AuthResponse login(LoginRequest request);
}