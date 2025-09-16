<script lang="ts">
  import { icons } from "./lib/constants/icons";
  import MapGroup from "./lib/MapGroup.svelte";
  import ModeSelector from "./lib/ModeSelector.svelte";
  import Quote from "./lib/Quote.svelte";

  let move = $state(false);
  let dark = $state(false);

  const toggleMove = () => {
    move = !move;
  };

  const toggleDark = () => {
    dark = !dark;
  };

  $effect(() => console.log(dark));
</script>

<main>
  <div class="flex h-dvh" class:dark>
    <!-- LEFT -->
    <div
      id="left-bounding-box"
      class="relative w-full max-w-[30.75%] min-w-[340px] bg-white dark:bg-umbra duration-500"
    >
      <div
        class="absolute flex w-full h-full justify-center items-center bg-[#F4F4F4] dark:bg-umbra duration-500"
        class:translate-x-[-100%]={move}
      >
        <!-- Mappings -->
        <ol
          class="flex flex-col w-[81.3%] h-[85%] rounded-[20px] bg-white dark:bg-carbon duration-500 px-[9.26%] py-[36px] gap-3.5 overflow-scroll no-scrollbar"
        ></ol>
      </div>
    </div>
    <!-- MIDDLE -->
    <div
      class="w-full min-w-[400px] bg-white dark:bg-umbra lv-20 flex justify-center items-center gap-2 duration-500"
    >
      <button
        class="bg-blue-400 w-20 h-10 rounded-lg text-white active:bg-blue-500"
        type="button"
        onclick={toggleMove}>Move!</button
      >
      <button
        class="bg-blue-400 w-20 h-10 rounded-lg text-white active:bg-blue-500"
        type="button"
        onclick={toggleDark}>Dark!</button
      >
    </div>
    <!-- RIGHT -->
    <div
      id="right-bounding-box"
      class="relative w-full max-w-[30.75%] min-w-[340px] overflow-hidden bg-white dark:bg-umbra duration-500"
    >
      <div
        class="absolute flex w-full h-full justify-center items-center bg-[#F4F4F4] dark:bg-umbra duration-500"
        class:translate-x-[100%]={move}
      >
        <!-- JSON -->
        <div
          class="flex flex-col w-[81.3%] h-[85%] rounded-[20px] bg-white dark:bg-carbon duration-500 px-[9.26%] py-[36px] gap-3.5 overflow-scroll no-scrollbar"
        ></div>
      </div>
    </div>
  </div>
</main>

<style>
</style>
