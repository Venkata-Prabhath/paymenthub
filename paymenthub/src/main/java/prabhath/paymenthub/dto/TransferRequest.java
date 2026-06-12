package prabhath.paymenthub.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class TransferRequest {

    private String senderEmail;

    private String receiverEmail;

    private BigDecimal amount;
}