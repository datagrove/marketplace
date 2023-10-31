import { supabase } from '../../lib/supabaseClient';
import { ui } from '../../i18n/ui';
import type { uiObject } from '../../i18n/uiType';
import { getLangFromUrl, useTranslations } from "../../i18n/utils";

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

// one giant filter function that includes the logic for all combinations 

export async function fetchFilteredPosts(categoryFilters: any, locationFilters: any, minorLocationFilters: any, governingLocationFilters: any, searchString: string) {
    try {
        // all posts
        if(categoryFilters.length === 0 && locationFilters.length === 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length === 0) {
            try {
                const { data: allPosts, error } = await supabase
                .from("providerposts")
                .select("*")
                console.log("allPosts: ", allPosts)
        
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return allPosts;
                }
            } catch (e) {
                console.error(e);
            }
        // only category filter
        } else if(categoryFilters.length > 0 && locationFilters.length === 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length === 0) {    
            let categoryIntegers: Array<number> = [];
            
            categoryFilters.map((category: string) => {
                if(category === "Gardening") {
                    categoryIntegers.push(1)
                } else if(category === "Beauty") {
                    categoryIntegers.push(2)
                } else if(category === "Construction") {
                    categoryIntegers.push(3)
                } else if(category === "Computer") {
                    categoryIntegers.push(4)
                } else if(category === "Automotive") {
                    categoryIntegers.push(5)
                } else if(category === "Creative") {
                    categoryIntegers.push(6)
                } else if(category === "Financial") {
                    categoryIntegers.push(7)
                } else if(category === "Cleaning") {
                    categoryIntegers.push(8)
                } else if(category === "Pet") {
                    categoryIntegers.push(9)
                } else if(category === "Legal") {
                    categoryIntegers.push(10)
                } else if(category === "Health") {
                    categoryIntegers.push(11)
                } else if(category === "Labor") {
                    categoryIntegers.push(12)
                } else if(category === "Travel") {
                    categoryIntegers.push(13)
                }
            })

            const { data: catPosts, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", categoryIntegers)
        
                if(!catPosts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");

                    return catPosts;
                }
        
                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return catPosts;
                }
        // category and first location filter        
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length === 0) {
            try {
                let categoryIntegers: Array<number> = [];
            
                categoryFilters.map((category: string) => {
                    if(category === "Gardening") {
                        categoryIntegers.push(1)
                    } else if(category === "Beauty") {
                        categoryIntegers.push(2)
                    } else if(category === "Construction") {
                        categoryIntegers.push(3)
                    } else if(category === "Computer") {
                        categoryIntegers.push(4)
                    } else if(category === "Automotive") {
                        categoryIntegers.push(5)
                    } else if(category === "Creative") {
                        categoryIntegers.push(6)
                    } else if(category === "Financial") {
                        categoryIntegers.push(7)
                    } else if(category === "Cleaning") {
                        categoryIntegers.push(8)
                    } else if(category === "Pet") {
                        categoryIntegers.push(9)
                    } else if(category === "Legal") {
                        categoryIntegers.push(10)
                    } else if(category === "Health") {
                        categoryIntegers.push(11)
                    } else if(category === "Labor") {
                        categoryIntegers.push(12)
                    } else if(category === "Travel") {
                        categoryIntegers.push(13)
                    }
                })

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", categoryIntegers)
                .in("major_municipality", locationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data);
                    return data;
                }

            } catch(e) {
                console.error(e);
            }
        // category, first, and second location filter    
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length === 0 && searchString.length === 0) {
            try {
                let categoryIntegers: Array<number> = [];
            
                categoryFilters.map((category: string) => {
                    if(category === "Gardening") {
                        categoryIntegers.push(1)
                    } else if(category === "Beauty") {
                        categoryIntegers.push(2)
                    } else if(category === "Construction") {
                        categoryIntegers.push(3)
                    } else if(category === "Computer") {
                        categoryIntegers.push(4)
                    } else if(category === "Automotive") {
                        categoryIntegers.push(5)
                    } else if(category === "Creative") {
                        categoryIntegers.push(6)
                    } else if(category === "Financial") {
                        categoryIntegers.push(7)
                    } else if(category === "Cleaning") {
                        categoryIntegers.push(8)
                    } else if(category === "Pet") {
                        categoryIntegers.push(9)
                    } else if(category === "Legal") {
                        categoryIntegers.push(10)
                    } else if(category === "Health") {
                        categoryIntegers.push(11)
                    } else if(category === "Labor") {
                        categoryIntegers.push(12)
                    } else if(category === "Travel") {
                        categoryIntegers.push(13)
                    }
                })

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", categoryIntegers)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return data;
                }
            } catch(e) {
                console.error(e);
            }
        // all filters on
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length > 0 && searchString.length === 0) {
            try {

                let categoryIntegers: Array<number> = [];
            
                categoryFilters.map((category: string) => {
                    if(category === "Gardening") {
                        categoryIntegers.push(1)
                    } else if(category === "Beauty") {
                        categoryIntegers.push(2)
                    } else if(category === "Construction") {
                        categoryIntegers.push(3)
                    } else if(category === "Computer") {
                        categoryIntegers.push(4)
                    } else if(category === "Automotive") {
                        categoryIntegers.push(5)
                    } else if(category === "Creative") {
                        categoryIntegers.push(6)
                    } else if(category === "Financial") {
                        categoryIntegers.push(7)
                    } else if(category === "Cleaning") {
                        categoryIntegers.push(8)
                    } else if(category === "Pet") {
                        categoryIntegers.push(9)
                    } else if(category === "Legal") {
                        categoryIntegers.push(10)
                    } else if(category === "Health") {
                        categoryIntegers.push(11)
                    } else if(category === "Labor") {
                        categoryIntegers.push(12)
                    } else if(category === "Travel") {
                        categoryIntegers.push(13)
                    }
                })

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", categoryIntegers)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                .in("governing_district", governingLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return data;
                }
            } catch(e) {
                console.error(e);
            }
        // only first location filter
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length === 0) {
            try {
                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("major_municipality", locationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return data;
                }
            } catch(e) {
                console.error(e);
            }

        // first and second location filters on
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length === 0 && searchString.length === 0) {
            try {
                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return data;
                }

            } catch(e) {
                console.error(e);
            }
        // all location filters on
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length > 0 && searchString.length === 0) {
            try {
                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                .in("governing_district", governingLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return data;
                }

            } catch(e) {
                console.error(e);
            }
        } else if (categoryFilters.length === 0 && locationFilters.length === 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length > 0) {
            try {
                const { data: searchPosts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString);

                if(error) {
                    console.log("supabase error: " + error.message);
                } else if( searchPosts.length === 0) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return searchPosts;
                } else {
                    return searchPosts;
                }
            } catch(e) {
                console.error(e);
            }
        } else if(categoryFilters.length > 0 && locationFilters.length === 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length > 0) {
            let categoryIntegers: Array<number> = [];
            
            categoryFilters.map((category: string) => {
                if(category === "Gardening") {
                    categoryIntegers.push(1)
                } else if(category === "Beauty") {
                    categoryIntegers.push(2)
                } else if(category === "Construction") {
                    categoryIntegers.push(3)
                } else if(category === "Computer") {
                    categoryIntegers.push(4)
                } else if(category === "Automotive") {
                    categoryIntegers.push(5)
                } else if(category === "Creative") {
                    categoryIntegers.push(6)
                } else if(category === "Financial") {
                    categoryIntegers.push(7)
                } else if(category === "Cleaning") {
                    categoryIntegers.push(8)
                } else if(category === "Pet") {
                    categoryIntegers.push(9)
                } else if(category === "Legal") {
                    categoryIntegers.push(10)
                } else if(category === "Health") {
                    categoryIntegers.push(11)
                } else if(category === "Labor") {
                    categoryIntegers.push(12)
                } else if(category === "Travel") {
                    categoryIntegers.push(13)
                }
            })

            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("service_category", categoryIntegers)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;
                }

                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e);
            }
        //serach bar, category, and major muni
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length > 0) {
            let categoryIntegers: Array<number> = [];
            
            categoryFilters.map((category: string) => {
                if(category === "Gardening") {
                    categoryIntegers.push(1)
                } else if(category === "Beauty") {
                    categoryIntegers.push(2)
                } else if(category === "Construction") {
                    categoryIntegers.push(3)
                } else if(category === "Computer") {
                    categoryIntegers.push(4)
                } else if(category === "Automotive") {
                    categoryIntegers.push(5)
                } else if(category === "Creative") {
                    categoryIntegers.push(6)
                } else if(category === "Financial") {
                    categoryIntegers.push(7)
                } else if(category === "Cleaning") {
                    categoryIntegers.push(8)
                } else if(category === "Pet") {
                    categoryIntegers.push(9)
                } else if(category === "Legal") {
                    categoryIntegers.push(10)
                } else if(category === "Health") {
                    categoryIntegers.push(11)
                } else if(category === "Labor") {
                    categoryIntegers.push(12)
                } else if(category === "Travel") {
                    categoryIntegers.push(13)
                }
            })

            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("service_category", categoryIntegers)
                .in("major_municipality", locationFilters)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;
                }

                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e);
            }
        // search bar, category, major muni, minor muni
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length === 0 && searchString.length > 0) {
            let categoryIntegers: Array<number> = [];
            
            categoryFilters.map((category: string) => {
                if(category === "Gardening") {
                    categoryIntegers.push(1)
                } else if(category === "Beauty") {
                    categoryIntegers.push(2)
                } else if(category === "Construction") {
                    categoryIntegers.push(3)
                } else if(category === "Computer") {
                    categoryIntegers.push(4)
                } else if(category === "Automotive") {
                    categoryIntegers.push(5)
                } else if(category === "Creative") {
                    categoryIntegers.push(6)
                } else if(category === "Financial") {
                    categoryIntegers.push(7)
                } else if(category === "Cleaning") {
                    categoryIntegers.push(8)
                } else if(category === "Pet") {
                    categoryIntegers.push(9)
                } else if(category === "Legal") {
                    categoryIntegers.push(10)
                } else if(category === "Health") {
                    categoryIntegers.push(11)
                } else if(category === "Labor") {
                    categoryIntegers.push(12)
                } else if(category === "Travel") {
                    categoryIntegers.push(13)
                }
            })

            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("service_category", categoryIntegers)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;
                }

                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e);
            }
        // search bar, category, major muni, minor muni, district
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length > 0 && searchString.length > 0) {
            let categoryIntegers: Array<number> = [];
            
            categoryFilters.map((category: string) => {
                if(category === "Gardening") {
                    categoryIntegers.push(1)
                } else if(category === "Beauty") {
                    categoryIntegers.push(2)
                } else if(category === "Construction") {
                    categoryIntegers.push(3)
                } else if(category === "Computer") {
                    categoryIntegers.push(4)
                } else if(category === "Automotive") {
                    categoryIntegers.push(5)
                } else if(category === "Creative") {
                    categoryIntegers.push(6)
                } else if(category === "Financial") {
                    categoryIntegers.push(7)
                } else if(category === "Cleaning") {
                    categoryIntegers.push(8)
                } else if(category === "Pet") {
                    categoryIntegers.push(9)
                } else if(category === "Legal") {
                    categoryIntegers.push(10)
                } else if(category === "Health") {
                    categoryIntegers.push(11)
                } else if(category === "Labor") {
                    categoryIntegers.push(12)
                } else if(category === "Travel") {
                    categoryIntegers.push(13)
                }
            })

            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("service_category", categoryIntegers)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                .in("governing_district", governingLocationFilters)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;             
                }
                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e);
            }
        // search bar, major muni
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0 && searchString.length > 0) {
            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("major_municipality", locationFilters)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;
                }

                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e)
            }
        // search bar, major muni, minor muni
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length === 0 && searchString.length > 0) {
            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;
                }

                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e);
            }
        // search bar, major muni, minor muni, district
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length > 0 && searchString.length > 0) {
            try {
                const { data: posts, error } = await supabase
                .from('providerposts')
                .select('*')
                .textSearch('title', searchString)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                .in("governing_district", governingLocationFilters)

                if(!posts) {
                    let noPostsMessage = document.getElementById("no-posts-message");
                    noPostsMessage?.classList.remove("hidden");
        
                    return posts;
                }

                if(error) {
                    console.log("supabase error: " + error);
                } else {
                    return posts;
                }
            } catch(e) {
                console.error(e)
            }
        }
    } catch(e) { 
        console.error(e)
    }
}

export async function fetchAllPosts() {
    try {
        const { data: allPosts, error } = await supabase
        .from("providerposts")
        .select("*")

        if(error) {
            console.log("supabase error: " + error.message);
        } else {
            return allPosts;
        }
    } catch (e) {
        console.error(e);
    }
}