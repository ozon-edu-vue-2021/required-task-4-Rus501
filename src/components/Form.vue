<template>
  <div class="form">
    <form @submit.prevent="printToConsole" autocomplete="off">
      <div class="personal-info">
        <h1>Личные данные</h1>

        <div class="row">
          <div class="row-input">
            <label for="last-name">Фамилия</label>
            <input
              v-model="formData.lastName"
              id="last-name"
              name="last-name"
            />
          </div>
          <div class="row-input">
            <label for="first-name">Имя</label>
            <input
              v-model="formData.firstName"
              id="first-name"
              name="first-name"
            />
          </div>
          <div class="row-input">
            <label for="middle-name">Отчество</label>
            <input
              v-model="formData.middleName"
              id="middle-name"
              name="middle-name"
            />
          </div>
        </div>

        <div class="row">
          <div class="row-input">
            <label for="date">Дата рождения</label>
            <input
              v-model="formData.birthDate"
              id="date"
              name="date"
              type="date"
            />
          </div>
          <div class="row-input"></div>
        </div>

        <div class="row">
          <div class="row-input">
            <label for="email">E-mail</label>
            <input
              v-model="formData.email"
              id="email"
              name="email"
              type="email"
            />
          </div>
        </div>
        <div class="radio-input-box">
          <p>Пол</p>
          <input
            v-model="formData.gender"
            type="radio"
            name="gender"
            id="gender-male"
            value="Мужской"
          />
          <label for="gender-male">Мужской</label>

          <input
            v-model="formData.gender"
            type="radio"
            name="gender"
            id="gender-female"
            value="Женский"
          />
          <label for="gender-female">Женский</label>
        </div>
      </div>

      <div class="id-info">
        <h1>Паспортные данные</h1>
        <div style="position: relative" class="row">
          <div v-click-outside="hideDropDown" class="row-input">
            <label for="nationality">Гражданство</label>
            <input
              v-model="formData.nationality.name"
              id="nationality"
              name="nationality"
              @focus="inputIsFocused = true"
              @input="throttleInput"
            />

            <div v-show="inputIsFocused" class="list-options">
              <ul>
                <li
                  v-for="citizenship in filteredNations"
                  :key="citizenship.id"
                  @click="pickNation(citizenship)"
                >
                  {{ citizenship.nationality }}
                </li>
              </ul>
            </div>
          </div>
          <div class="row-input"></div>
        </div>

        <div v-if="isRussia" class="row">
          <div class="row-input row-input-id">
            <div class="row-input">
              <label for="last-name">Серия паспорта</label>
              <input
                v-model="formData.passportSeries"
                id="last-name"
                name="last-name"
              />
            </div>
            <div class="row-input">
              <label for="first-name">Номер паспорта</label>
              <input
                v-model="formData.passportNumber"
                id="first-name"
                name="first-name"
              />
            </div>
          </div>
          <div class="row-input">
            <label for="middle-name">Дата выдачи</label>
            <input
              v-model="formData.passportDate"
              id="middle-name"
              name="middle-name"
              type="date"
            />
          </div>
        </div>

        <div v-else-if="isValid">
          <div class="row">
            <div class="row-input row-input-id">
              <div class="row-input">
                <label for="latin-last-name">Фамилия на латинице</label>
                <input
                  v-model="formData.latinLastName"
                  id="latin-last-name"
                  name="latin-last-name"
                />
              </div>
              <div class="row-input">
                <label for="latin-first-name">Имя на латинице</label>
                <input
                  v-model="formData.latinFirstName"
                  id="latin-first-name"
                  name="latin-first-name"
                />
              </div>
            </div>
          </div>
          <p class="note">
            Иностранцы заполняют латинскими буквами. Например, Ivan Ivanov
          </p>
          <div class="row">
            <div class="row-input row-input-id">
              <div class="row-input">
                <label for="first-name">Номер паспорта</label>
                <input
                  v-model="formData.passportNumber"
                  id="first-name"
                  name="first-name"
                />
              </div>
              <div class="row-input">
                <label for="country">Страна выдачи</label>
                <select v-model="formData.country" id="country">
                  <option disabled value=""></option>
                  <option
                    v-for="citizenship in citizenships"
                    :key="citizenship.id"
                    :value="citizenship.flag"
                  >
                    {{ citizenship.flag }}
                  </option>
                </select>
              </div>
            </div>
            <div class="row-input">
              <label for="id-type">Тип паспорта</label>
              <select v-model="formData.idType" id="id-type">
                <option disabled value=""></option>
                <option
                  v-for="passport in passports"
                  :key="passport.id"
                  :value="passport.type"
                >
                  {{ passport.type }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="radio-input-box">
          <p>Менял ли фамилию или имя?</p>
          <input
            v-model="formData.changedName"
            type="radio"
            id="no"
            name="changed-name"
            value="No"
          />
          <label for="no">Нет</label>

          <input
            v-model="formData.changedName"
            type="radio"
            id="yes"
            name="changed-name"
            value="Yes"
          />
          <label for="yes">Да</label>
        </div>

        <div v-if="formData.changedName === 'Yes'" class="row">
          <div class="row-input">
            <label for="prev-last-name">Предыдущая фамилия</label>
            <input
              v-model="formData.prevLastName"
              id="prev-last-name"
              name="prev-last-name"
            />
          </div>
          <div class="row-input">
            <label for="prev-first-name">Предыдущее имя</label>
            <input
              v-model="formData.prevFirstName"
              id="prev-first-name"
              name="prev-first-name"
            />
          </div>
        </div>
      </div>

      <button class="submit-btn">Отправить</button>
    </form>
  </div>
</template>

<script>
import citizenships from "../../src/assets/data/citizenships.json";
import passports from "../../src/assets/data/passport-types.json";
import clickOutside from "vue-click-outside";
import { debounce } from "@/helpers/debounce";
import RUSSIA_NAME from "@/constants/russiaID";

export default {
  directives: {
    clickOutside,
  },
  data() {
    return {
      citizenships,
      passports,
      formData: {
        lastName: "",
        firstName: "",
        middleName: "",
        birthDate: "",
        email: "",
        gender: "",
        nationality: {
          id: "",
          name: "",
        },
        passportSeries: "",
        passportNumber: "",
        passportDate: "",
        latinLastName: "",
        latinFirstName: "",
        country: "",
        idType: "",
        changedName: "",
        prevLastName: "",
        prevFirstName: "",
      },
      inputIsFocused: false,
      throttleInput: debounce(this.filterNationalities, 1000),
      filteredNations: [...citizenships],
    };
  },
  methods: {
    printToConsole() {
      console.log(JSON.stringify(this.formData));
    },
    filterNationalities(e) {
      this.formData.nationality.name = e.target.value;
      this.filteredNations = citizenships.filter(
        (item) =>
          item.nationality.includes(e.target.value) ||
          item.nationality.toLowerCase().includes(e.target.value)
      );
    },
    hideDropDown() {
      this.inputIsFocused = false;
    },
    pickNation(citizenship) {
      this.formData.nationality.id = citizenship?.id;
      this.formData.nationality.name = citizenship?.nationality;
      this.inputIsFocused = false;
    },
  },
  computed: {
    isRussia() {
      return this.formData.nationality.name === RUSSIA_NAME;
    },
    isValid() {
      return citizenships.find(
        (item) => item.nationality === this.formData.nationality.name
      );
    },
  },
};
</script>

<style>
:root {
  --main-color: rgb(3, 70, 255);
  --text-color: rgba(0, 0, 0, 0.5);
  --text-color-bright: rgba(0, 0, 0, 0.2);
  --hover-color: rgba(0, 0, 0, 0.05);
}
</style>

<style scoped>
.form {
  max-width: 800px;
  margin: 0 auto;
  height: 100%;
  /* background: rgb(230, 230, 230); */
}

form {
  height: 100%;
  position: relative;
}

.personal-info {
  margin-bottom: 25px;
}

h1 {
  font-size: 18px;
  margin: 0;
}

.row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 15px;
  margin-top: 22px;
  font-size: 14px;
  color: var(--text-color);
}

