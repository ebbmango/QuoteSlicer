<script lang="ts">
  type Props = {
    quote: string; // The original quote in Traditional Chinese.
    trans: string; // Its translation unto English.
    source: string;
  };

  let { quote, trans, source }: Props = $props();
</script>

<div class="flex flex-col w-full h-full justify-center items-center gap-3">
  <!-- Quote -->
  <p
    class="font-tc-wenkai text-3xl dark:text-white"
    style:opacity={quote.length > 0 ? "100%" : "20%"}
  >
    {quote || "空"}
  </p>
  <!-- Translation -->
  <p
    class="dark:text-white font-jp-serif italic text-md"
    class:opacity-70={quote === ""}
  >
    {trans || "Use the box below to enter your translated text."}
  </p>
  <!-- Source -->
  <input
    type="text"
    name=""
    id=""
    class="text-center font-jp-serif text-silver text-sm focus:outline-none focus:ring-0"
    bind:value={source}
    placeholder="Source"
  />
</div>
