import { S } from 'dist/_astro/web.917285cf';
import { supabase } from '../../lib/supabaseClient';

import { ViewCard } from './ViewCard';

export async function testImport() {
    alert("The test import worked!")
}

export async function fetchAllPosts() {
    try {
        const { data: allPosts, error } = await supabase
        .from("providerposts")
        .select("*")
        console.log("allPosts: ", allPosts)
        return allPosts
    } catch (e) {
        console.error();
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