import { SITE } from "../../config";
import { Icon } from 'astro-icon/components';
import type { Component } from "solid-js"
import { createSignal, Show } from "solid-js";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import type { AuthSession } from "@supabase/supabase-js";

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

export const ProviderFooter: Component = () => {
  const [session, setSession] = createSignal<AuthSession | null>(null);

  return (
    <div>
      Test ProviderFooter
    </div>
  )
}
