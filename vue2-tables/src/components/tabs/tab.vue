<script>
import tabContent from './tab-content'
export default {
  name: "tab",
  components:{
    tabContent
  },
  props:{
    label:{
      type:String,
      default:"tab"
    },
    index:{
      type:[String,Number],
      default:1,
    }
  },
  mounted() {
    //console.log(this.$parent.currentIndex);
    //console.log(this.$slots.default);
    this.$parent.pans.push(this);
  },
  computed:{
    isActive(){
      return this.$parent.currentIndex==this.index;
    }
  },
  methods:{
    clickItemHandle(){
      this.$parent.setActiveIndex(this.index);
    }
  },
  render(){
    let classNames={
      tab:true,
      active:this.isActive
    };
    return(
      <li onClick={this.clickItemHandle} class={classNames}>{ this.label}</li>
    )
  }
}
</script>
<style scoped>

.tab {
  flex: 1;
  list-style: none;
  line-height: 40px;
  margin-right: 30px;
  position: relative;
  text-align: center;
}

.tab.active {
  border-bottom: 2px solid blue;
}

</style>
