<script lang="ts">
  let { color, isFirst, isLast } = $props();
  let roundTop = isFirst ? "10px" : "2px";
  let roundBot = isLast ? "10px" : "2px";
</script>

<div class={`min-h-[70px] w-full bg-${color} rounded-t-[${roundTop}] rounded-b-[${roundBot}]`}></div>
