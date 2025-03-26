
import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext";
import { translateAllElements } from "@/utils/translateUtils";

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const { language } = useLanguage();
  
  const handleClick = React.useCallback(() => {
    if (language === 'en') {
      // Wait for content to be visible
      setTimeout(() => {
        // Find the parent AccordionItem
        // Use React.isValidElement to check if ref is an object with current
        if (ref && 'current' in ref && ref.current) {
          const triggerElement = ref.current;
          if (triggerElement) {
            const accordionItem = triggerElement.closest('[data-state]');
            if (accordionItem && accordionItem.getAttribute('data-state') === 'open') {
              // If it's open, find all translatable content and reset translation status
              const contentElements = accordionItem.querySelectorAll('[data-translate]');
              contentElements.forEach(el => {
                el.removeAttribute('data-translated');
              });
              
              // Find elements that might need data-translate attribute
              const potentialElements = accordionItem.querySelectorAll('p, span, h3, h4, li, div:not([role="tabpanel"])');
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
          }
        }
      }, 100);
    }
  }, [language, ref]);
  
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
        onClick={(e) => {
          if (props.onClick) props.onClick(e);
          handleClick();
        }}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => {
  const { language } = useLanguage();
  
  // When content becomes visible, ensure translation
  React.useEffect(() => {
    if (props['data-state'] === 'open' && language === 'en') {
      setTimeout(() => {
        // Use proper type checking for the ref
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
      }, 200);
    }
  }, [props['data-state'], language, ref]);
  
  return (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
})

AccordionContent.displayName = AccordionPrimitive.Content.displayName

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
