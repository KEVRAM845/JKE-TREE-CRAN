// Integration boundary for the Request Service form. RequestForm.tsx only
// calls submitServiceRequest() — it never talks to a backend directly — so
// wiring up a real destination (Jobber's API, a CRM webhook, an email
// endpoint, etc.) means editing the body of this one function. No UI changes
// are required on either side of that swap.

export interface ServiceRequestPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  description: string;
  urgency: string;
  contactMethod: string;
  photos: File[];
}

export interface ServiceRequestResult {
  ok: boolean;
  error?: string;
}

export async function submitServiceRequest(
  payload: ServiceRequestPayload,
): Promise<ServiceRequestResult> {
  // TODO(backend): no live integration is connected yet. Replace this
  // simulated delay with a real request (e.g. `fetch("/api/jobber-lead", ...)`)
  // once a backend or Jobber's API is available. Keep the ServiceRequestPayload
  // shape and the ServiceRequestResult return contract so RequestForm.tsx
  // doesn't need to change.
  await new Promise((resolve) => setTimeout(resolve, 600));
  void payload;
  return { ok: true };
}
