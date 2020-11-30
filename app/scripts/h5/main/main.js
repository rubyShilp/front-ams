import charts from "@/components/charts";
import * as mainServer from "@/pages/main/main.server.js";
import main from '@/pages/main/main.js';
export default {
  mixins:[main],
  components: {
    "ams-chart": charts,
  },
  data() {
    return {
      userInfo:JSON.parse(sessionStorage.getItem('userInfo')),
      querytype:1,
    };
  },
  beforeMount(){

  },
  methods: {

  },
};
