
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { ArrowLeft } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [dialogOpen, setDialogOpen] = React.useState(true);
  const [email, setEmail] = useState('');
  
  useEffect(() => {
    // Open the dialog when the component mounts
    setDialogOpen(true);
  }, []);
  
  const handleAccept = () => {
    setDialogOpen(false);
    navigate('/');
  };

  const handleNotifyMe = () => {
    if (email) {
      toast({
        title: "¡Gracias por tu interés!",
        description: "Te notificaremos cuando la versión completa esté disponible.",
      });
      setDialogOpen(false);
      navigate('/');
    } else {
      toast({
        title: "Se requiere email",
        description: "Por favor ingresa tu correo electrónico para recibir notificaciones.",
        variant: "destructive",
      });
    }
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // In a real application, this would validate and create a new user account
    // For now, we're just showing a success toast and redirecting to login
    toast({
      title: "Registro exitoso",
      description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
    });
    
    navigate('/login');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-slate-50">
      <Dialog open={dialogOpen} onOpenChange={() => {}}>
        <DialogContent hideCloseButton className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Próximamente</DialogTitle>
            <DialogDescription>
              QuienOpina estará disponible en su versión completa próximamente. Mientras tanto, puedes disfrutar de los dashboards gratuitos que brindamos.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Label htmlFor="notify-email">Email para notificaciones</Label>
            <Input 
              id="notify-email" 
              type="email" 
              placeholder="Tu correo electrónico" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1"
            />
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button onClick={handleAccept} variant="outline" className="sm:order-1">
              Volver a inicio
            </Button>
            <Button onClick={handleNotifyMe} className="sm:order-2">
              Notificarme cuando esté disponible
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="w-full max-w-md">
        <div className="flex items-center mb-8">
          <Link to="/" className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            <span>Volver a inicio</span>
          </Link>
        </div>
        
        <Card className="w-full">
          <CardHeader className="space-y-1">
            <div className="flex justify-center mb-4">
              <img 
                src="https://raw.githubusercontent.com/berrodriquez26/SharkAttacks/refs/heads/main/lordlogo.png" 
                alt="QuienOpina Logo" 
                className="h-12 w-auto"
              />
            </div>
            <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
            <CardDescription className="text-center">
              Completa el formulario para registrarte en la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Nombre</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Apellido</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" placeholder="correo@ejemplo.com" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input id="password" type="password" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                  <Input id="confirmPassword" type="password" required />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    required
                  />
                  <Label htmlFor="terms" className="text-sm">
                    Acepto los{" "}
                    <Link to="#" className="text-blue-600 hover:underline">
                      términos y condiciones
                    </Link>
                  </Label>
                </div>
                <Button type="submit" className="w-full">
                  Crear Cuenta
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <div className="relative w-full">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-slate-500">o regístrate con</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline">Google</Button>
              <Button variant="outline">Microsoft</Button>
            </div>
            <div className="text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Inicia sesión
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Register;
