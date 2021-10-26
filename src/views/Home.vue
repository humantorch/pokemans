<template>
  <div class="home">
    <header>
      <h1>Pokedex</h1>
    </header>
    <!-- types sidebar -->
    <div class="column col--types">
      <input type="text" id="filter" placeholder="Type..." v-model="filterbox" />

      <ul class="typesList">
        <li
          v-for="type in filteredTypes"
          v-bind:class="{active: typeselected === type.name}"
          :key="type.name"
          @click="getListOfType(type.name); typeselected = type.name;"
          class="typeList--item"
        >
          <h3>{{ type.name }}</h3>
        </li>
      </ul>
    </div>

    <!-- main body of pokemans -->
    <div class="column col--pokemons">
      <h3>
        Pokémons of type
        <em>{{ typeselected }}</em>:
      </h3>
      <ul class="pokemansList">
        <li v-if="emptySet === true">
          <p>No results for that type found!</p>
          <p class="imgholder">
            <img height="75" src="/images/img_not_found.png" alt="image not found" />
          </p>
        </li>
        <li v-else class="typeList--item unfaved" v-for="pk in newpks" :key="pk.pokemon.name">
          <p class="favebutton">
            <el-button
              type="default"
              v-if="favesObj[pk.pokemon.name] === undefined"
              size="mini"
              icon="el-icon-star-on"
              circle
              @click="dialogFormVisible = true;addToFaveName = pk.pokemon.name;addToFaveId = pk.id;"
            ></el-button>

            <el-button
              type="warning"
              v-else
              size="mini"
              icon="el-icon-star-off"
              circle
              @click="deleteModal(pk.pokemon.name)"
            ></el-button>
          </p>

          <p class="imgholder">
            <img height="75" :src="pk.details.sprite" :alt="pk.pokemon.name" />
          </p>

          <h4>{{ pk.pokemon.name }}</h4>
          <span># {{ pk.id }}</span>
        </li>
      </ul>

      <el-dialog title="Add to favourites" :visible.sync="dialogFormVisible">
        <el-form :model="form" @submit.prevent.native="submitModalEnterKey">
          <el-form-item label="Add a memo if you wish:" :label-width="formLabelWidth">
            <el-input id="faveInput" v-model="addToFaveMemo" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            @click="
							dialogFormVisible = false;
							addToFaveMemo = '';
						"
          >Cancel</el-button>
          <el-button
            type="primary"
            id="faveSubmit"
            @click="dialogFormVisible = false;setFavorites(addToFaveName, addToFaveMemo);"
          >Confirm</el-button>
        </span>
      </el-dialog>
    </div>

    <!-- favorites column -->
    <div class="column col--favorites">
      <h3>my favorites:</h3>
      <ul class="favoritesList">
        <li class="favoritesList--item" v-for="(memo, name) in favesObj" :key="name">
          <h4>{{ name }}</h4>
          <p class="memo" v-if="memo" :data-memo-name="name">
            Memo:
            <br />
            <span>{{ memo }}</span>
          </p>
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            circle
            @click="deleteModal(name)"
            style
          ></el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script src="./Home.js"></script>
