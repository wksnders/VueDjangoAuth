<script setup>
import { ref, reactive, computed, watch, onMounted } from 'vue'

const sessionData = reactive({})
const selectedKey = ref('')
const newKey = ref('')
const newValue = ref('')
const prefix = ref('')

const sessionEndPoint = "/api/session/session/?format=json";

async function fetchSessionData() {
  //try {
    const response = await fetch(sessionEndPoint)
    if (response.ok) {
      const data = await response.json()
      Object.assign(sessionData, data)
    } else {
      console.error('Failed to fetch session data')
    }
  /*} 
  catch (error) {
    console.error('Error:', error)
  }*/
}

async function create() {
  if (newKey.value.trim() && newValue.value.trim()) {
    try {
      const response = await fetch(sessionEndPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [newKey.value]: newValue.value })
      })
      if (response.ok) {
        sessionData[newKey.value] = newValue.value
        newKey.value = ''
        newValue.value = ''
      } else {
        console.error('Failed to create session data')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

async function update() {
  if (selectedKey.value && newValue.value.trim()) {
    try {
      const response = await fetch(sessionEndPoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [selectedKey.value]: newValue.value })
      })
      if (response.ok) {
        sessionData[selectedKey.value] = newValue.value
      } else {
        console.error('Failed to update session data')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

async function del() {
  if (selectedKey.value) {
    try {
      const response = await fetch(sessionEndPoint, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ [selectedKey.value]: newValue.value })
      })
      if (response.ok) {
        delete sessionData[selectedKey.value]
        selectedKey.value = ''
        newValue.value = ''
      } else {
        console.error('Failed to delete session data')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }
}

const filteredKeys = computed(() =>
  Object.keys(sessionData).filter((key) =>
    key.toLowerCase().startsWith(prefix.value.toLowerCase())
  )
)

watch(selectedKey, (key) => {
  newKey.value = key;
  newValue.value = sessionData[key] || '';
})

</script>

<template>
    <div>
        <button @click="fetchSessionData">Load Session</button>
    </div>
    <div>
        <input v-model="prefix" placeholder="Filter prefix" />

        <select size="5" v-model="selectedKey">
            <option v-for="key in filteredKeys" :key="key">{{ key }}</option>
        </select>

        <label>Key: <input v-model="newKey" placeholder="Enter key" /></label>
        <label>Value: <input v-model="newValue" placeholder="Enter value" /></label>

        <div class="buttons">
            <button @click="create">Create</button>
            <button @click="update">Update</button>
            <button @click="del">Delete</button>
        </div>
  </div>
</template>

<style>
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
