import { InflightProject } from "@/app/inflight/inflight-projects/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getInflightProjects = async () => {
  const res = await fetch(`${BASE_URL}/inflight-projects/`);
  if (!res.ok) throw new Error("Failed to fetch inflight projects");
  return res.json();
};

export const createInflightProject = async (inflightProject:InflightProject) => {
  const res = await fetch(`${BASE_URL}/inflight-projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inflightProject),
  });
    if (!res.ok) throw new Error("Failed to create inflight project");
    return res.json();
};

export const updateInflightProject = async (projectIdentifier: string, inflightProject: InflightProject) => {
  const res = await fetch(`${BASE_URL}/inflight-projects/${projectIdentifier}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(inflightProject),
  });
    if (!res.ok) throw new Error("Failed to update inflight project");
    return res.json();
};