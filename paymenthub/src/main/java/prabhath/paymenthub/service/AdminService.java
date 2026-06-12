package prabhath.paymenthub.service;

import prabhath.paymenthub.entity.Transaction;
import prabhath.paymenthub.entity.User;

import java.util.List;

public interface AdminService {

    List<User> getAllUsers();

    List<Transaction> getAllTransactions();

    String blockUser(Long userId);

    String unblockUser(Long userId);
}