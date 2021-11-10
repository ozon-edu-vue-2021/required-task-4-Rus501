<template>
  <div class="form">
    <form @submit.prevent="printToConsole" autocomplete="off">
      <div class="personal-info">
        <h1>Личные данные</h1>

        <div class="row">
          <div class="row-input">
            <label for="last-name">Фамилия</label>
            <input
              v-model="formData.lastName.value"
              id="last-name"
              name="last-name"
              placeholder="Иванов"
              :class="{ invalid: formData.lastName.isError }"
            />
            <span v-if="formData.lastName.isError">
              Только буквы русского алфавита
            </span>
          </div>

          <div class="row-input">
            <label for="first-name">Имя</label>
            <input
              v-model="formData.firstName.value"
              id="first-name"
              name="first-name"
              placeholder="Иван"
              :class="{ invalid: formData.firstName.isError }"
            />
            <span v-if="formData.firstName.isError">
              Только буквы русского алфавита
            </span>
          </div>

          <div class="row-input">
            <label for="middle-name">Отчество</label>
            <input
              v-model="formData.middleName.value"
              id="middle-name"
              name="middle-name"
              placeholder="Иванович"
              :class="{ invalid: formData.middleName.isError }"
            />
            <span v-if="formData.middleName.isError">
              Только буквы русского алфавита
            </span>
          </div>
        </div>

        <div class="row">
          <div class="row-input">
            <label for="date">Дата рождения</label>
            <input
              v-model="formData.birthDate.value"
              id="date"
              name="date"
              type="date"
              :class="{ invalid: formData.birthDate.isError }"
            />
            <span v-if="formData.birthDate.isError">
              Дата не может быть пустой или позже сегодняшнего числа
            </span>
          </div>
          <div class="row-input"></div>
        </div>

        <div class="row">
          <div class="row-input">
            <label for="email">E-mail</label>
            <input
              v-model="formData.email.value"
              id="email"
              name="email"
              type="email"
              placeholder="email@example.com"
              :class="{ invalid: formData.email.isError }"
            />
            <span v-if="formData.email.isError">
              Email адрес должен содержать символ @ и точку в доменном имени
            </span>
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
              v-model="searchWord"
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
                  @click="setCountry(citizenship)"
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
                v-model="formData.passportSeries.value"
                id="last-name"
                name="last-name"
                placeholder="0123"
                minlength="4"
                maxlength="4"
                :class="{ invalid: formData.passportSeries.isError }"
              />
              <span v-if="formData.passportSeries.isError">
                Серия паспорта должна состоять из 4 цифр
              </span>
            </div>
            <div class="row-input">
              <label for="first-name">Номер паспорта</label>
              <input
                v-model="formData.passportNumber.value"
                id="first-name"
                name="first-name"
                placeholder="456789"
                minlength="6"
                maxlength="6"
                :class="{ invalid: formData.passportNumber.isError }"
              />
              <span v-if="formData.passportNumber.isError">
                Номер паспорта должен состоять из 6 цифр
              </span>
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
                  v-model="formData.latinLastName.value"
                  id="latin-last-name"
                  name="latin-last-name"
                />
              </div>
              <div class="row-input">
                <label for="latin-first-name">Имя на латинице</label>
                <input
                  v-model="formData.latinFirstName.value"
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
                  v-model="formData.passportNumberInt"
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
              v-model="formData.prevLastName.value"
              id="prev-last-name"
              name="prev-last-name"
              :class="{ invalid: formData.prevLastName.isError }"
            />
            <span v-if="formData.prevLastName.isError">
              Only english letters
            </span>
          </div>

          <div class="row-input">
            <label for="prev-first-name">Предыдущее имя</label>
            <input
              v-model="formData.prevFirstName.value"
              id="prev-first-name"
              name="prev-first-name"
              :class="{ invalid: formData.prevFirstName.isError }"
            />
            <span v-if="formData.prevFirstName.isError">
              Only english letters
            </span>
          </div>
        </div>
      </div>

      <button class="submit-btn">Отправить</button>
    </form>
  </div>
</template>

<script>
import citizenships from "@/assets/data/citizenships.json";
import passports from "@/assets/data/passport-types.json";
import { debounce } from "@/helpers/debounce";
import clickOutside from "vue-click-outside";

