package prabhath.paymenthub.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import prabhath.paymenthub.dto.AddMoneyRequest;
import prabhath.paymenthub.entity.User;
import prabhath.paymenthub.entity.Wallet;
import prabhath.paymenthub.repository.UserRepository;
import prabhath.paymenthub.repository.WalletRepository;

import java.math.BigDecimal;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final UserRepository userRepository;
    private final WalletRepository walletRepository;
    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public BigDecimal getBalance(String email) {

        String key = "wallet:" + email;
        Object cached = redisTemplate.opsForValue().get(key);

        if (cached != null) {
            return (BigDecimal) cached;
        }

        User user = userRepository.findByEmail(email).orElseThrow();
        Wallet wallet = walletRepository.findByUser(user).orElseThrow();

        redisTemplate.opsForValue().set(key, wallet.getBalance(), 10, TimeUnit.MINUTES);

        return wallet.getBalance();
    }

    @Override
    public BigDecimal addMoney(String email, AddMoneyRequest request) {

        User user = userRepository.findByEmail(email).orElseThrow();
        Wallet wallet = walletRepository.findByUser(user).orElseThrow();

        wallet.setBalance(wallet.getBalance().add(request.getAmount()));
        walletRepository.save(wallet);

        redisTemplate.opsForValue().set("wallet:" + email, wallet.getBalance(), 10, TimeUnit.MINUTES);

        return wallet.getBalance();
    }
}