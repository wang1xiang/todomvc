<template>
  <a-list v-show="allItem.length>0" :dataSource="data" class="list-item" bordered>
    <a-list-item slot="renderItem" slot-scope="item">
      <a-list-item-meta>
        <p v-if="item.showInput" slot="title" :class="item.complete ? 'complete':''" class="input" @dblclick="changeState(item)">{{item.value}}
          <a-icon type="close-circle" class="delete-button" @click="deleteIt(item)" />
        </p>
        <a-input @pressEnter="inputChange" @change="inputChange" auto-focus slot="title" v-else v-model="item.value">
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
      item: [],
      bakValue: ''
    }
  },
  mounted() {
    let _self = this
    this.$nextTick(() => {
      document.addEventListener('keyup', e => {
        if (e.keyCode == 27 && _self.bakValue) {
          _self.item.showInput = true
          _self.item.value = _self.bakValue
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
    ...mapMutations(['setCompleteItem', 'changeItem', 'setUnCompleteItem', 'deleteItem']),
    handleChange (item) {
      item.complete = !item.complete
      if (item.complete) {
        this.setCompleteItem(item.index)
      } else {
        this.setUnCompleteItem(item.index)
      }
    },
    changeState (item) {
      this.bakValue = item.value
      this.item = item
      item.showInput = false
    },
    inputChange(event) {
      if (event.code === 'Enter') {
        this.item.showInput = true
        this.item.value = event.target.value
        this.changeItem(this.item)
      }
    },
    deleteIt (item) {
      this.deleteItem(item.index)
    }
  }
}

</script>
<style scoped>
.list-item {
  margin-top: 15px;
}
.input {
  white-space: nowrap;
}
.input:hover > .delete-button {
  opacity: 1;
}
.complete {
  text-decoration: line-through;
  color: #000;
}
.delete-button {
  opacity: 0;
  float: right;
  cursor: pointer;
}
</style>