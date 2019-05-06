<template>
    <v-app>
       <v-container fluid fill-height class="loginOverlay">
          <v-layout flex align-center justify-center>
            <v-flex xs12 sm4 elevation-6>
              <v-toolbar class="pt-5 primary">
                <v-toolbar-title class="white--text"><h4>{{$route.meta.heading}}</h4></v-toolbar-title>
              </v-toolbar>
              <v-card>
                <v-card-text class="pt-4">
                  <div>
                    <v-slide-y-transition mode="out-in">
                        <router-view/>
                    </v-slide-y-transition>
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
       </v-container>
        <a href="" target="_blank">
          <v-card class="photoCredit blue-grey darken-4">
            <v-card-title>
              <div class="white--text">
                Singsys Software Pvt. Ltd.
              </div>
            </v-card-title>
          </v-card>
        </a>
    </v-app>
</template>
