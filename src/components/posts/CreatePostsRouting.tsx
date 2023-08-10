import { Show, createSignal } from "solid-js";
import { supabase } from "../../lib/supabaseClient";

const { data: User, error: UserError } = await supabase.auth.getSession();

export const CreatePostsRouting = () => {
  const [isUserProvider, setIsUserProvider] = createSignal<boolean>(false);
  if (UserError) {
    console.log("User Error: " + UserError.message);
  }

  const postLink = document.getElementById("createPostLink");

  const isProvider = async () => {
    try {
      const { data, error } = await supabase
        .from("providers")
        .select("*")
        .eq("user_id", User.session!.user.id);

      if (data![0]) {
        setIsUserProvider(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  isProvider();

  return (
    <Show when={isUserProvider()}>
      <a href="../../posts/createpost" class=" " id="createPostLink">
        Create Posts
      </a>
    </Show>
  );
};
