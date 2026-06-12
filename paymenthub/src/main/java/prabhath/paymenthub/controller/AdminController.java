package prabhath.paymenthub.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import prabhath.paymenthub.entity.Transaction;
import prabhath.paymenthub.entity.User;
import prabhath.paymenthub.service.AdminService;

import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
public class AdminController {

    private final AdminService adminService;

    @GetMapping("/users")
    public List<User> getUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/transactions")
    public List<Transaction> getTransactions() {
        return adminService.getAllTransactions();
    }

    @PutMapping("/block/{id}")
    public String blockUser(
            @PathVariable Long id) {

        return adminService.blockUser(id);
    }

    @PutMapping("/unblock/{id}")
    public String unblockUser(
            @PathVariable Long id) {

        return adminService.unblockUser(id);
    }
}