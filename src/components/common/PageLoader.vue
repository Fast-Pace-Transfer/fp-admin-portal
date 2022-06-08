<template>
  <div class="loading">
    <span></span>
  </div>
</template>

<style scoped>
.loading {
  top: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
}
@keyframes spin {
  to {
    transform: rotateZ(360deg);
  }
}
.loading span {
  display: block;
  width: 3.95rem;
  height: 3.95rem;
  margin: 0 auto;
  border: 0.1875rem solid transparent;
  border-top-color: #f21d2f;
  border-bottom-color: #535ba7;
  border-radius: 50%;
  animation: spin ease 1000ms infinite;
}
</style>
