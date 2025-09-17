<script lang="ts">
  type Props = {
    label: string;
    icon: string; // SVG path
    dimmed: boolean;
    rotate?: boolean;
    click: () => void;
  };

  const { label, icon, dimmed, rotate = false, click }: Props = $props();
</script>

<button aria-label={label} onclick={click}>
  <svg
    class="w-5 duration-200 hover:scale-120"
    class:w-6={rotate}
    class:rotate-90={rotate}
    class:opacity-30={dimmed}
    viewBox="0 0 640 640"
  >
    <path d={icon} />
  </svg>
</button>
