<script lang="ts">
  import { icons } from "./lib/constants/icons";
  import MapGroup from "./lib/MapGroup.svelte";
  import ModeSelector from "./lib/ModeSelector.svelte";
  import Quote from "./lib/Quote.svelte";
  import {
    initModeTracking,
    interactionMode,
  } from "./lib/contexts/interactionMode.svelte";

  initModeTracking();
  $inspect(interactionMode.current);

  // let hanzis = $state([]);
  let hanzis = $state([
    "一",
    "像",
    "天",
    "冂",
    "像",
    "雲",
    "水",
    "从",
    "雲",
    "下",
    "也",
  ]);
  let quote = $state<string>("一像天。冂像雲。水从雲下也。");
  let trans = $state<string>(
    "一 represents the sky. 冂 represents a cloud. Water is flowing down from the sky."
  );

  const modes = [
    {
      // Link
      icon: icons.highlighter,
      label: "Link hanzis to their translations",
    },
    {
      // Format
      icon: icons.paragraph,
      label: "Format text display",
    },
    {
      // Preview
      icon: icons.eye,
      label: "Preview final result",
    },
  ];

  let currentModeIndex = $state(1); // Default to format mode

  const handleModeChange = (newIndex: number) => {
    currentModeIndex = newIndex;
  };
</script>

<main>
  <div class="flex h-dvh">
    <!-- left-hand section -->
    <div
      class="w-full max-w-[30.75%] min-w-[340px] bg-umbra lv-20 flex justify-center items-center"
    >
      <!-- mappings menu -->
      <ol
        class="flex flex-col w-[81.3%] h-[85%] rounded-[20px] bg-carbon px-[9.26%] py-[36px] gap-3.5 overflow-scroll no-scrollbar"
      >
        {#each hanzis as hanzi, i}
          <MapGroup
            {hanzi}
            index={i}
            isFirst={i === 0}
            isLast={i === hanzis.length - 1}
          />
        {/each}
      </ol>
    </div>
    <!-- middle section -->
    <div class="w-full min-w-[400px] bg-umbra lv-20 flex-col justify-center">
      <!-- mode selection -->
      <div
        class="flex flex-col w-full max-h-[10%] h-full justify-around items-center"
      >
        <!-- Icons (mode selectors) -->
        <div class="w-full flex gap-3 justify-center fill-[#BEBEBE]">
          {#each modes as mode, i}
            <ModeSelector
              {mode}
              index={i}
              activeIndex={currentModeIndex}
              onModeChange={handleModeChange}
            />
          {/each}
        </div>
      </div>
      <!-- quote section -->
      <div
        class="flex flex-col w-full max-h-[40%] h-full justify-around items-center"
      >
        <Quote {quote} {trans} />
      </div>

      <!-- form section -->
      <div
        class="flex flex-col w-full max-h-[50%] h-full justify-end items-center"
      >
        <div
          class="flex flex-col w-[88%] h-[250px] mb-[7.5dvh] rounded-[20px] bg-carbon items-center justify-center gap-8 pb-2"
        >
          <div class="flex flex-col items-center w-full">
            <label for="quote" class="text-silver text-[14px] mb-3"
              >Original Quote</label
            >
            <input
              bind:value={quote}
              type="text"
              name="quote"
              id="quote"
              placeholder="道可道，非常道。"
              class="bg-steel w-full max-w-[76%] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 font-sans text-center placeholder:text-[#6b6b6b] placeholder:text-"
            />
          </div>
          <div class="flex flex-col items-center w-full">
            <label for="quote" class="text-silver text-[14px] mb-3"
              >Translation Text</label
            >
            <input
              bind:value={trans}
              type="text"
              name="quote"
              id="quote"
              placeholder=""
              class="bg-steel w-full max-w-[76%] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 font-sans text-center"
            />
          </div>
        </div>
      </div>
    </div>
    <!-- right-hand section -->
    <div
      class="w-full flex-col max-w-[30.75%] min-w-[340px] bg-umbra lv-20 flex justify-end items-center"
    >
      <span class="text-silver text-[14px] mb-3">Resulting JSON</span>
      <div class="w-[81.3%] h-[85%] rounded-[20px] mb-[7.5dvh] bg-carbon"></div>
    </div>
  </div>
</main>
