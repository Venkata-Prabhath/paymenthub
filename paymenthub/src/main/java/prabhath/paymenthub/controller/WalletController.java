package prabhath.paymenthub.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prabhath.paymenthub.dto.AddMoneyRequest;
import prabhath.paymenthub.service.WalletService;

import java.math.BigDecimal;

@RestController
@RequestMapping("/wallet")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class WalletController {

    private final WalletService walletService;

    @GetMapping("/balance")
    public BigDecimal getBalance(
            @RequestParam String email) {

        return walletService.getBalance(email);
    }

    @PostMapping("/add-money")
    public BigDecimal addMoney(
            @RequestParam String email,
            @RequestBody AddMoneyRequest request) {

        return walletService.addMoney(email, request);
    }
}