"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { UserType, ProfessionType, RegistrationPayload } from "@/types";

export default function RegisterPage() {
  // Identity section
  const [fullName, setFullName] = useState("");
  const [rut, setRut] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");

  // Contact section
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // User Type section
  const [userType, setUserType] = useState<UserType | "">("");
  const [professionType, setProfessionType] = useState<ProfessionType | "">("");
  const [professionalID, setProfessionalID] = useState("");

  // Clinical Information section
  const [mainCondition, setMainCondition] = useState("");
  const [conditions, setConditions] = useState("");
  const [allergies, setAllergies] = useState("");
  const [currentMedications, setCurrentMedications] = useState("");

  // Follow-up Configuration section
  const [baselinePain, setBaselinePain] = useState("5");
  const [reminderMorning, setReminderMorning] = useState(false);
  const [reminderAfternoon, setReminderAfternoon] = useState(false);
  const [reminderEvening, setReminderEvening] = useState(false);
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [notifyPush, setNotifyPush] = useState(false);
  const [notifyPhone, setNotifyPhone] = useState(false);

  // Healthcare Contact section
  const [primaryDoctor, setPrimaryDoctor] = useState("");

  // Consents section
  const [consentTerms, setConsentTerms] = useState(false);
  const [consentDataUse, setConsentDataUse] = useState(false);
  const [consentNotifications, setConsentNotifications] = useState(false);

  // Errors
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateRut = (rut: string): boolean => {
    // Basic Chilean RUT format validation (XX.XXX.XXX-X or XXXXXXXX-X)
    const rutRegex = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$|^[0-9]{7,8}-[0-9kK]$/;
    return rutRegex.test(rut) || /^[0-9]{7,9}$/.test(rut.replace(/[.-]/g, ""));
  };

  const validatePhone = (phone: string): boolean => {
    // Remove non-numeric characters and check if at least 8 digits
    const numericPhone = phone.replace(/\D/g, "");
    return numericPhone.length >= 8;
  };

  const validateBirthDate = (date: string): boolean => {
    if (!date) return false;
    const selectedDate = new Date(date);
    const today = new Date();
    return selectedDate <= today;
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    // Identity validation
    if (!fullName.trim()) newErrors.fullName = "El nombre completo es obligatorio";
    if (!rut.trim()) {
      newErrors.rut = "El RUT es obligatorio";
    } else if (!validateRut(rut)) {
      newErrors.rut = "Formato de RUT inválido";
    }
    if (!birthDate) {
      newErrors.birthDate = "La fecha de nacimiento es obligatoria";
    } else if (!validateBirthDate(birthDate)) {
      newErrors.birthDate = "La fecha no puede ser futura";
    }

    // Contact validation
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
    if (!phone.trim()) {
      newErrors.phone = "El teléfono es obligatorio";
    } else if (!validatePhone(phone)) {
      newErrors.phone = "El teléfono debe tener al menos 8 dígitos";
    }

    // User Type validation
    if (!userType) {
      newErrors.userType = "El tipo de usuario es obligatorio";
    } else if (userType === "professional" && !professionType) {
      newErrors.professionType = "El tipo de profesión es obligatorio";
    }

    // Clinical Information validation - TEMPORARILY DISABLED
    // if (!mainCondition) newErrors.mainCondition = "Debe seleccionar una condición principal";

    // Follow-up Configuration validation - TEMPORARILY DISABLED
    // const painValue = parseInt(baselinePain);
    // if (isNaN(painValue) || painValue < 0 || painValue > 10) {
    //   newErrors.baselinePain = "El valor debe estar entre 0 y 10";
    // }

    // Healthcare Contact validation - TEMPORARILY DISABLED
    // if (!primaryDoctor.trim()) newErrors.primaryDoctor = "El médico tratante es obligatorio";

    // Consents validation
    if (!consentTerms) newErrors.consentTerms = "Debe aceptar los términos y condiciones";
    if (!consentDataUse) newErrors.consentDataUse = "Debe autorizar el tratamiento de datos";
    if (!consentNotifications) newErrors.consentNotifications = "Debe aceptar recibir recordatorios";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // TEMPORARILY DISABLED - reminder times and notification preferences
    // const reminderTimes = [];
    // if (reminderMorning) reminderTimes.push("mañana");
    // if (reminderAfternoon) reminderTimes.push("tarde");
    // if (reminderEvening) reminderTimes.push("noche");

    // const notificationPreferences = [];
    // if (notifyEmail) notificationPreferences.push("email");
    // if (notifyPush) notificationPreferences.push("push");
    // if (notifyPhone) notificationPreferences.push("teléfono");

    const payload: RegistrationPayload = {
      fullName,
      rut,
      birthDate,
      gender: gender || undefined,
      email,
      phone,
      password,
      userType: userType as UserType,
      professionalData: userType === "professional" && professionType
        ? {
            professionType: professionType as ProfessionType,
            professionalID: professionalID || undefined,
          }
        : null,
      // TEMPORARILY DISABLED - clinical information fields
      // mainCondition,
      // conditions,
      // allergies,
      // currentMedications,
      // baselinePain: parseInt(baselinePain),
      // reminderTimes,
      // notificationPreferences,
      // primaryDoctor,
      consents: {
        terms: consentTerms,
        dataUse: consentDataUse,
        notifications: consentNotifications,
      },
    };

    console.log("Payload:", payload);
    
    // Store user data in localStorage (mock authentication)
    localStorage.setItem("userEmail", email);
    localStorage.setItem("userType", userType);
    localStorage.setItem("userName", fullName);
    
    alert("Registro exitoso. Revisa la consola para ver los datos.");
    
    // Redirect to appropriate dashboard based on user type
    if (userType === "patient") {
      window.location.href = "/dashboard/patient";
    } else if (userType === "professional") {
      window.location.href = "/dashboard/professional";
    }
  };

  const isFormValid = () => {
    return (
      fullName.trim() &&
      rut.trim() &&
      validateRut(rut) &&
      birthDate &&
      validateBirthDate(birthDate) &&
      email.trim() &&
      validateEmail(email) &&
      password.length >= 8 &&
      phone.trim() &&
      validatePhone(phone) &&
      userType &&
      (userType === "patient" || (userType === "professional" && professionType)) &&
      // TEMPORARILY DISABLED - clinical information validation
      // mainCondition &&
      // parseInt(baselinePain) >= 0 &&
      // parseInt(baselinePain) <= 10 &&
      // primaryDoctor.trim() &&
      consentTerms &&
      consentDataUse &&
      consentNotifications
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
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">
            Registro de Usuario
          </h1>
          <p className="text-muted-foreground">
            Completa tu perfil para acceder a todas las funcionalidades de AlivIA
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Identity Section */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-sky-900">1. Identidad</CardTitle>
              <CardDescription>Información personal básica</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Nombre Completo *</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ej: Juan Pérez González"
                  aria-label="Nombre completo"
                />
                {errors.fullName && (
                  <p className="text-xs text-red-500">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="rut">RUT *</Label>
                <Input
                  id="rut"
                  value={rut}
                  onChange={(e) => setRut(e.target.value)}
                  placeholder="Ej: 12.345.678-9"
                  aria-label="RUT"
                />
                {errors.rut && (
                  <p className="text-xs text-red-500">{errors.rut}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate">Fecha de Nacimiento *</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  aria-label="Fecha de nacimiento"
                />
                {errors.birthDate && (
                  <p className="text-xs text-red-500">{errors.birthDate}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="gender">Género (Opcional)</Label>
                <Select
                  id="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  aria-label="Género"
                >
                  <option value="">Seleccionar...</option>
                  <option value="F">Femenino</option>
                  <option value="M">Masculino</option>
                  <option value="Otro">Otro</option>
                  <option value="Prefiero no decir">Prefiero no decir</option>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Contact Section */}
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">2. Contacto</CardTitle>
              <CardDescription>Información de contacto y acceso</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
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

              <div className="space-y-2">
                <Label htmlFor="phone">Teléfono *</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+56 9 1234 5678"
                  aria-label="Teléfono"
                />
                {errors.phone && (
                  <p className="text-xs text-red-500">{errors.phone}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* User Type Section */}
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-sky-900">3. Tipo de Usuario</CardTitle>
              <CardDescription>Selecciona el tipo de cuenta que deseas crear</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="userType">Tipo de Usuario *</Label>
                <Select
                  id="userType"
                  value={userType}
                  onChange={(e) => {
                    setUserType(e.target.value as UserType);
                    // Reset professional fields when switching to patient
                    if (e.target.value === "patient") {
                      setProfessionType("");
                      setProfessionalID("");
                    }
                  }}
                  aria-label="Tipo de usuario"
                >
                  <option value="">Seleccionar...</option>
                  <option value="patient">Paciente</option>
                  <option value="professional">Profesional de la Salud</option>
                </Select>
                {errors.userType && (
                  <p className="text-xs text-red-500">{errors.userType}</p>
                )}
              </div>

              {/* Professional fields - shown only when professional is selected */}
              {userType === "professional" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="professionType">Tipo de Profesión *</Label>
                    <Select
                      id="professionType"
                      value={professionType}
                      onChange={(e) => setProfessionType(e.target.value as ProfessionType)}
                      aria-label="Tipo de profesión"
                    >
                      <option value="">Seleccionar...</option>
                      <option value="Médico">Médico</option>
                      <option value="Kinesiólogo">Kinesiólogo</option>
                      <option value="Psicólogo">Psicólogo</option>
                      <option value="Psiquiatra">Psiquiatra</option>
                      <option value="Nutricionista">Nutricionista</option>
                      <option value="Enfermero">Enfermero</option>
                      <option value="Terapeuta Ocupacional">Terapeuta Ocupacional</option>
                      <option value="Otro">Otro</option>
                    </Select>
                    {errors.professionType && (
                      <p className="text-xs text-red-500">{errors.professionType}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="professionalID">Número de Registro Profesional (Opcional)</Label>
                    <Input
                      id="professionalID"
                      value={professionalID}
                      onChange={(e) => setProfessionalID(e.target.value)}
                      placeholder="Ej: Número de RUN profesional, matrícula, etc."
                      aria-label="Número de registro profesional"
                    />
                    <p className="text-xs text-muted-foreground">
                      Ej.: Número de registro, RUN profesional u otro identificador
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Clinical Information Section - TEMPORARILY HIDDEN */}
          {false && (
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-sky-900">3. Información Clínica Inicial</CardTitle>
              <CardDescription>Datos médicos relevantes para tu seguimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="mainCondition">Condición Principal *</Label>
                <Select
                  id="mainCondition"
                  value={mainCondition}
                  onChange={(e) => setMainCondition(e.target.value)}
                  aria-label="Condición principal"
                >
                  <option value="">Seleccionar...</option>
                  <option value="fibromialgia">Fibromialgia</option>
                  <option value="dolor_neuropatico">Dolor Neuropático</option>
                  <option value="lumbalgia_cronica">Lumbalgia Crónica</option>
                  <option value="artritis">Artritis</option>
                  <option value="migraña_cronica">Migraña Crónica</option>
                  <option value="otra">Otra</option>
                </Select>
                {errors.mainCondition && (
                  <p className="text-xs text-red-500">{errors.mainCondition}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="conditions">Condiciones Relevantes</Label>
                <Textarea
                  id="conditions"
                  value={conditions}
                  onChange={(e) => setConditions(e.target.value)}
                  placeholder="Ej: Hipertensión, depresión, ansiedad..."
                  rows={3}
                  aria-label="Condiciones relevantes"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="allergies">Alergias</Label>
                <Textarea
                  id="allergies"
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  placeholder="Ej: Penicilina, polen..."
                  rows={3}
                  aria-label="Alergias"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentMedications">Medicamentos Actuales</Label>
                <Textarea
                  id="currentMedications"
                  value={currentMedications}
                  onChange={(e) => setCurrentMedications(e.target.value)}
                  placeholder="Ej: Ibuprofeno 400mg, Paracetamol..."
                  rows={3}
                  aria-label="Medicamentos actuales"
                />
              </div>
            </CardContent>
          </Card>
          )}

          {/* Follow-up Configuration Section - TEMPORARILY HIDDEN */}
          {false && (
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">4. Configuración de Seguimiento</CardTitle>
              <CardDescription>Personaliza tu experiencia de seguimiento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                <Label htmlFor="baselinePain">Nivel de Dolor Basal (0-10) *</Label>
                <div className="flex items-center gap-4">
                  <Slider
                    id="baselinePain"
                    value={baselinePain}
                    onChange={(e) => setBaselinePain(e.target.value)}
                    min={0}
                    max={10}
                    step={1}
                    aria-label="Nivel de dolor basal"
                  />
                  <span className="text-2xl font-bold text-sky-600 min-w-[2rem] text-center">
                    {baselinePain}
                  </span>
                </div>
                {errors.baselinePain && (
                  <p className="text-xs text-red-500">{errors.baselinePain}</p>
                )}
              </div>

              <div className="space-y-3">
                <Label>Horarios de Recordatorio</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="reminderMorning"
                      checked={reminderMorning}
                      onChange={(e) => setReminderMorning(e.target.checked)}
                    />
                    <Label htmlFor="reminderMorning" className="cursor-pointer">
                      Mañana (8:00 - 12:00)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="reminderAfternoon"
                      checked={reminderAfternoon}
                      onChange={(e) => setReminderAfternoon(e.target.checked)}
                    />
                    <Label htmlFor="reminderAfternoon" className="cursor-pointer">
                      Tarde (12:00 - 18:00)
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="reminderEvening"
                      checked={reminderEvening}
                      onChange={(e) => setReminderEvening(e.target.checked)}
                    />
                    <Label htmlFor="reminderEvening" className="cursor-pointer">
                      Noche (18:00 - 22:00)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Preferencias de Notificación</Label>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="notifyEmail"
                      checked={notifyEmail}
                      onChange={(e) => setNotifyEmail(e.target.checked)}
                    />
                    <Label htmlFor="notifyEmail" className="cursor-pointer">
                      Email
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="notifyPush"
                      checked={notifyPush}
                      onChange={(e) => setNotifyPush(e.target.checked)}
                    />
                    <Label htmlFor="notifyPush" className="cursor-pointer">
                      Notificaciones Push
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="notifyPhone"
                      checked={notifyPhone}
                      onChange={(e) => setNotifyPhone(e.target.checked)}
                    />
                    <Label htmlFor="notifyPhone" className="cursor-pointer">
                      Teléfono (SMS)
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          )}

          {/* Healthcare Contact Section - TEMPORARILY HIDDEN */}
          {false && (
          <Card className="border-sky-100">
            <CardHeader>
              <CardTitle className="text-sky-900">5. Contacto Asistencial</CardTitle>
              <CardDescription>Información de tu equipo médico</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="primaryDoctor">Médico Tratante o Centro *</Label>
                <Input
                  id="primaryDoctor"
                  value={primaryDoctor}
                  onChange={(e) => setPrimaryDoctor(e.target.value)}
                  placeholder="Ej: Dra. María González - Hospital San José"
                  aria-label="Médico tratante"
                />
                {errors.primaryDoctor && (
                  <p className="text-xs text-red-500">{errors.primaryDoctor}</p>
                )}
              </div>
            </CardContent>
          </Card>
          )}

          {/* Consents Section */}
          <Card className="border-indigo-100">
            <CardHeader>
              <CardTitle className="text-indigo-900">4. Consentimientos</CardTitle>
              <CardDescription>Todos los consentimientos son obligatorios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-sky-50">
                  <Checkbox
                    id="consentTerms"
                    checked={consentTerms}
                    onChange={(e) => setConsentTerms(e.target.checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="consentTerms" className="cursor-pointer font-normal">
                      Acepto los términos y condiciones de uso de la plataforma AlivIA *
                    </Label>
                    {errors.consentTerms && (
                      <p className="text-xs text-red-500 mt-1">{errors.consentTerms}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-indigo-50">
                  <Checkbox
                    id="consentDataUse"
                    checked={consentDataUse}
                    onChange={(e) => setConsentDataUse(e.target.checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="consentDataUse" className="cursor-pointer font-normal">
                      Autorizo el tratamiento de mis datos clínicos para fines de seguimiento y personalización del servicio *
                    </Label>
                    {errors.consentDataUse && (
                      <p className="text-xs text-red-500 mt-1">{errors.consentDataUse}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-lg bg-sky-50">
                  <Checkbox
                    id="consentNotifications"
                    checked={consentNotifications}
                    onChange={(e) => setConsentNotifications(e.target.checked)}
                  />
                  <div className="flex-1">
                    <Label htmlFor="consentNotifications" className="cursor-pointer font-normal">
                      Acepto recibir recordatorios y alertas relacionadas con mi seguimiento de salud *
                    </Label>
                    {errors.consentNotifications && (
                      <p className="text-xs text-red-500 mt-1">{errors.consentNotifications}</p>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <Button
              type="submit"
              size="lg"
              className="bg-gradient-to-r from-sky-600 to-indigo-600 px-12"
              disabled={!isFormValid()}
            >
              Crear Cuenta
            </Button>
          </div>
        </form>
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
