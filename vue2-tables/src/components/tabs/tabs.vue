<script>
import tabContent from './tab-content'
export default {
  name: "tabs",
  components:{
    tabContent
  },
  props:{
    currentIndex:{
      type:[String,Number],
      default:1,
    }
  },
  data(){
    return {
      //所有内容部分的容器
      pans:[],
    }
  },
  methods:{
    setActiveIndex(index){
      this.$emit("onIndex",index);
    }
  },
  render() {
    return(
      <div>
        <ul class="tabs-header">{this.$slots.default}</ul>
        <tab-content pans={this.pans}/>
      </div>
    )
  }
}
</script>
<style scoped>
.tabs-header {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  border-bottom: 2px solid #ededed;
}
</style>
