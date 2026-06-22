interface Props {
  name: string;
  className?: string;
  src?: string;
}

export function AuthorAvatar({ name, className = "", src = "/perfil.png" }: Props) {
  return (
    <img
      src={src}
      alt={name}
      className={`rounded-full object-cover aspect-square border-2 border-border ${className}`}
    />
  );
}
