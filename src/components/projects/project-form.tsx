"use client";

import { FormEvent, useState } from "react";

type ProjectFormValues = {
  name: string;
  description: string;
};

type ProjectFormProps = {
  initialValues?: ProjectFormValues;
  submitLabel: string;
  isSubmitting: boolean;
  errorMessage?: string;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
};

export function ProjectForm({
  initialValues,
  submitLabel,
  isSubmitting,
  errorMessage,
  onSubmit,
}: ProjectFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(
    initialValues?.description ?? "",
  );
  const [fieldError, setFieldError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = name.trim();
    const trimmedDescription = description.trim();

    if (trimmedName.length < 3) {
      setFieldError("Project name must be at least 3 characters long.");
      return;
    }

    setFieldError(null);

    await onSubmit({
      name: trimmedName,
      description: trimmedDescription,
    });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-200"
        >
          Project name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-2 w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          placeholder="Example: SprintBoard MVP"
        />
        {fieldError ? (
          <p className="mt-2 text-sm text-red-400">{fieldError}</p>
        ) : null}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-slate-200"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          rows={5}
          className="mt-2 w-full resize-none rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-400"
          placeholder="What is this project about?"
        />
      </div>

      {errorMessage ? (
        <div className="rounded-md border border-red-900 bg-red-950/40 px-4 py-3 text-sm text-red-200">
          {errorMessage}
        </div>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}