"use client";

import { useRef, useState, type ChangeEvent, type SubmitEvent } from "react";
import { services } from "@/lib/services";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";
import { submitServiceRequest } from "@/lib/submitServiceRequest";

type Urgency = "emergency" | "few-days" | "few-weeks" | "no-rush";
type ContactMethod = "phone" | "text" | "email";

interface RequestFormValues {
  name: string;
  phone: string;
  email: string;
  address: string;
  serviceType: string;
  description: string;
  urgency: Urgency | "";
  contactMethod: ContactMethod | "";
  consent: boolean;
}

type RequiredField = keyof RequestFormValues;
type FormErrors = Partial<Record<RequiredField | "photos", string>>;

const initialValues: RequestFormValues = {
  name: "",
  phone: "",
  email: "",
  address: "",
  serviceType: "",
  description: "",
  urgency: "",
  contactMethod: "",
  consent: false,
};

const REQUIRED_FIELDS: RequiredField[] = [
  "name",
  "phone",
  "email",
  "address",
  "serviceType",
  "description",
  "urgency",
  "contactMethod",
  "consent",
];

const CONTACT_METHOD_LABELS: Record<ContactMethod, string> = {
  phone: "a phone call",
  text: "text message",
  email: "email",
};

const MAX_PHOTOS = 6;
const MAX_PHOTO_SIZE_BYTES = 10 * 1024 * 1024;
const ALLOWED_PHOTO_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_DIGITS_PATTERN = /\d/g;

function validateField(
  field: RequiredField,
  values: RequestFormValues,
): string | undefined {
  switch (field) {
    case "name":
      return values.name.trim().length < 2 ? "Please enter your full name." : undefined;
    case "phone": {
      const digits = values.phone.match(PHONE_DIGITS_PATTERN)?.length ?? 0;
      return digits < 10 ? "Please enter a valid phone number." : undefined;
    }
    case "email":
      return EMAIL_PATTERN.test(values.email)
        ? undefined
        : "Please enter a valid email address.";
    case "address":
      return values.address.trim().length < 5
        ? "Please enter the property address."
        : undefined;
    case "serviceType":
      return values.serviceType ? undefined : "Please select a service.";
    case "description":
      return values.description.trim().length < 10
        ? "Please describe the job in a bit more detail."
        : undefined;
    case "urgency":
      return values.urgency ? undefined : "Please select an urgency level.";
    case "contactMethod":
      return values.contactMethod
        ? undefined
        : "Please select a preferred contact method.";
    case "consent":
      return values.consent
        ? undefined
        : "Consent is required before we can contact you.";
  }
}

