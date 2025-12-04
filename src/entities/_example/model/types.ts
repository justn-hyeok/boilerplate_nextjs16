import { z } from "zod";

// API 응답 스키마
export const exampleSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
});

export const exampleListSchema = z.array(exampleSchema);

// 타입 추출
export type Example = z.infer<typeof exampleSchema>;
export type ExampleList = z.infer<typeof exampleListSchema>;

// 생성/수정용 스키마
export const createExampleSchema = exampleSchema.omit({
  id: true,
  createdAt: true,
});

export type CreateExampleInput = z.infer<typeof createExampleSchema>;
