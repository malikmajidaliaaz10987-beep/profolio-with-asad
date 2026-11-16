export async function parseApiJsonResponse<T = any>(response: Response): Promise<T> {
  const rawText = await response.text();
  if (!rawText) {
    if (!response.ok) {
      throw new Error(`Request failed (${response.status}). Please try again.`);
    }
    return {} as T;
  }

  try {
    return JSON.parse(rawText) as T;
  } catch {
    if (!response.ok) {
      throw new Error(
        `Server returned an unexpected response (${response.status}). Please try again or contact us directly via WhatsApp.`
      );
    }
    throw new Error('Unexpected response format from server. Please try again.');
  }
}
