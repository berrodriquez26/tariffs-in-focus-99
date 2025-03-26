
import { useToast, toast } from "@/hooks/use-toast";

// Create a function to show success toasts
const showSuccessToast = (title: string, description?: string) => {
  return toast({
    title,
    description,
    variant: "default",
  });
};

// Create a function to show error toasts but only in development
const showErrorToast = (title: string, description?: string) => {
  // In production, only log to console
  console.error(`${title}: ${description}`);
  
  // In development, show toast
  if (process.env.NODE_ENV === 'development') {
    return toast({
      title,
      description,
      variant: "destructive",
    });
  }
};

export { useToast, toast, showSuccessToast, showErrorToast };
