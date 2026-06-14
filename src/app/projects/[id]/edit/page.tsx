"use client";

import Link from "next/link";
import { notFound, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { ProjectForm } from "@/components/projects/project-form";

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProjectFormValues = {
  name: string;
  description: string;
};

type EditProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default function EditProjectPage({ params }: EditProjectPageProps) {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  useEffect(() => {
    async function loadProject() {
      const { id } = await params;
      setProjectId(id);

      try {
        const response = await fetch(`/api/projects/${id}`);

        if (response.status === 404) {
          notFound();
        }

        const result = (await response.json()) as {
          data?: Project;
          error?: string;
        };

        if (!response.ok || !result.data) {
          setErrorMessage(result.error ?? "Failed to load project.");
          return;
        }

        setProject(result.data);
      } catch {
        setErrorMessage("Something went wrong while loading the project.");
      } finally {
        setIsLoading(false);
      }
    }

    void loadProject();
  }, [params]);

  async function handleUpdateProject(values: ProjectFormValues) {
    if (!projectId) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(undefined);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(result.error ?? "Failed to update project.");
        return;
      }

      router.push(`/projects/${projectId}`);
      router.refresh();
    } catch {
      setErrorMessage("Something went wrong while updating the project.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-2xl">
        <Link
          href={projectId ? `/projects/${projectId}` : "/projects"}
          className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          Back to project
        </Link>

        <div className="mt-8 border-b border-slate-800 pb-6">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            SprintBoard
          </p>
          <h1 className="mt-2 text-3xl font-bold">Edit project</h1>
          <p className="mt-2 text-slate-300">
            Update the name or description for this project.
          </p>
        </div>

        {isLoading ? (
          <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6 text-slate-300">
            Loading project...
          </div>
        ) : null}

        {!isLoading && errorMessage && !project ? (
          <div className="mt-8 rounded-md border border-red-900 bg-red-950/40 p-4 text-red-200">
            {errorMessage}
          </div>
        ) : null}

        {!isLoading && project ? (
          <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
            <ProjectForm
              initialValues={{
                name: project.name,
                description: project.description ?? "",
              }}
              submitLabel="Save Changes"
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
              onSubmit={handleUpdateProject}
            />
          </div>
        ) : null}
      </section>
    </main>
  );
}