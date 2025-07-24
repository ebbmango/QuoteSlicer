<script lang="ts">
  import type { IconSVG } from "./constants/types";

  interface ModeConfig {
    icon: IconSVG;
    label?: string;
  }

  interface Props {
    modes: ModeConfig[];
    currentIndex: number;
    onModeChange: (index: number) => void;
  }

  let { modes, currentIndex, onModeChange }: Props = $props();

  // TODO: Learn CONTEXT API to use the same logic as in the MapGroup to
  // distinguish between mouse and keyboard interactions to make sure that
  // the buttons only scale once, be it with mouse hover or keyboard focus.
</script>

{#each modes as mode, i}
  <button
    class="flex focus:ring-0 focus:outline-none focus:scale-120 duration-200"
    type="button"
    aria-label={mode.label}
    onclick={() => {
      onModeChange(i);
    }}
  >
    <svg
      class="w-5 duration-200 hover:scale-120"
      viewBox={mode.icon.viewBox}
      style:opacity={currentIndex === i ? "100%" : "30%"}
    >
      <path d={mode.icon.path} />
    </svg>
  </button>
{/each}
