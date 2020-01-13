<template>
  <div class="compass-component">
    <div class="container">
      <input type="text" v-model="search" placeholder="Digite sua cidade aqui" autocomplete="off" @input="filterCities" @focus="modal = true"  class="compass-search">
      <div v-if="modal && search !== ''">
        <div class="compass-list-center">
          <ul class="compass-cities">
            <li v-for="(filteredCity, i) in filteredCities" :key="i" @click="setCity(filteredCity)" class="compass-city">{{ filteredCity }}</li>
          </ul>
        </div>
      </div>
    </div>  
  </div>
</template>

<script>
import cities from '../data/cities.json'
export default {
  data() {
    return {
      search: '',
      modal: false,
      estados: cities.estados,
      cidades: [],
      filteredCities: []
    }
  },
  created(){
    this.getCities();
  },
  methods: {
    getCities() {
      this.estados.forEach((element) => {
        element.cidades.forEach(element2 => {
          this.cidades.push(element2);
        })
      });
    },
    filterCities() {
       this.filteredCities = this.cidades.filter(cidade => {
         return cidade.toLowerCase().startsWith(this.search.toLowerCase());
       })
    
    },
    setCity(city) {
      this.search = city
      console.log(this.search);
      
      this.modal = false
      localStorage.setItem("cidade", city);
    } 
  }
}
</script>

<style lang="scss" scoped>

  .compass-component .container {
    margin: auto;
    max-width: 960px;
    padding: 0 10px; 
  }

  .compass-component .compass-search {
    background-color: #d3d3de;
    padding: 10px 10px;
    height: 25px;
    border: none;
    width: 25%;
  }

  .compass-component .compass-cities {
    background-color: #35495e;
    color: #fff;
    text-decoration: none;
    margin: 0;
    padding: 0;
    width: 27%;
  }

  .compass-component .compass-city {
    list-style-type: none;
    border-bottom: 1px solid #fff;
    padding: 10px 45px;
  }
  
  .compass-component .compass-list-center {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
</style>