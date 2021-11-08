<template>
  <div class="form">
    <form @submit.prevent="printToConsole" autocomplete="off">
      <div class="personal-info">
        <h1>Личные данные</h1>

        <div class="row">
          <div class="row-input">
            <label for="last-name">Фамилия</label>
            <input v-model="lastName" id="last-name" name="last-name" />
          </div>
          <div class="row-input">
            <label for="first-name">Имя</label>
            <input v-model="firstName" id="first-name" name="first-name" />
          </div>
          <div class="row-input">
            <label for="middle-name">Отчество</label>
            <input v-model="middleName" id="middle-name" name="middle-name" />
          </div>
        </div>

        <div class="row">
          <div class="row-input">
            <label for="date">Дата рождения</label>
            <input v-model="birthDate" id="date" name="date" type="date" />
          </div>
          <div class="row-input"></div>
        </div>

        <div class="row">
          <div class="row-input">
            <label for="email">E-mail</label>
            <input v-model="email" id="email" name="email" type="email" />
          </div>
        </div>
        <div class="radio-input-box">
          <p>Пол</p>
          <input
            v-model="gender"
            type="radio"
            name="gender"
            id="gender-male"
            value="Мужской"
          />
          <label for="gender-male">Мужской</label>

          <input
            v-model="gender"
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
        <div class="row">
          <div class="row-input">
            <label for="nationality">Гражданство</label>
            <input
              v-model="nationality"
              id="nationality"
              name="nationality"
              list="nations"
            />

            <datalist id="nations">
              <option
                v-for="citizenship in citizenships"
                :key="citizenship.id"
                :value="citizenship.nationality"
              >
                {{ citizenship.nationality }}
              </option>
            </datalist>
          </div>
          <div class="row-input"></div>
        </div>

        <div v-if="nationality === 'Russia'" class="row">
          <div class="row-input row-input-id">
            <div class="row-input">
              <label for="last-name">Серия паспорта</label>
              <input id="last-name" name="last-name" />
            </div>
            <div class="row-input">
              <label for="first-name">Номер паспорта</label>
              <input id="first-name" name="first-name" />
            </div>
          </div>
          <div class="row-input">
            <label for="middle-name">Дата выдачи</label>
            <input id="middle-name" name="middle-name" type="date" />
          </div>
        </div>

        <div v-else-if="nationality">
          <div class="row">
            <div class="row-input row-input-id">
              <div class="row-input">
                <label for="latin-last-name">Фамилия на латинице</label>
                <input id="latin-last-name" name="latin-last-name" />
              </div>
              <div class="row-input">
                <label for="latin-first-name">Имя на латинице</label>
                <input id="latin-first-name" name="latin-first-name" />
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
                <input id="first-name" name="first-name" />
              </div>
              <div class="row-input">
                <label for="country">Страна выдачи</label>
                <select v-model="country" id="country">
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
              <select v-model="idType" id="id-type">
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
            v-model="changedName"
            type="radio"
            id="no"
            name="changed-name"
            value="No"
          />
          <label for="no">Нет</label>

          <input
            v-model="changedName"
            type="radio"
            id="yes"
            name="changed-name"
            value="Yes"
          />
          <label for="yes">Да</label>
        </div>

        <div v-if="changedName === 'Yes'" class="row">
          <div class="row-input">
            <label for="prev-last-name">Предыдущая фамилия</label>
            <input id="prev-last-name" name="prev-last-name" />
          </div>
          <div class="row-input">
            <label for="prev-name">Предыдущее имя</label>
            <input id="prev-name" name="prev-name" />
          </div>
        </div>
      </div>

      <button class="submit-btn" type="submit">Отправить</button>
    </form>
  </div>
</template>

<script>
import citizenships from "../../src/assets/data/citizenships.json";
import passports from "../../src/assets/data/passport-types.json";

export default {
  data() {
    return {
      citizenships,
      passports,
      lastName: "",
      firstName: "",
      middleName: "",
      birthDate: "",
      email: "",
      gender: "",
      nationality: "",
      country: "",
      idType: "",
      changedName: null,
    };
  },
  methods: {
    printToConsole(e) {
      const data = new FormData(e.target);
      const info = Object.fromEntries(data.entries());
      console.log(JSON.stringify(info));
    },
  },
};
</script>

<style>
:root {
  --main-color: rgb(3, 70, 255);
  --text-color: rgba(0, 0, 0, 0.5);
  --text-color-bright: rgba(0, 0, 0, 0.2);
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
  background-color: rgba(0, 0, 0, 0.05);
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
