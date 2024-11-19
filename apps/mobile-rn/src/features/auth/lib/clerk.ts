export type ClerkError = {
  status: number;
  clerkError: boolean;
  errors: Array<{ code: string }>;
};

export const CLERK_ERROR_MESSAGES: Record<string, string> = {
  form_param_format_invalid: "Invalid format. Please check your email.",
  form_identifier_not_found: "Account not found.",
};

export function isClerkError(error: unknown): error is Error & ClerkError {
  return error instanceof Error && "clerkError" in error;
}

export const getClerkErrorMessage = (
  error: Error & ClerkError,
  defaultMessage: string
): string => {
  const errorCode = error.errors[0]?.code;

  if (!CLERK_ERROR_MESSAGES[errorCode]) {
    console.warn(`Unhandled Clerk error code: ${errorCode}`);
  }

  return CLERK_ERROR_MESSAGES[errorCode] || defaultMessage;
};
