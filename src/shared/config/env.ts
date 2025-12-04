import { z } from "zod";

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8080"),
  NEXT_PUBLIC_WS_URL: z.string().url().default("ws://localhost:8080/ws"),
});

const parseEnv = () => {
  const parsed = envSchema.safeParse({
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_WS_URL: process.env.NEXT_PUBLIC_WS_URL,
  });

  if (!parsed.success) {
    console.error("❌ Invalid environment variables:", parsed.error.flatten().fieldErrors);
    throw new Error("Invalid environment variables");
  }

  return {
    API_URL: parsed.data.NEXT_PUBLIC_API_URL,
    WS_URL: parsed.data.NEXT_PUBLIC_WS_URL,
  } as const;
};

export const env = parseEnv();
