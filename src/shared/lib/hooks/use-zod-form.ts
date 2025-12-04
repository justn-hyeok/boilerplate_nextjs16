import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import type { UseFormProps } from "react-hook-form";
import type { ZodType, z } from "zod";

export function useZodForm<TSchema extends ZodType>(
  schema: TSchema,
  options?: Omit<UseFormProps<z.infer<TSchema>>, "resolver">
) {
  return useForm<z.infer<TSchema>>({
    resolver: zodResolver(schema),
    ...options,
  });
}
