<!--
https://eugenkiss.github.io/7guis/tasks/#crud
-->
<script setup>
import { ref, reactive, computed, watch } from 'vue'

const names = reactive(['Emil, Hans', 'Mustermann, Max', 'Tisch, Roman', 'Goatimus, Maximus','Beardo, Leftarmed','Moril, Hamsmasher','Person, McGee','Silly, Goose','Sillimus, Gooseamus is the best goose person that ive ever known and this test is just trying to wrap around the screen please'])
const selected = ref('')
const prefix = ref('')
const first = ref('')
const last = ref('')

const filteredNames = computed(() =>
  names.filter((n) =>
    n.toLowerCase().startsWith(prefix.value.toLowerCase())
  )
)

watch(selected, (name) => {
  ;[last.value, first.value] = name.split(', ')
})

function create() {
  if (hasValidInput()) {
    const fullName = `${last.value}, ${first.value}`
    if (!names.includes(fullName)) {
      names.push(fullName)
      first.value = last.value = ''
    }
  }
}

function update() {
  if (hasValidInput() && selected.value) {
    const i = names.indexOf(selected.value)
    names[i] = selected.value = `${last.value}, ${first.value}`
  }
}

function del() {
  if (selected.value) {
    const i = names.indexOf(selected.value)
    names.splice(i, 1)
    selected.value = first.value = last.value = ''
  }
}

function hasValidInput() {
  return first.value.trim() && last.value.trim()
}
</script>

<template>
  <div><input v-model="prefix" placeholder="Filter prefix"></div>

  <select size="5" v-model="selected">
    <option v-for="name in filteredNames" :key="name">{{ name }}</option>
  </select>

  <label>Name: <input v-model="first"></label>
  <label>Surname: <input v-model="last"></label>

  <div class="buttons">
    <button @click="create">Create</button>
    <button @click="update">Update</button>
    <button @click="del">Delete</button>
  </div>
  
  <ul size="5" class="yolo leftright">
    <li v-for="name in filteredNames" :key="name">
      <span class="name">{{ name }}</span>
      <span class="age">age unknown</span>
    </li>
  </ul>
    <ul size="5" class="yolo flex inline-block">
    <li v-for="name in filteredNames" :key="name">
      <span class="name">{{ name }}</span>
      <span class="age">age unknown</span>
    </li>
  </ul>
  
  <ul size="5" class="yolo inline">
    <li v-for="name in filteredNames" :key="name">
      <span class="name">{{ name }}</span>
    </li>
  </ul>
  <ul size="5" class="yolo inline-block">
    <li v-for="name in filteredNames" :key="name">
      <span class="name">{{ name }}</span>
    </li>
  </ul>
   <ul size="5" class="yolo inline">
    <li v-for="name in filteredNames" :key="name">
      <span class="name">{{ name }}</span>
      <span class="age">age unknown</span>
    </li>
  </ul>
  <ul size="5" class="yolo inline-block">
    <li v-for="name in filteredNames" :key="name">
      <span class="name">{{ name }}</span>
      <span class="age">age unknown</span>
    </li>
  </ul>
   
</template>

<style>
  ul.yolo{
    list-style:none;
    border:1px solid red;
    padding:0;
		text-align:justify; 
  } 
  
   ul.yolo.leftright{
     
  }
  ul.yolo.leftright li span{
    border:1px solid black;
    padding:0 8px;
    box-sizing: border-box;
    display:inline-block;
     width:50%;
  }
  ul.yolo.leftright li span:last-child{
    text-align:right;
  }
  
  ul.yolo.flex{
    display:flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  
  ul.yolo.flex li{
    box-sizing: border-box;
    min-width:calc(50% - 10px);
    flex-grow:1;
    text-align:center;
  }
  ul.yolo.flex li span{
    padding:0 8px;
  }
  
  .yolo > li{
    background-color:#00f7;
    border:1px solid black;
    margin:5px;
/*     width:30%; */
/*     height: 50px; */
    padding:8px;
    line-height:50px;
  }
  
  .yolo.inline li{
    display:inline;
  }
  .yolo.inline-block li{
    display:inline-block;
  }
  .yolo.inline-block li>span{
    background-color:#00f7;
    border:1px solid black;
    display:block;
  }
  
* {
  font-size: inherit;
}

input {
  display: block;
  margin-bottom: 10px;
}

select {
  float: left;
  margin: 0 1em 1em 0;
  width: 14em;
}

.buttons {
  clear: both;
}

button + button {
  margin-left: 5px;
}
</style>