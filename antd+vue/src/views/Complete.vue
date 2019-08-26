<template>
  <div class="container">
    <HeadInput></HeadInput>
    <Maintain></Maintain>
    <Foot></Foot>
  </div>
</template>

<script>
import HeadInput from '@components/HeadInput'
import Maintain from '@components/Maintain'
import Foot from '@components/Foot'
export default {
  name: 'complete',
  components: {
    HeadInput,
    Maintain,
    Foot
  }
}

</script>
<style>
</style>