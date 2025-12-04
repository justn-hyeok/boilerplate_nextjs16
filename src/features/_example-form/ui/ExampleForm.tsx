"use client";

import { useZodForm } from "@shared/lib/hooks";

import { exampleFormSchema } from "../model/schema";

import type { ExampleFormData } from "../model/schema";

interface ExampleFormProps {
  onSubmit: (data: ExampleFormData) => void;
  defaultValues?: Partial<ExampleFormData>;
}

export function ExampleForm({ onSubmit, defaultValues }: ExampleFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useZodForm(exampleFormSchema, { defaultValues });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <label htmlFor="title" className="mb-1 block text-sm font-medium">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className="w-full rounded border px-3 py-2"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="w-full rounded border px-3 py-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="mb-1 block text-sm font-medium">
          Description (optional)
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full rounded border px-3 py-2"
          rows={3}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded bg-gray-900 px-4 py-2 text-white hover:bg-gray-800 disabled:opacity-50"
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
