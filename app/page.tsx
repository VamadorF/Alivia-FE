import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Mock data
const featuredServices = [
  {
    id: 1,
    title: "Consulta Médica General",
    description: "Atención médica general para cualquier condición de salud",
    duration: "30 min",
    price: "$45.000",
    available: true,
  },
  {
    id: 2,
    title: "Control de Especialidad",
    description: "Seguimiento con médicos especialistas",
    duration: "45 min",
    price: "$65.000",
    available: true,
  },
  {
    id: 3,
    title: "Telemedicina",
    description: "Consulta médica online desde tu hogar",
    duration: "20 min",
    price: "$35.000",
    available: true,
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
            <Button variant="outline">Iniciar Sesión</Button>
            <Button>Agendar Cita</Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <section className="mb-16 text-center">
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
          <div className="flex gap-4 justify-center">
            <Button size="lg" className="bg-gradient-to-r from-sky-600 to-indigo-600">
              Agendar Consulta
            </Button>
            <Button size="lg" variant="outline">
              Ver Especialidades
            </Button>
          </div>
        </section>

        {/* Upcoming Appointments */}
        {upcomingAppointments.length > 0 && (
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-6 text-sky-900">Próximas Citas</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingAppointments.map((appointment) => (
                <Card key={appointment.id} className="border-sky-100 shadow-lg hover:shadow-xl transition-shadow">
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
                      <span>📅 {appointment.date}</span>
                      <span>🕐 {appointment.time}</span>
                    </div>
                    <div className="mt-4 flex gap-2">
                      <Button size="sm" variant="outline">Ver Detalles</Button>
                      <Button size="sm" variant="ghost">Reagendar</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {/* Featured Services */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-sky-900">Servicios Destacados</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredServices.map((service) => (
              <Card key={service.id} className="border-indigo-100 shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader>
                  <CardTitle className="text-indigo-900">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-muted-foreground">⏱️ {service.duration}</span>
                    <span className="text-lg font-bold text-indigo-600">{service.price}</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600" disabled={!service.available}>
                    {service.available ? "Agendar Ahora" : "No Disponible"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Quick Stats */}
        <section className="grid md:grid-cols-4 gap-6">
          <Card className="text-center border-sky-100">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-sky-600">50+</CardTitle>
              <CardDescription>Médicos Especialistas</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-indigo-100">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-indigo-600">1000+</CardTitle>
              <CardDescription>Pacientes Atendidos</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-sky-100">
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-sky-600">24/7</CardTitle>
              <CardDescription>Disponibilidad</CardDescription>
            </CardHeader>
          </Card>
          <Card className="text-center border-indigo-100">
            <CardHeader>
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
