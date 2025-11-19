import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

// Mock data - Tipos de servicios médicos
const medicalServices = [
  {
    id: 1,
    category: "Medicina General",
    services: [
      {
        id: "mg-1",
        name: "Consulta Médica General",
        description: "Atención médica para diagnóstico y tratamiento de condiciones comunes",
        duration: "30 min",
        price: "$45.000",
        badge: "Popular",
      },
      {
        id: "mg-2",
        name: "Chequeo Médico Anual",
        description: "Evaluación completa de salud con análisis preventivos",
        duration: "60 min",
        price: "$120.000",
        badge: "Recomendado",
      },
    ],
  },
  {
    id: 2,
    category: "Especialidades",
    services: [
      {
        id: "es-1",
        name: "Cardiología",
        description: "Evaluación y seguimiento de salud cardiovascular",
        duration: "45 min",
        price: "$75.000",
        badge: null,
      },
      {
        id: "es-2",
        name: "Dermatología",
        description: "Cuidado de la piel y tratamiento de afecciones cutáneas",
        duration: "30 min",
        price: "$65.000",
        badge: null,
      },
      {
        id: "es-3",
        name: "Oftalmología",
        description: "Cuidado ocular y corrección de problemas de visión",
        duration: "40 min",
        price: "$70.000",
        badge: "Nueva",
      },
    ],
  },
  {
    id: 3,
    category: "Servicios Digitales",
    services: [
      {
        id: "sd-1",
        name: "Telemedicina",
        description: "Consulta médica online desde cualquier lugar",
        duration: "20 min",
        price: "$35.000",
        badge: "Online",
      },
      {
        id: "sd-2",
        name: "Recetas Digitales",
        description: "Renovación de recetas médicas de forma remota",
        duration: "15 min",
        price: "$25.000",
        badge: "Rápido",
      },
    ],
  },
];

export default function ServiciosPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Header */}
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
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Nuestros Servicios
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Amplia gama de servicios médicos diseñados para cuidar tu salud y bienestar
          </p>
        </section>

        {/* Services by Category */}
        {medicalServices.map((category) => (
          <section key={category.id} className="mb-12">
            <h2 className="text-3xl font-bold mb-6 text-sky-900">{category.category}</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.services.map((service) => (
                <Card
                  key={service.id}
                  className="border-sky-100 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-indigo-900">{service.name}</CardTitle>
                      {service.badge && (
                        <Badge className="bg-sky-100 text-sky-700 border-sky-200">
                          {service.badge}
                        </Badge>
                      )}
                    </div>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-muted-foreground">⏱️ {service.duration}</span>
                      <span className="text-lg font-bold text-indigo-600">{service.price}</span>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-sky-500 to-indigo-600">
                      Agendar Ahora
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className="mt-16 text-center">
          <Card className="border-indigo-200 bg-gradient-to-br from-sky-50 to-indigo-50">
            <CardHeader>
              <CardTitle className="text-3xl text-sky-900">¿No encuentras lo que buscas?</CardTitle>
              <CardDescription className="text-lg">
                Contáctanos y te ayudaremos a encontrar el servicio médico que necesitas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 justify-center">
                <Button size="lg" className="bg-gradient-to-r from-sky-600 to-indigo-600">
                  Contactar Ahora
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/">Volver al Inicio</Link>
                </Button>
              </div>
            </CardContent>
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
