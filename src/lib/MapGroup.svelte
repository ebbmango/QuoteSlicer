<script lang="ts">
  import { gsap } from "gsap";
  import { icons } from "./constants/icons";
  import { pinyin } from "pinyin";

  type Props = {
    hanzi: string;
    index: number;
    isFirst: boolean;
    isLast: boolean;
    // onDelete?: (group: { hanzi: string; pinyin: string | null }) => void;
  };

  let { hanzi, index, isFirst, isLast }: Props = $props();

  const borderRadius = {
    top: isFirst ? "10px" : "2px",
    bottom: isLast ? "10px" : "2px",
  };

  let hover = $state(false);
  let showDelete = $state(false);
  let itemEl: HTMLDivElement;

  const ANIMATION_CONFIG = {
    duration: 0.3,
    ease: "power2.out",
    collapsedWidth: "80%",
    expandedWidth: "100%",
  } as const;

  const COLORS = [
    "greenish",
    "crystal",
    "aquarelle",
    "neptune",
    "wisteria",
    "mauve",
    "coral",
    "leon",
    "chamois",
  ];

  const color = COLORS[index % COLORS.length];

  const backgroundColor = `var(--color-${color})`;
  const lightColor = `var(--color-light-${color})`;
  const darkColor = `var(--color-dark-${color})`;
  const mixedDark = `color-mix(in srgb, var(--color-dark-${color}) 40%, transparent)`;
  const mixedBg = `color-mix(in srgb, var(--color-${color}) 20%, transparent)`;

  // Animation effect
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

  // Event handlers
  function handleMouseEnter() {
    hover = true;
  }

  function handleMouseLeave() {
    hover = false;
    showDelete = false;
  }

  function handleDeleteHover() {
    showDelete = true;
  }

  // function handleDelete() {
  //   onDelete?.(group);
  // }
</script>

<li
  role="listitem"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  class="flex min-h-[70px] w-full relative overflow-hidden transition duration-200"
  style:background-color={mixedBg}
  style:border-top-left-radius={borderRadius.top}
  style:border-top-right-radius={borderRadius.top}
  style:border-bottom-left-radius={borderRadius.bottom}
  style:border-bottom-right-radius={borderRadius.bottom}
>
  <div
    bind:this={itemEl}
    class="flex min-h-[70px] w-full relative z-10"
    style:background-color={backgroundColor}
    style:border-top-left-radius={borderRadius.top}
    style:border-top-right-radius={borderRadius.top}
    style:border-bottom-left-radius={borderRadius.bottom}
    style:border-bottom-right-radius={borderRadius.bottom}
  >
    <!-- Hanzi Section -->
    <div class="flex w-full h-full max-w-[33%] justify-center items-center">
      <span class="text-[28px]" style:color={lightColor}>
        {hanzi}
      </span>
    </div>
    <!-- Pinyin Section -->
    <div class="flex w-full h-full max-w-[34%] justify-center items-center">
      <input
        placeholder="Empty"
        type="text"
        name="pinyin"
        id="pinyin"
        class="text-[16px] font-normal text-center w-full focus:outline-none focus:ring-0"
        style:color={darkColor}
        value={pinyin(hanzi)}
      />
    </div>
    <!-- Group Number Section -->
    <div class="flex w-full h-full max-w-[20%] justify-end items-center">
      <span
        class="text-[13px] font-normal px-2 rounded"
        style:background-color={mixedDark}
        style:color={lightColor}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
    </div>
    <!-- Close Symbol Section -->
    <section class="flex w-full h-full max-w-[13%] justify-center items-center">
      <button
        type="button"
        tabindex={0}
        onmouseenter={handleDeleteHover}
        class="w-4 h-4 flex items-center justify-center rounded transition-all duration-200 hover:scale-110"
        style:opacity={hover && !showDelete ? "100%" : "0"}
        style:pointer-events={hover && !showDelete ? "auto" : "none"}
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

  <!-- Delete Button -->
  <button
    type="button"
    onclick={() => {
      // code comes here
    }}
    class="absolute right-[14px] top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-110"
    style:background-color={backgroundColor}
    style:opacity={showDelete ? "100%" : "0"}
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
