<script setup>
import {ref} from 'vue'

const goatList = ref([]);
const loading = ref(false);

const loadGoats = async () => {
    loading.value = true;
    const response = await fetch('/api/goats/?format=json');
    const data = await response.json();
    goatList.value = data;
    loading.value = false;
};


</script>

<template>
    <div class="goat-list">
        <div>
            loading: {{ loading }}
        </div>
        <div>
            <button @click="loadGoats">Load Goats</button>
        </div>
        <div>
            <ul>
                <li v-for="goat in goatList" :key="goat.name">
                    {{ goat }}
                </li>
            </ul>
        </div>
    </div>

</template>

