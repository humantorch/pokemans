<template>
  <div id="app">
    <RouterView />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700&display=swap");

$headerHeight: 80px;

/* transition setup */
@mixin transition($x...) {
  -webkit-transition: $x;
  -moz-transition: $x;
  -ms-transition: $x;
  -o-transition: $x;
  transition: $x;
}
$trans: all .3s ease-in-out;

* {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  font-family: "Source Sans Pro", sans-serif;
  padding: 0;
  margin: 0;
  text-transform: capitalize;
}
header {
  float: left;
  width: 100%;
  height: $headerHeight;
  background-color: #ddd;
  h2 {
    margin-top: -30px;
    font-size: 0.6em;
    text-transform: none;
    font-weight: normal;
    a, a:visited {
      color: black;
      @include transition($trans);
    }
    a:hover {
      color: #00f;
    }
  }
}
input {
  line-height: 2em;
  font-size: large;
}
.column {
  background-color: #ffffff;
  padding: 0 0 0 10px;
  overflow-y: scroll;

  &.col--types {
    float: left;
    width: 20%;
    background-color: #eee;
    clear: left;
    height: calc(100vh - #{$headerHeight});
    padding: 0;
    padding-top: 20px;
    li {
      padding-left: 5px;
      line-height: 2.5em;
      @include transition($trans);
      &:hover,
      &.active {
        cursor: pointer;
        background-color: #fff;
        @include transition($trans);
      }
    }
  }
  &.col--pokemons {
    width: 60%;
    background-color: #fff;
    float: left;
    height: calc(100vh - #{$headerHeight});
    li {
      width: 150px;
      height: 200px;
      line-height: 15px;
      float: left;
      border: 1px black solid;
      margin: 5px;
      padding: 10px 5px;
      .favebutton {
        line-height: 10px;
        text-align: right;
        margin: 0;
      }
      .imgholder {
        text-align: center;
      }
      h4 {
        margin: 5px;
      }
    }
  }
  &.col--favorites {
    position: absolute;
    top: 0;
    right: 0;
    width: 20%;
    box-shadow: -10px 0 15px #ccc;
    height: 100vh;
    padding: 0;
    h3 {
      padding-left: 5px;
    }
    li {
      border: 1px black solid;
      background-color: #eee;
      padding: 0 5px;
      margin: 10px;
      position: relative;
      h4,
      p {
        width: 75%;
        margin: 10px 0;
        span {
          text-transform: none;
        }
      }
      button {
        float: right;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 5px;
      }
    }
  }
  ul {
    margin: 0;
    padding: 0;
    li {
      list-style-type: none;
      // line-height: 50px;
      padding: 0;
      margin: 0;
    }
  }
}

.deleteConfirm {
  display: none;
}
</style>