export default function RequestForm() {
  const [values, setValues] = useState<RequestFormValues>(initialValues);
  const [photos, setPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">(
    "idle",
  );
  // Honeypot: a field real visitors never see or fill in. Bots that
  // auto-fill every input tend to fill this one, so a non-empty value is
  // treated as spam and the submission is dropped silently (see handleSubmit).
  const [honeypot, setHoneypot] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const completedCount = REQUIRED_FIELDS.filter(
    (field) => !validateField(field, values),
  ).length;
  const progressPct = Math.round((completedCount / REQUIRED_FIELDS.length) * 100);

  function updateField<K extends keyof RequestFormValues>(
    field: K,
    value: RequestFormValues[K],
  ) {
    setValues((prev) => ({ ...prev, [field]: value }));
    // Clear the field's error as the user corrects it; it re-checks on blur/submit.
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleBlur(field: RequiredField) {
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values) }));
  }

  function handlePhotoChange(event: ChangeEvent<HTMLInputElement>) {
    const files = Array.from(event.target.files ?? []);
    if (files.length === 0) return;

    const combined = [...photos, ...files].slice(0, MAX_PHOTOS);

    if (photos.length + files.length > MAX_PHOTOS) {
      setErrors((prev) => ({
        ...prev,
        photos: `You can attach up to ${MAX_PHOTOS} photos.`,
      }));
    } else {
      const invalidType = files.find(
        (file) => !ALLOWED_PHOTO_TYPES.includes(file.type),
      );
      const tooLarge = files.find((file) => file.size > MAX_PHOTO_SIZE_BYTES);

      if (invalidType) {
        setErrors((prev) => ({
          ...prev,
          photos: "Photos must be JPG, PNG, WEBP, or HEIC files.",
        }));
      } else if (tooLarge) {
        setErrors((prev) => ({
          ...prev,
          photos: "Each photo must be 10MB or smaller.",
        }));
      } else {
        setErrors((prev) => ({ ...prev, photos: undefined }));
      }
    }

    setPhotos(combined);
    setPhotoPreviews(combined.map((file) => URL.createObjectURL(file)));
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoPreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }

  function validate(): FormErrors {
    const nextErrors: FormErrors = {};
    for (const field of REQUIRED_FIELDS) {
      const error = validateField(field, values);
      if (error) nextErrors[field] = error;
    }
    return nextErrors;
  }

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    // Silently drop bot submissions instead of validating/processing them —
    // no error shown, so automated fillers get no signal their field mattered.
    if (honeypot.trim().length > 0) {
      setStatus("success");
      return;
    }

    const nextErrors = validate();
    setErrors((prev) => ({ ...prev, ...nextErrors }));

    if (Object.values(nextErrors).some(Boolean)) {
      setStatus("error");
      return;
    }

    setStatus("submitting");
    const result = await submitServiceRequest({ ...values, photos });
    setStatus(result.ok ? "success" : "error");
  }

  function handleReset() {
    setValues(initialValues);
    photoPreviews.forEach((url) => URL.revokeObjectURL(url));
    setPhotos([]);
    setPhotoPreviews([]);
    setErrors({});
    setStatus("idle");
  }

  if (status === "success") {
    const firstName = values.name.trim().split(" ")[0] || "there";
    const contactLabel = values.contactMethod
      ? CONTACT_METHOD_LABELS[values.contactMethod]
      : "your preferred method";

    return (
      <div className="rounded-xl border border-forest/20 bg-forest/5 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-forest text-white">
          <svg
            className="h-6 w-6"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m5 13 4 4L19 7" />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-bold text-forest">Request received</h2>
        <p className="mt-2 text-foreground/80">
          Thanks, {firstName}! Your request is in — our office will reach out by{" "}
          {contactLabel} to schedule your free estimate.
        </p>
        <p className="mt-3 text-sm text-foreground/70">
          We typically respond within one business day. For an urgent hazard, call us
          now at{" "}
          <a href={siteConfig.phoneHref} className="font-semibold text-orange">
            {siteConfig.phone}
          </a>
          .
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="mt-6 rounded-full bg-forest px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-forest-light"
        >
          Submit another request
        </button>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={handleSubmit} className="space-y-6">
      <div>
        <div className="flex items-center justify-between text-xs font-medium text-foreground/60">
          <span>Form progress</span>
          <span>
            {completedCount} of {REQUIRED_FIELDS.length} complete
          </span>
        </div>
        <div
          className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-black/10"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={REQUIRED_FIELDS.length}
          aria-valuenow={completedCount}
          aria-label="Required fields completed"
        >
          <div
            className="h-full rounded-full bg-orange transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {status === "error" && (
        <div
          role="alert"
          className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          Please fix the highlighted fields below and try again.
        </div>
      )}

      <p className="text-xs text-foreground/60">
        Fields marked <span className="text-orange">*</span> are required.
      </p>

      <div>
        <h2 className="text-base font-bold text-forest">Your Contact Info</h2>
        <p className="mt-1 text-sm text-foreground/70">
          So we know who we&apos;re talking to and how to reach you back.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full Name" htmlFor="name" error={errors.name} required>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            aria-required
            aria-invalid={errors.name ? true : undefined}
            aria-describedby={errors.name ? "name-error" : undefined}
            className={inputClass(Boolean(errors.name))}
          />
        </Field>

        <Field label="Phone Number" htmlFor="phone" error={errors.phone} required>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            aria-required
            aria-invalid={errors.phone ? true : undefined}
            aria-describedby={errors.phone ? "phone-error" : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
        </Field>

        <Field label="Email Address" htmlFor="email" error={errors.email} required>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            aria-required
            aria-invalid={errors.email ? true : undefined}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass(Boolean(errors.email))}
          />
        </Field>

        <Field
          label="Property Address"
          htmlFor="address"
          error={errors.address}
          required
        >
          <input
            id="address"
            type="text"
            autoComplete="street-address"
            value={values.address}
            onChange={(e) => updateField("address", e.target.value)}
            onBlur={() => handleBlur("address")}
            aria-required
            aria-invalid={errors.address ? true : undefined}
            aria-describedby={errors.address ? "address-error" : undefined}
            className={inputClass(Boolean(errors.address))}
          />
        </Field>
      </div>

      <div>
        <h2 className="text-base font-bold text-forest">About the Job</h2>
        <p className="mt-1 text-sm text-foreground/70">
          The more detail you can give us, the more accurate our estimate will
          be.
        </p>
      </div>

      <Field
        label="Service Needed"
        htmlFor="serviceType"
        error={errors.serviceType}
        required
      >
        <select
          id="serviceType"
          value={values.serviceType}
          onChange={(e) => updateField("serviceType", e.target.value)}
          onBlur={() => handleBlur("serviceType")}
          aria-required
          aria-invalid={errors.serviceType ? true : undefined}
          aria-describedby={errors.serviceType ? "serviceType-error" : undefined}
          className={inputClass(Boolean(errors.serviceType))}
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.slug} value={service.slug}>
              {service.title}
            </option>
          ))}
          <option value="other">Other / Not sure</option>
        </select>
      </Field>

      <Field
        label="Job Description"
        htmlFor="description"
        error={errors.description}
        required
      >
        <textarea
          id="description"
          rows={4}
          value={values.description}
          onChange={(e) => updateField("description", e.target.value)}
          onBlur={() => handleBlur("description")}
          aria-required
          aria-invalid={errors.description ? true : undefined}
          aria-describedby={errors.description ? "description-error" : undefined}
          className={inputClass(Boolean(errors.description))}
          placeholder="Tell us about the tree(s), location on the property, and any access concerns."
        />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Urgency" htmlFor="urgency" error={errors.urgency} required>
          <select
            id="urgency"
            value={values.urgency}
            onChange={(e) =>
              updateField("urgency", e.target.value as RequestFormValues["urgency"])
            }
            onBlur={() => handleBlur("urgency")}
            aria-required
            aria-invalid={errors.urgency ? true : undefined}
            aria-describedby={errors.urgency ? "urgency-error" : "urgency-help"}
            className={inputClass(Boolean(errors.urgency))}
          >
            <option value="">Select urgency</option>
            <option value="emergency">Emergency &ndash; immediate hazard</option>
            <option value="few-days">Within a few days</option>
            <option value="few-weeks">Within a few weeks</option>
            <option value="no-rush">No rush &ndash; just an estimate</option>
          </select>
          <p id="urgency-help" className="mt-1.5 text-xs text-foreground/60">
            Choosing &ldquo;Emergency&rdquo; flags your request so we know to
            prioritize it.
          </p>
        </Field>

        <fieldset>
          <legend className="mb-1.5 block text-sm font-medium text-foreground/80">
            Preferred Contact Method <span className="text-orange">*</span>
          </legend>
          <div
            className="flex flex-wrap gap-4 pt-1"
            role="radiogroup"
            aria-label="Preferred contact method"
            aria-describedby={errors.contactMethod ? "contactMethod-error" : undefined}
          >
            {(
              [
                ["phone", "Phone Call"],
                ["text", "Text Message"],
                ["email", "Email"],
              ] as const
            ).map(([value, label]) => (
              <label key={value} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="contactMethod"
                  value={value}
                  checked={values.contactMethod === value}
                  onChange={() => updateField("contactMethod", value)}
                  className="h-4 w-4 accent-forest"
                />
                {label}
              </label>
            ))}
          </div>
          {errors.contactMethod && (
            <p id="contactMethod-error" className="mt-1.5 text-sm text-red-600">
              {errors.contactMethod}
            </p>
          )}
        </fieldset>
      </div>

      <div>
        <label
          htmlFor="photos"
          className="block text-sm font-medium text-foreground/80"
        >
          Photos (optional)
        </label>
        <input
          ref={fileInputRef}
          id="photos"
          type="file"
          accept={ALLOWED_PHOTO_TYPES.join(",")}
          multiple
          onChange={handlePhotoChange}
          aria-describedby="photos-help"
          className="mt-1.5 block w-full text-sm text-foreground/70 file:mr-4 file:rounded-full file:border-0 file:bg-forest file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-forest-light"
        />
        <p id="photos-help" className="mt-1 text-xs text-foreground/60">
          Optional, but a photo or two of the tree or damage helps us quote
          faster and more accurately. Up to {MAX_PHOTOS} photos, 10MB each
          (JPG, PNG, WEBP, HEIC).
        </p>
        {errors.photos && (
          <p className="mt-1.5 text-sm text-red-600">{errors.photos}</p>
        )}

        {photoPreviews.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-3">
            {photoPreviews.map((src, index) => (
              <div
                key={src}
                className="relative h-20 w-20 overflow-hidden rounded-lg border border-black/10"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- object URLs from local File selections aren't supported by next/image */}
                <img src={src} alt={`Selected photo ${index + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  aria-label={`Remove photo ${index + 1}`}
                  className="absolute right-0.5 top-0.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-sm text-white"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm text-foreground/80">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => updateField("consent", e.target.checked)}
            aria-required
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? "consent-error" : undefined}
            className="mt-0.5 h-4 w-4 accent-forest"
          />
          <span>
            I consent to be contacted about this request by phone, text, or email.{" "}
            <span className="text-orange">*</span>
          </span>
        </label>
        {errors.consent && (
          <p id="consent-error" className="mt-1.5 text-sm text-red-600">
            {errors.consent}
          </p>
        )}
      </div>

      {/* Honeypot: hidden from sighted and keyboard/screen-reader users alike,
          but present in the DOM for bots that blindly fill every field. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={status === "submitting"}
          className="w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "submitting" ? "Sending Your Request…" : "Get My Free Estimate"}
        </Button>
        <p className="text-xs text-foreground/60">
          We typically respond within one business day with next steps. Your
          details are only used to contact you about this request.
        </p>
      </div>
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `mt-1.5 block w-full rounded-lg border px-3.5 py-2.5 text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-forest/30 ${
    hasError ? "border-red-400" : "border-black/15 hover:border-black/30"
  }`;
}

function Field({
  label,
  htmlFor,
  error,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="block text-sm font-medium text-foreground/80">
        {label}
        {required && (
          <span className="text-orange" aria-hidden="true">
            {" "}
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} className="mt-1.5 text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}
