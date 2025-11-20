"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (!email.trim()) {
      newErrors.email = "El email es obligatorio";
    } else if (!validateEmail(email)) {
      newErrors.email = "Formato de email inválido";
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
    } else if (password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const payload = {
      email,
      password,
      rememberMe,
    };

    console.log("Login Payload:", payload);
    
    // Mock authentication - check if user exists in localStorage
    const storedEmail = localStorage.getItem("userEmail");
    const storedUserType = localStorage.getItem("userType");
    
    if (storedEmail === email) {
      // User found, redirect based on type
      const userType = storedUserType || "patient"; // default to patient if not found
      localStorage.setItem("isAuthenticated", "true");
      
      if (userType === "patient") {
        window.location.href = "/dashboard/patient";
      } else if (userType === "professional") {
        window.location.href = "/dashboard/professional";
      }
    } else {
      // Mock: for demonstration, default to patient dashboard
      // In real implementation, this would be handled by backend
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userType", "patient");
      alert("Inicio de sesión exitoso. Revisa la consola para ver los datos.");
      window.location.href = "/dashboard/patient";
    }
  };

  const isFormValid = () => {
    return (
      email.trim() &&
      validateEmail(email) &&
      password.length >= 8
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-white to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-sky-500 to-indigo-600" />
            <span className="text-xl font-bold bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Alivia
            </span>
          </div>
          <Button variant="ghost" onClick={() => window.location.href = "/"}>
            Volver al Inicio
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
              Iniciar Sesión
            </h1>
            <p className="text-muted-foreground">
              Accede a tu cuenta de AlivIA
            </p>
          </div>

          <Card className="border-sky-100 shadow-lg">
            <CardHeader>
              <CardTitle className="text-sky-900">Bienvenido de vuelta</CardTitle>
              <CardDescription>Ingresa tus credenciales para continuar</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="correo@ejemplo.com"
                    aria-label="Email"
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña *</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    aria-label="Contraseña"
                  />
                  {errors.password && (
                    <p className="text-xs text-red-500">{errors.password}</p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <Label htmlFor="rememberMe" className="cursor-pointer font-normal text-sm">
                      Recordarme
                    </Label>
                  </div>
                  <Button variant="link" className="text-sm p-0 h-auto" type="button">
                    ¿Olvidaste tu contraseña?
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-sky-600 to-indigo-600"
                  disabled={!isFormValid()}
                >
                  Iniciar Sesión
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  ¿No tienes una cuenta?{" "}
                  <Button
                    variant="link"
                    className="p-0 h-auto text-sky-600"
                    type="button"
                    onClick={() => window.location.href = "/register"}
                  >
                    Regístrate aquí
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Additional Options */}
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground mb-4">O inicia sesión con</p>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="flex-1" type="button">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Google
              </Button>
              <Button variant="outline" className="flex-1" type="button">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-muted-foreground">
          <p>&copy; 2025 Alivia. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
