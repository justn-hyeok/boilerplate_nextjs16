import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@shared/api";

import { exampleListSchema, exampleSchema } from "../model/types";

import type { Example, CreateExampleInput } from "../model/types";

// Query Keys - 타입 안전한 키 관리
export const exampleKeys = {
  all: ["examples"] as const,
  lists: () => [...exampleKeys.all, "list"] as const,
  list: (filters: Record<string, unknown>) =>
    [...exampleKeys.lists(), filters] as const,
  details: () => [...exampleKeys.all, "detail"] as const,
  detail: (id: string) => [...exampleKeys.details(), id] as const,
};

// Queries
export function useExamples() {
  return useQuery({
    queryKey: exampleKeys.lists(),
    queryFn: async () => {
      const data = await api.get<unknown>("/examples");
      return exampleListSchema.parse(data); // 런타임 검증
    },
  });
}

export function useExample(id: string) {
  return useQuery({
    queryKey: exampleKeys.detail(id),
    queryFn: async () => {
      const data = await api.get<unknown>(`/examples/${id}`);
      return exampleSchema.parse(data);
    },
    enabled: !!id,
  });
}

// Mutations
export function useCreateExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: CreateExampleInput) =>
      api.post<Example>("/examples", input),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}

export function useDeleteExample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => api.delete(`/examples/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: exampleKeys.lists() });
    },
  });
}
