<script lang="ts">
  export let color: string;
  export let index: number;
  export let isFirst: boolean;
  export let isLast: boolean;

  const roundTop = isFirst ? "10px" : "2px";
  const roundBot = isLast ? "10px" : "2px";
</script>

<div
  class="flex min-h-[70px] w-full rounded-t-[2px] rounded-b-[2px]"
  style="
    background-color: var(--color-{color});
    border-top-left-radius: {roundTop};
    border-top-right-radius: {roundTop};
    border-bottom-left-radius: {roundBot};
    border-bottom-right-radius: {roundBot};
  "
>
  <div class="flex w-full h-full max-w-[33%] justify-center items-center">
    <span class="text-[28px]" style="color: var(--color-light-{color})">
      一
    </span>
  </div>
  <div class="flex w-full h-full max-w-[34%] justify-center items-center">
    <span
      class="text-[16px] font-normal"
      style="color: var(--color-dark-{color})"
    >
      yī
    </span>
  </div>
  <div class="flex w-full h-full max-w-[33%] justify-center items-center">
    <span
      class="text-[13px] font-normal px-2 rounded"
      style="
        background-color: color-mix(in srgb, var(--color-dark-{color}) 40%, transparent);
        color: var(--color-light-{color})
      "
    >
      {String(index + 1).padStart(2, "0")}
    </span>
  </div>
</div>
