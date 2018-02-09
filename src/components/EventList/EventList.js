import axios from 'axios/dist/axios'

import EventBadge from '@/components/EventBadge/EventBadge.vue'


import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faExternalLinkAlt from '@fortawesome/fontawesome-free-solid/faExternalLinkAlt'
import faEdit from '@fortawesome/fontawesome-free-solid/faEdit'
import faDelete from '@fortawesome/fontawesome-free-solid/faArchive'

const eventURL = 'http://localhost:8090/events';

export default {
  name: 'EventList',
  data() {
    return {
      fields: ['title', 'statusBadge', 'composer', 'link', 'actions'],
      items: []
    }
  },
  computed: {

    linkIcon() {
      return faExternalLinkAlt
    },
    editIcon() {
      return faEdit
    },
    deleteIcon() {
      return faDelete
    }
  },
  created() {


    let config = {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + sessionStorage.getItem("access_token"),
          'Accept': 'application/json'
        }
    };

    console.log('events');
    axios.get(eventURL, config)
      .then(response => {
        this.items = response.data;
      })
      .catch(e => {
        //this.errors.push(e)
      });
  },
  beforeRouteEnter(to, from, next) {


    let config = {
      headers:
        {
          'Access-Control-Allow-Origin': '*',
          'Authorization': 'Bearer ' + sessionStorage.getItem("access_token"),
          'Accept': 'application/json'
        }
    };

    console.log('events');
    axios.get(eventURL, config)
      .then(response => {
        next(vm => {

          vm.items = response.data;
        })
      })
      .catch(e => {
        //this.errors.push(e)
      });
  },
  components: {
    FontAwesomeIcon,
    EventBadge
  }
}
