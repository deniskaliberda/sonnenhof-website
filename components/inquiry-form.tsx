'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Zod Schema für Validierung
const formSchema = z.object({
  name: z.string().min(2, "Name muss mindestens 2 Zeichen lang sein"),
  email: z.string().email("Bitte geben Sie eine gültige E-Mail-Adresse ein"),
  checkIn: z.date({
    message: "Bitte wählen Sie ein Anreisedatum",
  }),
  checkOut: z.date({
    message: "Bitte wählen Sie ein Abreisedatum",
  }),
  adults: z.number().min(1, "Mindestens 1 Erwachsener erforderlich"),
  children: z.number().min(0),
  accommodation: z.enum(["ferienwohnung", "zimmer"], {
    message: "Bitte wählen Sie eine Unterkunftsart",
  }),
  message: z.string().optional(),
}).refine((data) => data.checkOut > data.checkIn, {
  message: "Abreise muss nach Anreise liegen",
  path: ["checkOut"],
});

type FormValues = z.infer<typeof formSchema>;

export function InquiryForm() {
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      adults: 2,
      children: 0,
      message: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      // Daten für Formspree vorbereiten
      const formData = {
        name: data.name,
        email: data.email,
        _replyto: data.email, // Formspree nutzt dies für "Reply-To"
        checkIn: format(data.checkIn, "dd.MM.yyyy", { locale: de }),
        checkOut: format(data.checkOut, "dd.MM.yyyy", { locale: de }),
        adults: data.adults,
        children: data.children,
        accommodation: data.accommodation === "ferienwohnung" ? "Ferienwohnung" : "Gästezimmer",
        message: data.message || "Keine zusätzlichen Anmerkungen",
        _subject: `Neue Anfrage von ${data.name}`, // E-Mail-Betreff
      };

      // An Formspree senden
      const response = await fetch("https://formspree.io/f/mbdypdvo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Erfolgsmeldung anzeigen
        toast.success("Vielen Dank!", {
          description: "Wir prüfen Ihren Wunschtermin und melden uns persönlich bei Ihnen.",
          duration: 5000,
        });
        
        // Formular zurücksetzen
        form.reset();
        setAdults(2);
        setChildren(0);
      } else {
        throw new Error("Formular konnte nicht gesendet werden");
      }
    } catch (error) {
      // Fehlermeldung anzeigen
      toast.error("Ein Fehler ist aufgetreten", {
        description: "Bitte versuchen Sie es erneut oder kontaktieren Sie uns telefonisch.",
        duration: 5000,
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border-none shadow-2xl bg-white">
      <CardHeader className="text-center pb-8">
        <CardTitle className="font-serif text-4xl md:text-5xl text-forest mb-4">
          Ihre Auszeit anfragen
        </CardTitle>
        <CardDescription className="text-lg text-text-primary/80">
          Füllen Sie das Formular aus und wir melden uns schnellstmöglich bei Ihnen
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Name & E-Mail */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Ihr vollständiger Name" {...field} className="h-12" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">E-Mail *</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder="ihre@email.de" 
                        {...field} 
                        className="h-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Zeitraum (Check-in & Check-out) */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="checkIn"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-forest font-semibold">Anreise *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="h-12 pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: de })
                            ) : (
                              <span>Datum wählen</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="checkOut"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="text-forest font-semibold">Abreise *</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="h-12 pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: de })
                            ) : (
                              <span>Datum wählen</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Gäste (Erwachsene & Kinder) */}
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="adults"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Erwachsene *</FormLabel>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newValue = Math.max(1, adults - 1);
                          setAdults(newValue);
                          field.onChange(newValue);
                        }}
                        className="h-12 w-12"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <Input
                          type="number"
                          value={adults}
                          readOnly
                          className="h-12 text-center text-lg font-semibold"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newValue = adults + 1;
                          setAdults(newValue);
                          field.onChange(newValue);
                        }}
                        className="h-12 w-12"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="children"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-forest font-semibold">Kinder</FormLabel>
                    <div className="flex items-center gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newValue = Math.max(0, children - 1);
                          setChildren(newValue);
                          field.onChange(newValue);
                        }}
                        className="h-12 w-12"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 text-center">
                        <Input
                          type="number"
                          value={children}
                          readOnly
                          className="h-12 text-center text-lg font-semibold"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          const newValue = children + 1;
                          setChildren(newValue);
                          field.onChange(newValue);
                        }}
                        className="h-12 w-12"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Unterkunftsart */}
            <FormField
              control={form.control}
              name="accommodation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-forest font-semibold">Ich interessiere mich für *</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder="Bitte wählen Sie eine Option" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ferienwohnung">Ferienwohnung</SelectItem>
                      <SelectItem value="zimmer">Gästezimmer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Nachricht */}
            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-forest font-semibold">Ihre Nachricht (optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Besondere Wünsche, Fragen oder Anmerkungen..."
                      className="min-h-[120px] resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-forest hover:bg-forest/90"
            >
              Anfrage senden
            </Button>

            <p className="text-sm text-text-primary/60 text-center">
              * Pflichtfelder. Ihre Daten werden vertraulich behandelt und nur zur Bearbeitung Ihrer Anfrage verwendet.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
