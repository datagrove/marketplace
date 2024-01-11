import { supabase } from "../../lib/supabaseClientServer";
import type { APIRoute } from "astro";
import { useTranslations } from "@i18n/utils";

export const POST: APIRoute = async({ request, redirect }) => {
    const formData = await request.formData();

    for (let pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
  
    //Set internationalization values
    const lang = formData.get("lang");
    //We know that this will be a string value from our languages array so just tell typescript to trust us
    //@ts-ignore
    const t = useTranslations(lang);
  
    //set the formData fields to variables
    const access_token = formData.get("access_token");
    const refresh_token = formData.get("refresh_token");

    const title = formData.get("postTitle")
    const serviceCategory = formData.get("postCategory")
    const content = formData.get("postContent")

    if(!title || !content) {
        return new Response(
            JSON.stringify({
                message: (t("apiErrors.missingFields")),
            }),
            { status: 400 }
        )
    }

    //Get the session from supabase (for the server side) based on the access and refresh tokens
    const { data: sessionData, error: sessionError } =
        await supabase.auth.setSession({
            refresh_token: refresh_token!.toString(),
            access_token: access_token!.toString(),
        });

        if (sessionError) {
            return new Response(
                JSON.stringify({
                message: (t("apiErrors.noSession")),
                }),
                { status: 500 }
            );
        }

    console.log(sessionData);

    //Make sure we have a session
    if (!sessionData?.session) {
        return new Response(
            JSON.stringify({
            message: (t("apiErrors.noSession")),
            }),
            { status: 500 }
        );
    }

    //Get the user and make sure we have a user
    const user = sessionData?.session.user;

    if (!user) {
        return new Response(
            JSON.stringify({
            message: (t("apiErrors.noUser")),
            }),
            { status: 500 }
        );
    }

    // Check to make sure the post exists
    const { data: postExists, error: postExistsError } = await supabase
        .from("provider_post")
        .select("id")
        .eq("id", post.id)
    
    if(postExistsError) {
        console.error("supabase error: " + postExistsError.message);
    } else if(postExists[0] === undefined) {
        console.error("Post does not exist")
    } else if(postExists[0] !== undefined) {
        console.log("Post updating")

        let postSubmission = {
            title: title,
            service_category: serviceCategory,
            content: content
        }

        const { data: postData, error: postError } = await supabase
            .from("provider_post")
            .update([postSubmission])
    
    
    }

}