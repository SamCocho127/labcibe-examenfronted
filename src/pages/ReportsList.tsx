import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  Shield,
  PlusCircle,
} from "lucide-react";

import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { getFraudReports } from "@/lib/api";
import { REPORTS_URL } from "@/lib/config";
import type { Fraud } from "@/types/fraud";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("es-CR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

const ReportsList = () => {
  const [reports, setReports] = useState<Fraud[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadReports() {
      setIsLoading(true);
      setError(null);

      try {
        const data = await getFraudReports();
        if (!cancelled) setReports(data);
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error
              ? err.message
              : "No se pudieron cargar los reportes."
          );
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    loadReports();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main id="main-content" className="flex-1 mt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver al inicio
                </Link>
                <div className="flex items-start gap-4">
                  <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">
                      Reportes registrados
                    </h1>
                    <p className="text-muted-foreground">
                      Consulta pública de fraudes reportados por la comunidad.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="rounded-full" asChild>
                <Link to={REPORTS_URL}>
                  <PlusCircle className="w-4 h-4 mr-2" />
                  Nuevo reporte
                </Link>
              </Button>
            </div>

            {isLoading && (
              <div
                role="status"
                className="flex items-center justify-center gap-3 rounded-2xl border border-border bg-card py-16 text-muted-foreground"
              >
                <Loader2 className="w-6 h-6 animate-spin" />
                Cargando reportes...
              </div>
            )}

            {!isLoading && error && (
              <div
                role="alert"
                className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-5 text-destructive"
              >
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <div>
                  <p className="font-semibold">Error al cargar los reportes</p>
                  <p className="text-sm mt-1">{error}</p>
                </div>
              </div>
            )}

            {!isLoading && !error && reports.length === 0 && (
              <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
                <p className="text-lg font-semibold text-foreground mb-2">
                  Aún no hay reportes registrados
                </p>
                <p className="text-muted-foreground mb-6">
                  Sea el primero en reportar un intento de fraude.
                </p>
                <Button className="rounded-full" asChild>
                  <Link to={REPORTS_URL}>Reportar un fraude</Link>
                </Button>
              </div>
            )}

            {!isLoading && !error && reports.length > 0 && (
              <div className="space-y-4">
                {reports.map((report) => (
                  <article
                    key={report.id}
                    className="rounded-2xl border border-border bg-card p-6 shadow-soft"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                          Reporte #{report.id}
                        </p>
                        <h2 className="text-xl font-bold text-foreground">
                          {report.impostorDetails}
                        </h2>
                      </div>
                      <time
                        dateTime={report.createdAt}
                        className="text-sm text-muted-foreground whitespace-nowrap"
                      >
                        {formatDate(report.createdAt)}
                      </time>
                    </div>

                    <dl className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <dt className="text-sm font-semibold text-foreground mb-1">
                          Contacto del impostor
                        </dt>
                        <dd className="text-muted-foreground break-all">
                          {report.contactInfo}
                        </dd>
                      </div>
                      {report.comments && (
                        <div className="sm:col-span-2">
                          <dt className="text-sm font-semibold text-foreground mb-1">
                            Comentarios
                          </dt>
                          <dd className="text-muted-foreground whitespace-pre-wrap">
                            {report.comments}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </article>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReportsList;
