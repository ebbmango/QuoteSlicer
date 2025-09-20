<script lang="ts">
  import { getContext } from "svelte";
  import type { Quote } from "./constants/types";

  const quote: Quote = getContext("quote");
</script>

<div class="flex flex-col w-full h-full justify-center items-center gap-3">
  <!-- Quote -->
  <p
    class="font-tc-wenkai text-3xl dark:text-white"
    style:opacity={quote.original.length > 0 ? "100%" : "20%"}
  >
    {quote.original || "空"}
  </p>
  <!-- Translation -->
  <p
    class="dark:text-white font-jp-serif italic text-md"
    class:opacity-50={quote.translation.length < 1}
  >
    {quote.translation || "Use the box below to enter your translated text."}
  </p>
  <!-- Source -->
  <input
    type="text"
    name=""
    id=""
    class="text-center font-jp-serif text-silver text-sm focus:outline-none focus:ring-0"
    bind:value={quote.source}
    placeholder="Source"
  />
</div>
