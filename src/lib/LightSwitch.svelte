<script lang="ts">
  import type { Theme } from "./constants/types";
  import { getContext } from "svelte";
  import { icons } from "./constants/icons";

  const theme: Theme = getContext("theme");

  const toggle = () => {
    theme.dark = !theme.dark;
  };

  $effect(() => {
    console.log(theme.dark);
  });
</script>

<button
  onclick={toggle}
  aria-label="Dark Mode Toggle"
  class="group focus:outline-none"
>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 640 640"
    class="w-5 transition-transform duration-200 group-focus:scale-120 hover:scale-120"
    class:fill-[#de996b]={!theme.dark}
    class:fill-[#bebebe]={theme.dark}
  >
    <path
      opacity=".5"
      d={theme.dark ? icons.dark.paths[0] : icons.light.paths[0]}
    /><path d={theme.dark ? icons.dark.paths[1] : icons.light.paths[1]} /></svg
  >
</button>

<style>
</style>
