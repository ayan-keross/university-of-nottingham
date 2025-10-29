const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const getAssets = async () => {
  const res = await fetch(`${BASE_URL}/assets/`);
  if (!res.ok) throw new Error("Failed to fetch assets");
  return res.json();
};

export const createAsset = async (asset) => {
  const res = await fetch(`${BASE_URL}/assets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(asset),
  });

  if (!res.ok) throw new Error("Failed to create asset");
  return res.json();
};

export const uploadAssetFile = async (file, name) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("name", name);

  const res = await fetch(`${BASE_URL}/assets/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Failed to upload file");
  return res.text();
};
