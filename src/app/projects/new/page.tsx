"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { ProjectForm } from "@/components/projects/project-form";

type ProjectFormValues = {
  name: string;
  description: string;
};

export default function NewProjectPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  async function handleCreateProject(values: ProjectFormValues) {
    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(result.error ?? "Failed to create project.");
        return;
      }

      router.push("/projects");
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong while creating the project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl">
        <Link
          href="/projects"
          className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          Back to projects
        </Link>

        <div className="mt-8 border-b border-slate-800 pb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            SprintBoard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Create project</h1>
          <p className="mt-2 text-slate-300">
            Add a new software project to start organizing work.
          </p>
        </div>

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <ProjectForm
            submitLabel="Create Project"
            isSubmitting={isSubmitting}
            errorMessage={errorMessage}
            onSubmit={handleCreateProject}
          />
        </div>
      </section>
    </main>
  );
}