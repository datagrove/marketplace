import { Component, createSignal, createEffect, Show } from "solid-js";
import { supabase } from "../../lib/supabaseClient";
import { DeletePostButton } from "../posts/DeletePostButton";
import type { AuthSession } from "@supabase/supabase-js";
import { getLangFromUrl, useTranslations } from '../../i18n/utils';

const lang = getLangFromUrl(new URL(window.location.href));
const t = useTranslations(lang);

interface Post {
    content: string;
    id: number;
    category: string;
    title: string;
    provider_name: string;
    major_municipality: string;
    minor_municipality: string;
    governing_district: string;
    user_id: string;
    image_urls: string | null;
}

interface Props {
    id: string | undefined;
}

const { data: User, error: UserError } = await supabase.auth.getSession();

export const ViewFullPost: Component<Props> = (props) => {
    const [post, setPost] = createSignal<Post>();
    const [session, setSession] = createSignal<AuthSession | null>(null);
    const [postImages, setPostImages] = createSignal<string[]>([]);

    createEffect(() => {
        if (props.id === undefined) {
            location.href = `/${lang}/404`
        } else if (props.id) {
            setSession(User.session);
            fetchPost(+props.id);
        }
    });

    const fetchPost = async (id: number) => {
        if (session()) {
            try {
                const { data, error } = await supabase
                    .from("providerposts")
                    .select("*")
                    .eq("id", id);

                if (error) {
                    console.log(error);
                } else if (data[0] === undefined) {
                    console.log("Post not found"); //TODO: Change to alert message
                    location.href = `/${lang}/404` //TODO: Redirect to Services Page
                } else {
                    setPost(data[0]);
                    console.log(post())
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            alert(t('messages.signIn'))
            location.href = `/${lang}/login`
        }
    }

    createEffect(async () => {
        console.log("downloading images")
        if (post() !== undefined) {
            if (post()?.image_urls === undefined || post()?.image_urls === null) {
                console.log("No Images")
            } else {
                await downloadImages(post()?.image_urls!)
            }
        }
    })

    const downloadImages = async (image_Urls: string) => {
        try {
            const imageUrls = image_Urls.split(',');
            imageUrls.forEach(async (imageUrl: string) => {
                const { data, error } = await supabase.storage
                    .from("post.image")
                    .download(imageUrl);
                if (error) {
                    throw error;
                }
                const url = URL.createObjectURL(data);
                setPostImages([...postImages(), url]);
            })
        } catch (error) {
            console.log(error)
        }
    }

    let slideIndex = 1;
    showSlide(slideIndex)

    function moveSlide(n: number) {
        showSlide(slideIndex += n);
    }

    function currentSlide(n: number) {
        showSlide(slideIndex = n);
    }

    function showSlide(n: number) {
        let i;
        const slides = document.getElementsByClassName("slide");
        console.log(slides)
        const dots = document.getElementsByClassName("dot");

        if (n > slides.length) {
            slideIndex = 1;
        }
        if (n < 1) {
            slideIndex = slides.length;
        }

        for (i = 0; i < slides.length; i++) {
            slides[i].classList.add("hidden");
        }

        for (i = 0; i < dots.length; i++) {
            dots[i].classList.remove('active');
        }

        //show the active slide
        if (slides.length > 0) {
            slides[slideIndex - 1].classList.remove("hidden");
        }

    }

    return (
        <div>
            <h2 class="text-xl text-text1 dark:text-text1-DM pb-4 font-bold">
                {post()?.title}
            </h2>
            <Show when={postImages().length > 0}>
                <div class="relative w-full">
                    <div class="relative h-56 overflow-hidden rounded-lg md:h-96">
                        <div class="slide duration-700 ease-in-out">
                            <img
                                src={postImages()[0]}
                                class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                alt={`${t('postLabels.image')} 1`} />
                        </div>
                        <Show when={postImages().length > 1}>
                            {postImages().slice(1).map((image: string, index: number) => (
                                <div class="hidden slide duration-700 ease-in-out">
                                    <img
                                        src={image}
                                        class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                                        alt={`${t('postLabels.image')} ${index + 1}`} />
                                </div>
                            ))}
                        </Show>
                    </div>
                    <Show when={postImages().length > 1}>
                        <div class="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
                            {postImages().map((image: string, index: number) => (
                                <button
                                    type="button"
                                    class="dot w-3 h-3 rounded-full cursor-pointer bg-white dark:bg-gray-800"
                                    aria-label={`${t('postLabels.slide')} ${index + 1}`}
                                    onClick={() => currentSlide(index + 1)}
                                >
                                </button>
                            ))}
                        </div>
                        <button
                            type="button"
                            class="absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onclick={() => moveSlide(-1)}
                        >
                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1 1 5l4 4" />
                                </svg>
                                <span class="sr-only">{t('buttons.previous')}</span>
                            </span>
                        </button>
                        <button
                            type="button"
                            class="absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
                            onclick={() => moveSlide(1)}>
                            <span class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
                                <svg class="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                </svg>
                                <span class="sr-only">{t('buttons.next')}</span>
                            </span>
                        </button>
                    </Show>
                </div>
            </Show>
            <p>{t('postLabels.provider')}{post()?.provider_name}</p>
            <p>
                {t('postLabels.location')}{post()?.major_municipality}/{post()?.minor_municipality}/
                {post()?.governing_district}
            </p>
            <p>{t('postLabels.category')}{post()?.category}</p>
            <p class="my-10">{post()?.content}</p>
            <div class="flex justify-center mt-4">
                <DeletePostButton Id={+props.id!} UserId={(post()?.user_id !== undefined ? (post()!.user_id) : (""))} />
            </div>
        </div>
    );

};