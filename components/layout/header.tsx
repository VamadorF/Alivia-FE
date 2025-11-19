import Link from "next/link";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  showAuth?: boolean;
}

export function Header({ showAuth = true }: HeaderProps) {
  return (
    <header className="border-b bg-white/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
          <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Alivia
          </span>
        </Link>
        <nav className="hidden md:flex gap-6">
          <Button variant="ghost" asChild>
            <Link href="/servicios">Servicios</Link>
          </Button>
          <Button variant="ghost">Médicos</Button>
          <Button variant="ghost">Contacto</Button>
        </nav>
        {showAuth && (
          <div className="flex gap-2">
            <Button variant="outline">Iniciar Sesión</Button>
            <Button>Agendar Cita</Button>
          </div>
        )}
      </div>
    </header>
  );
}
