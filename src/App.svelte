<script lang="ts">
  import { setContext } from "svelte";
  import type { Mode, Theme } from "./lib/constants/types";
  import Form from "./lib/Form.svelte";
  import Quote from "./lib/Quote.svelte";
  import LightSwitch from "./lib/LightSwitch.svelte";
  import ModeSelector from "./lib/ModeSelector.svelte";

  // Contexts
  let theme: Theme = $state({ dark: false });
  setContext("theme", theme);

  let mode: Mode = $state({ current: 0 });
  let move = $derived(mode.current === 0);
  setContext("mode", mode);
</script>

<main>
  <div class="flex h-dvh" class:dark={theme.dark}>
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
      class="overflow-hidden relative w-full min-w-[400px] bg-white dark:bg-umbra flex flex-col justify-center items-center duration-500"
      class:pb-[40dvh]={move}
      class:pb-[20dvh]={!move}
    >
      <!-- BUTTONS -->
      <div class="flex flex-col w-full min-h-[13dvh] items-center gap-3 mt-4">
        <div class="flex w-full justify-center h-[33%]">
          <LightSwitch />
        </div>
        <div class="w-full flex h-[66%] flex-col gap-1 items-center">
          <ModeSelector />
        </div>
      </div>
      <!-- QUOTE -->
      <Quote trans={""} quote={""} source={""} />
      <!-- FORM -->
      <Form />
      <!-- <button
        class="bg-blue-400 w-20 h-10 rounded-lg text-white active:bg-blue-500"
        type="button"
        onclick={toggleMove}>Move!</button
      >
      <button
        class="bg-blue-400 w-20 h-10 rounded-lg text-white active:bg-blue-500"
        type="button"
        onclick={toggleDark}>Dark!</button
      > -->
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
