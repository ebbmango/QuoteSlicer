<script lang="ts">
  import Counter from "./lib/Counter.svelte";
</script>

<main>
  <div class="flex h-dvh">
    <!-- menu -->
    <div class="min-w-[30.75%] bg-umbra lv-20 flex justify-center items-center">
      <div class="w-[81.3%] h-[85%] rounded-[20px] bg-carbon"></div>
    </div>
    <!-- text -->
    <div class="w-full bg-umbra lv-20 flex-col justify-center">
      <div class="flex flex-col w-full max-h-[50%] h-full"></div>

      <!-- input form -->
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
    <!-- json -->
    <div class="min-w-[30.75%] bg-umbra lv-20 flex justify-center items-center">
      <div class="w-[81.3%] h-[85%] rounded-[20px] bg-carbon"></div>
    </div>
  </div>
</main>

<style>
</style>
