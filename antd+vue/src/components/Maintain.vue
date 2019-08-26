<template>
  <a-list :dataSource="data" class="list-item" bordered>
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <p v-if="item.showInput" slot="title" style="white-space: nowrap;" @dblclick="changeState(item)">{{item.value}}</p>
        <a-input @pressEsc="pressEsc(item)" @pressEnter="inputChange" @change="inputChange" auto-focus slot="title" v-else v-model="item.value">
          <a-icon slot="suffix" type="close-circle" @click="item.value = ''" />
        </a-input>
        <a-checkbox slot="avatar" :checked="item.complete" @change="handleChange(item)"></a-checkbox>
      </a-list-item-meta>
    </a-list-item>
  </a-list>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
export default {
  name: 'maintain',
  data () {
    return {
      bakValue: '',
      bakItem: []
    }
  },
  mounted() {
    let _self = this
    this.$nextTick(() => {
      document.addEventListener('keyup', e => {
        if (e.keyCode == 27 && _self.bakItem) {
          _self.bakItem.showInput = true
        }
      })
    })
  },
  computed: {
    ...mapGetters({
      allItem: 'getAllItem',
      completeItem: 'getCompleteItem',
      unCompleteItem: 'getUnCompleteItem'
    }),
    data () {      
      return this.$route.name === 'all' ? this.allItem : (this.$route.name === 'complete' ? this.completeItem : this.unCompleteItem)
    }
  },
  methods: {
    ...mapMutations(['setCompleteItem', 'setUnCompleteItem']),
    handleChange (item) {
      item.complete = !item.complete
      if (item.complete) {
        this.setCompleteItem(item)
      } else {
        this.setUnCompleteItem(item)
      }
    },
    changeState (item) {
      item.showInput = false
      this.bakValue = item.value
      this.bakItem = item
    },
    pressEsc (item) {
      item.showInput = true
      item.value = this.bakValue
    },
    inputChange(event) {
      if (event.code === 'Enter') {
        this.bakItem.showInput = true
        this.bakItem.value = event.target.value
        if (this.$route.name === 'all' || this.$route.name === 'unComplete') {
          this.setUnCompleteItem(this.data)
        } else {
          this.setCompleteItem(this.data)
        }
      }
    },
  }
}

</script>
<style scoped>
.list-item {
  margin-top: 15px;
}
</style>