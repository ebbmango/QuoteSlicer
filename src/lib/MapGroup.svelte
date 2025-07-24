<script lang="ts">
  import { gsap } from "gsap";
  import { icons } from "./constants/icons";
  import { pinyin } from "pinyin";
  import { COLORS } from "./constants/colors";

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

  // Input mode management
  let isTrashFocused = $state(false);
  let isInputFocused = $state(false);
  let hideTimeout: number | null = null;

  // Component-wide input mode state
  let inputMode = $state<'mouse' | 'keyboard'>('mouse');

  const ANIMATION_CONFIG = {
    duration: 0.3,
    ease: "power2.out",
    collapsedWidth: "80%",
    expandedWidth: "100%",
  } as const;

  const color = COLORS[index % COLORS.length];

  const backgroundColor = `var(--color-${color})`;
  const lightColor = `var(--color-light-${color})`;
  const darkColor = `var(--color-dark-${color})`;
  const mixedDark = `color-mix(in srgb, var(--color-dark-${color}) 40%, transparent)`;
  const mixedBg = `color-mix(in srgb, var(--color-${color}) 20%, transparent)`;
<<<<<<< HEAD

  // Listen for global mouse movement to switch to mouse mode
  $effect(() => {
    function handleMouseMove() {
      if (inputMode !== 'mouse') {
        inputMode = 'mouse';
        // Reset keyboard-specific states when switching to mouse mode
        if (!hover) {
          showDelete = false;
        }
      }
    }

    function handleKeyDown(e: KeyboardEvent) {
      // Tab key indicates keyboard navigation
      if (e.key === 'Tab') {
        if (inputMode !== 'keyboard') {
          inputMode = 'keyboard';
          // Reset mouse-specific states when switching to keyboard mode
          hover = false;
        }
      }
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  // Handle showing/hiding based on current input mode
  $effect(() => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    if (inputMode === 'keyboard') {
      // Keyboard mode: show if trash is focused, hide with delay if neither is focused
      if (isTrashFocused) {
        showDelete = true;
      } else if (!isTrashFocused && !isInputFocused) {
        hideTimeout = setTimeout(() => {
          showDelete = false;
        }, 50);
      }
    } else {
      // Mouse mode: controlled by hover state
      // The hover handlers will manage showDelete directly
    }
  });
=======
>>>>>>> 8037db632c39227d3b7fa215e4e5680f595b982e

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
    if (inputMode === 'mouse') {
      hover = true;
    }
  }

  function handleMouseLeave() {
    if (inputMode === 'mouse') {
      hover = false;
      showDelete = false;
    }
  }

  function handleDeleteHover() {
    if (inputMode === 'mouse') {
      showDelete = true;
    }
  }

  function handleInputFocusIn() {
    isInputFocused = true;
    if (inputMode === 'keyboard') {
      // Don't show delete button when focusing on input in keyboard mode
    }
  }

  function handleInputFocusOut() {
    isInputFocused = false;
  }

  function handleTrashFocusIn() {
    isTrashFocused = true;
    // Delete button will be shown by the effect
  }

  function handleTrashFocusOut() {
    isTrashFocused = false;
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
<<<<<<< HEAD
        {hanzi}
=======
        {group.hanzi}
>>>>>>> 8037db632c39227d3b7fa215e4e5680f595b982e
      </span>
    </div>
    <!-- Pinyin Section -->
    <div class="flex w-full h-full max-w-[34%] justify-center items-center">
<<<<<<< HEAD
      <input
        placeholder="Empty"
        type="text"
        name="pinyin"
        id="pinyin"
        class="text-[16px] font-normal text-center w-full focus:outline-none focus:ring-0"
        style:color={darkColor}
        value={pinyin(hanzi)}
        onfocusin={handleInputFocusIn}
        onfocusout={handleInputFocusOut}
      />
=======
      <span
        class="text-[16px] font-normal"
        style:color={darkColor}
        style:opacity={group.pinyin ? "100%" : "40%"}
      >
        {group.pinyin || "Empty"}
      </span>
>>>>>>> 8037db632c39227d3b7fa215e4e5680f595b982e
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
        tabindex={-1}
        type="button"
        onmouseenter={handleDeleteHover}
        class="w-4 h-4 flex items-center justify-center rounded transition-all duration-200 hover:scale-110"
        style:opacity={hover && !showDelete && inputMode === 'mouse' ? "100%" : "0"}
        style:pointer-events={hover && !showDelete && inputMode === 'mouse' ? "auto" : "none"}
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
    onfocusin={handleTrashFocusIn}
    onfocusout={handleTrashFocusOut}
    class="absolute right-3 top-1/2 -translate-y-1/2 w-[26px] h-[26px] rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:brightness-105 focus:outline-0 focus:ring-2 focus:scale-105"
    style:background-color={backgroundColor}
    style:--tw-ring-color={lightColor}
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