export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          SprintBoard
        </p>

        <h1 className="max-w-3xl text-4xl font-bold leading-tight sm:text-6xl">
          Manage projects, issues, and team work in one simple dashboard.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          SprintBoard is a full-stack project management app we are building
          step by step with Next.js, TypeScript, Tailwind CSS, PostgreSQL,
          Prisma, and authentication.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <a
            href="#features"
            className="rounded-md bg-cyan-400 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
          >
            View Features
          </a>

          <a
            href="https://github.com"
            className="rounded-md border border-slate-700 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400 hover:text-cyan-400"
          >
            GitHub Repo
          </a>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-5xl px-6 pb-20">
        <h2 className="text-2xl font-bold">What we will build</h2>

        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold text-cyan-400">Projects</h3>
            <p className="mt-2 text-sm text-slate-300">
              Create and manage software projects.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold text-cyan-400">Issues</h3>
            <p className="mt-2 text-sm text-slate-300">
              Track tasks, bugs, priorities, and status.
            </p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900 p-5">
            <h3 className="font-semibold text-cyan-400">Team Roles</h3>
            <p className="mt-2 text-sm text-slate-300">
              Add authentication and role-based permissions later.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}