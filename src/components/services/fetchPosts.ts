import { supabase } from '../../lib/supabaseClient';

export async function testImport() {
    alert("The test import worked!")
}

// one giant filter function that includes the logic for all combinations - switch statement? If/then?

export async function fetchFilteredPosts(categoryFilters: any, locationFilters: any, minorLocationFilters: any, governingLocationFilters: any) {
    // alert("category + location: " + categoryFilters + ", " + locationFilters)
    
    try {
        // all posts
        if(categoryFilters.length === 0 && locationFilters.length === 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0) {
            try {
                const { data: allPosts, error } = await supabase
                .from("providerposts")
                .select("*")
                console.log("allPosts: ", allPosts)
        
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return allPosts
                }
            } catch (e) {
                console.error(e);
            }
        // only category filter
        } else if(categoryFilters.length > 0 && locationFilters.length === 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0) {
            let catArray = categoryFilters.map((item: any) => Number(item))
    
            const { data: catPosts, error } = await supabase
                    .from("providerposts")
                    .select("*")
                    .in('service_category', catArray)
                    console.log("category data: ", catPosts)
        
                if(!catPosts) {
                    alert("No posts available")
                }
        
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    return catPosts;
                }
        // category and first location filter        
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0) {
            try {
                // alert("In the two filters")
                let catArray = categoryFilters.map((item: any) => Number(item))

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", catArray)
                .in("major_municipality", locationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data)
                    return data;
                }

            } catch(e) {
                console.error(e)
            }
        // category, first, and second location filter    
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length === 0) {
            try {
                // alert("In the three filters")
                let catArray = categoryFilters.map((item: any) => Number(item))

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", catArray)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data)
                    return data;
                }

            } catch(e) {
                console.error(e)
            }
        // all filters on
        } else if(categoryFilters.length > 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length > 0) {
            try {
                alert("All filters")
                let catArray = categoryFilters.map((item: any) => Number(item))

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("service_category", catArray)
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                .in("governing_district", governingLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data)
                    return data;
                }

            } catch(e) {
                console.error(e)
            }
        // only first location filter
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length === 0 && governingLocationFilters.length === 0) {
            try {
                alert("First location filter")

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("major_municipality", locationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data)
                    return data;
                }

            } catch(e) {
                console.error(e)
            }

        // first and second location filters on
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length === 0) {
            try {
                alert("Major and minor location filters")

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data)
                    return data;
                }

            } catch(e) {
                console.error(e)
            }
        // all location filters on
        } else if(categoryFilters.length === 0 && locationFilters.length > 0 && minorLocationFilters.length > 0 && governingLocationFilters.length > 0) {
            try {
                alert("All and only location filters")

                const { data, error } = await supabase
                .from("providerposts")
                .select("*")
                .in("major_municipality", locationFilters)
                .in("minor_municipality", minorLocationFilters)
                .in("governing_district", governingLocationFilters)
                
                if(error) {
                    console.log("supabase error: " + error.message);
                } else {
                    console.log("cat and local filter: ", data)
                    return data;
                }

            } catch(e) {
                console.error(e)
            }
        }

        //still need to add search bar results
    } catch(e) { 
        console.error(e)
    }
}

export async function fetchAllPosts() {
    try {
        const { data: allPosts, error } = await supabase
        .from("providerposts")
        .select("*")
        console.log("allPosts: ", allPosts)

        if(error) {
            console.log("supabase error: " + error.message);
        } else {
            return allPosts
        }
    } catch (e) {
        console.error(e);
    }

    // const { data: allPosts, error} = await supabase
    //     .from("providerposts")
    //     .select("*")

    //     var allPostsArr = Object.keys(allPosts).map((key) => [key, allPosts[key]]);

    //     console.log("allPostsArr: ", allPostsArr)

    //     return allPostsArr

    // const { data: allPosts, error} = await supabase
    // .from("providerposts")
    // .select("*")

    // console.log("allPosts in fetch function: ", allPosts)
    // console.log("allPosts TYPE in fetch function: ", typeof(allPosts))
    // console.log("allPosts in fetch function ARRAY?: ", Array.isArray(allPosts))

    // return allPosts;
}

export async function fetchPostsByCategory(selectedCats: Array<string>) {
    console.log("selectedCats: ", selectedCats)
    
    let catArray = selectedCats.map((item) => Number(item))
    
    const { data: catPosts, error } = await supabase
            .from("providerposts")
            .select("*")
            .in('service_category', catArray)
            console.log("category data: ", catPosts)

        if(!catPosts) {
            alert("No posts available")
        }

        if(error) {
            console.log("supabase error: " + error.message);
        }

        return catPosts;
}