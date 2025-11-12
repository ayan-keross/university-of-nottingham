import { PipelineProject } from "@/app/strategic-planning/pipeline/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getPipelineProjects = async () => {
  const res = await fetch(`${BASE_URL}/pipeline-projects/`);
  if (!res.ok) throw new Error("Failed to fetch pipeline projects");
  return res.json();
};

export const createPipelineProject = async (pipelineProject:PipelineProject) => {
  const res = await fetch(`${BASE_URL}/pipeline-projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pipelineProject),
  });
    if (!res.ok) throw new Error("Failed to create pipeline project");
    return res.json();
};

export const updatePipelineProject = async (projectIdentifier: string, pipelineProject: PipelineProject) => {
  const res = await fetch(`${BASE_URL}/pipeline-projects/${projectIdentifier}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pipelineProject),
  });
    if (!res.ok) throw new Error("Failed to update pipeline project");
    return res.json();
};

export const sendToDirectorApproval = async (projectIdentifier: string) => {
  const res = await fetch(`${BASE_URL}/pipeline-projects/${projectIdentifier}/send-to-director-approval`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
    if (!res.ok) throw new Error("Failed to send pipeline project to director approval");
    return res.json();
}

export const sendToInflight = async (projectIdentifier: string) => {
  const res = await fetch(`${BASE_URL}/pipeline-projects/${projectIdentifier}/send-to-inflight`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
    if (!res.ok) throw new Error("Failed to send director approval project to inflight");
    return res.json();
}

export const sendBackToPipeline = async (projectIdentifier: string) => {
  const res = await fetch(`${BASE_URL}/pipeline-projects/${projectIdentifier}/send-back-to-pipeline`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
  });
    if (!res.ok) throw new Error("Failed to send back director approval project to pipeline");
    return res.json();
}