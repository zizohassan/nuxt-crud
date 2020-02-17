<template>
  <div>
    <CounteUp :data="{ count: 10, label: 'admins' }" />
    <CounteUp :data="{ count: 50, label: 'users' }" />

    <b-card style="width:45%; display:inline-block; margin:20px">
      <BarChart
        :data="[
          { count: 10, label: 'Admins' },
          { count: 50, label: 'Users' },
          { count: 7, label: 'Devs' },
          { count: 13, label: 'Testers' }
        ]"
      />
    </b-card>
    <b-card style="width:45%; display:inline-block; margin:20px">
      <PieChart
        :data="[
          { count: 10, label: 'Admins' },
          { count: 50, label: 'Users' },
          { count: 7, label: 'Devs' },
          { count: 13, label: 'Testers' }
        ]"
      />
    </b-card>
  </div>
</template>

<script>
import Vue from "vue";
import BarChart from "@/components/charts/BarChart";
import PieChart from "@/components/charts/PieChart";
import CounteUp from "@/components/charts/CounteUp";

export default {
  components: {
    BarChart,
    PieChart,
    CounteUp
  },
  data() {
    return { data: {} };
  }
};
</script>
