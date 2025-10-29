import { time, timeStamp } from "console";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export type ConfiguratorItem = {
  order?: number;
  itemId?: string;
  itemName?: string;
  active?: boolean;
};

export const getConfigurators = async (configType : string) => {
  const res = await fetch(`${BASE_URL}/configurators/${configType}`);
  if (!res.ok) throw new Error("Failed to fetch configurator");
  return res.json();
};

export const createConfigurator = async (configType : string, configurator: ConfiguratorItem) => {
    if(!configurator.itemId){
        configurator.itemId = Date.now().toString();
    }
    configurator.active = true;
  const res = await fetch(`${BASE_URL}/configurators/${configType}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(configurator),
  });

  if (!res.ok) throw new Error("Failed to create configurator");
  return res.json();
};