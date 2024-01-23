import type { Component } from "solid-js";
import { createSignal } from "solid-js";
import { supabase } from "../../lib/supabaseClient";
// import { productCategoryData } from '../../data'
import { ui } from "../../i18n/ui";
import type { uiObject } from "../../i18n/uiType";
import { getLangFromUrl, useTranslations } from "../../i18n/utils";

const lang = getLangFromUrl(new URL(window.location.href));
const values = ui[lang] as uiObject;
const productCategoryData = values.productCategoryInfo;

import travel from "../../assets/categoryIcons/travel.svg";
import worker from "../../assets/categoryIcons/worker.svg";
import palette from "../../assets/categoryIcons/palette.svg";
import paw from "../../assets/categoryIcons/paw.svg";
import legal from "../../assets/categoryIcons/legal.svg";
import garden from "../../assets/categoryIcons/garden.svg";
import engine from "../../assets/categoryIcons/engine-motor.svg";
import doctor from "../../assets/categoryIcons/doctor.svg";
import construction from "../../assets/categoryIcons/construction-tools.svg";
import computer from "../../assets/categoryIcons/computer-and-monitor.svg";
import cleaner from "../../assets/categoryIcons/cleaner-man.svg";
import rightArrow from "../../assets/categoryIcons/circled-right-arrow.svg";
import leftArrow from "../../assets/categoryIcons/circled-left-arrow.svg";
import beauty from "../../assets/categoryIcons/beauty-salon.svg";
import finance from "../../assets/categoryIcons/banking-bank.svg";
import financeDM from "../../assets/categoryIcons/banking-bank-DM.svg";
import education from "../../assets/categoryIcons/education.svg";
import food from "../../assets/categoryIcons/plate.svg";
import virtual from "../../assets/categoryIcons/virtual.svg";
import home from "../../assets/categoryIcons/home.svg";
import { currentLanguage } from "../../lib/languageSelectionStore";
import { doc } from "prettier";
import { each } from "jquery";

let categories: Array<any> = [];

const { data, error } = await supabase.from("post_category").select("*");

if (error) {
  console.log("supabase error: " + error.message);
} else {
  data.forEach((category) => {
    categories.push({ category: category.category, id: category.id });
  });
}

categories.map((category) => {
  if (category.id === 1) {
    category.icon = garden;
  } else if (category.id === 2) {
    category.icon = beauty;
  } else if (category.id === 3) {
    category.icon = construction;
  } else if (category.id === 4) {
    category.icon = computer;
  } else if (category.id === 5) {
    category.icon = engine;
  } else if (category.id === 6) {
    category.icon = palette;
  } else if (category.id === 7) {
    category.icon = finance;
    category.iconDM = financeDM;
  } else if (category.id === 8) {
    category.icon = cleaner;
  } else if (category.id === 9) {
    category.icon = paw;
  } else if (category.id === 10) {
    category.icon = legal;
  } else if (category.id === 11) {
    category.icon = doctor;
  } else if (category.id === 12) {
    category.icon = worker;
  } else if (category.id === 13) {
    category.icon = travel;
  } else if (category.id === 14) {
    category.icon = education;
  } else if (category.id === 15) {
    category.icon = food;
  } else if (category.id === 16) {
    category.icon = home;
  }
});

const categoriesData = productCategoryData.categories;

let allCategoryInfo: any[] = [];

for (let i = 0; i < categoriesData.length; i++) {
  allCategoryInfo.push({
    ...categoriesData[i],
    ...categories.find(
      (itmInner) => itmInner.id.toString() === categoriesData[i].id
    ),
  });
}

interface Props {
  // Define the type for the filterPosts prop
  filterPosts: (currentCategory: number) => void;
}

let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let light = window.matchMedia(
  "(prefers-color-scheme: light)" || "(prefers-color-scheme: no-preference"
).matches;

allCategoryInfo.forEach((element) => {
  console.log(element);
});

export const CategoryCarousel: Component<Props> = (props) => {
  return (
    <div class="product-carousel my-2 rounded-lg p-1 ">
      <div class="flex flex-start justify-between scrollbar-thin overflow-x-auto drop-shadow-md dark:drop-shadow-[0_4px_3px_rgba(97,97,97,1)] scrollbar-track-rounded-full scrollbar-thumb-rounded-full scrollbar-thumb-shadow-LM scrollbar-track-background1 dark:scrollbar-thumb-shadow-DM dark:scrollbar-track-background1-DM">
        <button class="w-12 hidden">
          <img src={leftArrow.src} alt="Left Arrow" />
        </button>

        <div class="flex justify-between items-start w-full  pt-2 h-[7.5rem]">
          {allCategoryInfo?.map((item) => (
            <button
              id={item.id}
              class="catBtn flex flex-col flex-none justify-start items-center w-20 h-28"
              onClick={(e) => {
                props.filterPosts(item.id);

                let currBtn = e.target;

                if (!currBtn.classList.contains("selected")) {
                  currBtn.classList.add("selected");
                } else {
                  currBtn.classList.remove("selected");
                }
              }}
            >
              <div class="bg-iconbg1 dark:bg-iconbg1-DM rounded-full">
                {item.icon && item.icon.src ? (
                  <img
                    src={item.icon.src}
                    alt={item.ariaLabel + " Icon"}
                    title={item.description}
                    class="w-12 h-12 p-1 m-2"
                  />
                ) : null}
              </div>

              <div class="flex flex-row justify-center items-center h-44">
                <p class="text-ptext1 dark:text-ptext2-DM text-center text-xs">
                  {item.name}{" "}
                </p>
              </div>
            </button>
          ))}
        </div>

        <button class="w-12 hidden">
          <img src={rightArrow.src} alt="Right Arrow" />
        </button>
      </div>
    </div>
  );
};
