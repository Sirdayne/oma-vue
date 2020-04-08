<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
     <v-icon v-on="on">lock</v-icon>
    </template>
    <span>You must monitor this company in order to view premium data.</span>
  </v-tooltip>
</template>
