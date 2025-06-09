import { PaginatedResponse, TableConfig } from "@/Types/GlobalTypes";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseServerSideTableProps<T> {
  initialConfig?: Partial<TableConfig>;
  fetcher: (config: TableConfig) => Promise<PaginatedResponse<T>>;
  onError?: (error: Error) => void;
}

interface UseServerSideTableReturn<T> {
  config: TableConfig;
  data: PaginatedResponse<T>;
  loading: boolean;
  error: string | null;
  setConfig: (newConfig: Partial<TableConfig>) => void;
  refetch: () => void;
}

const defaultConfig: TableConfig = {
  search: "",
  sortBy: "",
  sort: "",
  filters: {},
  page: 1,
  pageSize: 10,
};

export function useServerSideTable<T>({
  initialConfig = {},
  fetcher,
  onError,
}: UseServerSideTableProps<T>): UseServerSideTableReturn<T> {
  const [config, setConfigState] = useState<TableConfig>({
    ...defaultConfig,
    ...initialConfig,
  });

  const [data, setData] = useState<PaginatedResponse<T>>({
    content: [],
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: defaultConfig.pageSize,
    isLast: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Store refs to prevent recreating functions
  const fetcherRef = useRef(fetcher);
  const onErrorRef = useRef(onError);

  // Update refs when props change
  useEffect(() => {
    fetcherRef.current = fetcher;
  }, [fetcher]);

  useEffect(() => {
    onErrorRef.current = onError;
  }, [onError]);
  // Config setter
  const setConfig = useCallback((newConfig: Partial<TableConfig>) => {
    setConfigState((prev) => ({ ...prev, ...newConfig }));
  }, []);

  // Refetch function
  const refetch = useCallback(() => {
    // Create inline function to avoid dependency issues
    const refetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcherRef.current(config);
        setData(result);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "An error occurred";
        setError(errorMessage);
        if (onErrorRef.current) {
          onErrorRef.current(
            err instanceof Error ? err : new Error(errorMessage)
          );
        }
        setData({
          content: [],
          currentPage: 1,
          totalPages: 1,
          totalItems: 0,
          pageSize: config.pageSize,
          isLast: true,
        });
      } finally {
        setLoading(false);
      }
    };

    refetchData();
  }, [config]); // Effect to fetch data when config changes
  useEffect(() => {
    let isCancelled = false;

    const fetchDataForConfig = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await fetcherRef.current(config);
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          const errorMessage =
            err instanceof Error ? err.message : "An error occurred";
          setError(errorMessage);
          if (onErrorRef.current) {
            onErrorRef.current(
              err instanceof Error ? err : new Error(errorMessage)
            );
          }
          setData({
            content: [],
            currentPage: 1,
            totalPages: 1,
            totalItems: 0,
            pageSize: config.pageSize,
            isLast: true,
          });
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    fetchDataForConfig();

    return () => {
      isCancelled = true;
    };
  }, [config]); // Only depend on config

  return {
    config,
    data,
    loading,
    error,
    setConfig,
    refetch,
  };
}
