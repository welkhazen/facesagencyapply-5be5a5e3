import { supabase } from "@/integrations/supabase/client";

export async function submitApplication(formData: any): Promise<{ success: boolean; error?: string }> {
  try {
    const payload = {
      first_name: formData.firstName ?? "TEST",
      last_name: formData.lastName ?? "TEST",
      email: formData.email ?? "test@example.com",
    };

    const { data, error } = await supabase.from("applications").insert(payload).select("id, created_at").single();

    if (error) {
      alert("SUPABASE INSERT FAILED: " + error.message);
      console.error("Error submitting application:", error);
      return { success: false, error: error.message };
    }

    alert("Inserted! ID: " + data.id);
    return { success: true };
  } catch (err: any) {
    alert("UNEXPECTED ERROR: " + (err?.message || String(err)));
    console.error("Unexpected error:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
