package prabhath.paymenthub.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import prabhath.paymenthub.entity.User;
import prabhath.paymenthub.entity.Wallet;

import java.util.Optional;

public interface WalletRepository
        extends JpaRepository<Wallet, Long> {

    Optional<Wallet> findByUser(User user);
}