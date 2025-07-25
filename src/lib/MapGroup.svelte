<script lang="ts">
  import { gsap } from "gsap";
  import { icons } from "./constants/icons";
  import { pinyin } from "pinyin";
  import { COLORS } from "./constants/colors";
  import { interactionMode } from "./contexts/interactionMode.svelte";

  // ===== TYPES =====
  type Props = {
    hanzi: string;
    index: number;
    isFirst: boolean;
    isLast: boolean;
  };

  // ===== PROPS =====
  let { hanzi, index, isFirst, isLast }: Props = $props();

  // ===== STATE =====
  let hovering = $state(false);
  let focusTrash = $state(false);
  let focusInput = $state(false);
  let showDelete = $state(false);
  let itemEl: HTMLDivElement;
  let hideTimeout: number | null = null;

  // ===== COMPUTED VALUES =====
  const focused = $derived(focusTrash || focusInput);

  const showXmark = $derived(
    hovering && !showDelete && interactionMode.isMouse
  );

  // ===== STYLING =====
  const color = COLORS[index % COLORS.length];
  const backgroundColor = `var(--color-${color})`;
  const lightColor = `var(--color-light-${color})`;
  const darkColor = `var(--color-dark-${color})`;
  const mixedDark = `color-mix(in srgb, var(--color-dark-${color}) 40%, transparent)`;
  const mixedBg = `color-mix(in srgb, var(--color-${color}) 20%, transparent)`;

  const top = isFirst ? "10px" : "2px";
  const bot = isLast ? "10px" : "2px";
  const borderRadius = `${top} ${top} ${bot} ${bot}`;

  // ===== CONSTANTS =====
  const ANIMATION_CONFIG = {
    duration: 0.3,
    ease: "power2.out",
    collapsedWidth: "80%",
    expandedWidth: "100%",
  } as const;

  // ===== EFFECTS =====

  // Mouse/keyboard interaction mode handling
  $effect(() => {
    if (interactionMode.isMouse && !hovering) showDelete = false;
    if (interactionMode.isKeyboard) hovering = false;
  });

  // Keyboard mode delete button visibility
  $effect(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    if (interactionMode.isKeyboard) {
      if (focusTrash) {
        showDelete = true;
      } else if (!focused) {
        hideTimeout = setTimeout(() => {
          showDelete = false;
        }, 50);
      }
    }
  });

  // GSAP animation for width and border radius
  $effect(() => {
    if (!itemEl) return;

    const targetWidth = showDelete
      ? ANIMATION_CONFIG.collapsedWidth
      : ANIMATION_CONFIG.expandedWidth;

    const newBorderRadius = {
      top: showDelete ? 2 : isFirst ? 10 : 2,
      bottom: showDelete ? 2 : isLast ? 10 : 2,
    };

    gsap.to(itemEl, {
      width: targetWidth,
      borderTopRightRadius: newBorderRadius.top,
      borderBottomRightRadius: newBorderRadius.bottom,
      duration: ANIMATION_CONFIG.duration,
      ease: ANIMATION_CONFIG.ease,
    });
  });

  // ===== EVENT HANDLERS =====
  function handleMouseMove() {
    hovering = true;
  }

  function handleMouseLeave() {
    hovering = false;
  }

  function handleDeleteHover() {
    showDelete = true;
  }

  function handleDeleteClick() {
    // Delete logic comes here
  }
</script>

<!-- Main List Item Container -->
<li
  role="listitem"
  onmousemove={handleMouseMove}
  onmouseleave={handleMouseLeave}
  class="flex min-h-[70px] w-full relative overflow-hidden transition duration-200"
  style:background-color={mixedBg}
  style:border-radius={borderRadius}
>
  <!-- Sliding Foreground Content -->
  <div
    bind:this={itemEl}
    class="flex min-h-[70px] w-full relative z-10"
    style:background-color={backgroundColor}
    style:border-radius={borderRadius}
  >
    <!-- Hanzi Display -->
    <div class="flex w-full h-full max-w-[33%] justify-center items-center">
      <span class="text-[28px]" style:color={lightColor}>
        {hanzi}
      </span>
    </div>

    <!-- Pinyin Input -->
    <div class="flex w-full h-full max-w-[34%] justify-center items-center">
      <input
        placeholder="Empty"
        type="text"
        name="pinyin"
        id="pinyin"
        class="text-[16px] font-normal text-center w-full focus:outline-none focus:ring-0"
        style:color={darkColor}
        value={pinyin(hanzi)}
        bind:focused={focusInput}
      />
    </div>

    <!-- Group Number Badge -->
    <div class="flex w-full h-full max-w-[20%] justify-end items-center">
      <span
        class="text-[13px] font-normal px-2 rounded"
        style:background-color={mixedDark}
        style:color={lightColor}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>

    <!-- X Mark Trigger Button -->
    <section class="flex w-full h-full max-w-[13%] justify-center items-center">
      <button
        tabindex={-1}
        type="button"
        onmouseenter={handleDeleteHover}
        class="w-4 h-4 flex items-center justify-center rounded transition-all duration-200 hover:scale-110"
        style:opacity={showXmark ? 1 : 0}
        style:pointer-events={showXmark ? "auto" : "none"}
        aria-label="Show delete option"
      >
        <svg
          class="w-3 h-3"
          xmlns="http://www.w3.org/2000/svg"
          viewBox={icons.xmark.viewBox}
        >
          <path style:fill={mixedDark} d={icons.xmark.path} />
        </svg>
      </button>
    </section>
  </div>

  <!-- Delete Action Button -->
  <button
    type="button"
    onclick={handleDeleteClick}
    bind:focused={focusTrash}
    class="absolute right-3 top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-105 focus:outline-0 focus:ring-2 focus:scale-105"
    style:background-color={backgroundColor}
    style:--tw-ring-color={lightColor}
    style:opacity={showDelete ? 1 : 0}
    style:pointer-events={showDelete ? "auto" : "none"}
    aria-label="Delete group {index}"
  >
    <svg
      class="w-[14px] h-[14px]"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={icons.trash.viewBox}
    >
      <path style:fill={lightColor} d={icons.trash.path} />
    </svg>
  </button>
</li>
