<script lang="ts">
  import { getContext, onMount } from "svelte";
  import { icons } from "./constants/icons";
  import type { Mode } from "./constants/types";
  import gsap, { Power4 } from "gsap";
  import {
    backIn,
    backInOut,
    backOut,
    bounceIn,
    bounceInOut,
  } from "svelte/easing";
  import { fly } from "svelte/transition";

  let quote = $state<string>("一像天。冂像雲。水从雲下也。");
  let trans = $state<string>(
    "一 represents the sky. 冂 represents a cloud. Water is flowing down from the sky."
  );

  const mode: Mode = getContext("mode");
  const lock: boolean = $derived(mode.current !== 0);

  let button: HTMLButtonElement | null = null;
  let form: HTMLDivElement | null = null;
  let timeline: GSAPTimeline = gsap.timeline({ paused: true });

  onMount(() => {
    timeline.to(button, {
      // y: -8,
      rotation: 90,
      duration: 0.2,
      ease: backInOut,
    });
    timeline.to(button, {
      y: 200,
      duration: 0.3,
      delay: 0.4,
      ease: backIn,
    });
    timeline;
  });
</script>

<!-- wrapper -->
<div
  class="absolute bottom-0 flex flex-col w-full h-[40%] items-center gap-2 bg-blue-10 duration-700"
  class:translate-y-[85%]={lock}
>
  <!-- lock icon -->
  <div class="flex w-full h-5 justify-center gap-1">
    <svg
      class="w-4 fill-tin duration-800"
      viewBox={icons.lock.viewBox}
      class:translate-y-10={!lock}
    >
      <path d={icons.lock.path} />
    </svg>
    <button
      aria-label="Return"
      onclick={() => {
        mode.current = 0;
      }}
    >
      <svg
        class="w-4 scale-95 mt-[10%] icon rotate-45 hover:-rotate-135 fill-tin hover:fill-[#de996b]"
        viewBox={icons.back.viewBox}
        class:translate-y-10={!lock}
      >
        <path d={icons.back.path} />
      </svg>
    </button>
  </div>
  <!-- form itself -->
  <div
    class="flex flex-col w-[88%] h-[70%] rounded-[20px] bg-whitesmoke dark:bg-carbon duration-400 justify-center gap-6 pb-1 z-10"
  >
    <div class="flex flex-col items-center w-full">
      <label for="quote" class="label">Original Quote</label>
      <input
        inert={lock}
        bind:value={quote}
        type="text"
        name="quote"
        id="quote"
        class="bg-white inert:text-silver dark:bg-steel text-umbra dark:text-white duration-200 w-full max-w-[76%] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 text-center"
      />
    </div>
    <div class="flex flex-col items-center w-full">
      <label for="quote" class="label">Translation Text</label>
      <input
        inert={lock}
        bind:value={trans}
        type="text"
        name="quote"
        id="quote"
        class="bg-white inert:text-silver dark:bg-steel text-umbra dark:text-white duration-200 w-full max-w-[76%] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 text-center text-[14px]"
      />
    </div>
  </div>
  <button
    id="submit"
    bind:this={button}
    aria-label="continue"
    class="mt-3 focus:scale-120 hover:scale-120 focus:outline-none duration-300 fill-silver dark:fill-tin opacity-50 dark:opacity-30 hover:opacity-100 focus:opacity-100"
    onclick={() => {
      mode.current = 1;
    }}
    ><svg class="w-6 duration-200" viewBox={icons.chevrons.viewBox}>
      <path d={icons.chevrons.path} />
    </svg></button
  >
</div>

<style>
  .icon {
    transition:
      translate 800ms,
      scale 300ms,
      fill 300ms,
      rotate 300ms ease-in-out;
  }

  .label {
    color: #8f8f8f;
    font-family: "Noto Serif JP", serif;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 12px;
  }
</style>
