<template>
<div id="app">
  <my-compontent/>
  <MyCompontent/>
  <tabs :currentIndex="currentIndex" @onIndex="getIndexHandle">
    <tab index="1" label="中国地图">
      <div>内容1</div>
    </tab>
    <tab index="2" label="世界地图">
      <div>内容2</div>
    </tab>
  </tabs>
</div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      currentIndex: 1
    }
  },
  methods: {
    getIndexHandle(index) {
      this.currentIndex = index;
    }
  }
}
</script>
