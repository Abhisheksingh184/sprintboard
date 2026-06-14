"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type ProjectActionsProps = {
  projectId: string;
};

export function ProjectActions({ projectId }: ProjectActionsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    setIsDeleting(true);
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/projects/${projectId}`, {
        method: "DELETE",
      });

      const result = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        setErrorMessage(result.error ?? "Failed to delete project.");
        return;
      }

      router.refresh();
    } catch {
      setErrorMessage("Something went wrong while deleting the project.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/projects/${projectId}`}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
        >
          View
        </Link>

        <Link
          href={`/projects/${projectId}/edit`}
          className="rounded-md border border-slate-700 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
        >
          Edit
        </Link>

        <button
          type="button"
          onClick={handleDelete}
          disabled={isDeleting}
          className="rounded-md border border-red-900 px-4 py-2 text-sm font-semibold text-red-300 transition hover:border-red-400 hover:text-red-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>

      {errorMessage ? (
        <p className="mt-3 text-sm text-red-400">{errorMessage}</p>
      ) : null}
    </div>
  );
}