.row-input {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.row-input input,
.row-input select {
  width: 100%;
  min-height: 35px;
  padding: 5px 10px;
  border: 2px solid var(--text-color-bright);
  border-radius: 3px;
  transition: border-color, background-color;
  transition-duration: 200ms;
}

.row-input input:hover,
.row-input select:hover {
  background-color: var(--hover-color);
}

.row-input input:focus,
.row-input select:focus {
  outline: none;
  border-color: var(--main-color);
  background-color: #fff;
}

.row-input-id {
  flex-direction: row;
  gap: 15px;
}

.row-input input:placeholder {
  color: var(--text-color);
}

.radio-input-box {
  font-weight: bold;
}

.radio-input-box label {
  margin-right: 25px;
}

.radio-input-box input {
  margin-right: 8px;
}

input[type="radio"],
input[type="radio"] + label {
  cursor: pointer;
}

.list-options {
  /* display: none; */
  position: absolute;
  overflow: auto;
  top: 100%;
  width: calc(50% - 15px / 2);
  max-height: 350%;
  background: #fff;
  color: #000;
}

.list-options ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

.list-options ul li {
  padding: 10px 0 10px 20px;
  border-bottom: 1px solid #000;
  cursor: pointer;
  transition: background-color 200ms;
}

.list-options ul li:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.note {
  margin: 0;
  margin-top: 5px;
  font-size: 14px;
  color: var(--text-color);
}

.submit-btn {
  position: absolute;
  right: 0;
  bottom: 0;
  padding: 12px 30px;
  cursor: pointer;
  background: var(--main-color);
  color: #fff;
  border: none;
  border-radius: 3px;
}
</style>
