import { ui, defaultLang } from './ui';
import type { AuthSession } from '@supabase/supabase-js';
import { createSignal } from 'solid-js';
import { supabase } from 'src/lib/supabaseClient';

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function useTranslations(lang: keyof typeof ui) {
  return function t(key: string) {
    const keys = key.split('.');
    let value:any = ui[lang];
    let defaultValue:any = ui[defaultLang];
    for (const k of keys) {
      value = value[k as keyof typeof value];
      defaultValue = defaultValue[k as keyof typeof defaultValue];
      if (!value) {
        break;
      }
    }
    return value || defaultValue;
  }
}

export async function isProvider () {  
  // const lang = getLangFromUrl(Astro.url);
  // const t = useTranslations(lang);
  
  const [provider, setProvider] = createSignal(false);
  const [session, setSession] = createSignal<AuthSession | null>(null);

  if(session()) {
    try {
      if(session() === null) {
        alert("Not a provider?")
        // alert(t("messages.signIn"));
        // location.href = `/${lang}/login`;
      } else {
        const { data: provider, error: providerError } = await supabase
          .from("providers")
          .select("*")
          .eq("user_id", session()!.user.id);

          if(!provider) {
            return false;
          } else {
            return true;
          }
      }
    } catch(e) {
      console.error(e)
    }
  }

}

