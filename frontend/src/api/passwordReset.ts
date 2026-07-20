import api, { handleApiError } from "./client.ts";

export async function requestPasswordReset(email: string) {
  try {
    const { data } = await api.post('password-reset/request', { email });
    return data;
  } catch (error) {
    handleApiError(error);
  }
}

export async function resetPassword(token: string, newPassword: string) {
  try {
    const { data } = await api.post('password-reset/reset', { token, newPassword });
    return data;
  } catch (error) {
    handleApiError(error);
  }
}
