package prabhath.paymenthub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import prabhath.paymenthub.dto.TransferRequest;
import prabhath.paymenthub.entity.Transaction;
import prabhath.paymenthub.entity.User;
import prabhath.paymenthub.entity.Wallet;
import prabhath.paymenthub.enums.TransactionStatus;
import prabhath.paymenthub.exception.ApiException;
import prabhath.paymenthub.repository.TransactionRepository;
import prabhath.paymenthub.repository.UserRepository;
import prabhath.paymenthub.repository.WalletRepository;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final TransactionRepository transactionRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    @Transactional
    public String transferMoney(TransferRequest request) {

        User sender = userRepository
                .findByEmail(request.getSenderEmail())
                .orElseThrow(() ->
                        new ApiException("Sender not found"));

        User receiver = userRepository
                .findByEmail(request.getReceiverEmail())
                .orElseThrow(() ->
                        new ApiException("Receiver not found"));

        Wallet senderWallet = walletRepository
                .findByUser(sender)
                .orElseThrow(() ->
                        new ApiException("Sender wallet not found"));

        Wallet receiverWallet = walletRepository
                .findByUser(receiver)
                .orElseThrow(() ->
                        new ApiException("Receiver wallet not found"));

        if (senderWallet.getBalance()
                .compareTo(request.getAmount()) < 0) {

            throw new ApiException(
                    "Insufficient balance");
        }

        senderWallet.setBalance(
                senderWallet.getBalance()
                        .subtract(request.getAmount()));

        receiverWallet.setBalance(
                receiverWallet.getBalance()
                        .add(request.getAmount()));

        walletRepository.save(senderWallet);
        walletRepository.save(receiverWallet);

        redisTemplate.opsForValue().set(
                "wallet:" + sender.getEmail(),
                senderWallet.getBalance());

        redisTemplate.opsForValue().set(
                "wallet:" + receiver.getEmail(),
                receiverWallet.getBalance());

        Transaction transaction =
                Transaction.builder()
                        .senderEmail(sender.getEmail())
                        .receiverEmail(receiver.getEmail())
                        .amount(request.getAmount())
                        .status(TransactionStatus.SUCCESS)
                        .createdAt(LocalDateTime.now())
                        .build();

        transactionRepository.save(transaction);

        return "Transfer Successful";
    }

    @Override
    public Page<Transaction> getHistory(
            String email,
            int page,
            int size) {

        Pageable pageable =
                PageRequest.of(page, size);

        return transactionRepository
                .findBySenderEmailOrReceiverEmail(
                        email,
                        email,
                        pageable);
    }
}