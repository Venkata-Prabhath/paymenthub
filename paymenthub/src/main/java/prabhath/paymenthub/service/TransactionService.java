package prabhath.paymenthub.service;

import org.springframework.data.domain.Page;
import prabhath.paymenthub.dto.TransferRequest;
import prabhath.paymenthub.entity.Transaction;

public interface TransactionService {

    String transferMoney(TransferRequest request);

    Page<Transaction> getHistory(String email, int page, int size);
}