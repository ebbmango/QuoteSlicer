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

  const handleClick = () => {};

  // let paragraphs = $state<number[][]>([[0], [1, 2]]);

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

  // initially, a single paragraph holds all sentences
  let groups = $derived([sentences.map((s, i) => i)]);

  let paragraphs = $state(structuredClone(groups));

  // let paragraphs = $state(sentences.map((_, i) => [i]));
  // let paragraphs = $state<number[][]>([[0], [1, 2]]);

  $effect(() => {
    // paragraphs = sentences.map((_, i) => [i]);
  });
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
    {#each paragraphs as indices, paraNo}
      <!-- each index is an index of a sentence -->
      <!-- in this layer, each individual sentence should be rendered -->
      <div class="flex flex-wrap w-full justify-center gap-y-1">
        {#each indices as sentNo}
          {#each sentences[sentNo] as word, i}
            <button
              class="px-0.5"
              class:first={i === 0}
              class:last={i === sentences[sentNo].length - 1}
              style:background-color={baseColors[(2 * paraNo) % COLORS.length]}
              style:color={darkColors[(2 * paraNo) % COLORS.length]}
              onclick={() => {
                // console.log(`paragraph no.${paraNo} clicked`);
                // console.log(` sentence no.${sentNo} clicked`);
                // console.log(paragraphs.flat())

                // first: try only if it's the first
                if (sentNo === 0) {
                  // figure out: is it in or is it out?
                  // there are groups, always
                  // to find out whether it is in or out, I just have to find out in which group
                  // the first sentence currently is, and then check if the size of the group is
                  // 1 (alone/out) or more (together/in)

                  const relevantGroup = paragraphs.filter((arr) =>
                    arr.includes(sentNo)
                  )[0];
                  const isIn = relevantGroup.length > 1;
                  // console.log(relevantGroup);
                  // console.log(isIn);

                  if (isIn) {
                    // pop it out
                    const groupIndex = paragraphs.findIndex(
                      (group) => group == relevantGroup
                    );
                    paragraphs[groupIndex].shift();
                    paragraphs.unshift([0]);
                    console.log(paragraphs);
                  } else {
                    paragraphs.shift();
                    paragraphs[0].unshift(0);
                  }
                }
              }}
            >
              {word}
            </button>
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
