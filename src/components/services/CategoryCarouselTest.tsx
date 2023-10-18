import type { Component } from 'solid-js';
import { createSignal, createEffect } from 'solid-js';
import { supabase } from '../../lib/supabaseClient'
// import { productCategoryData } from '../../data'
import { ui } from '../../i18n/ui'
import type { uiObject } from '../../i18n/uiType';
import { getLangFromUrl, useTranslations } from '../../i18n/utils';

const lang = getLangFromUrl(new URL(window.location.href));
const values = ui[lang] as uiObject
const productCategoryData = values.productCategoryInfo


import travel from '../../assets/categoryIcons/travel.svg'
import worker from '../../assets/categoryIcons/worker.svg'
import palette from '../../assets/categoryIcons/palette.svg'
import paw from '../../assets/categoryIcons/paw.svg'
import legal from '../../assets/categoryIcons/legal.svg'
import garden from '../../assets/categoryIcons/garden.svg'
import engine from '../../assets/categoryIcons/engine-motor.svg'
import doctor from '../../assets/categoryIcons/doctor.svg'
import construction from '../../assets/categoryIcons/construction-tools.svg'
import computer from '../../assets/categoryIcons/computer-and-monitor.svg'
import cleaner from '../../assets/categoryIcons/cleaner-man.svg'
import rightArrow from '../../assets/categoryIcons/circled-right-arrow.svg'
import leftArrow from '../../assets/categoryIcons/circled-left-arrow.svg'
import beauty from '../../assets/categoryIcons/beauty-salon.svg'
import finance from '../../assets/categoryIcons/banking-bank.svg'
import financeDM from '../../assets/categoryIcons/banking-bank-DM.svg'
import { currentLanguage } from '../../lib/languageSelectionStore';
import { doc } from 'prettier';

let categories: Array<any> = []

categories.map(
    category => {
        if (category.id === 1) {
            category.icon = garden
        } else if (category.id === 2) {
            category.icon = beauty
        } else if (category.id === 3) {
            category.icon = construction
        } else if (category.id === 4) {
            category.icon = computer
        } else if (category.id === 5) {
            category.icon = engine
        } else if (category.id === 6) {
            category.icon = palette
        } else if (category.id === 7) {
            category.icon = finance
            category.iconDM = financeDM
        } else if (category.id === 8) {
            category.icon = cleaner
        } else if (category.id === 9) {
            category.icon = paw
        } else if (category.id === 10) {
            category.icon = legal
        } else if (category.id === 11) {
            category.icon = doctor
        } else if (category.id === 12) {
            category.icon = worker
        } else if (category.id === 13) {
            category.icon = travel
        }
    }
)

const categoriesData = productCategoryData.categories

let allCategoryInfo: any[] = []

for (let i = 0; i < categoriesData.length; i++) {
    allCategoryInfo.push({
        ...categoriesData[i],
        ...(categories.find((itmInner) => itmInner.id.toString() === categoriesData[i].id))
    }
    );
}

interface Props {
    // Define the type for the filterPosts prop
    filterPosts: (currentCategory: string) => void;
}

let dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
let light = window.matchMedia("(prefers-color-scheme: light)" || "(prefers-color-scheme: no-preference" ).matches;

type catArray = number[];

export const CategoryCarouselTest: Component<Props> = (props) => {
    const [catFilter, setCatFilter] = createSignal<catArray>([]);
    
    async function fetchData() {
        alert("array?: " + Array.isArray(catFilter()))

        const { data, error } = await supabase
            .from("providerposts")
            .select("*")
            .in('service_category', catFilter())

        if(!data) {
            alert("No posts available")
        }

        if(error) {
            console.log("supabase error: " + error.message);
        }
    }

    // function that adds or removes filters to a filter list
    const handleFilterChange = (event: any ) => {
        // alert("Button id: " + event.target.id)
        if(catFilter().includes(event.target.id)) {
            setCatFilter((prevArr) => prevArr.filter(item => item !== event.target.id));
        } else {
            setCatFilter((prevArr) => [...prevArr, event.target.id ])
        }

        fetchData();
    }



    return (
            <div class="product-carousel my-2 border-4 border-red-400">
                TEST TEST TEST
                <div class="flex flex-start justify-between">
                    <button class="w-12 hidden">
                        <img
                            src={leftArrow}
                            alt="Left Arrow"
                        />
                    </button>

                    <div class="flex justify-between items-center w-full overflow-auto py-4">
                        { allCategoryInfo?.map((item) => (
                            
                            <button 
                                id={ item.id }
                                class='catBtn flex flex-col flex-none justify-center items-center w-20 h-20' 
                                onClick={ handleFilterChange }
                            >
                                <div class="bg-iconbg1 dark:bg-iconbg1-DM rounded-full">
                                    <img src={ item.icon } alt={item.ariaLabel} title={item.description} class="w-12 p-1 m-2" /> 
                                </div>
                                
                                <p class="text-ptext1 dark:text-ptext2-DM my-2 text-center text-xs">{item.name} </p>

                            </button>
                            ))
                        }
                    </div>

                    <button class="w-12 hidden">
                        <img
                            src={rightArrow}
                            alt="Right Arrow"
                        />
                    </button>
                </div>
            </div>

    )
}
