package ma.inpt.cedoc.service.Global;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;

public interface FileService {

    // Save uploaded file and return its storage path
    String storeFile(MultipartFile file, String subdirectory) throws IOException;

    // Validate file type based on allowed extensions (pdf, docx, etc.)
    boolean isValidExtension(MultipartFile file, String... allowedExtensions);

    // Generate a sanitized, unique file name to avoid conflicts
    String generateUniqueFilename(MultipartFile file);

    // Delete file by path
    boolean deleteFile(String filePath) throws IOException;

    // Load file as Path (for download, streaming, etc.)
    Path loadFile(String fileName, String subdirectory);

    // Extract file extension (utility)
    String getFileExtension(String filename);
}
