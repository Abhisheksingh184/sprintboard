import Link from "next/link";
import { notFound } from "next/navigation";

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

type ProjectPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function getProject(id: string): Promise<Project | null> {
  const response = await fetch(`http://localhost:3000/api/projects/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch project.");
  }

  const result = (await response.json()) as { data: Project };

  return result.data;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { id } = await params;
  const project = await getProject(id);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
        >
          Back to projects
        </Link>

        <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="flex flex-col gap-4 border-b border-slate-800 pb-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
                Project detail
              </p>
              <h1 className="mt-2 text-3xl font-bold">{project.name}</h1>
            </div>

            <Link
              href={`/projects/${project.id}/edit`}
              className="rounded-md bg-cyan-400 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Edit Project
            </Link>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-widest text-slate-400">
                Description
              </h2>
              <p className="mt-2 text-slate-200">
                {project.description || "No description provided."}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
                <h2 className="text-sm font-semibold text-slate-400">
                  Created
                </h2>
                <p className="mt-2 text-slate-200">
                  {formatDate(project.createdAt)}
                </p>
              </div>

              <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
                <h2 className="text-sm font-semibold text-slate-400">
                  Last updated
                </h2>
                <p className="mt-2 text-slate-200">
                  {formatDate(project.updatedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}