import { API_BASE_URL } from "@/lib/config";
import type { Fraud, FraudFormData } from "@/types/fraud";

const fraudEndpoint = `${API_BASE_URL}/api/fraud`;

async function parseErrorMessage(response: Response): Promise<string> {
  try {
    const data = await response.json();
    if (typeof data.message === "string") return data.message;
    if (data.errors) {
      const messages = Object.values(data.errors).flat();
      if (messages.length > 0) return messages.join(" ");
    }
  } catch {
    // ignore parse errors
  }
  return "No se pudo completar la solicitud. Intente nuevamente.";
}

export async function createFraudReport(
  payload: FraudFormData
): Promise<Fraud> {
  const response = await fetch(fraudEndpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}

export async function getFraudReports(): Promise<Fraud[]> {
  const response = await fetch(fraudEndpoint);

  if (!response.ok) {
    throw new Error(await parseErrorMessage(response));
  }

  return response.json();
}
