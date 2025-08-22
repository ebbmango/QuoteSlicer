<!-- This is used to change between the three interaction modes: -->
<!-- 1) Highlighting   //   2) Versification    //    3) Preview -->

<script lang="ts">
  import type { IconSVG } from "./constants/types";
  import { interactionMode } from "./contexts/interactionMode.svelte";

  interface ModeConfig {
    icon: IconSVG;
    label?: string;
  }

  interface Props {
    mode: ModeConfig;
    index: number;
    activeIndex: number;
    onModeChange: (index: number) => void;
  }

  let { mode, index, activeIndex, onModeChange }: Props = $props();

  let isHover = $state(false);
  let isFocus = $state(false);

  // Only activate one interaction style at a time
  const isActive = () =>
    (interactionMode.isMouse && isHover) ||
    (interactionMode.isKeyboard && isFocus);
</script>

<button
  class="flex focus:ring-0 focus:outline-none duration-200"
  class:scale-120={isActive()}
  type="button"
  aria-label={mode.label}
  onclick={() => onModeChange(index)}
  onmouseenter={() => (isHover = true)}
  onmouseleave={() => (isHover = false)}
  onfocusin={() => (isFocus = true)}
  onfocusout={() => (isFocus = false)}
>
  <svg
    class="w-5 duration-200 hover:scale-120"
    viewBox={mode.icon.viewBox}
    style:opacity={activeIndex === index ? "100%" : "30%"}
  >
    <path d={mode.icon.path} />
  </svg>
</button>
