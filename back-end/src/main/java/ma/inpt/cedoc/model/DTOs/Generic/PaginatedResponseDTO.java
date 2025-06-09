package ma.inpt.cedoc.model.DTOs.Generic;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaginatedResponseDTO<T> {
    private List<T> content;
    private int currentPage;
    private int totalPages;
    private long totalItems;
    private int pageSize;
    private boolean isLast;

}
