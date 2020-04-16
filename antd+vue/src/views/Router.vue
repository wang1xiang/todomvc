<script>
import HeadInput from '@components/HeadInput'
import Maintain from '@components/Maintain'
import Foot from '@components/Foot'

export default {
  name: 'AvatarList',
  components: {
    Maintain,
    HeadInput,
    Foot
  },
  render () {
    return (
      <div class="container">
        <HeadInput></HeadInput>
        <Maintain></Maintain>
        <Foot></Foot>
      </div>
    )
  }
}
</script>
