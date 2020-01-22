<template>
  <div class="compass">
    <div class="compass__content compass__container">
      <a class="compass__content__link">
        <p @click="switchModalOn()">{{ local }}</p>
        <img src="../assets/images/icons/icon_location.svg" alt="">
      </a>
        <div class="compass__model__input">
          <span class="icon-close" @click="compassOff()">
            <img src="../assets/images/icons/close.svg" alt="Ícone Fechar">
          </span>
          <form>
            <input type="text" v-model="search" placeholder="Informe a sua cidade" autocomplete="off" @input="filterCities" @focus="modal = true" id="autocomplete_input">
            <div v-if="modal && search !== ''">
              <div class="compass__list-center">
                <ul class="compass__cities">
                  <li v-for="(filteredCity, i) in filteredCities" :key="i" @click="setCity(filteredCity)" class="compass__city">{{ filteredCity }}</li>
                </ul>
              </div>
            </div>
          </form>
        </div> 
    </div>  
  </div>
</template>

<script>
import cities from '../data/cities.json'
import "../styles/main.scss";

export default {
  data() {
    return {
      search: '',
      modal: false,
      estados: cities.estados,
      cidades: [],
      filteredCities: [],
      local: 'Qual a sua localização?'
    }
  },
  created(){
    this.getCities();
    const city = localStorage.getItem('cidade')
    this.local = city
    this.search = city
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
         return cidade.toLowerCase().startsWith(this.search.toLowerCase())
       }) 
    },
    setCity(city) {
      this.search = city
      console.log(this.search);
      
      this.modal = false
      localStorage.setItem("cidade", city);
    },
    switchModalOn() {
      $('.compass__content__link').hide()
      $('.compass__model__input').show()
      $('#autocomplete_input').focus()
    },
    compassOff() {
      $('.compass__content__link').show()
      $('.compass__model__input').hide()
    }
    
  }
}
</script>

<style lang="scss" scoped>

  

  * {
    font-family: roboto;
  }

  .compass {

    &__container {
      margin-right: auto; 
      margin-left:  auto; 
      max-width: 300px; 
    }

    &__cities {
      color: #000;
      border: 1px solid #999;
      text-decoration: none;
      margin: 0;
      padding: 0;
      width: 100%;
      margin-top: -3px;
      border-top: 0px;
      border-bottom: 0px;
    }

    &__city {
      list-style-type: none;
      border-bottom: 1px solid #999;
      padding: 15px 45px;
      transition: color ease-in-out .1s;

      &:hover {
        color: #609;
        cursor: pointer;
      }
    }
 
    &__list-center {
      display: flex;
      justify-content: center;
      align-items: center;
    }

    &__content__link {
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;

      p {
        font-weight: 600;
        color: #609;
        /* display: inline; */
      }

      img {
        width: 22px;
        margin-left: 2px;
        height: 22px;
      }
    }
    &__model__input {
      display: none;
      width: 100%;
      position: relative;

      input {
      padding-left: 10px;
      height: 48px;
      border-radius: 5px 5px 0px 0px;
      border: 1px solid #999;
      width: 100%;
      font-size: 14px;
      /* display: none;  */

      &:focus {
        outline: none;
      }
    }

      .icon-close {
        position: absolute;
        right: 10px;
        top: 15px;
        cursor: pointer;
      }  
    }
  }
  
</style>