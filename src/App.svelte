<script lang="ts">
  import { icons } from "./lib/constants/icons";
  import MapGroup from "./lib/MapGroup.svelte";
  import ModeSelector from "./lib/ModeSelector.svelte";
  import Quote from "./lib/Quote.svelte";

  let state = $state(false);

  const toggleState = () => {
    state = !state;
  };

  $effect(() => {
    console.log(state);
  });
</script>

<main>
  <div class="flex h-dvh">
    <!-- LEFT -->
    <div
      id="left-bounding-box"
      class="relative w-full max-w-[30.75%] min-w-[340px]"
    >
      <div
        class="absolute flex w-full h-full justify-center items-center bg-[#F4F4F4] duration-500"
        class:translate-x-[-100%]={state}
      >
        <!-- Mappings -->
        <ol
          class="flex flex-col w-[81.3%] h-[85%] rounded-[20px] bg-white px-[9.26%] py-[36px] gap-3.5 overflow-scroll no-scrollbar"
        ></ol>
      </div>
    </div>
    <!-- MIDDLE -->
    <div
      class="w-full min-w-[400px] bg-white lv-20 flex justify-center items-center"
    >
      <button
        class="bg-blue-400 w-20 h-10 rounded-lg text-white active:bg-blue-500"
        type="button"
        onclick={toggleState}>Click me!</button
      >
    </div>
    <!-- RIGHT -->
    <div
      id="right-bounding-box"
      class="relative w-full max-w-[30.75%] min-w-[340px] overflow-hidden"
    >
      <div
        class="absolute flex w-full h-full justify-center items-center bg-[#F4F4F4] duration-500"
        class:translate-x-[100%]={state}
      >
        <!-- JSON -->
        <div
          class="flex flex-col w-[81.3%] h-[85%] rounded-[20px] bg-white px-[9.26%] py-[36px] gap-3.5 overflow-scroll no-scrollbar"
        ></div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
