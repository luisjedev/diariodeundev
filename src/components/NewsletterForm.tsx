import { useState } from "react";
import { Input } from "@/components/retroui/Input";
import { Checkbox } from "@/components/retroui/Checkbox";
import { Toaster } from "@/components/retroui/Sonner";
import { Loader } from "@/components/retroui/Loader";
import { toast } from "sonner";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = email.trim();
    if (!value) {
      toast.error("Introduce un correo electrónico válido.");
      return;
    }
    if (!consent) {
      toast.error("Marca la casilla para poder suscribirte.");
      return;
    }

    setLoading(true);
    // Bloqueo mínimo de 0.5s para evitar clicks repetidos y la carrera
    // de suscripciones duplicadas.
    const minDelay = new Promise((resolve) => setTimeout(resolve, 500));
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setEmail("");
        setConsent(false);
        if (data.alreadySubscribed) {
          toast.info(data.message ?? "Este correo ya está suscrito.");
        } else {
          toast.success(data.message ?? "¡Suscripción confirmada!");
        }
      } else {
        toast.error(data.error ?? "Algo ha fallado. Inténtalo de nuevo.");
      }
    } catch {
      toast.error("No hay conexión. Inténtalo de nuevo.");
    } finally {
      await minDelay;
      setLoading(false);
    }
  }

  return (
    <>
      <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit} noValidate>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="tu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-3 bg-background font-sans text-sm text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex shrink-0 items-center justify-center rounded border-2 border-border bg-secondary px-6 py-3 font-head text-sm text-secondary-foreground shadow-[3px_3px_0_0_var(--primary)] transition-all hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <Loader size="sm" aria-label="Enviando…" />
            ) : (
              "Suscribirme →"
            )}
          </button>
        </div>

        <label className="flex items-start gap-2.5 font-sans text-xs text-muted-foreground">
          <Checkbox
            checked={consent}
            onCheckedChange={(value) => setConsent(value === true)}
            className="mt-0.5 shrink-0"
          />
          <span>Acepto recibir correos con novedades del blog.</span>
        </label>
      </form>

      <Toaster position="bottom-right" />
    </>
  );
}
