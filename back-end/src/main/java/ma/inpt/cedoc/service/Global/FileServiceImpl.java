package ma.inpt.cedoc.service.Global;

import java.io.IOException;
import java.nio.file.*;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements FileService {

    // Assuming uploads is at: src/uploads (2 levels up from service implementation)
    private static final Path BASE_UPLOAD_PATH = Paths.get(System.getProperty("user.dir"))
                                                    .resolve("src")
                                                    .resolve("Uploads");

    @Override
    public String storeFile(MultipartFile file, String subdirectory) throws IOException {
        String filename = generateUniqueFilename(file);
        Path targetDirectory = BASE_UPLOAD_PATH.resolve(subdirectory).normalize();
        Files.createDirectories(targetDirectory); // Ensure directory exists

        Path targetPath = targetDirectory.resolve(filename);
        Files.copy(file.getInputStream(), targetPath, StandardCopyOption.REPLACE_EXISTING);
        return targetPath.toString();
    }

    @Override
    public boolean isValidExtension(MultipartFile file, String... allowedExtensions) {
        String ext = getFileExtension(file.getOriginalFilename());
        for (String allowed : allowedExtensions) {
            if (allowed.equalsIgnoreCase(ext)) {
                return true;
            }
        }
        return false;
    }

    @Override
    public String generateUniqueFilename(MultipartFile file) {
        String extension = getFileExtension(file.getOriginalFilename());
        return UUID.randomUUID().toString() + "." + extension;
    }

    @Override
    public boolean deleteFile(String filePath) throws IOException {
        Path path = Paths.get(filePath);
        return Files.deleteIfExists(path);
    }

    @Override
    public Path loadFile(String fileName, String subdirectory) {
        return BASE_UPLOAD_PATH.resolve(subdirectory).resolve(fileName).normalize();
    }

    @Override
    public String getFileExtension(String filename) {
        if (filename == null || !filename.contains(".")) {
            return "";
        }
        return filename.substring(filename.lastIndexOf('.') + 1);
    }
}
