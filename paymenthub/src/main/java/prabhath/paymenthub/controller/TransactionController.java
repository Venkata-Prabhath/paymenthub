package prabhath.paymenthub.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import prabhath.paymenthub.dto.TransferRequest;
import prabhath.paymenthub.entity.Transaction;
import prabhath.paymenthub.service.TransactionService;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/transfer")
    public String transferMoney(@RequestBody TransferRequest request) {
        return transactionService.transferMoney(request);
    }

    @GetMapping("/history")
    public Page<Transaction> getHistory(
            @RequestParam String email,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {

        return transactionService.getHistory(email, page, size);
    }
}