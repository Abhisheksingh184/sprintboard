import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { updateProjectSchema } from "@/validations/project.schema";

type ProjectRouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  context: ProjectRouteContext,
) {
  try {
    const { id } = await context.params;

    const project = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!project) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    return NextResponse.json({
      data: project,
    });
  } catch (error) {
    console.error("GET /api/projects/[id] failed", error);

    return NextResponse.json(
      { error: "Failed to fetch project." },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: ProjectRouteContext,
) {
  try {
    const { id } = await context.params;
    const body = await request.json();
    const parsed = updateProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid project data.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const existingProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    const project = await prisma.project.update({
      where: {
        id,
      },
      data: {
        name: parsed.data.name,
        description:
          parsed.data.description === undefined
            ? undefined
            : parsed.data.description || null,
      },
    });

    return NextResponse.json({
      data: project,
    });
  } catch (error) {
    console.error("PATCH /api/projects/[id] failed", error);

    return NextResponse.json(
      { error: "Failed to update project." },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: Request,
  context: ProjectRouteContext,
) {
  try {
    const { id } = await context.params;

    const existingProject = await prisma.project.findUnique({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return NextResponse.json(
        { error: "Project not found." },
        { status: 404 },
      );
    }

    await prisma.project.delete({
      where: {
        id,
      },
    });

    return NextResponse.json({
      message: "Project deleted successfully.",
    });
  } catch (error) {
    console.error("DELETE /api/projects/[id] failed", error);

    return NextResponse.json(
      { error: "Failed to delete project." },
      { status: 500 },
    );
  }
}