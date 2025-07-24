<script lang="ts">
  import { COLORS } from "./constants/colors";
  import Sentence from "./Sentence.svelte";

  type Props = {
    quote: string;
    trans: string;
  };

  type TextSegment = {
    text: string;
    type: "han" | "abc";
  };

  const { quote, trans }: Props = $props();

  //   let words = $derived(trans.split(" "));

  let sentences = $derived(
    trans
      .split(".")
      .filter(Boolean)
      .map((s) => s.trim() + ".")
      .map((s) => s.split(" "))
  );

  const baseColors = COLORS.map(
    (color) => `color-mix(in srgb, var(--color-${color}) 12%, transparent)`
  );
  const darkColors = COLORS.map(
    (color) => `color-mix(in srgb, var(--color-${color}) 72%, transparent)`
  );

  // initially, a single paragraph holds all sentences
  //   let paragraphs = $derived([sentences.map((s, i) => i)]);
  let paragraphs = $state<number[][]>([[0, 1, 2]]);

  //   const a = [[1, 2][3]];

  //   console.log(paragraphs);

  // This returns {text: string, sentence: number}[][]

  //   let sentences = $derived.by(() => {
  //     const segments = trans
  //       .split(".")
  //       .filter(Boolean)
  //       .map((s) => s.trim() + ".");

  //     return segments.map((s, i) => {
  //       return s.split(" ").map((w) => ({ text: w, sentence: i }));
  //     });
  //   });

  //   let sentences = $derived.by((): TextSegment[][] => {
  //     const hanRegex = /([\p{Script=Han}\u3000-\u303F\uFF00-\uFFEF]+)/gu;
  //     return trans
  //       .split(".")
  //       .filter((s) => s.trim())
  //       .map((s) => s.trim() + ".")
  //       .map((sentence) =>
  //         sentence
  //           .split(hanRegex)
  //           .filter(Boolean)
  //           .map((segment) => ({
  //             text: segment,
  //             type: hanRegex.test(segment) ? "han" : "abc",
  //           }))
  //       );
  //   });
</script>

<div class="flex flex-col text-center gap-3 justify-center">
  <p
    class="font-wenkai text-[28px]"
    style:opacity={quote.length > 0 ? "100%" : "20%"}
  >
    {quote || "空"}
  </p>
  <!-- Container for phrases -->
  <div class="flex flex-wrap justify-center gap-y-1">
    <!-- each "indices" is an array of indices of sentences -->
    <!-- in this layer, the grouping of sentences in a paragraph should happen -->
    {#each paragraphs as indices, j}
      <!-- each index is an index of a sentence -->
      <!-- in this layer, each individual sentence should be rendered -->
      <div class="flex flex-wrap w-full justify-center gap-y-1">
        {#each indices as index}
          {#each sentences[index] as word, i}
            <div
              class="px-0.5"
              class:first={i === 0}
              class:last={i === sentences[index].length - 1}
              style:background-color={baseColors[(2 * j) % COLORS.length]}
              style:color={darkColors[(2 * j) % COLORS.length]}
            >
              {word}
            </div>
          {/each}
        {/each}
      </div>
    {/each}
  </div>
  <input
    type="text"
    name="source"
    id="source"
    class="text-[13px] text-silver text-center focus:ring-0 focus:outline-none"
    placeholder="Source"
  />
</div>

<style>
  .first {
    border-radius: 8px 0 0 8px;
    padding-left: 8px;
  }

  .last {
    margin-right: 4px;
    padding-right: 8px;
    border-radius: 0 8px 8px 0;
  }
</style>
