import { supabase } from '../../lib/supabaseClient';
import { ui } from '../../i18n/ui';
import type { uiObject } from '../../i18n/uiType';
import { getLangFromUrl, useTranslations } from "../../i18n/utils";

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

// one giant filter function that includes the logic for all combinations 
export function fetchFilteredPosts(categoryFilters: Array<number>, locationFilters: Array<string>, minorLocationFilters: Array<string>, governingLocationFilters: Array<string>, searchString: string) {
    // try {
            let query = supabase.from("providerposts").select("*");
            if(categoryFilters.length !== 0) {    
                query = query.in('service_category', categoryFilters);
            }
            if(locationFilters.length !== 0) {
                query = query.in('major_municipality', locationFilters);
            }
            if(minorLocationFilters.length !== 0) {
                query = query.in('minor_municipality', minorLocationFilters);
            }
            if(governingLocationFilters.length !== 0) {
                query = query.in('governing_district', governingLocationFilters);
            }
            if(searchString.length !== 0) {
                query = query.textSearch('title_content', searchString);
            }
            
            return query;
            // try {
            //     const { data: posts, error } = await query
            //     if(error) {
            //         console.log("supabase error: " + error.message);
            //     } else {
            //         return posts;
            //     }
            // } catch (e) {
            //     console.error(e);
            // }
         
    // } catch(e) { 
    //     console.error(e)
    // }
} 

export function fetchAllPosts() {
    let query = supabase.from("providerposts").select("*");
    return query;
    // try {
    //     const { data: allPosts, error } = await supabase.from("providerposts").select("*")

    //     if(error) {
    //         console.log("supabase error: " + error.message);
    //     } else {
    //         return allPosts
    //     }
    // } catch(e) {
    //     console.error(e);
    // }
}
