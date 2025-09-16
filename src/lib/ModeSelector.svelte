<script lang="ts">
  import { icons } from "./constants/icons";

  let show = $state(false);

  const toggle = () => {
    show = !show;
  };
</script>

<!-- top row -->
<div
  class="flex gap-3 fill-tin h-[50%] duration-200 z-10"
>
  <svg
    class="w-5 duration-200 hover:scale-120"
    viewBox={icons.highlighter.viewBox}
  >
    <path d={icons.highlighter.path} />
  </svg>
  <svg
    onclick={toggle}
    class="w-5 duration-200 hover:scale-120"
    viewBox={icons.paragraph.viewBox}
  >
    <path d={icons.paragraph.path} />
  </svg>
  <svg class="w-5 duration-200 hover:scale-120" viewBox={icons.eye.viewBox}>
    <path d={icons.eye.path} />
  </svg>
</div>
<!-- bottom row -->
<!-- this should only be shown if the versification mode is active -->
<div
  class="flex gap-3 fill-tin h-[50%] animated"
  class:-translate-y-4={show}
  class:opacity-0={show}
>
  <svg
    class="w-6 duration-200 hover:scale-120 rotate-90"
    viewBox={icons.join.viewBox}
  >
    <path d={icons.join.path} />
  </svg>
  <svg
    class="w-6 duration-200 hover:scale-120 rotate-90"
    viewBox={icons.separate.viewBox}
  >
    <path d={icons.separate.path} />
  </svg>
</div>

<style>
    .animated {
        transition: opacity 150ms ease-in, translate 500ms ease;
    }

</style>