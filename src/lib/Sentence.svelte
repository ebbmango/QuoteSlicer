<script lang="ts">
  let { sentence } = $props();
</script>

{console.log("render")}
{console.log(sentence)}
{#each sentence as segment}
  {console.log(segment)}

  <span>{segment.text}</span>
{/each}
