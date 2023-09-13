import { Component, createSignal, createEffect } from 'solid-js'
import { supabase } from '../../lib/supabaseClient'
import type { AuthSession } from '@supabase/supabase-js'
import { getLangFromUrl, useTranslations } from '../../i18n/utils';

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

interface Props {
  // Define the type for the filterPosts prop
  search: (searchString: string) => void;
}

export const SearchBar: Component<Props> = (props) => {
  const [searchString, setSearchString] = createSignal<string>('');

  createEffect(() => {
    // Execute a function when the user presses a key on the keyboard
    document.getElementById("search")?.addEventListener("keydown", (e: KeyboardEvent) => {
      console.log("Search Input Event:")
      console.log(e)
      // If the user presses the "Enter" key on the keyboard
      if (e.code === "Enter") {
        // // Cancel the default action, if needed
        // e.preventDefault();
        // Trigger the button element with a click
        console.log("button click")
        document.getElementById("searchButton")?.click();
      }
    });
  })

  

  return (
    <div class="search-form">
      <div class="form">
        <input type="text" name="query" id="search" class="border border-border1 dark:border-border1-DM rounded px-1 dark:text-btn1Text-DM dark:placeholder:text-btn1Text-DM" placeholder={t('formLabels.search')} oninput={(e) => setSearchString(e.target.value)} />
        <button id="searchButton" class="btn-primary mx-6" onclick={(e) => props.search(searchString())}>{t('formLabels.search')}</button>
      </div>
    </div>
  )
}
