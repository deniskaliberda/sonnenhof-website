'use client';

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";
import { toast } from "sonner";
import { useTranslations, useLocale } from 'next-intl';
import { enUS } from "date-fns/locale/en-US";
import { hasAnalyticsConsent } from "@/components/cookie-consent";

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

function createFormSchema(t: (key: string) => string) {
  return z.object({
    name: z.string().min(2, t('validation.nameMin')),
    email: z.string().email(t('validation.emailInvalid')),
    checkIn: z.date({
      message: t('validation.checkInRequired'),
    }),
    checkOut: z.date({
      message: t('validation.checkOutRequired'),
    }),
    adults: z.number().min(1, t('validation.adultsMin')),
    children: z.number().min(0),
    accommodation: z.enum(["ferienwohnung", "zimmer"], {
      message: t('validation.accommodationRequired'),
    }),
    message: z.string().optional(),
  }).refine((data) => data.checkOut > data.checkIn, {
    message: t('validation.checkOutAfterCheckIn'),
    path: ["checkOut"],
  });
}

export function InquiryForm() {
  const router = useRouter();
  const t = useTranslations('InquiryForm');
  const locale = useLocale();
  const dateLocale = locale === "en" ? enUS : de;
  const formSchema = createFormSchema(t);
  type FormValues = z.infer<typeof formSchema>;
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
      // UTM-Parameter aus der URL auslesen
      const params = new URLSearchParams(window.location.search);
      const utmData = {
        _utm_source: params.get('utm_source') || '',
        _utm_medium: params.get('utm_medium') || '',
        _utm_campaign: params.get('utm_campaign') || '',
        _gclid: params.get('gclid') || '',
      };

      const formData = {
        name: data.name,
        email: data.email,
        _replyto: data.email,
        checkIn: format(data.checkIn, "dd.MM.yyyy", { locale: dateLocale }),
        checkOut: format(data.checkOut, "dd.MM.yyyy", { locale: dateLocale }),
        adults: data.adults,
        children: data.children,
        accommodation: data.accommodation === "ferienwohnung" ? t("apartment") : t("guestRoom"),
        message: data.message || t("noMessage"),
        _subject: t('newInquiry', { name: data.name }),
        ...utmData,
      };

      // An Formspree senden
      const response = await fetch("https://formspree.io/f/mbdypdvo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // GA4 Events → werden über GA4-Import als Google Ads Conversion gezählt
        if (hasAnalyticsConsent() && typeof window.gtag === 'function') {
          const convValue = data.accommodation === 'ferienwohnung' ? 200.0 : 100.0;
          const convLabel = data.accommodation === 'ferienwohnung' ? 'Ferienwohnung' : 'Zimmer';

          // form_submit: Von Google Ads als Conversion importiert
          window.gtag('event', 'form_submit', {
            value: convValue,
            currency: 'EUR',
            event_category: 'engagement',
            event_label: convLabel,
          });

          // generate_lead: Zusätzliches GA4-Event für Reporting
          window.gtag('event', 'generate_lead', {
            value: convValue,
            currency: 'EUR',
            event_category: 'engagement',
            event_label: convLabel,
          });
        }

        router.push("/kontakt/bestaetigung");
      } else {
        throw new Error("Request could not be sent");
      }
    } catch (error) {
      toast.error(t("errorTitle"), {
        description: t("errorDescription"),
        duration: 5000,
      });
      console.error("Form submission error:", error);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto border-none shadow-2xl bg-white">
      <CardHeader className="text-center pb-8">
        <CardTitle className="font-serif text-4xl md:text-5xl text-forest mb-4">
          {t("heading")}
        </CardTitle>
        <CardDescription className="text-lg text-text-primary/80">
          {t("subheading")}
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
                    <FormLabel className="text-forest font-semibold">{t("name")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("namePlaceholder")} {...field} className="h-12" />
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
                    <FormLabel className="text-forest font-semibold">{t("email")}</FormLabel>
                    <FormControl>
                      <Input 
                        type="email" 
                        placeholder={t("emailPlaceholder")} 
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
                    <FormLabel className="text-forest font-semibold">{t("checkIn")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="h-12 pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: dateLocale })
                            ) : (
                              <span>{t("selectDate")}</span>
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
                    <FormLabel className="text-forest font-semibold">{t("checkOut")}</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className="h-12 pl-3 text-left font-normal"
                          >
                            {field.value ? (
                              format(field.value, "PPP", { locale: dateLocale })
                            ) : (
                              <span>{t("selectDate")}</span>
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
                    <FormLabel className="text-forest font-semibold">{t("adults")}</FormLabel>
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
                    <FormLabel className="text-forest font-semibold">{t("children")}</FormLabel>
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
                  <FormLabel className="text-forest font-semibold">{t("accommodationType")}</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-12">
                        <SelectValue placeholder={t("selectOption")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ferienwohnung">{t("apartment")}</SelectItem>
                      <SelectItem value="zimmer">{t("guestRoom")}</SelectItem>
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
                  <FormLabel className="text-forest font-semibold">{t("message")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("messagePlaceholder")}
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
              disabled={form.formState.isSubmitting}
              className="w-full h-14 text-lg font-semibold bg-forest hover:bg-forest/90 disabled:opacity-50"
            >
              {form.formState.isSubmitting ? t("submitting") : t("submit")}
            </Button>

            <p className="text-sm text-text-primary/60 text-center">
              {t("requiredFields")}
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
