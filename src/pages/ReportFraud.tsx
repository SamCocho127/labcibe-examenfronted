import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2, Loader2, Shield, List } from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { createFraudReport } from "@/lib/api";
import { REPORTS_LIST_URL } from "@/lib/config";
import type { FraudFormData } from "@/types/fraud";

type FormErrors = Partial<Record<keyof FraudFormData, string>>;

const initialForm: FraudFormData = {
  impostorDetails: "",
  contactInfo: "",
  comments: "",
};

function validateForm(data: FraudFormData): FormErrors {
  const errors: FormErrors = {};

  if (!data.impostorDetails.trim()) {
    errors.impostorDetails =
      "Indique el nombre de la persona, empresa o entidad que decía ser el impostor.";
  }

  if (!data.contactInfo.trim()) {
    errors.contactInfo =
      "Indique el número, correo o usuario desde el que contactó.";
  }

  return errors;
}

const ReportFraud = () => {
  const [form, setForm] = useState<FraudFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: keyof FraudFormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    if (submitError) setSubmitError(null);
    if (isSuccess) setIsSuccess(false);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitError(null);
    setIsSuccess(false);

    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      await createFraudReport({
        impostorDetails: form.impostorDetails.trim(),
        contactInfo: form.contactInfo.trim(),
        comments: form.comments.trim(),
      });
      setForm(initialForm);
      setIsSuccess(true);
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Ocurrió un error al enviar el reporte."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClassName = (hasError: boolean) =>
    `w-full rounded-xl border px-4 py-3 text-base text-foreground bg-background transition-colors outline-none focus:ring-2 focus:ring-primary/20 ${
      hasError
        ? "border-destructive focus:border-destructive"
        : "border-border focus:border-primary"
    }`;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main id="main-content" className="flex-1 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                to="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Volver al inicio
              </Link>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                  Reportar un fraude
                </h1>
                <p className="text-muted-foreground text-base sm:text-lg">
                  Complete el formulario para registrar un intento de estafa.
                  Su reporte ayuda a proteger a la comunidad.
                </p>
              </div>
            </div>

            {isSuccess && (
              <div
                role="status"
                className="mb-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-4 text-green-800"
              >
                <CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Reporte enviado correctamente</p>
                  <p className="text-sm mt-1">
                    Gracias por compartir la información. Puede consultar los
                    reportes registrados en la{" "}
                    <Link
                      to={REPORTS_LIST_URL}
                      className="underline font-medium"
                    >
                      lista pública de reportes
                    </Link>
                    .
                  </p>
                </div>
              </div>
            )}

            {submitError && (
              <div
                role="alert"
                className="mb-6 rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-4 text-destructive"
              >
                <p className="font-semibold">No se pudo enviar el reporte</p>
                <p className="text-sm mt-1">{submitError}</p>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-soft space-y-8"
            >
              <section>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Detalles sobre el impostor
                </h2>
                <p className="text-muted-foreground mb-6">
                  Comparta lo que sepa sobre quién decía ser el estafador.
                </p>

                <div className="space-y-6">
                  <div>
                    <label
                      htmlFor="impostorDetails"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Nombre de la persona, empresa o entidad que decía ser el
                      impostor{" "}
                      <span className="text-destructive" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="impostorDetails"
                      name="impostorDetails"
                      type="text"
                      value={form.impostorDetails}
                      onChange={(e) =>
                        handleChange("impostorDetails", e.target.value)
                      }
                      className={inputClassName(!!errors.impostorDetails)}
                      placeholder="Ej. Juan Pérez, Banco Nacional, Soporte técnico"
                      aria-invalid={!!errors.impostorDetails}
                      aria-describedby={
                        errors.impostorDetails
                          ? "impostorDetails-error"
                          : undefined
                      }
                    />
                    {errors.impostorDetails && (
                      <p
                        id="impostorDetails-error"
                        className="mt-2 text-sm text-destructive"
                      >
                        {errors.impostorDetails}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contactInfo"
                      className="block text-sm font-semibold text-foreground mb-2"
                    >
                      Número, correo o usuario desde el que contactó{" "}
                      <span className="text-destructive" aria-hidden="true">
                        *
                      </span>
                    </label>
                    <input
                      id="contactInfo"
                      name="contactInfo"
                      type="text"
                      value={form.contactInfo}
                      onChange={(e) =>
                        handleChange("contactInfo", e.target.value)
                      }
                      className={inputClassName(!!errors.contactInfo)}
                      placeholder="Ej. 8888-8888, correo@sospechoso.com"
                      aria-invalid={!!errors.contactInfo}
                      aria-describedby={
                        errors.contactInfo ? "contactInfo-error" : undefined
                      }
                    />
                    {errors.contactInfo && (
                      <p
                        id="contactInfo-error"
                        className="mt-2 text-sm text-destructive"
                      >
                        {errors.contactInfo}
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-bold text-foreground mb-2">
                  Comentarios del caso
                </h2>
                <p className="text-muted-foreground mb-4">
                  Describa lo ocurrido: mensaje recibido, enlaces, montos
                  solicitados u otros detalles relevantes.
                </p>
                <textarea
                  id="comments"
                  name="comments"
                  rows={5}
                  value={form.comments}
                  onChange={(e) => handleChange("comments", e.target.value)}
                  className={`${inputClassName(false)} resize-y min-h-[120px]`}
                  placeholder="Ej. Recibí un SMS indicando que mi cuenta estaba bloqueada..."
                />
              </section>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="sm:flex-1 h-12 rounded-full text-base font-semibold"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Enviando reporte...
                    </>
                  ) : (
                    "Enviar reporte"
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="h-12 rounded-full"
                  asChild
                >
                  <Link to={REPORTS_LIST_URL}>
                    <List className="w-4 h-4 mr-2" />
                    Ver reportes
                  </Link>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportFraud;
