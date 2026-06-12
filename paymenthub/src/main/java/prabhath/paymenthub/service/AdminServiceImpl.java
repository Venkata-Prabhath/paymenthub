package prabhath.paymenthub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import prabhath.paymenthub.entity.Transaction;
import prabhath.paymenthub.entity.User;
import prabhath.paymenthub.exception.ApiException;
import prabhath.paymenthub.repository.TransactionRepository;
import prabhath.paymenthub.repository.UserRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final UserRepository userRepository;
    private final TransactionRepository transactionRepository;

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<Transaction> getAllTransactions() {
        return transactionRepository.findAll();
    }

    @Override
    public String blockUser(Long userId) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ApiException("User not found"));

        user.setActive(false);

        userRepository.save(user);

        return "User blocked successfully";
    }

    @Override
    public String unblockUser(Long userId) {

        User user = userRepository
                .findById(userId)
                .orElseThrow(() ->
                        new ApiException("User not found"));

        user.setActive(true);

        userRepository.save(user);

        return "User unblocked successfully";
    }
}