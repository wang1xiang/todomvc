<template>
  <div>
    <h1>todos</h1>
    <a-input v-model="text" @pressEnter="inputChange" @change="inputChange" class="header-input" placeholder="What needs to be down?" auto-focus>
      <a-icon slot="prefix" class="fix-icon" type="down" :style="{color: color}" @click="completeAll"/>
      <a-icon v-if="text" slot="suffix" type="close-circle" class="fix-icon" @click="emitEmpty" />
    </a-input>
  </div>
</template>

<script>
import uuidv1 from 'uuid'
import{ mapGetters, mapMutations } from 'vuex'
export default {
  name: 'headInput',
  data () {
    return {
      text: ''
    }
  },
  computed: {
    ...mapGetters({
      completeItem: 'getCompleteItem',
      allItem: 'getAllItem'
    }),
    color () {
      return this.completeItem.length === this.allItem.length ? '#737373' : '#E6E6E6'
    }
  },
  methods: {
    ...mapMutations(['setUnCompleteItem', 'setCompleteItem']),
    inputChange(event) {
      if (event.code === 'Enter' && event.target.value !== '') {
        let param = {
          index: uuidv1(),
          complete: false,
          showInput: true,
          value: event.target.value
        }
        this.setUnCompleteItem(param)
        this.emitEmpty()
      }
    },
    emitEmpty () {
      this.text = ''
    },
    completeAll () {      
      if (this.completeItem.length === 0) {
        this.setCompleteItem('all')
      } else {
        this.setUnCompleteItem('all')
      }
    }
  }
}

</script>
<style scoped>
.header-input {
  width: 20vw;
}
.fix-icon {
  cursor: pointer;
}
</style>