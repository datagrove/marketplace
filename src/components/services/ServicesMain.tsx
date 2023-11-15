import type { Component } from "solid-js";
import { createEffect, createSignal, Show, onMount, batch } from "solid-js";
import { supabase } from "../../lib/supabaseClient";
import { CategoryCarousel } from "./CategoryCarousel";
import { ViewCard } from "./ViewCard";
import { LocationFilter } from "./LocationFilter";
import { SearchBar } from "./SearchBar";
import { ui } from "../../i18n/ui";
import type { uiObject } from "../../i18n/uiType";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";
import * as allFilters from "../posts/fetchPosts";
import {
  createInfiniteScroll,
  createPagination,
} from "@solid-primitives/pagination";
import { PostgrestFilterBuilder } from "@supabase/postgrest-js";

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

//get the categories from the language files so they translate with changes in the language picker
const values = ui[lang] as uiObject;
const productCategories = values.productCategoryInfo.categories;

const { data: user, error: userError } = await supabase.auth.getSession();
if (userError) {
  console.log(userError);
}
if (user.session === null || user.session === undefined) {
  alert(t("messages.signIn"));
  location.href = `/${lang}/login`;
}

const [totalPosts, setTotalPosts] = createSignal<number>(0);
const [query, setQuery] = createSignal<
  PostgrestFilterBuilder<any, any, any[], unknown>
>(allFilters.fetchAllPosts());

function getFromAndTo() {
  const itemPerPage = 10;
  let from = totalPosts() * itemPerPage;
  let to = from + itemPerPage - 1;
  if (from >= 0) {
    setTotalPosts(totalPosts() + 1);
  }
  return { from, to };
}

function trimmingObject(arrayObj: any) {
  arrayObj.forEach((obj: any) => {
    delete obj.email;
    delete obj.provider_id;
  });
  return arrayObj;
}

async function getPosts() {
  const { from, to } = getFromAndTo();
  console.log(from, to, "from and to");
  const queryQ = query();
  let posts = [];
  const { data, error } = await queryQ.range(from, to);
  console.log(data?.length, "Query Data");
  if (error) {
    console.log(error);
    onMount(() => {
      let noPostsMessage = document.getElementById("no-posts-message");
      noPostsMessage?.classList.remove("hidden");
    });
    // } else if (data?.length === 0) {
    //   console.log("No posts found");
    //   onMount(() => {
    //     let noPostsMessage = document.getElementById("no-posts-message");
    //     noPostsMessage?.classList.remove("hidden");

    //     setTimeout(() => {
    //       noPostsMessage?.classList.add("hidden");
    //     }, 3000);
    //   });
  } else {
    data?.map((item) => {
      productCategories.forEach((productCategories) => {
        if (item.service_category.toString() === productCategories.id) {
          item.category = productCategories.name;
        }
      });
      delete item.service_category;
    });
    posts = data;
  }
  trimmingObject(posts);
  console.log(posts, "posts from getPosts");
  return posts;
}

interface ProviderPost {
  content: string;
  id: number;
  category: string;
  title: string;
  provider_name: string;
  major_municipality: string;
  minor_municipality: string;
  governing_district: string;
  user_id: string;
  image_urls: string;
}

