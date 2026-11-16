<template>
  <kbd class="lm-kbd"><slot /></kbd>
</template>

<style>
@layer lumen {
  .lm-kbd {
    font: inherit;
    font-size: 11px;
    padding: 0 4px;
    border-radius: 3px;
    background: rgba(127, 127, 127, 0.2);
    opacity: 0.8;
  }
  /* shortcut hints are meaningless without a keyboard */
  @media (max-width: 767.98px) {
    .lm-kbd {
      display: none;
    }
  }
}
</style>
