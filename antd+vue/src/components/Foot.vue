<template>
  <div class="route-item">
    <p>共有{{size}}条数据</p>
    <router-link v-for="item in routes" :key="item.link" :to="item.link">{{item.name}}</router-link>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'foot',
  data () {
    return {
      routes: [
        {
          link: 'all',
          name: '全部'
        },{
          link: 'unComplete',
          name: '未完成'
        },{
          link: 'complete',
          name: '已完成'
        }
      ]
    }
  },
  computed: {
    ...mapGetters({
      allItem: 'getAllItem',
      completeItem: 'getCompleteItem',
      unCompleteItem: 'getUnCompleteItem'
    }),
    size () {
      return this.$route.name === 'all' ? this.allItem.length : (this.$route.name === 'complete' ? this.completeItem.length : this.unCompleteItem.length)
    }
  }
}

</script>
<style scoped>
.route-item {
  display: flex;
  margin: 0 auto;
  justify-content: space-around;
  margin-top: 5px;
}
</style>