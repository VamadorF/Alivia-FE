import Link from "next/link";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Alivia
            </span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost">Servicios</Button>
            <Button variant="ghost">Médicos</Button>
            <Button variant="ghost">Contacto</Button>
          </nav>
          <div className="flex gap-2">
            <Link href="/login">
              <Button variant="outline">Iniciar Sesión</Button>
            </Link>
            <Link href="/register">
              <Button>Crear Cuenta</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center animate-fade-in-up">
          <Badge className="mb-4 bg-sky-100 text-sky-700 border-sky-200">
            Plataforma de Salud Digital
          </Badge>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Tu Salud, Nuestra Prioridad
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Accede a servicios médicos de calidad desde la comodidad de tu hogar. 
            Agenda consultas, revisa tu historial y mantente saludable.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-sky-600 to-indigo-600 transition-all duration-300 ease-out hover:scale-105">
              Agendar Consulta
            </Button>
            <Link href="/login">
              <Button size="lg" variant="outline" className="transition-all duration-300 ease-out hover:scale-105">
                Iniciar Sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="lg" className="transition-all duration-300 ease-out hover:scale-105">
                Crear Cuenta
              </Button>
            </Link>
          </div>
        </section>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <section className="mb-16 animate-fade-in-up animation-delay-200">
            <h2 className="text-3xl font-bold mb-6 text-sky-900">Próximas Citas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-sky-100 shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-105">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-sky-900">{appointment.doctor}</CardTitle>
                        <CardDescription>{appointment.specialty}</CardDescription>
                      </div>
                      <Badge variant="outline" className="border-sky-200 text-sky-700">
                        Confirmada
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4 text-sm text-muted-foreground">
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
                      <Button size="sm" variant="outline" className="transition-all duration-300 ease-out hover:scale-105">Ver Detalles</Button>
                      <Button size="sm" variant="ghost" className="transition-all duration-300 ease-out hover:scale-105">Reagendar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Featured Services */}
        <section className="mb-16 animate-fade-in-up animation-delay-400">
          <h2 className="text-3xl font-bold mb-6 text-sky-900">Servicios Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((service) => {
              const ServiceIcon = 
                service.icon === "stethoscope" ? Stethoscope :
                service.icon === "activity" ? Activity :
                service.icon === "video" ? Video : Stethoscope;
              
              return (
                <Card key={service.id} className="border-indigo-100 shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:scale-105">
                  <CardHeader>
                    <div className="mb-3 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                      <ServiceIcon className="h-6 w-6 text-indigo-600" />
                    </div>
                    <CardTitle className="text-indigo-900">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {service.duration}
                      </span>
                      <span className="text-lg font-bold text-indigo-600">{service.price}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600 transition-all duration-300 ease-out hover:scale-105" disabled={!service.available}>
                      {service.available ? "Agendar Ahora" : "No Disponible"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Lo que encontrarás Section */}
        <section className="mb-16 animate-fade-in-up animation-delay-600">
          <h2 className="text-3xl font-bold mb-6 text-center text-sky-900">Lo que encontrarás</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Panel de control de medicamentos */}
            <Card className="border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
                  <Pill className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-lg text-sky-900">Panel de control de medicamentos</CardTitle>
                <CardDescription className="font-semibold text-indigo-700">
                  Medicamentos bajo control
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Recordatorios, renovaciones y alertas críticas.
                </p>
              </CardContent>
            </Card>

            {/* Calendario de salud */}
            <Card className="border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                  <CalendarDays className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-lg text-indigo-900">Calendario de salud</CardTitle>
                <CardDescription className="font-semibold text-sky-700">
                  Calendario de salud integral
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Citas, tomas y licencias en un solo lugar.
                </p>
              </CardContent>
            </Card>

            {/* Chat de diario */}
            <Card className="border-sky-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-sky-100 to-sky-200 flex items-center justify-center">
                  <MessageCircle className="h-8 w-8 text-sky-600" />
                </div>
                <CardTitle className="text-lg text-sky-900">Chat de diario</CardTitle>
                <CardDescription className="font-semibold text-indigo-700">
                  Mi Historia (diario conversado)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Registra tu día y recibe contención real.
                </p>
              </CardContent>
            </Card>

            {/* Foros de apoyo */}
            <Card className="border-indigo-100 shadow-lg hover:shadow-xl transition-all duration-300 ease-out hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-200 flex items-center justify-center">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-lg text-indigo-900">Foros de apoyo</CardTitle>
                <CardDescription className="font-semibold text-sky-700">
                  Foros con propósito
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground">
                  Comunidades moderadas y seguras.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid md:grid-cols-4 gap-6 animate-fade-in-up animation-delay-800">
          <Card className="text-center border-sky-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">
                <Stethoscope className="h-6 w-6 text-sky-600" />
              </div>
              <CardTitle className="text-4xl font-bold text-sky-600">50+</CardTitle>
              <CardDescription>Médicos Especialistas</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-indigo-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <UserCheck className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-4xl font-bold text-indigo-600">1000+</CardTitle>
              <CardDescription>Pacientes Atendidos</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-sky-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-sky-100 flex items-center justify-center">
                <Activity className="h-6 w-6 text-sky-600" />
              </div>
              <CardTitle className="text-4xl font-bold text-sky-600">24/7</CardTitle>
              <CardDescription>Disponibilidad</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-indigo-100 transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg">
            <CardHeader>
              <div className="mx-auto mb-2 h-12 w-12 rounded-xl bg-indigo-100 flex items-center justify-center">
                <Heart className="h-6 w-6 text-indigo-600" />
              </div>
              <CardTitle className="text-4xl font-bold text-indigo-600">98%</CardTitle>
              <CardDescription>Satisfacción</CardDescription>
            </CardHeader>
          </Card>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Alivia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
