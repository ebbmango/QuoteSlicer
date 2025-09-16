<script lang="ts">
  import { icons } from "./constants/icons";

  let quote = $state<string>("一像天。冂像雲。水从雲下也。");
  let trans = $state<string>(
    "一 represents the sky. 冂 represents a cloud. Water is flowing down from the sky."
  );
  let lock = $state<boolean>(false);

  const toggleLock = () => {
    lock = !lock;
  };
</script>

<!-- wrapper -->
<div class="flex flex-col w-full h-full items-center gap-2 bg-blue-10">
  <!-- lock icon -->
  <div class="flex w-full h-5 justify-center">
    <svg
      class="w-4 duration-200 hover:scale-120 fill-tin translate-y-10 -z-10"
      viewBox={icons.lock.viewBox}
    >
      <path d={icons.lock.path} />
    </svg>
  </div>
  <!-- form itself -->
  <div
    class="flex flex-col w-[88%] h-[70%] rounded-[20px] bg-whitesmoke dark:bg-carbon duration-400 justify-center gap-6 pb-1"
  >
    <div class="flex flex-col items-center w-full">
      <label for="quote" class="label">Original Quote</label>
      <input
        inert={lock}
        bind:value={quote}
        type="text"
        name="quote"
        id="quote"
        class="bg-white dark:bg-steel text-umbra dark:text-white duration-200 w-full max-w-[76%] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 text-center"
      />
    </div>
    <div class="flex flex-col items-center w-full">
      <label for="quote" class="label">Translation Text</label>
      <input
        inert={lock}
        bind:value={trans}
        type="text"
        name="quote"
        id="quote"
        class="bg-white dark:bg-steel text-umbra dark:text-white duration-200 w-full max-w-[76%] px-3 rounded-[5px] h-9 focus:outline-none focus:ring-0 text-center text-[14px]"
      />
    </div>
  </div>
  <button
    onclick={toggleLock}
    aria-label="continue"
    class="focus:scale-120 hover:scale-120 focus:outline-none duration-200 fill-tin"
    ><svg class="w-6 duration-200" viewBox={icons.chevrons.viewBox}>
      <path d={icons.chevrons.path} />
    </svg></button
  >
</div>

<style>
  .label {
    color: #8f8f8f;
    font-family: "Noto Serif JP", serif;
    font-size: 14px;
    font-weight: 400;
    margin-bottom: 12px;
  }
</style>
