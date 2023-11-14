import type { Component } from "solid-js";
import { createEffect, createSignal ,Show, onMount} from 'solid-js'
import { createInfiniteScroll, createPagination } from '@solid-primitives/pagination';
import { PostgrestFilterBuilder } from '@supabase/postgrest-js'


interface Props {
    itemsPerPage: number
    query: PostgrestFilterBuilder<any, any, any[], unknown>
    onDataFetched: (data: any[]) => void
    onEndReached: (end: boolean) => void
    onInfiniteScrollLoader?: () => void;
}

const [totalItems, setTotalItems] = createSignal<number>(0)

export const InfiniteScroll: Component<Props> = (props) => {
    const [items,infiniteScrollLoader,{end}] = createInfiniteScroll(getItems)
    

function getFromAndTo(){
   const itemPerPage = props.itemsPerPage 
    let from = totalItems() * itemPerPage
    let to = from + itemPerPage
    if(from >= 0){
        setTotalItems(totalItems() + 1)
    }
    return {from,to}
}

async function getItems() {
    const {from, to} = getFromAndTo()
    let items: any = []
    const { data, error } = await props.query.range(from, to);
    if (error) {
        console.log(error)
    } else {
        items = data
        return items 
    }
}

createEffect(() => {
    props.onDataFetched(items());
  });

createEffect(() => {
    props.onEndReached(end());
  });

  createEffect(() => {
    if (props.onInfiniteScrollLoader) {
      props.onInfiniteScrollLoader();
    }
  });

return null;
}
