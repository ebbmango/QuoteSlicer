<script lang="ts">
  import MapGroup from "./lib/MapGroup.svelte";

  let colors = [
    "greenish",
    "crystal",
    "aquarelle",
    "neptune",
    "wisteria",
    "mauve",
    "coral",
    "leon",
    "chamois",
  ];
</script>

<main>
  <div class="flex h-dvh">
    <!-- left-hand section -->
    <div
      class="w-full max-w-[30.75%] min-w-[340px] bg-umbra lv-20 flex justify-center items-center"
    >
      <!-- mappings menu -->
      <div
        class="flex flex-col w-[81.3%] h-[85%] rounded-[20px] bg-carbon px-[9.26%] py-[36px] gap-3.5 overflow-scroll no-scrollbar"
      >
        {#each colors as color, i}
          <MapGroup
            {color}
            index={i}
            isFirst={i === 0}
            isLast={i === colors.length - 1}
          />
        {/each}
      </div>
    </div>
    <!-- middle section -->
    <div class="w-full min-w-[400px] bg-umbra lv-20 flex-col justify-center">
      <!-- quote section -->
      <div
        class="flex flex-col w-full max-h-[50%] h-full text-center gap-3 justify-center pt-[15dvh]"
      >
        <p class="font-wenkai text-[28px]">一像天。冂像雲。水从雲下也。</p>
        <p class="italic text-[16px]">
          <span class="font-wenkai not-italic">一</span> represents the sky.
          <span class="font-wenkai not-italic">冂</span> represents a cloud. Water
          is flowing down from the sky.
        </p>
        <p class="text-[13px] text-silver">Source</p>
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
