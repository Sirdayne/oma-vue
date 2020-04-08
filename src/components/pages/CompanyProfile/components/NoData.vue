<template>
  <v-tooltip top>
    <template v-slot:activator="{ on }">
     <v-icon v-on="on">error_outline</v-icon>
    </template>
    <span>No data available</span>
  </v-tooltip>
</template>