export const ServicesView: Component = () => {
  const [filters, setFilters] = createSignal<Array<number>>([]);
  const [locationFilters, setLocationFilters] = createSignal<Array<string>>([]);
  const [minorLocationFilters, setMinorLocationFilters] = createSignal<
    Array<string>
  >([]);
  const [governingLocationFilters, setGoverningLocationFilters] = createSignal<
    Array<string>
  >([]);
  const [clearMajorMunicipalityFilter, setClearMajorMunicipalityFilter] = createSignal<boolean>(false);
  const [clearMinorMunicipalityFilter, setClearMinorMunicipalityFilter] = createSignal<boolean>(false);
  const [searchString, setSearchString] = createSignal<string>("");
  const [pages, infiniteScrollLoader, { page, setPage, setEnd, setPages, end }] =
    createInfiniteScroll(getPosts);

  createEffect(() => console.log(pages(), "pages"));
  createEffect(() => console.log(page(), "page"));

  const searchPosts = async (searchText: string) => {
    setSearchString(searchText);

    filterPosts();
  };

  const setCategoryFilter = (currentCategory: number) => {
    if (filters().includes(currentCategory)) {
      let currentFilters = filters().filter((el) => el !== currentCategory);
      setFilters(currentFilters);
    } else {
      setFilters([...filters(), currentCategory]);
    }

    console.log(filters(), "category filter");
    console.log(page(), "category page");
    console.log(pages(), "category pages");
    console.log(end(), "category end");
    console.log(totalPosts(), "category totalPosts");

    filterPosts();
  };

  let timeouts: (string | number | NodeJS.Timeout | undefined)[] = [];

  

  const filterPostsByMajorMunicipality = (location: string) => {
    if (locationFilters().includes(location)) {
      let currentLocationFilters = locationFilters().filter(
        (el) => el !== location
      );
      setLocationFilters(currentLocationFilters);
    } else {
      setLocationFilters([...locationFilters(), location]);
    }

    filterPosts();
  };

  const filterPostsByMinorMunicipality = (location: string) => {
    if (minorLocationFilters().includes(location)) {
      let currentLocationFilters = minorLocationFilters().filter(
        (el) => el !== location
      );
      setMinorLocationFilters(currentLocationFilters);
    } else {
      setMinorLocationFilters([...minorLocationFilters(), location]);
    }

    filterPosts();
  };

  const filterPostsByGoverningDistrict = (location: string) => {
    if (governingLocationFilters().includes(location)) {
      let currentLocationFilters = governingLocationFilters().filter(
        (el) => el !== location
      );
      setGoverningLocationFilters(currentLocationFilters);
    } else {
      setGoverningLocationFilters([...governingLocationFilters(), location]);
    }

    filterPosts();
  };

  const clearAllFilters = () => {
    let searchInput = document.getElementById("search") as HTMLInputElement;
    let selectedCategories = document.querySelectorAll(".selected");
    const majorMuniCheckboxes = document.querySelectorAll(
      "input[type='checkbox'].major-muni"
    ) as NodeListOf<HTMLInputElement>;
    const minorMuniCheckboxes = document.querySelectorAll(
      "input[type='checkbox'].minor-muni"
    ) as NodeListOf<HTMLInputElement>;
    const districtCheckboxes = document.querySelectorAll(
      "input[type='checkbox'].district"
    ) as NodeListOf<HTMLInputElement>;

    if (searchInput.value !== null) {
      searchInput.value = "";
    }

    selectedCategories.forEach((category) => {
      category.classList.remove("selected");
    });

    selectedCategories.forEach((category) => {
      category.classList.remove("selected");
    });

    majorMuniCheckboxes.forEach((checkbox) => {
      if (checkbox && checkbox.checked) checkbox.checked = false;
    });

    minorMuniCheckboxes.forEach((checkbox) => {
      if (checkbox && checkbox.checked) checkbox.checked = false;
    });

    districtCheckboxes.forEach((checkbox) => {
      if (checkbox && checkbox.checked) checkbox.checked = false;
    });

    setClearMajorMunicipalityFilter(true);
    setClearMinorMunicipalityFilter(true);

    setSearchString("");
    setFilters([]);
    setLocationFilters([]);
    setMinorLocationFilters([]);
    setGoverningLocationFilters([]);
    
    console.log(page(), "clear filter page");
    console.log(pages(), "clear filter pages");
    console.log(end(), "clear filter end");
    console.log(totalPosts(), "clear filter totalPosts");

    filterPosts();

    setClearMajorMunicipalityFilter(false);
    setClearMinorMunicipalityFilter(false);
  };

  const clearServiceCategories = () => {
    let selectedCategories = document.querySelectorAll(".selected");

    selectedCategories.forEach((category) => {
      category.classList.remove("selected");
    });

    setFilters([]);
    filterPosts();
  };

  const clearMajorMunicipality = () => {
    const majorMuniCheckboxes = document.querySelectorAll(
      "input[type='checkbox'].major-muni"
    ) as NodeListOf<HTMLInputElement>;

    majorMuniCheckboxes.forEach((checkbox) => {
      if (checkbox && checkbox.checked) checkbox.checked = false;
    });

    setClearMajorMunicipalityFilter(true);

    setLocationFilters([]);
    filterPosts();

    setClearMajorMunicipalityFilter(false);
  };

  const clearMinorMunicipality = () => {
    const minorMuniCheckboxes = document.querySelectorAll(
      "input[type='checkbox'].minor-muni"
    ) as NodeListOf<HTMLInputElement>;

    minorMuniCheckboxes.forEach((checkbox) => {
      if (checkbox && checkbox.checked) checkbox.checked = false;
    });

    setClearMinorMunicipalityFilter(true);

    setMinorLocationFilters([]);
    filterPosts();

    setClearMinorMunicipalityFilter(false);
  };

  const clearDistrict = () => {
    const districtCheckboxes = document.querySelectorAll(
      "input[type='checkbox'].district"
    ) as NodeListOf<HTMLInputElement>;

    districtCheckboxes.forEach((checkbox) => {
      if (checkbox && checkbox.checked) checkbox.checked = false;
    });

    //No signal to set here because choosing a governing district does not impact any other choices
    
    setGoverningLocationFilters([]);
    filterPosts();
  };

  const filterPosts = () => {

    console.log(page(), "page");

    setQuery(
      allFilters.fetchFilteredPosts(
        filters(),
        locationFilters(),
        minorLocationFilters(),
        governingLocationFilters(),
        searchString()
      )
    );

    setTotalPosts(0);
    setPages([]);
    setPage(0);
    setEnd(false);

    console.log(page(), "filterposts page");
    console.log(pages(), "filterposts pages");
    console.log(end(), "filterposts end");
    console.log(totalPosts(), "filterposts totalPosts");
  };

  return (
    <div class="">
      <div>
        <SearchBar search={searchPosts} />
        {/* <SearchBar search={ searchString } /> */}
      </div>

      <div class="clear-filters-btns flex flex-wrap justify-center items-center ">
        <button
          class="clearBtnRectangle"
          onclick={clearAllFilters}
          aria-label={t("clearFilters.filterButtons.0.ariaLabel")}
        >
          <p class="text-xs">{t("clearFilters.filterButtons.0.text")}</p>
        </button>

        <button
          class="clearBtnRectangle"
          onclick={clearServiceCategories}
          aria-label={t("clearFilters.filterButtons.1.ariaLabel")}
        >
          <p class="text-xs">{t("clearFilters.filterButtons.1.text")}</p>
        </button>

        <button
          class="clearBtnRectangle"
          onclick={clearMajorMunicipality}
          aria-label={t("clearFilters.filterButtons.2.ariaLabel")}
        >
          <p class="text-xs">{t("clearFilters.filterButtons.2.text")}</p>
        </button>

        <button
          class="clearBtnRectangle"
          onclick={clearMinorMunicipality}
          aria-label={t("clearFilters.filterButtons.3.ariaLabel")}
        >
          <p class="text-xs">{t("clearFilters.filterButtons.3.text")}</p>
        </button>

        <button
          class="clearBtnRectangle"
          onclick={clearDistrict}
          aria-label={t("clearFilters.filterButtons.4.ariaLabel")}
        >
          <p class="text-xs">{t("clearFilters.filterButtons.4.text")}</p>
        </button>
      </div>

      <div class="">
        <CategoryCarousel filterPosts={setCategoryFilter} />
      </div>

      <div class="md:h-full flex flex-col md:flex-row items-center md:items-start ">
        <div class="md:w-48 md:mr-4 w-11/12">
          <LocationFilter
            filterPostsByMajorMunicipality={filterPostsByMajorMunicipality}
            filterPostsByMinorMunicipality={filterPostsByMinorMunicipality}
            filterPostsByGoverningDistrict={filterPostsByGoverningDistrict}
            clearMajorMunicipalityFilter={clearMajorMunicipalityFilter()}
            clearMinorMunicipalityFilter={clearMinorMunicipalityFilter()}
          />
        </div>

        <div class="md:flex-1 w-11/12 items-center">
          <div
            id="no-posts-message"
            class="hidden py-2 my-1 bg-btn1 dark:bg-btn1-DM rounded"
          >
            <h1 class="text-btn1Text dark:text-btn1Text-DM">
              {t("messages.noPostsSearch")}
            </h1>
          </div>
          <ViewCard posts={pages()} />
          <Show when={!end()}>
            <h1 use:infiniteScrollLoader>Loading...</h1>
          </Show>
        </div>
      </div>
    </div>
  );
};
