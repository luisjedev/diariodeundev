import { Avatar } from "@/components/retroui/Avatar";

interface Props {
  name: string;
  className?: string;
}

/**
 * Envuelve el Avatar de RetroUI en un único árbol de React para poder usarlo
 * desde plantillas .astro (los componentes compuestos con contexto de base-ui
 * no se pueden componer directamente en Astro).
 */
export function AuthorAvatar({ name, className = "" }: Props) {
  return (
    <Avatar className={className}>
      <Avatar.Fallback className="font-head text-xs">
        {name.charAt(0).toUpperCase()}
      </Avatar.Fallback>
    </Avatar>
  );
}
