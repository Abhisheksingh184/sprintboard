import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { createProjectSchema } from "@/validations/project.schema";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      data: projects,
    });
  } catch (error) {
    console.error("GET /api/projects failed", error);

    return NextResponse.json(
      { error: "Failed to fetch projects." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid project data.",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const project = await prisma.project.create({
      data: {
        name: parsed.data.name,
        description: parsed.data.description || null,
      },
    });

    return NextResponse.json(
      {
        data: project,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("POST /api/projects failed", error);

    return NextResponse.json(
      { error: "Failed to create project." },
      { status: 500 },
    );
  }
}