<script lang="ts">
  // svelte
  import { getContext, tick } from "svelte";
  import { fly } from "svelte/transition";
  // assets
  import { icons } from "./constants/icons";
  import type { Mode } from "./constants/types";
  import ModeSelectorButton from "./ModeSelectorButton.svelte";

  const mode: Mode = getContext("mode");

  const modes = new Map([
    [1, { label: "Map", icon: icons.highlighter.path }],
    [2, { label: "Versify", icon: icons.paragraph.path }],
    [3, { label: "Preview", icon: icons.eye.path }],
  ]);

  // PLAN: start in mode 0; when the mode switches, the keyboard
  // icon should fly out as the mode selector flies in.

  // ISSUE: the immediate conditional render prevented the fly in
  // and out animations from playing.

  // FIX: delay rendering the icon/menu of the new interaction
  // mode until the old one's outro animation finishes.

  let zero: boolean = $state(mode.current === 0); // true = text (0) / false = modes (1, 2, 3)
  let show: boolean = $state(true); // controls render, allowing for its delay

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
    {#each modes as [number, properties]}
      <ModeSelectorButton
        label={properties.label}
        icon={properties.icon}
        dimmed={mode.current !== number}
        click={() => {
          mode.current = number;
        }}
      />
    {/each}
  </div>
{/if}
