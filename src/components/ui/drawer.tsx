
import * as React from "react"
import { Drawer as DrawerPrimitive } from "vaul"
import { useLanguage } from "@/contexts/LanguageContext"
import { translateAllElements } from "@/utils/translateUtils"

import { cn } from "@/lib/utils"

const Drawer = ({
  shouldScaleBackground = true,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Root>) => (
  <DrawerPrimitive.Root
    shouldScaleBackground={shouldScaleBackground}
    {...props}
  />
)
Drawer.displayName = "Drawer"

const DrawerTrigger = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Trigger>
>(({ ...props }, ref) => {
  const { language } = useLanguage();
  
  const handleClick = React.useCallback(() => {
    if (language === 'en') {
      // Wait for drawer to open
      setTimeout(() => {
        // Find all drawer content
        const drawerContent = document.querySelector('.vaul-drawer-content');
        if (drawerContent) {
          // Find elements that need translation
          const elementsToTranslate = drawerContent.querySelectorAll('[data-translate]');
          elementsToTranslate.forEach(el => {
            el.removeAttribute('data-translated');
          });
          
          // Find elements that might need data-translate attribute
          const potentialElements = drawerContent.querySelectorAll('p, span, h3, h4, li, div:not([role="tabpanel"])');
          potentialElements.forEach(el => {
            if (
              el.textContent && 
              el.textContent.trim() !== '' && 
              el.children.length === 0 && 
              !el.hasAttribute('data-translate')
            ) {
              el.setAttribute('data-translate', 'true');
            }
          });
          
          // Translate
          translateAllElements(language);
        }
      }, 300);
    }
  }, [language]);
  
  return (
    <DrawerPrimitive.Trigger
      ref={ref}
      {...props}
      onClick={(e) => {
        if (props.onClick) props.onClick(e);
        handleClick();
      }}
    />
  );
});
DrawerTrigger.displayName = DrawerPrimitive.Trigger.displayName

const DrawerPortal = DrawerPrimitive.Portal

const DrawerClose = DrawerPrimitive.Close

const DrawerOverlay = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Overlay
    ref={ref}
    className={cn("fixed inset-0 z-50 bg-black/80", className)}
    {...props}
  />
))
DrawerOverlay.displayName = DrawerPrimitive.Overlay.displayName

const DrawerContent = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { language } = useLanguage();
  
  // When drawer content appears, ensure translation
  React.useEffect(() => {
    if (language === 'en') {
      setTimeout(() => {
        // Check if ref is an object with current property
        if (ref && 'current' in ref && ref.current) {
          const contentEl = ref.current;
          if (contentEl) {
            // Find elements that need translation
            const elementsToTranslate = contentEl.querySelectorAll('[data-translate]');
            if (elementsToTranslate.length > 0) {
              elementsToTranslate.forEach(el => {
                el.removeAttribute('data-translated');
              });
              translateAllElements(language);
            }
          }
        }
      }, 300);
    }
  }, [ref, language]);
  
  return (
    <DrawerPortal>
      <DrawerOverlay />
      <DrawerPrimitive.Content
        ref={ref}
        className={cn(
          "fixed inset-x-0 bottom-0 z-50 mt-24 flex h-auto flex-col rounded-t-[10px] border bg-background",
          className
        )}
        {...props}
      >
        <div className="mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted" />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  );
})
DrawerContent.displayName = "DrawerContent"

const DrawerHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("grid gap-1.5 p-4 text-center sm:text-left", className)}
    {...props}
  />
)
DrawerHeader.displayName = "DrawerHeader"

const DrawerFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn("mt-auto flex flex-col gap-2 p-4", className)}
    {...props}
  />
)
DrawerFooter.displayName = "DrawerFooter"

const DrawerTitle = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    ref={ref}
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
DrawerTitle.displayName = DrawerPrimitive.Title.displayName

const DrawerDescription = React.forwardRef<
  React.ElementRef<typeof DrawerPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
DrawerDescription.displayName = DrawerPrimitive.Description.displayName

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