import ID_RUSSIA from "@/constants/russiaID";
import {
  ONLY_RUSSIAN_LETTERS_REGEX,
  ONLY_ENGLISH_LETTERS_REGEX,
  EMAIL_REGEX,
  NUMBERS_ONLY_REGEX,
} from "@/constants/regex";

export default {
  directives: {
    clickOutside,
  },
  data() {
    return {
      citizenships,
      passports,
      formData: {
        lastName: {
          value: "",
          isError: false,
        },
        firstName: {
          value: "",
          isError: false,
        },
        middleName: {
          value: "",
          isError: false,
        },
        birthDate: {
          value: "",
          isError: false,
        },
        email: {
          value: "",
          isError: false,
        },
        gender: "",
        nationality: null,
        passportSeries: {
          value: "",
          isError: false,
        },
        passportNumber: {
          value: "",
          isError: false,
        },
        passportDate: "",
        latinLastName: {
          value: "",
          isError: false,
        },
        latinFirstName: {
          value: "",
          isError: false,
        },
        passportNumberInt: "",
        country: "",
        idType: "",
        changedName: "",
        prevLastName: {
          value: "",
          isError: false,
        },
        prevFirstName: {
          value: "",
          isError: false,
        },
      },
      searchWord: "",
      inputIsFocused: false,
      inputIsChanged: false,
      throttleInput: debounce(this.filterNationalities, 1000),
      filteredNations: [...citizenships],
      formIsValid: false,
    };
  },
  methods: {
    printToConsole() {
      this.checkValidity();
      if (this.formIsValid === false) return;

      console.log(JSON.stringify(this.formData));
    },
    filterNationalities(e) {
      this.inputIsChanged = true;
      this.searchWord = e.target.value;

      this.filteredNations = citizenships.filter(
        (item) =>
          item.nationality.includes(this.searchWord) ||
          item.nationality.toLowerCase().includes(this.searchWord)
      );

      if (
        this.inputIsChanged &&
        !this.filteredNations.find(
          (item) => item.nationality === this.searchWord
        )
      ) {
        this.formData.nationality = null;
      }
    },
    hideDropDown() {
      this.inputIsFocused = false;
    },
    setCountry(country) {
      this.formData.nationality = country;
      this.searchWord = country.nationality;
      this.inputIsFocused = false;
      this.inputIsChanged = false;
    },
    checkRussianLetters(item) {
      item.isError = !ONLY_RUSSIAN_LETTERS_REGEX.test(item.value);
    },
    checkBirthDate(item) {
      const today = new Date();
      const date = `
        ${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}
      `;

      if (!item.value) {
        item.isError = true;
        return;
      }
      item.isError = item.value > date.trim();
    },
    checkEmail(item) {
      item.isError = !EMAIL_REGEX.test(item.value);
    },
    checkPassport(item) {
      item.isError = !NUMBERS_ONLY_REGEX.test(item.value);
    },
    checkEnglishLetters(item) {
      item.isError = !ONLY_ENGLISH_LETTERS_REGEX.test(item.value);
    },
    checkValidity() {
      const form = this.formData;

      this.checkRussianLetters(form.lastName);
      this.checkRussianLetters(form.firstName);
      this.checkRussianLetters(form.middleName);
      this.checkRussianLetters(form.prevLastName);
      this.checkRussianLetters(form.prevFirstName);

      this.checkBirthDate(form.birthDate);

      this.checkEmail(form.email);

      this.checkPassport(form.passportSeries);
      this.checkPassport(form.passportNumber);

      this.checkEnglishLetters(form.prevLastName);
      this.checkEnglishLetters(form.prevFirstName);

      const russianPassportNotValid =
        this.isRussia && (form.passportSeries.isError || form.passportNumber);

      const changedNameNotValid =
        form.changedName === "Yes" &&
        (form.prevLastName.isError || form.prevFirstName.isError);

      if (
        form.lastName.isError ||
        form.firstName.isError ||
        form.middleName.isError ||
        form.birthDate.isError ||
        form.email.isError ||
        russianPassportNotValid ||
        changedNameNotValid
      ) {
        this.formIsValid = false;
        return;
      }

      this.formIsValid = true;
    },
  },
  computed: {
    isRussia() {
      return this.formData.nationality?.id === ID_RUSSIA;
    },
    isValid() {
      return citizenships.find(
        (item) => item.nationality === this.formData.nationality?.nationality
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
  /* align-items: flex-end; */
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

input + span {
  font-size: 12px;
  color: red;
}
.row-input .invalid {
  border-color: red;
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
