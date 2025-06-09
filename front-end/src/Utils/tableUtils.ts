import { TableConfig } from "@/Types/GlobalTypes";

/**
 * Creates a default table configuration with sensible defaults
 */
export const createDefaultTableConfig = (
  overrides: Partial<TableConfig> = {}
): TableConfig => ({
  search: "",
  sortBy: "",
  sort: "",
  filters: {},
  page: 1,
  pageSize: 10,
  ...overrides,
});

/**
 * Serializes table config to URL search params for bookmarking/sharing
 */
export const tableConfigToSearchParams = (
  config: TableConfig
): URLSearchParams => {
  const params = new URLSearchParams();

  if (config.search) params.set("search", config.search);
  if (config.sortBy) params.set("sortBy", config.sortBy);
  if (config.sort) params.set("sort", config.sort);
  if (config.page > 1) params.set("page", config.page.toString());
  if (config.pageSize !== 10)
    params.set("pageSize", config.pageSize.toString());

  // Add filters
  Object.entries(config.filters).forEach(([key, value]) => {
    if (value) params.set(`filter_${key}`, value);
  });

  return params;
};

/**
 * Parses URL search params back to table config
 */
export const searchParamsToTableConfig = (
  searchParams: URLSearchParams
): Partial<TableConfig> => {
  const config: Partial<TableConfig> = {
    filters: {},
  };

  const search = searchParams.get("search");
  if (search) config.search = search;

  const sortBy = searchParams.get("sortBy");
  if (sortBy) config.sortBy = sortBy;

  const sort = searchParams.get("sort");
  if (sort && (sort === "asc" || sort === "desc")) config.sort = sort;

  const page = searchParams.get("page");
  if (page) {
    const pageNum = parseInt(page, 10);
    if (!isNaN(pageNum) && pageNum > 0) config.page = pageNum;
  }

  const pageSize = searchParams.get("pageSize");
  if (pageSize) {
    const pageSizeNum = parseInt(pageSize, 10);
    if (!isNaN(pageSizeNum) && pageSizeNum > 0) config.pageSize = pageSizeNum;
  }

  // Parse filters
  for (const [key, value] of searchParams.entries()) {
    if (key.startsWith("filter_") && value) {
      const filterKey = key.replace("filter_", "");
      if (config.filters) {
        config.filters[filterKey] = value;
      }
    }
  }

  return config;
};

/**
 * Merges two table configs, with the second one taking precedence
 */
export const mergeTableConfigs = (
  base: TableConfig,
  override: Partial<TableConfig>
): TableConfig => ({
  ...base,
  ...override,
  filters: {
    ...base.filters,
    ...override.filters,
  },
});

/**
 * Resets specific parts of table config while preserving others
 */
export const resetTableConfig = (
  config: TableConfig,
  resetOptions: {
    search?: boolean;
    sort?: boolean;
    filters?: boolean;
    pagination?: boolean;
  } = {}
): TableConfig => {
  const newConfig = { ...config };

  if (resetOptions.search) {
    newConfig.search = "";
  }

  if (resetOptions.sort) {
    newConfig.sortBy = "";
    newConfig.sort = "";
  }

  if (resetOptions.filters) {
    newConfig.filters = {};
  }

  if (resetOptions.pagination) {
    newConfig.page = 1;
  }

  return newConfig;
};
