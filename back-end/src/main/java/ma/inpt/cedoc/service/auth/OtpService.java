package ma.inpt.cedoc.service.auth;

public interface OtpService {

    boolean isOtpValid(long id, String otp);

    String generateAndStoreOtp(long id);

    void deleteOtp(long id);

}