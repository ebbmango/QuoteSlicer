<script lang="ts">
  // svelte
  import { getContext, tick } from "svelte";
  import { fly } from "svelte/transition";
  // assets
  import { icons } from "./constants/icons";
  import type { Mode } from "./constants/types";

  let expand = $state(false);
  const toggle = () => {
    expand = !expand;
  };

  const mode: Mode = getContext("mode");

  // PLAN: start in mode 0; when the mode switches, the keyboard
  // icon should fly out as the mode selector flies in.

  // ISSUE: the immediate conditional render prevented the fly in
  // and out animations from playing.

  // FIX: delay rendering the icon/menu of the new interaction
  // mode until the old one's outro animation finishes.

  let zero = $state(mode.current === 0); // true = text (0) / false = modes (1, 2, 3)
  let show = $state(true); // controls render, allowing for its delay

  $effect(() => {
    const next = mode.current === 0;
    if (next !== zero) show = false;
  });

  async function delay() {
    zero = mode.current === 0;
    await tick();
    show = true;
  }
</script>

{#if zero}
  {#if show}
    <svg
      in:fly={{ x: -200, duration: 500 }}
      out:fly={{ x: -200, duration: 500 }}
      onoutroend={delay}
      class="w-8 duration-200 fill-tin"
      viewBox={icons.keyboard.viewBox}
    >
      <path d={icons.keyboard.path} />
    </svg>
  {/if}
{:else if show}
  <!-- top row -->
  <div
    in:fly={{ x: 200, duration: 500 }}
    out:fly={{ x: 200, duration: 500 }}
    onoutroend={delay}
    class="flex gap-3 fill-tin h-[50%] duration-200 z-10"
  >
    <svg
      class="w-5 duration-200 hover:scale-120"
      viewBox={icons.highlighter.viewBox}
    >
      <path d={icons.highlighter.path} />
    </svg>
    <svg
      onclick={toggle}
      class="w-5 duration-200 hover:scale-120"
      viewBox={icons.paragraph.viewBox}
    >
      <path d={icons.paragraph.path} />
    </svg>
    <svg class="w-5 duration-200 hover:scale-120" viewBox={icons.eye.viewBox}>
      <path d={icons.eye.path} />
    </svg>
  </div>
  <!-- bottom row -->
  <!-- this should only be shown if the versification mode is active -->
  <div
    class="flex gap-3 fill-tin h-[50%] animated"
    class:-translate-y-4={!expand}
    class:opacity-0={!expand}
  >
    <svg
      class="w-6 duration-200 hover:scale-120 rotate-90"
      viewBox={icons.join.viewBox}
    >
      <path d={icons.join.path} />
    </svg>
    <svg
      class="w-6 duration-200 hover:scale-120 rotate-90"
      viewBox={icons.separate.viewBox}
    >
      <path d={icons.separate.path} />
    </svg>
  </div>
{/if}

<style>
  .animated {
    transition:
      opacity 150ms ease-in,
      translate 500ms ease;
  }
</style>
