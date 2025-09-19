<script lang="ts">
  import { icons } from "./constants/icons";

  type Props = {
    disable: boolean;
    value: string; // ?
    iconRef: SVGElement | null;
    showAlert: boolean;
  };

  let {
    value = $bindable(),
    iconRef = $bindable(),
    disable,
    showAlert,
  }: Props = $props();
</script>

<div class="relative flex w-full justify-center">
  <input
    bind:value
    inert={disable}
    type="text"
    name="quote"
    id="quote"
    class="bg-white inert:text-silver dark:bg-steel text-umbra dark:text-white duration-200 w-full max-w-[76%] pe-[35px] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 text-center"
  />

  <svg
    bind:this={iconRef}
    class="absolute right-[13%] top-[4.5pt] w-6 duration-150 dark:fill-tin fill-[#de996b] opacity-0"
    class:opacity-100={showAlert}
    viewBox={icons.alert.viewBox}
  >
    <path d={icons.alert.path} />
  </svg>
</div>
