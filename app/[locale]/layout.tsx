import { CurrencyProvider } from "@/CurrencyContext";
import { NextIntlClientProvider, createTranslator } from "next-intl";
import { notFound } from "next/navigation";
import NavBar from "./components/NavBar";
import { Cairo } from "next/font/google";
import { ReactNode, Suspense } from "react";
import Footer from "./components/Footer";
import navData from "@/app/api/json-generated/nav.json";
import CustomGoogleOAuthProvider from "../GoogleOAuthProvider";
import { SharedStateProvider } from "../SharedStateContext";
import { UserProvider } from "../UserContext";
import { FacebookPixelEvents } from "../fb-pixel";
type Props = {
  children: ReactNode;
  params: { locale: string };
};
// Use the Cairo font
const myfont = Cairo({ subsets: ["latin"] });

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export async function generateMetadata({ params: { locale } }: Props) {
  const messages = await getMessages(locale);
  const t = createTranslator({ locale, messages });
  return {
    title: t("LocaleLayout.title"),
    description: t("LocaleLayout.description"),
    meta: [
      {
        name: "apple-mobile-web-app-capable",
        content: "yes",
      },
      {
        name: "mobile-web-app-capable",
        content: "yes",
      },
    ],
    robots: {
      index: false,
      follow: true,
      nocache: true,
      googleBot: {
        index: true,
        follow: false,
        noimageindex: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

const LogoSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  url: "https://www.koueider.com",
};
const structuredDataString = JSON.stringify(LogoSchema, null, 2);

export default async function LocaleLayout({
  children,
  params: { locale },
}: any) {
  const messages = await getMessages(locale);
  const direction = locale === "en" ? "ltr" : "rtl";

  return (
    <CustomGoogleOAuthProvider>
      <html lang={locale} dir={direction}>
        <body className={`overflow-x-hidden ${locale} ${myfont.className}`} suppressHydrationWarning={true}>
          <CurrencyProvider>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <UserProvider>
                <SharedStateProvider>
                  <NavBar data={navData} />
                  {children}
                  <Footer />
                </SharedStateProvider>
                <Suspense fallback={null}>
                  <FacebookPixelEvents />
                </Suspense>
              </UserProvider>
            </NextIntlClientProvider>
          </CurrencyProvider>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: structuredDataString }}
          />
        </body>
      </html>
    </CustomGoogleOAuthProvider>
  );
}
