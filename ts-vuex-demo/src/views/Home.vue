<template>
  <div class="home">
    <todo-list :todo-list="todoList" @add-item="addTodoList" @remove-item="addTodoLisItem" />
  </div>
</template>
 
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import TodoList from '../components/TodoList.vue'
import { State, Getter, Action, namespace } from 'vuex-class'

const todoList = namespace('todoList')
@Component({
  components: {
    TodoList
  }
})
export default class Home extends Vue {
  @todoList.State(state => state.todoList) private todoList!: string[]

  @todoList.Action('addList') private addList!: (val: string) => void
  @todoList.Action('removeItem') private removeItem!: (index: number) => void

  public addTodoList(val: string) {
    this.addList(val)
  }

  private created() {
    //
  }

  private addTodoLisItem(index: number) {
    this.removeItem(index)
  }
}
</script>