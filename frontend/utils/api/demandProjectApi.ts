import { DemandProject } from "@/app/strategic-planning/demand/page";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getDemandProjects = async () => {
  const res = await fetch(`${BASE_URL}/demand-projects/`);
  if (!res.ok) throw new Error("Failed to fetch demand projects");
  return res.json();
};

export const createDemandProject = async (demandProject:DemandProject) => {
  const res = await fetch(`${BASE_URL}/demand-projects/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(demandProject),
  });
    if (!res.ok) throw new Error("Failed to create demand project");
    return res.json();
};

export const updateDemandProject = async (projectIdentifier: string, demandProject: DemandProject) => {
  const res = await fetch(`${BASE_URL}/demand-projects/${projectIdentifier}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(demandProject),
  });
    if (!res.ok) throw new Error("Failed to update demand project");
    return res.json();
};