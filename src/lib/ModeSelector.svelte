<script lang="ts">
  // svelte
  import { getContext, tick } from "svelte";
  import { fly } from "svelte/transition";
  // assets
  import { icons } from "./constants/icons";
  import type { Mode } from "./constants/types";
  import ModeSelectorButton from "./ModeSelectorButton.svelte";

  const mode: Mode = getContext("mode");
  const verse: boolean = $derived(mode.current === 2 || mode.current === 3);
  const write: boolean = $derived(mode.current === 0);

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
    class="flex gap-3 fill-tin h-[3dvh] duration-200 z-10"
  >
    <!-- MAPPING -->
    <ModeSelectorButton
      label="Map"
      icon={icons.highlighter.path}
      dimmed={mode.current !== 1}
      click={() => {
        mode.current = 1;
      }}
    />
    <!-- VERSIFICATION -->
    <ModeSelectorButton
      label="Versify"
      icon={icons.paragraph.path}
      dimmed={!verse}
      click={() => {
        if (!verse) mode.current = 2;
      }}
    />
    <!-- PREVIEW -->
    <ModeSelectorButton
      label="Preview"
      icon={icons.eye.path}
      dimmed={mode.current !== 4}
      click={() => {
        mode.current = 4;
      }}
    />
  </div>
  <!-- bottom row -->
  <!-- this should only be shown if the versification mode is active -->
  {#if verse}
    <div
      in:fly={{ y: -10, duration: 500 }}
      out:fly={{ x: write ? 200 : 0, duration: write ? 500 : 300 }}
      class="flex gap-3 fill-tin h-[3dvh]"
      class:-translate-y-4={!verse}
    >
      <!-- JOIN -->
      <ModeSelectorButton
        label="Join verses"
        icon={icons.join.path}
        rotate
        dimmed={mode.current !== 2}
        click={() => {
          mode.current = 2;
        }}
      />
      <!-- SPLIT -->
      <ModeSelectorButton
        label="Split verses"
        icon={icons.separate.path}
        rotate
        dimmed={mode.current !== 3}
        click={() => {
          mode.current = 3;
        }}
      />
    </div>
  {/if}
{/if}
