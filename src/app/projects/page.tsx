import Link from "next/link";
import { ProjectActions } from "@/components/projects/project-actions";

type Project = {
  id: string;
  name: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
};

async function getProjects(): Promise<Project[]> {
  const response = await fetch("http://localhost:3000/api/projects", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch projects.");
  }

  const result = (await response.json()) as { data: Project[] };

  return result.data;
}

export default async function ProjectsPage() {
  let projects: Project[] = [];
  let errorMessage: string | null = null;

  try {
    projects = await getProjects();
  } catch (error) {
    errorMessage =
      error instanceof Error ? error.message : "Something went wrong.";
  }

  return (
    <main className="min-h-screen bg-slate-950 px-6 py-10 text-white">
      <section className="mx-auto max-w-5xl">
        <div className="flex flex-col gap-4 border-b border-slate-800 pb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              SprintBoard
            </p>
            <h1 className="mt-2 text-3xl font-bold">Projects</h1>
            <p className="mt-2 text-slate-300">
              Manage all software projects from one place.
            </p>
          </div>

          <Link
            href="/projects/new"
            className="rounded-md bg-cyan-400 px-5 py-3 text-center text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            New Project
          </Link>
        </div>

        {errorMessage ? (
          <div className="mt-8 rounded-md border border-red-900 bg-red-950/40 p-4 text-red-200">
            {errorMessage}
          </div>
        ) : null}

        {!errorMessage && projects.length === 0 ? (
          <div className="mt-8 rounded-md border border-slate-800 bg-slate-900 p-8 text-center">
            <h2 className="text-xl font-semibold">No projects yet</h2>
            <p className="mt-2 text-slate-300">
              Create your first project to start tracking work.
            </p>
            <Link
              href="/projects/new"
              className="mt-5 inline-block rounded-md bg-cyan-400 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              Create Project
            </Link>
          </div>
        ) : null}

        {!errorMessage && projects.length > 0 ? (
          <div className="mt-8 grid gap-4">
            {projects.map((project) => (
              <article
                key={project.id}
                className="rounded-lg border border-slate-800 bg-slate-900 p-5"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{project.name}</h2>
                    <p className="mt-2 text-sm text-slate-300">
                      {project.description || "No description provided."}
                    </p>
                  </div>

                  <ProjectActions projectId={project.id} />
                </div>
              </article>
            ))}
          </div>
        ) : null}
      </section>
    </main>
  );
}