import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import { 
  Calendar, 
  Clock, 
  Pill, 
  CalendarDays, 
  MessageCircle, 
  Users, 
  Heart,
  Activity,
  Stethoscope,
  Video,
  UserCheck
} from "lucide-react";

// Mock data
const featuredServices = [
  {
    id: 1,
    title: "Consulta Médica General",
    description: "Atención médica general para cualquier condición de salud",
    duration: "30 min",
    price: "$45.000",
    available: true,
    icon: "stethoscope",
  },
  {
    id: 2,
    title: "Control de Especialidad",
    description: "Seguimiento con médicos especialistas",
    duration: "45 min",
    price: "$65.000",
    available: true,
    icon: "activity",
  },
  {
    id: 3,
    title: "Telemedicina",
    description: "Consulta médica online desde tu hogar",
    duration: "20 min",
    price: "$35.000",
    available: true,
    icon: "video",
  },
];

const upcomingAppointments = [
  {
    id: 1,
    doctor: "Dr. María González",
    specialty: "Medicina General",
    date: "25 Nov 2025",
    time: "10:00 AM",
  },
  {
    id: 2,
    doctor: "Dr. Carlos Ruiz",
    specialty: "Cardiología",
    date: "28 Nov 2025",
    time: "2:30 PM",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      {/* Header */}
      <header className="border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
              Alivia
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="/servicios">
              <Button variant="ghost">Servicios</Button>
            </Link>
            <Button variant="ghost">Médicos</Button>
            <Button variant="ghost">Contacto</Button>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-500 dark:to-indigo-500">Crear Cuenta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center animate-fade-in-up">
          <Badge className="mb-4 bg-sky-100 text-sky-700 border-sky-200 dark:bg-sky-900/30 dark:text-sky-300 dark:border-sky-700">
            Plataforma de Salud Digital
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Tu Salud, Nuestra Prioridad
          </h1>
          <p className="text-xl text-muted-foreground dark:text-slate-300 max-w-2xl mx-auto mb-8">
            Accede a servicios médicos de calidad desde la comodidad de tu hogar. 
            Agenda consultas, revisa tu historial y mantente saludable.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" className="bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-500 dark:to-indigo-500 hover:scale-105 transition-transform duration-300">
                Agendar Consulta
              </Button>
            </Link>
            <Link href="/servicios">
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform duration-300">
                Ver Especialidades
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="hover:scale-105 transition-transform duration-300">
                Iniciar Sesión
              </Button>
            </Link>
          </div>
        </section>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <section className="mb-16 animate-fade-in-up animation-delay-100">
            <h2 className="text-3xl font-bold mb-6 text-sky-900 dark:text-sky-300">Próximas Citas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-sky-100 dark:border-slate-700 dark:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sky-900 dark:text-sky-300">{appointment.doctor}</CardTitle>
                        <CardDescription className="dark:text-slate-400">{appointment.specialty}</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-sky-200 text-sky-700 dark:border-sky-700 dark:text-sky-400">
                        Confirmada
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-muted-foreground dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {appointment.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {appointment.time}
                      </span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline" className="hover:scale-105 transition-transform duration-200">Ver Detalles</Button>
                      <Button size="sm" variant="ghost" className="hover:scale-105 transition-transform duration-200">Reagendar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Featured Services */}
        <section className="mb-16 animate-fade-in-up animation-delay-200">
          <h2 className="text-3xl font-bold mb-6 text-sky-900 dark:text-sky-300">Servicios Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((service) => {
              const ServiceIcon = 
                service.icon === "stethoscope" ? Stethoscope :
                service.icon === "activity" ? Activity :
                service.icon === "video" ? Video : Stethoscope;
              
              return (
                <Card key={service.id} className="border-indigo-100 dark:border-slate-700 dark:bg-slate-800 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                  <CardHeader>
                    <div className="mb-3 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40 flex items-center justify-center">
                      <ServiceIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <CardTitle className="text-indigo-900 dark:text-indigo-300">{service.title}</CardTitle>
                    <CardDescription className="dark:text-slate-400">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground dark:text-slate-400">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </span>
                      <span className="text-lg font-bold text-indigo-600 dark:text-indigo-400">{service.price}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 dark:from-sky-500 dark:to-indigo-500 hover:scale-105 transition-transform duration-200" disabled={!service.available}>
                      {service.available ? "Agendar Ahora" : "No Disponible"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Lo que encontrarás Section */}
        <section className="mb-16 animate-fade-in-up animation-delay-300">
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-900 dark:text-sky-300">Lo que encontrarás</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Panel de control de medicamentos */}
            <Card className="border-sky-100 dark:border-slate-700 dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/40 flex items-center justify-center">
                  <Pill className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                </div>
                <CardTitle className="text-lg text-sky-900 dark:text-sky-300">Panel de control de medicamentos</CardTitle>
                <CardDescription className="font-semibold text-indigo-700 dark:text-indigo-400">
                  Medicamentos bajo control
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Recordatorios, renovaciones y alertas críticas.
                </p>
              </CardContent>
            </Card>

            {/* Calendario de salud */}
            <Card className="border-indigo-100 dark:border-slate-700 dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40 flex items-center justify-center">
                  <CalendarDays className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-lg text-indigo-900 dark:text-indigo-300">Calendario de salud</CardTitle>
                <CardDescription className="font-semibold text-sky-700 dark:text-sky-400">
                  Calendario de salud integral
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Citas, tomas y licencias en un solo lugar.
                </p>
              </CardContent>
            </Card>

            {/* Chat de diario */}
            <Card className="border-sky-100 dark:border-slate-700 dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 dark:from-sky-900/40 dark:to-sky-800/40 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-sky-600 dark:text-sky-400" />
                </div>
                <CardTitle className="text-lg text-sky-900 dark:text-sky-300">Chat de diario</CardTitle>
                <CardDescription className="font-semibold text-indigo-700 dark:text-indigo-400">
                  Mi Historia (diario conversado)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Registra tu día y recibe contención real.
                </p>
              </CardContent>
            </Card>

            {/* Foros de apoyo */}
            <Card className="border-indigo-100 dark:border-slate-700 dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all hover:scale-105 duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 dark:from-indigo-900/40 dark:to-indigo-800/40 flex items-center justify-center">
                  <Users className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                </div>
                <CardTitle className="text-lg text-indigo-900 dark:text-indigo-300">Foros de apoyo</CardTitle>
                <CardDescription className="font-semibold text-sky-700 dark:text-sky-400">
                  Foros con propósito
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground dark:text-slate-400">
                  Comunidades moderadas y seguras.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-400">
          <Card className="text-center border-sky-100 dark:border-slate-700 dark:bg-slate-800 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-sky-600 dark:text-sky-400">50+</CardTitle>
              <CardDescription className="dark:text-slate-400">Médicos Especialistas</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-indigo-100 dark:border-slate-700 dark:bg-slate-800 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">1000+</CardTitle>
              <CardDescription className="dark:text-slate-400">Pacientes Atendidos</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-sky-100 dark:border-slate-700 dark:bg-slate-800 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center">
                <Activity className="h-6 w-6 text-sky-600 dark:text-sky-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-sky-600 dark:text-sky-400">24/7</CardTitle>
              <CardDescription className="dark:text-slate-400">Disponibilidad</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-indigo-100 dark:border-slate-700 dark:bg-slate-800 hover:scale-105 transition-transform duration-300">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center">
                <Heart className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <CardTitle className="text-4xl font-bold text-indigo-600 dark:text-indigo-400">98%</CardTitle>
              <CardDescription className="dark:text-slate-400">Satisfacción</CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground dark:text-slate-400">
          <p>&copy; 2025 Alivia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
