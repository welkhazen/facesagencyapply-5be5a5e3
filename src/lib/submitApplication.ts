export type FormData = {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;

  dateOfBirth?: string;
  nationality?: string;

  mobileCountryCode?: string;
  mobile?: string;

  whatsappCountryCode?: string;
  whatsapp?: string;

  instagram?: string;

  governorate?: string;
  district?: string;
  area?: string;

  // Add more fields here if your form collects them
};

async function sendToHubSpotViaVercel(formData: FormData) {
  const payload = {
    email: formData.email,
    firstName: formData.firstName,
    middleName: formData.middleName ?? null,
    lastName: formData.lastName,

    dateOfBirth: formData.dateOfBirth ?? null,
    nationality: formData.nationality ?? null,

    mobile: formData.mobile ? `${formData.mobileCountryCode ?? ""} ${formData.mobile}`.trim() : null,
    whatsapp: formData.whatsapp ? `${formData.whatsappCountryCode ?? ""} ${formData.whatsapp}`.trim() : null,

    instagram: formData.instagram ?? null,

    governorate: formData.governorate ?? null,
    district: formData.district ?? null,
    area: formData.area ?? null,
  };

  const res = await fetch("https://facesagencyapply.vercel.app/api/hubspot-submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();

  if (!res.ok) {
    // This makes the real error visible in Lovable logs/UI
    throw new Error(`HubSpot submit failed (${res.status}): ${text}`);
  }

  // Return JSON if it is JSON, otherwise return raw text
  try {
    return JSON.parse(text);
  } catch {
    return { ok: true, raw: text };
  }
}

export async function submitApplication(formData: FormData): Promise<{ success: boolean; error?: string }> {
  try {
    await sendToHubSpotViaVercel(formData);
    return { success: true };
  } catch (err: any) {
    console.error("submitApplication error:", err);
    return { success: false, error: err?.message || "Submission failed" };
  }
}
