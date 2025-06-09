package ma.inpt.cedoc.model.DTOs.mapper.Global;

import java.util.List;

import org.springframework.data.domain.Page;

import ma.inpt.cedoc.model.DTOs.Generic.PaginatedResponseDTO;

public class PaginatedMapper {
    public static <T> PaginatedResponseDTO<T> mapToDTO(Page<T> page) {
        PaginatedResponseDTO<T> dto = new PaginatedResponseDTO<>();

        dto.setContent(page.getContent());
        dto.setCurrentPage(page.getNumber());
        dto.setTotalPages(page.getTotalPages());
        dto.setTotalItems(page.getTotalElements());
        dto.setPageSize(page.getSize());
        dto.setLast(page.isLast());

        return dto;
    }

    // In case you want to map manually from content + metadata (non-Page sources)
    public static <T> PaginatedResponseDTO<T> mapToDTO(
            List<T> content, int currentPage, int totalPages, long totalItems, int pageSize, boolean isLast) {
        PaginatedResponseDTO<T> dto = new PaginatedResponseDTO<>();
        dto.setContent(content);
        dto.setCurrentPage(currentPage);
        dto.setTotalPages(totalPages);
        dto.setTotalItems(totalItems);
        dto.setPageSize(pageSize);
        dto.setLast(isLast);
        return dto;
    }
}
