package prabhath.paymenthub.service;

import prabhath.paymenthub.dto.AddMoneyRequest;
import java.math.BigDecimal;

public interface WalletService {

    BigDecimal getBalance(String email);

    BigDecimal addMoney(String email, AddMoneyRequest request);
}